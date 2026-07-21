import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../../simple/generic.js";
import { quotePowerShellString } from "../../command-builder.js";

export function setLayoutByPathPowershellTool(server: McpServer, config: Config) {
    server.tool(
        "presentation-set-layout-by-path",
        "Sets layout for an item specified by path.",
        {
            itemPath: z.string().describe("The Path of the item to set the layout for.").default("master:"),
            layoutPath: z.string().describe("The path of the layout.").default("master:"),
            language: z.string().describe("The language of the item to set layout for.").optional(),
            finalLayout: z
                .boolean()
                .describe("Specifies layout to be updated. If 'true', the final layout is set, otherwise - shared layout.")
                .optional(),
        },
        async (params) => {
            const command = `
                $layout = Get-Item -Path ${quotePowerShellString(params.layoutPath)};
                $device = Get-LayoutDevice -Default;
                Set-Layout -Path ${quotePowerShellString(params.itemPath)} -Layout $layout -Device $device ${params.language ? `-Language ${quotePowerShellString(params.language)}` : ""}
                    ${params.finalLayout ? "-FinalLayout" : ""};
            `.replaceAll(/[\n]+/g, "");

            return safeMcpResponse(runGenericPowershellCommand(config, command, {}));
        }
    );
}