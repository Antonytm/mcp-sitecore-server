import type { McpServer } from "@modelcontextprotocol/server";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { PowershellClient } from "@/tools/powershell/client.js";
import { quotePowerShellString } from "@/tools/powershell/command-builder.js";
import {
    findErrorRecord,
    formatPowershellError,
    wantsFullErrors,
} from "@/tools/powershell/error-shaping.js";

/**
 * `indexing-find-item` wraps SPE's `Find-Item`, itself a wrapper over the Sitecore Content
 * Search API. Four problems were recorded against it. Where each now stands:
 *
 * 1. **Huge amount of data to return** -- bounded, not solved. `first` had no ceiling at
 *    all; it is capped at `MAX_RESULTS` below. The default of 200 is unchanged, and 200
 *    rows is still a large response.
 * 2. **Different filter values** -- partly. The `start | end` range form is documented on
 *    `value` instead of only inside a thrown error. The typing below still covers `_dt`
 *    and `_tdt` only; see the open items.
 * 3. **No total count** -- addressed as far as the API allows. The Content Search API
 *    returns no total, so there is still none, but the search asks for one row more than
 *    the caller wanted and reports `HasMore`, which is the question a caller actually has.
 * 4. **Agents are bad at proceeding long lists** -- addressed. The response is an envelope
 *    (`Skip`, `First`, `Returned`, `HasMore`, `Items`) rather than a bare array, so an
 *    agent can see where it is in the results instead of inferring it from a count.
 *
 * Still open, both found by running this tool against a live CM:
 *
 * - **A range filter on a field that does not exist matches everything.** `Equals`,
 *   `Contains` and `StartsWith` on a misspelled field correctly return nothing, but
 *   `GreaterThan` and `LessThan` returned the entire index -- 500 rows, the cap, formatted
 *   exactly like a successful match. Same trap `common-get-archive-item` guards for a
 *   mistyped `ItemId`. Nothing here tells the caller their field name was wrong.
 * - **Numeric fields are untyped and untested.** Only `_dt`/`_tdt` values are converted;
 *   a `_tl` or `_tf` field reaches `Find-Item` as a quoted string, so `GreaterThan 9` may
 *   compare lexically and exclude 10. Unverified: the index this was tested against holds
 *   no numeric fields at all.
 *
 * The "rails" of a fixed filter list and a documented field-naming convention are what keep
 * the tool usable; the remaining work is typing and validating what a caller sends.
 *
 * **Prefer another surface where one is configured.** This tool is the least portable way
 * to search: it needs SPE remoting, it reports no total, and its field names are raw Solr
 * dynamic-field names the caller has to know. `authoring-search` needs neither SPE nor the
 * Item Service, scopes to a subtree with a `_path` criterion and pages with a real total;
 * for published content a `search` query through `query-graphql-<schema>` is cheaper again.
 * What keeps this tool worth registering is the case neither covers -- reaching a named
 * index directly, including a custom one. The steer is repeated in the tool's own
 * description, because that is the only place a model reads it at the point of choice.
 */

const filterValues = [
    "Equals",
    "StartsWith",
    "Contains",
    "ContainsAny",
    "ContainsAll",
    "EndsWith",
    "DescendantOf",
    "Fuzzy",
    "InclusiveRange",
    "ExclusiveRange",
    "MatchesRegex",
    "MatchesWildcard",
    "LessThan",
    "GreaterThan"
];

// `field` used to be a z.enum built at startup from every field name in the Solr index,
// fetched over PowerShell when the server booted. On a real project that enum ran to
// thousands of entries and loading this one schema cost roughly 15,000 tokens on every
// turn, whether the tool was called or not, and it grew with the index. The naming
// convention below is what an agent actually needs; an agent that needs the exhaustive
// list can ask for it with run-powershell-script, and every other agent no longer pays
// for it.
const FIELD_DESCRIPTION =
    "Index field name as it appears on the SearchResultItem. Sitecore's built-in fields "
    + "have no suffix: _name, _displayname, _fullpath, _path, _template, _templatename, "
    + "_templates, _language, _latestversion, _group, _uniqueid, _parent, _datasource, "
    + "_content, _database, _indexname, _creator, _isclone, _haslayout_b. Content fields "
    + "are lower-cased, spaces replaced with underscores, and carry a Solr dynamic-field "
    + "type suffix: _t (text), _s (string), _sm (multi-value string), _b (boolean), "
    + "_tl (long), _tf (float), _tdt / _dt (datetime) — for example 'title_t'. Versioned "
    + "fields additionally carry the language, e.g. 'title_t_en'. To list the exact fields "
    + "in an index, call run-powershell-script with a Solr schema query against that index.";

/**
 * The `start | end` form is the only way to express a range in one criterion, and it used
 * to be discoverable only by getting it wrong: the schema said "The value to search for."
 * and the pipe was named nowhere but the thrown error. An agent that does not know it
 * reaches for GreaterThan plus LessThan on the same field instead, which is the one shape
 * `Select-Object` cannot project (see the dedupe below) -- so the undocumented format fed
 * directly into the worse bug.
 */
const VALUE_DESCRIPTION =
    "The value to search for. For InclusiveRange and ExclusiveRange, give both bounds in one "
    + "string separated by a pipe: 'start | end'. Date values are ISO 8601, e.g. "
    + "'2023-10-01T00:00:00Z', and a date range is '2023-01-01T00:00:00Z | 2023-12-31T23:59:59Z'.";

/**
 * A ceiling on `first`, which had none: the tool's own header comment opens with "Huge
 * amount of data to return" as problem #1, and nothing stopped `first: 100000`. A row is
 * five identity columns plus one per criterion, so a few hundred characters; 500 rows is
 * already six figures of characters, and past that a caller wants `skip`, not a bigger
 * page.
 */
const MAX_RESULTS = 500;

const iso8601DateRegex = /^([+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24:?00)([.,]\d+(?!:))?)?(\17[0-5]\d([.,]\d+)?)?([zZ]|([+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;

export async function findItemPowerShellTool(server: McpServer, config: Config) {
    const client = new PowershellClient(
        config.powershell.serverUrl,
        config.powershell.username,
        config.powershell.password,
        config.powershell.domain,
        { site: config.powershell.siteContext, database: config.powershell.contextDatabase }
    );

    //https://doc.sitecorepowershell.com/appendix/indexing/find-item
    server.registerTool(
        "indexing-find-item",
        {
            description:
                "Finds items through the Sitecore Content Search API over SPE. Prefer "
                + "authoring-search where it is available: it needs no SPE, scopes to a subtree "
                + "with a '_path' criterion, and pages with a real total. For published content, "
                + "a search query through query-graphql-<schema> is also cheaper than this. Reach "
                + "for this tool when neither is configured, or when you need an index this "
                + "server's other surfaces cannot address by name. Dates are ISO 8601 "
                + "(e.g. '2023-10-01T00:00:00Z'). Returns Skip, First, Returned, HasMore and "
                + "Items; HasMore is how you know to page, since Content Search reports no total.",
            inputSchema: z.object({
                index: z.string().optional()
                    .default("sitecore_master_index").describe("The name of the Sitecore index to search in. e.g., 'sitecore_master_index', 'sitecore_web_index'."),
                //array of objects
                criteria: z.array(
                    z.object({
                        filter: z.enum(filterValues).describe("The type of filter to apply to the search criteria."),
                        field: z.string().describe(FIELD_DESCRIPTION),
                        value: z.string().describe(VALUE_DESCRIPTION),

                    })
                    // An empty array reaches Find-Item as `-Criteria @()`, which is not a
                    // search for everything: it is a call the cmdlet cannot interpret.
                ).min(1, "Supply at least one search criterion."),
                first: z.number().int().positive().max(MAX_RESULTS).optional().default(200)
                    .describe(`The maximum number of results to return. Defaults to 200, and cannot exceed ${MAX_RESULTS} — page with 'skip' instead.`),
                skip: z.number().int().nonnegative().optional().default(0).describe("The number of results to skip. Defaults to 0."),
            }),
        },
        async (params) => {

            const criteria = params?.criteria?.map((c: any) => {
                // Depending on the field type and filter type, the criteria format may vary.
                // Implemented only for DateTime fields and some common filters.
                // Other fields should be implmented as needed.
                if (c.field.endsWith("_dt")
                    || c.field.endsWith("_tdt")) {
                    if (c.filter === "InclusiveRange"
                        || c.filter === "ExclusiveRange") {
                        if (c.value.indexOf("|") === -1) {
                            throw new Error(`Invalid date range format for field ${c.field}. Expected format is 'start_date | end_date'.`);
                        }
                        const [startDate, endDate] = c.value.split("|").map((date: string) => date.trim());
                        if (!startDate || !endDate) {
                            throw new Error(`Invalid date range format for field ${c.field}. Expected format is 'start_date | end_date'.`);
                        }
                        if (!iso8601DateRegex.test(startDate) || !iso8601DateRegex.test(endDate)) {
                            throw new Error(`Invalid date format for field ${c.field}. Expected format is ISO 8601 (e.g., '2023-10-01T00:00:00Z'). 'start_date | end_date'`);
                        }
                        return `@{ Filter = "${c.filter}"; Field = ${quotePowerShellString(c.field)}; Value = [datetime[]]@([datetime]"${startDate}", [datetime]"${endDate}"); }`;
                    }
                    if (!iso8601DateRegex.test(c.value)) {
                        throw new Error(`Invalid date format for field ${c.field}. Expected format is ISO 8601 (e.g., '2023-10-01T00:00:00Z').`);
                    }
                    return `@{ Filter = "${c.filter}"; Field = ${quotePowerShellString(c.field)}; Value = [datetime]"${c.value}"; }`;
                }

                return `@{ Filter = "${c.filter}"; Field = ${quotePowerShellString(c.field)}; Value = ${quotePowerShellString(c.value)}; }`;
            }).join(", ");

            // One projected column per *distinct* criterion field. Two criteria on the same
            // field -- `GreaterThan` and `LessThan` on one `_tdt`, the ordinary way to write a
            // range -- used to emit that field twice, and `Select-Object` refuses a duplicate
            // property name: "The property cannot be processed because the property X already
            // exists." That is a non-terminating error raised once per result row, written to
            // the error stream, which SPE serializes into the same object graph as the
            // results; `findErrorRecord` below then saw it and the whole search came back as
            // a failure with every hit discarded. The match is case-insensitive because
            // PowerShell property names are, and the five fixed columns are seeded into the
            // set for the same reason.
            const projected = new Set(["name", "path", "itemid", "templateid", "templatename"]);
            let extraFields = "";
            params.criteria.forEach((c: any) => {
                const key = String(c.field).toLowerCase();
                if (projected.has(key)) {
                    return;
                }
                projected.add(key);
                extraFields += `, @{n=${quotePowerShellString(c.field)}; e={$_.Fields[${quotePowerShellString(c.field)}]}}`;
            });

            // One row more than asked for, so `HasMore` can be answered without a second
            // query. `Find-Item` cannot report a total -- it wraps the Content Search API,
            // which does not return one -- but "is there another page" is the question an
            // agent actually needs, and it costs one extra row rather than a round trip.
            const probe = params.first + 1;

            const projection =
                `Select-Object @{n="Name"; e={$_.Name}}, @{n="Path"; e={$_.Path}}, `
                + `@{n="ItemId"; e={$_.ItemId.ToString()}}, @{n="TemplateId"; e={$_.TemplateId.ToString()}}, `
                + `@{n="TemplateName"; e={$_.TemplateName}}${extraFields}`;

            // `Items` is wrapped in @() on both sides: a one-result search would otherwise
            // serialize as a bare object rather than a list, and the caller would have to
            // branch on how many results it got before it could read any of them.
            const command = `
                $results = @(Find-Item -Index ${quotePowerShellString(params.index)} -Criteria @(${criteria}) -First ${probe} -Skip ${params.skip} | ${projection});
                $page = @($results | Select-Object -First ${params.first});
                [PSCustomObject]@{
                    Skip = ${params.skip};
                    First = ${params.first};
                    Returned = $page.Count;
                    HasMore = ($results.Count -gt ${params.first});
                    Items = $page;
                };
            `.replaceAll(/\s*\n\s*/g, " ");

            return safeMcpResponse((async () => {
                const result = await client.executeScriptJson(command, {});

                let parsed: any;
                try {
                    parsed = JSON.parse(result);
                } catch (error) {
                    return {
                        isError: true,
                        content: [{
                            type: "text" as const,
                            text:
                                `The Sitecore PowerShell service did not return JSON for the search `
                                + `(${error instanceof Error ? error.message : String(error)}). The `
                                + `response began: ${result.slice(0, 500)}`,
                        }],
                    };
                }

                // Find-Item failures used to be returned as a successful result carrying the
                // full serialized .NET ErrorRecord — 17,000-odd characters, and isError
                // unset, so the agent read a failed search as an empty one. Shape it the
                // same way every other PowerShell tool does.
                const errorRecord = findErrorRecord(parsed);
                if (errorRecord) {
                    return {
                        isError: true,
                        content: [{
                            type: "text" as const,
                            text: wantsFullErrors(undefined)
                                ? result
                                : formatPowershellError(errorRecord),
                        }],
                    };
                }

                // The script emits exactly one object; CLIXML delivers it as a one-element
                // `Obj` list. An empty `Items` can come back absent rather than as an empty
                // list, so it is normalised here -- an agent that has to tell "no results"
                // apart from "field missing" is being asked to do the tool's job.
                const envelope = Array.isArray(parsed?.Obj) ? parsed.Obj[0] : parsed?.Obj;
                if (!envelope || typeof envelope !== "object") {
                    return {
                        content: [{
                            type: "text" as const,
                            text: `The search returned nothing this server could read. The response was: ${result.slice(0, 500)}`,
                        }],
                        isError: true,
                    };
                }

                const items = Array.isArray(envelope.Items)
                    ? envelope.Items
                    : envelope.Items
                        ? [envelope.Items]
                        : [];

                return {
                    content: [{
                        type: "text" as const,
                        text: JSON.stringify({
                            Skip: envelope.Skip ?? params.skip,
                            First: envelope.First ?? params.first,
                            Returned: items.length,
                            HasMore: envelope.HasMore === true,
                            Items: items,
                        }, null, 2),
                    }]
                };
            })());

        }
    );
}
