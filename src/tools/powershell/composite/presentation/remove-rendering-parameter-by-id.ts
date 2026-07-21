import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../../simple/generic.js";
import { PowershellCommandBuilder } from "../../command-builder.js";
import { getSwitchParameterValue } from "../../utils.js";

export function removeRenderingParameterByIdPowershellTool(server: McpServer, config: Config) {
    server.tool(
        "presentation-remove-rendering-parameter-by-id",
        "Removes the specified rendering parameter from the rendering placed on the item specified by ID.",
        {
            itemId: z.string().describe("The ID of the item holding the rendering."),
            renderingUniqueId: z.string().describe("The unique ID of the rendering holding the rendering parameter."),
            name: z.string().describe("The name of the rendering parameter to remove.").optional(),
            database: z.string().describe("The context database.").optional().default("master"),
            finalLayout: z
                .boolean()
                .describe("Specifies layout holding the rendering parameter. If 'true', the final layout is used, otherwise - shared layout.")
                .optional(),
            language: z.string().describe("The item language varsion.").optional(),
        },
        async (params) => {
            const commandBuilder = new PowershellCommandBuilder();

            const getRenderingParameters: Record<string, any> = {};
            getRenderingParameters["Id"] = params.itemId;
            getRenderingParameters["Database"] = params.database;
            getRenderingParameters["UniqueId"] = params.renderingUniqueId;
            getRenderingParameters["FinalLayout"] = getSwitchParameterValue(params.finalLayout);
            getRenderingParameters["Language"] = params.language;

            const removeRenderingParameterParameters: Record<string, any> = {};
            removeRenderingParameterParameters["Name"] = params.name;

            const setRenderingParameters: Record<string, any> = {};
            setRenderingParameters["Id"] = params.itemId;
            setRenderingParameters["Database"] = params.database;
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
