import type { CallToolResult } from "@modelcontextprotocol/server";
import type { Config } from "@/config.js";
import { PowershellClient } from "../client.js";
import { PowershellCommandBuilder } from "../command-builder.js";
import {
    findErrorRecord,
    formatPowershellError,
    wantsFullErrors,
    xmlLooksLikeError,
} from "../error-shaping.js";
import { PowerShellOutputType } from "../output.js";

/**
 * Response-shaping options for a single command run.
 */
export type PowershellShaping = {
    /**
     * A pipeline fragment (leading pipe included) appended to the command *after* its
     * parameters — normally a `Select-Object` projection from `projection.ts`. When set,
     * the parameters are rendered into the command string here rather than by the client,
     * because the projection has to come last.
     */
    pipeline?: string;
    /**
     * When true, return the raw serialized output unshaped — the full object graph on
     * success and the full .NET error record on failure. Callers pass the tool's own
     * `full` parameter through so one flag governs both.
     */
    full?: boolean;
};

export async function runGenericPowershellCommand(
    config: Config,
    command: string,
    options: Record<string, any>,
    outputFormat?: PowerShellOutputType,
    shaping?: PowershellShaping
): Promise<CallToolResult> {
    const client = new PowershellClient(
        config.powershell.serverUrl,
        config.powershell.username,
        config.powershell.password,
        config.powershell.domain,
        { site: config.powershell.siteContext, database: config.powershell.contextDatabase }
    );

    // A projection must be the last stage of the pipeline, so when one is supplied the
    // parameters are baked into the command string up front and the client is handed an
    // already-complete script. `buildCommandString` is exactly what the client would have
    // done with the parameters otherwise.
    let script = command;
    let scriptOptions = options;
    if (shaping?.pipeline) {
        script = new PowershellCommandBuilder().buildCommandString(command, options) + shaping.pipeline;
        scriptOptions = {};
    }

    const fullErrors = wantsFullErrors(shaping?.full);

    if (outputFormat === PowerShellOutputType.XML) {
        // No caller uses raw XML today. There is no parsed object to shape, so the record
        // is returned as-is; the detection is at least no longer "the text says Error".
        const text = await client.executeScript(script, scriptOptions);
        return { content: [{ type: "text", text }], isError: xmlLooksLikeError(text) };
    }

    const text = await client.executeScriptJson(script, scriptOptions);

    // A CM that answers with an HTML error page, or with nothing at all, is not a parse
    // bug on our side. Reporting it as one ("Unexpected token <") in the very function
    // that owns error presentation would hide what actually happened.
    let parsed: any;
    try {
        parsed = JSON.parse(text);
    } catch (error) {
        return {
            content: [
                {
                    type: "text",
                    text:
                        `The Sitecore PowerShell service did not return JSON `
                        + `(${error instanceof Error ? error.message : String(error)}). This is `
                        + `usually the CM answering with an error page rather than a script `
                        + `result: check that ${config.powershell.serverUrl} is reachable, that `
                        + `the remoting service is enabled, and that the credentials are valid. `
                        + `The response began: ${text.slice(0, 500)}`,
                },
            ],
            isError: true,
        };
    }

    const errorRecord = findErrorRecord(parsed);

    return {
        content: [
            {
                type: "text",
                text: errorRecord && !fullErrors ? formatPowershellError(errorRecord) : text,
            },
        ],
        isError: errorRecord !== undefined,
    };
}
