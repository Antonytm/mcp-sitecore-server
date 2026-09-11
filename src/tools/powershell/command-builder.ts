/**
 * Wraps a value as a single-quoted PowerShell string literal.
 *
 * PowerShell single-quoted strings are fully literal: `$`, backtick and `"`
 * carry no special meaning inside them, so the only character that must be
 * escaped is the single quote itself, which is escaped by doubling it.
 * This is the safe way to interpolate untrusted values (item paths, names,
 * field values, etc.) into a command string without allowing injection.
 */
export function quotePowerShellString(value: unknown): string {
    return `'${String(value).replace(/'/g, "''")}'`;
}

/** The site and content database a script runs under. Empty `site` means "do not switch". */
export type ScriptContext = {
    site?: string;
    database?: string;
};

export const DEFAULT_SCRIPT_CONTEXT: Required<ScriptContext> = { site: "shell", database: "master" };

/**
 * Wraps a script so it runs in a named site context, with `Context.Database` pinned.
 *
 * Why this exists: Sitecore applies a template's `__Default workflow` at create time — from a
 * bare template or a branch alike — only when `Context.Site.EnableWorkflow` is true. The
 * Content Editor, Pages and the SPE ISE all run in `shell`, where it is. The remoting endpoint
 * this server calls resolves its site from the request host like any other request, which on
 * a CM serving several sites is whichever content site claims the hostname (measured
 * 2026-09-11: `Lifeline`, `EnableWorkflow=False`). A script that created pages there left every
 * one of them outside its workflow, silently, and nothing downstream noticed for a week.
 *
 * `sc_site=shell` on the query string is not an alternative: the shell site demands an
 * interactive login, so the request is redirected before SPE's basic-auth handler runs.
 *
 * Switching to `shell` alone also flips `Context.Database` to `core` (the shell site's own
 * database), so the content database is pinned too, which is the shape the ISE presents.
 *
 * A `try` block opens no new scope in PowerShell, so the caller's variables, output stream and
 * `return` behave exactly as they did unwrapped. Both names are emitted as single-quoted
 * literals, so a value from configuration cannot break out of the string.
 */
export function wrapInScriptContext(script: string, context: ScriptContext = DEFAULT_SCRIPT_CONTEXT): string {
    const site = (context.site ?? "").trim();
    if (site === "") {
        return script;
    }
    const database = (context.database ?? "").trim();
    const siteLiteral = quotePowerShellString(site);
    const lines = [
        `$__mcpSite = [Sitecore.Configuration.Factory]::GetSite(${siteLiteral})`,
        `if ($null -eq $__mcpSite) { throw ("POWERSHELL_SITE_CONTEXT names no configured site: " + ${siteLiteral}) }`,
        `$__mcpSiteSwitcher = New-Object Sitecore.Sites.SiteContextSwitcher($__mcpSite)`,
    ];
    if (database !== "") {
        lines.push(
            `$__mcpDbSwitcher = New-Object Sitecore.Data.DatabaseSwitcher([Sitecore.Configuration.Factory]::GetDatabase(${quotePowerShellString(database)}))`
        );
    }
    lines.push("try {", script, "} finally {");
    if (database !== "") {
        lines.push("    $__mcpDbSwitcher.Dispose()");
    }
    lines.push("    $__mcpSiteSwitcher.Dispose()", "}");
    return lines.join("\r\n");
}

export class PowershellCommandBuilder
{
    buildCommandString(script: string, parameters: Record<string, any> = {}): string {
        return `${script}${this.buildParametersString(parameters)}`;
    }

    buildParametersString(parameters: Record<string, any> = {}): string {
        let parametersString = '';
        if (parameters) {
            for (const parameter in parameters) {
                if (parameters[parameter] === undefined || parameters[parameter] === null)
                {
                    continue;
                }

                if (parameters[parameter] === "") {
                    parametersString += ` -${parameter}`;
                }
                else if (Array.isArray(parameters[parameter])) {
                    const items = parameters[parameter]
                        .map((item: unknown) => quotePowerShellString(item))
                        .join(",");
                    parametersString += ` -${parameter} ${items}`;
                }
                else if (this.isRecord(parameters[parameter])) {
                    // Check whether the record has any keys
                    if(Object.getOwnPropertyNames(parameters[parameter]).length > 0)
                    {
                        parametersString += ` -${parameter} ${this.buildPowershellHashtableString(parameters[parameter])}`;
                    }
                }
                else {
                    parametersString += ` -${parameter} ${quotePowerShellString(parameters[parameter])}`;
                }
            }
        }

        return parametersString;
    }

    private buildPowershellHashtableString(parameters: Record<string, any>): string {
        let result = "@{ ";
        let first = true;
        for (const parameter in parameters) {
            if (!first)
            {
                result += "; ";
            }

            result += `${quotePowerShellString(parameter)} = ${quotePowerShellString(parameters[parameter])}`;
            first = false;
        }

        result += " }";

        return result;
    }

    private isRecord(value: any): boolean {
        if (!value)
        {
            return false;
        }

        if (typeof value !== "object")
        {
            return false;
        }

        if (Array.isArray(value))
        {
            return false;
        }

        if (Object.getOwnPropertySymbols(value).length > 0)
        {
            return false;
        }

        return Object.getOwnPropertyNames(value).every(prop => typeof value[prop] === "string")
    }
}
