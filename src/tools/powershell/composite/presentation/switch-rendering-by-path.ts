import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../../simple/generic.js";
import { PowershellCommandBuilder } from "../../command-builder.js";
import { PowershellVariable } from "../../variable.js";
import { getSwitchParameterValue } from "../../utils.js";

export function switchRenderingByPathPowershellTool(server: McpServer, config: Config) {
    server.tool(
        "presentation-switch-rendering-by-path",
        "Switches an existing rendering with an alternate one for the item specified by path.",
        {
            itemPath: z.string().describe("The path of the item holding the renderings."),
            oldRenderingPath: z.string().describe("The path of the rendering to switch."),
            newRenderingPath: z.string().describe("The path of the new rendering."),
            finalLayout: z
                .boolean()
                .describe("Specifies the layout to update the rendering. If 'true', the final layout is used, otherwise - shared layout.")
                .optional(),
            language: z.string().describe("The language version of the item holding the renderings.").optional(),
        },
        async (params) => {
            const commandBuilder = new PowershellCommandBuilder();

            const getRenderingParameters: Record<string, any> = {};
            getRenderingParameters["Path"] = params.itemPath;
            getRenderingParameters["Language"] = params.language;
            getRenderingParameters["FinalLayout"] = getSwitchParameterValue(params.finalLayout);

            const newRenderingParameters: Record<string, any> = {};
            newRenderingParameters["Path"] = params.newRenderingPath;

            const switchRenderingParameters: Record<string, any> = {};
            switchRenderingParameters["Path"] = params.itemPath;
            switchRenderingParameters["Instance"] = new PowershellVariable("sourceRendering");
            switchRenderingParameters["NewRendering"] = new PowershellVariable("targetRendering");
            switchRenderingParameters["Language"] = params.language;
            switchRenderingParameters["FinalLayout"] = getSwitchParameterValue(params.finalLayout);

            const command = `
                $oldRendering = Get-Item -Path "${params.oldRenderingPath}"
                $sourceRenderings = ${commandBuilder.buildCommandString('Get-Rendering', getRenderingParameters)} | Where-Object { $_.ItemID -ceq $oldRendering.ID.ToString() };
                $targetRendering = ${commandBuilder.buildCommandString('New-Rendering', newRenderingParameters)}
                foreach($sourceRendering in $sourceRenderings) {
                    ${commandBuilder.buildCommandString('Switch-Rendering', switchRenderingParameters)}
                }  
            `;

            return safeMcpResponse(runGenericPowershellCommand(config, command, {}));
        }
    )
}