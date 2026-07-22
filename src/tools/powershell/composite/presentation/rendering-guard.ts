import { quotePowerShellString } from "../../command-builder.js";

/**
 * Builds a PowerShell guard that throws a clear, agent-friendly error when a
 * `Get-Rendering` lookup yields no match.
 *
 * Rationale (issue #62): when `Get-Rendering` finds nothing it returns `$null`
 * (or, when piped through `Where-Object`, an empty collection). The downstream
 * `-Instance $rendering` cmdlets then either fail with the opaque
 * "Cannot bind argument to parameter 'Instance' because it is null." or — in the
 * `Switch-Rendering` `foreach` — silently do nothing. Either way the agent gets no
 * actionable feedback.
 *
 * The guard reports the failure with `Write-Error` (not `throw`) and then `return`s.
 * This matters for the SPE remoting transport: a `throw` produces an HTTP 500 whose
 * body — including our message — is discarded by the client, whereas `Write-Error`
 * comes back as a normal 200 response carrying an `ErrorRecord`, which
 * `runGenericPowershellCommand` detects (via `ErrorCategory_Message`) and surfaces to
 * the agent as an error result. The `return` stops the script before the cmdlet that
 * would otherwise emit the opaque binding error.
 *
 * The message is composed in TypeScript from the already-known parameter values and
 * embedded as a single escaped PowerShell string literal, so it is injection-safe.
 *
 * @param variable   PowerShell variable holding the lookup result (e.g. `"$rendering"`).
 * @param message    Human-readable error message.
 * @param collection When true, fail if the variable is an empty collection rather than
 *                   `$null` (used by the switch tools that pipe through `Where-Object`).
 */
export function renderingLookupGuard(
    variable: string,
    message: string,
    { collection = false }: { collection?: boolean } = {}
): string {
    const condition = collection
        ? `(@(${variable}).Count -eq 0)`
        : `($null -eq ${variable})`;
    return `if ${condition} { Write-Error ${quotePowerShellString(message)}; return; }`;
}

/**
 * Produces a consistent "no rendering found" message shared across the presentation
 * tools. `lookup` describes what was searched for (e.g. "a rendering with unique ID
 * '{…}' on the item with ID '{…}' in database 'master'"); `listTool` is the tool the
 * agent can call to enumerate the renderings actually present on the item.
 */
export function renderingNotFoundMessage(lookup: string, listTool: string): string {
    return `No matching rendering was found: Get-Rendering returned nothing for ${lookup}. `
        + `Verify the item and rendering identifiers are correct (use ${listTool} to list the `
        + `renderings on the item), that the language is correct, and that you are targeting the `
        + `right layout (shared vs final).`;
}
