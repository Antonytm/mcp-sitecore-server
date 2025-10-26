import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import type { Config } from "@/config.js";
import { PowershellClient } from "../client.js";
import { PowerShellOutputType } from "../output.js";

export async function runGenericPowershellCommand(config: Config, command: string, options: Record<string, any>, outputFormat?: PowerShellOutputType): Promise<CallToolResult> {
    const client = new PowershellClient(
        config.powershell.serverUrl,
        config.powershell.username,
        config.powershell.password,
        config.powershell.domain
    );

    let text = ""
    let isError = false;
    switch (outputFormat) {
        case PowerShellOutputType.JSON:
            text = await client.executeScriptJson(command, options);
            const json1 = JSON.parse(text);
            isError = json1?.Obj?.[0]?.ErrorCategory_Message !== undefined;
            break;
        case PowerShellOutputType.XML:
            text = await client.executeScript(command, options);
            isError = text.includes("Error");
            break;
        default:
            text = await client.executeScriptJson(command, options);
            const json2 = JSON.parse(text);
            isError = json2?.Obj?.[0]?.ErrorCategory_Message !== undefined;
            break;
    }

    return {
        content: [
            {
                type: "text",
                text: text,
            },
        ],
        isError: isError,
    }

}