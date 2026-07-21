import type { ToolServer } from "@/tool-server.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../../simple/generic.js";
import { PowershellCommandBuilder, quotePowerShellString } from "../../command-builder.js";
import { getSwitchParameterValue } from "../../utils.js";

export function switchRenderingByPathPowershellTool(server: ToolServer, config: Config) {
    server.tool(
        "presentation-switch-rendering-by-path",
        "Switches an existing rendering specified by path with an alternate one for the item specified by path.",
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
            switchRenderingParameters["Language"] = params.language;
            switchRenderingParameters["FinalLayout"] = getSwitchParameterValue(params.finalLayout);

            const command = `
                $oldRendering = Get-Item -Path ${quotePowerShellString(params.oldRenderingPath)}
                $sourceRenderings = Get-Rendering ${commandBuilder.buildParametersString(getRenderingParameters)} | Where-Object { $_.ItemID -ceq $oldRendering.ID.ToString() };
                $targetRendering = New-Rendering ${commandBuilder.buildParametersString(newRenderingParameters)}
                foreach($sourceRendering in $sourceRenderings) {
                    Switch-Rendering -Instance $sourceRendering  -NewRendering $targetRendering ${commandBuilder.buildParametersString(switchRenderingParameters)}
                }  
            `;

            return safeMcpResponse(runGenericPowershellCommand(config, command, {}));
        }
    )
}