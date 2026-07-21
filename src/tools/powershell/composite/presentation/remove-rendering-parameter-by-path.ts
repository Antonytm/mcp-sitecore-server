import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../../simple/generic.js";
import { PowershellCommandBuilder } from "../../command-builder.js";
import { getSwitchParameterValue } from "../../utils.js";

export function removeRenderingParameterByPathPowershellTool(server: McpServer, config: Config) {
    server.registerTool(
        "presentation-remove-rendering-parameter-by-path",
        {
            description: "Removes the specified rendering parameter from the rendering placed on the item specified by path.",
            inputSchema: {
                itemPath: z.string().describe("The path of the item holding the rendering."),
                renderingUniqueId: z.string().describe("The unique ID of the rendering holding the rendering parameter."),
                name: z.string().describe("The name of the rendering parameter to remove.").optional(),
                finalLayout: z
                    .boolean()
                    .describe("Specifies layout holding the rendering parameter. If 'true', the final layout is used, otherwise - shared layout.")
                    .optional(),
                language: z.string().describe("The item language varsion.").optional(),
            },
        },
        async (params) => {
            const commandBuilder = new PowershellCommandBuilder();

            const getRenderingParameters: Record<string, any> = {};
            getRenderingParameters["Path"] = params.itemPath;
            getRenderingParameters["UniqueId"] = params.renderingUniqueId;
            getRenderingParameters["FinalLayout"] = getSwitchParameterValue(params.finalLayout);
            getRenderingParameters["Language"] = params.language;

            const removeRenderingParameterParameters: Record<string, any> = {};
            removeRenderingParameterParameters["Name"] = params.name;

            const setRenderingParameters: Record<string, any> = {};
            setRenderingParameters["Path"] = params.itemPath;
            setRenderingParameters["FinalLayout"] = getSwitchParameterValue(params.finalLayout);
            setRenderingParameters["Language"] = params.language;

            const command = `
                $rendering = Get-Rendering ${commandBuilder.buildParametersString(getRenderingParameters)};
                Remove-RenderingParameter -Instance $rendering ${commandBuilder.buildParametersString(removeRenderingParameterParameters)} |
                    Set-Rendering ${commandBuilder.buildParametersString(setRenderingParameters)};
            `;

            return safeMcpResponse(runGenericPowershellCommand(config, command, {}));
        }
    );
}
