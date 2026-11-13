# Comparison with the Sitecore Developer MCP

Sitecore runs a hosted **Developer MCP** for SitecoreAI alongside its Marketer MCP. It offers
13 tools for content modelling: sites, content types (templates), content items and
components (JSON renderings). Every one of them has an equivalent here, built from one or more
of this server's tools.

**The Developer MCP is still in beta.** Its tool set, behaviour and output can change without
notice, and the defects noted below are the kind a beta is expected to have. Everything on
this page is a snapshot, not a verdict — re-check against the current release before relying
on any of it.

This page compares the two on that shared surface: what each call costs, what it writes, and
where each server fits. It was measured on 12 November 2026 against a SitecoreAI sandbox
environment, with this server at 2.0.5.

## In short

- **Per call, this server was 2–4× faster** on 12 of the 13 actions, and 14× on `list_sites`.
- **The Developer MCP's `create_component` wins end to end.** Its single call took about 12 s.
  The same result here took 7 calls: about 10 s of tool time, but about 30 s of wall-clock time,
  because an agent spends a turn on each call.
- **The two wrote the same items** for every matched write, with two small differences (see
  [Output parity](#output-parity)).
- **The Developer MCP is the narrower, higher-level tool:** fewer calls for common modelling
  tasks, no setup beyond signing in, and only for SitecoreAI. This server covers the whole
  developer surface, runs against XM/XP and local Docker CMs too, and leaves the composing
  to the agent.

## The two servers

|                  | Sitecore Community MCP                                                                     | Sitecore Developer MCP                                                         |
| ---------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| **Hosting**      | Self-hosted, stdio or streamable HTTP                                                      | Hosted by Sitecore at `https://edge-platform.sitecorecloud.io/mcp/developer`   |
| **Auth**         | Your CM's credentials (automation client, Item Service, SPE)                               | OAuth as the signed-in Sitecore Cloud Portal user                              |
| **Platforms**    | SitecoreAI and XM/XP, including a local Docker CM                                          | SitecoreAI only                                                                |
| **Maturity**     | Generally available, 2.0.5 at the time of writing                                          | Beta                                                                           |
| **Tools**        | 121 tools across items, templates, presentation, media, security, indexing and more        | 13 tools for sites, content types, content items and components                |
| **Abstraction**  | Sitecore's own model: items, templates, fields, renderings                                  | Its own model: content types, components, categories, availability             |
| **Backed by**    | Authoring GraphQL, Item Service, SPE and Edge GraphQL                                      | A REST API at `xmapps-api.sitecorecloud.io` (`/api/v1/content-types`, `/components`) |

To add the Developer MCP to Claude Code:

```json
"sitecore-developer-mcp": {
  "type": "http",
  "url": "https://edge-platform.sitecorecloud.io/mcp/developer",
  "auth": { "type": "external" }
}
```

## Tool mapping

| Developer MCP tool                  | Equivalent here                                                                                   | Calls |
| ----------------------------------- | ------------------------------------------------------------------------------------------------- | ----- |
| `list_sites`                        | `authoring-list-sites`                                                                            | 1     |
| `list_content_types`                | `authoring-search` (templates under a path)                                                       | 1     |
| `get_content_type`                  | `authoring-get-item-template`                                                                     | 1     |
| `get_content_type_validation_rules` | `authoring-search` (the validation rule items)                                                    | 1     |
| `list_component_categories`         | `authoring-search` (`_path` under the Renderings root)                                            | 1     |
| `list_component_summaries`          | `list-site-components`                                                                            | 1     |
| `list_components`                   | `list-site-components` + one batched `authoring-graphql` query for the rendering fields           | 2     |
| `get_component`                     | `authoring-get-item`                                                                              | 1     |
| `create_content_type`               | `authoring-create-item-template`                                                                  | 1     |
| `update_content_type`               | `authoring-update-item-template`                                                                  | 1     |
| `create_content_item`               | `authoring-create-item`                                                                           | 1     |
| `create_component`                  | 7 calls, listed under [create_component](#create_component)                                       | 7     |
| `update_component`                  | `authoring-update-item`                                                                           | 1     |

## Method

The comparison is like for like: both servers were connected to the same Claude Code session
and called as MCP tools, one call per message, against the same environment. A call's latency
is the time from the tool call to its result in the session transcript, so both columns carry
the same client overhead (roughly 0.3–1 s per call). The figures are medians.

- **Runs:** 3 per action for most; 2 for `list_component_categories` and `list_components`; 1
  for `list_sites` and `get_content_type_validation_rules`, and for the Developer side of
  `list_component_summaries`. One pair of calls sent in the same message by mistake was dropped.
- **Precision:** transcript timestamps are good to a few hundred milliseconds.
- **Identity:** this server authenticated as an admin automation client; the Developer MCP as
  the signed-in user.
- **Writes:** every write created new, uniquely named items, and the matched sequences wrote
  the same items in the same places. All test items were removed afterwards.

## Results

| Action                              | Developer MCP | This server | Calls here | Developer MCP slower by |
| ----------------------------------- | ------------- | ----------- | ---------- | ----------------------- |
| `list_sites`                        | 4.2 s         | 0.30 s      | 1          | 14×                     |
| `list_content_types`                | 1.7 s         | 0.71 s      | 1          | 2.4×                    |
| `get_content_type`                  | 2.3 s         | 0.69 s      | 1          | 3.4×                    |
| `get_content_type_validation_rules` | 1.7 s         | 0.29 s      | 1          | 5.6×                    |
| `list_component_categories`         | 2.0 s         | 0.95 s      | 1          | 2.1×                    |
| `list_component_summaries`          | 0.87 s        | 0.63 s      | 1          | 1.4×                    |
| `list_components`                   | 2.9 s         | 1.3 s       | 2          | 2.3×                    |
| `get_component`                     | 1.8 s         | 0.66 s      | 1          | 2.7×                    |
| `create_content_type`               | 4.3 s         | 2.1 s       | 1          | 2.1×                    |
| `update_content_type`               | 4.3 s         | 1.2 s       | 1          | 3.7×                    |
| `create_content_item`               | 3.8 s         | 1.5 s       | 1          | 2.6×                    |
| `create_component`                  | 12.0 s        | 10.0 s      | 7          | 1.2× (tool time only)   |
| `update_component`                  | 2.9 s         | 1.1 s       | 1          | 2.7×                    |

Measured directly rather than through a client, this server's reads take 40–220 ms and its
single-item writes 100–800 ms; most of each figure above is client overhead that both columns
share. The Developer MCP's hosted gateway also has a cold start of about 11 s on the first call
of a session.

### `create_component`

The Developer MCP's `create_component` is a composite. For a component in an existing
category, it writes:

1. a rendering-parameters template, `<Name> Rendering Parameters`, with the four standard
   rendering-parameter base templates and an empty Data section
2. a datasource folder template, `<Name> Folder`, whose standard values allow new items of the
   component's content type and of the folder itself (`__Masters`)
3. the JSON rendering, with its datasource template, datasource location and parameters
   template set
4. a `<Name> Folder` instance in the site's Data folder
5. an entry in the site's Available Renderings group named after the category

The matching sequence here, in order:

1. `authoring-create-item-template`: the rendering-parameters template
2. `authoring-create-item-template`: the datasource folder template
3. `authoring-update-item`: the folder template's standard values (`__Masters`)
4. `authoring-create-item`: the JSON rendering
5. `authoring-create-item`: the folder instance in the site's Data folder
6. `authoring-get-item`: the Available Renderings group
7. `authoring-update-item`: the group's `Renderings` field, with the new rendering appended

Those 7 calls took 10 s of tool time but about 30 s from first to last, against 12 s for the
Developer MCP's one call. For an agent, the single call also costs one turn instead of seven.
A component in a **new** category is a bigger job on the Developer MCP's side: it scaffolds a
Feature module of about 13 items (template, branch, layout, media, placeholder-settings and
rendering folders, plus Site Setup items), which this comparison did not try to match.

## Output parity

Read back from Sitecore, the matched writes were the same item for item, field for field,
except for:

- **Base template of the folder template.** `authoring-create-item-template` here left the
  datasource folder template's `__Base template` empty; the Developer MCP sets Standard
  template. Pass the base template explicitly when you create a folder template here.
- **GUID formatting.** The Developer MCP writes some ID fields as unbraced lowercase GUIDs
  (for example `__Masters` and `Parameters Template`). This server writes the value you pass,
  and Sitecore's own editors write braced uppercase. Sitecore reads both.

Two behaviours that looked like differences turned out to be shared:

- **Field sort order.** New template fields get `sortOrder: 0` on both servers. That comes from
  the Authoring API, not from either server. The Developer MCP also returns fields sorted
  alphabetically rather than in the order they were given.
- **Deleting templates.** A template can't be deleted while its `__Standard Values` item
  exists, and for about a minute after the items using it are deleted, the Authoring API
  still reports it as in use. Delete standard values first, and retry the template.

## Where each fits

Use the **Developer MCP** when the job is content modelling on SitecoreAI and you want
composite operations: creating a component with its parameters, datasource folder and
availability in one call, without configuring credentials.

Use **this server** when you need anything beyond that surface (presentation, media,
publishing, security, indexing, logs, raw GraphQL or PowerShell), when you work on XM/XP or a
local CM, when you need per-call speed for bulk work, or when you want writes expressed in
Sitecore's own terms.

Nothing stops a client from connecting both.

## Known issues

During testing we also hit a handful of defects in the Developer MCP, for example renaming a
component also changing its `componentName`, and a partial `update_content_type` clearing the
description. They have been reported to Sitecore. The server is in beta, so these may already
be fixed and other behaviour may have moved — check the Developer MCP's current behaviour
before relying on update operations.
