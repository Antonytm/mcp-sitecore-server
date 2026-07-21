import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../../simple/generic.js";
import { quotePowerShellString } from "../../command-builder.js";

export function setLayoutIdPowershellTool(server: McpServer, config: Config) {
    server.tool(
        "presentation-set-layout-by-id",
        "Sets layout for an item specified by Id.",
        {
            itemId: z.string().describe("The Id of the item to set the layout for."),
            layoutPath: z.string().describe("The path of the layout.").default("master:"),
            layoutId: z.string().describe("The ID of the layout to set for the item."),
            language: z.string().describe("The language of the item to set layout for.").optional(),
            finalLayout: z
                .boolean()
                .describe("Specifies layout to be updated. If 'true', the final layout is set, otherwise - shared layout.")
                .optional(),
        },
        async (params) => {
            const command = `
                $layout = Get-Item -Path ${quotePowerShellString(params.layoutPath)} -Id ${quotePowerShellString(params.layoutId)};
                $device = Get-LayoutDevice -Default;
                Set-Layout -Id ${quotePowerShellString(params.itemId)} -Layout $layout -Device $device ${params.language ? `-Language ${quotePowerShellString(params.language)}` : ""}
                    ${params.finalLayout ? "-FinalLayout" : ""};
            `.replaceAll(/[\n]+/g, "");

            return safeMcpResponse(runGenericPowershellCommand(config, command, {}));
        });
}