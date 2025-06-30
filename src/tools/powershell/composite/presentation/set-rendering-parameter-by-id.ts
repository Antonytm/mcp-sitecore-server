import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../../simple/generic.js";
import { PowershellCommandBuilder } from "../../command-builder.js";
import { getSwitchParameterValue } from "../../utils.js";

export function setRenderingParameterByIdPowershellTool(server: McpServer, config: Config) {
    server.tool(
        "presentation-set-rendering-parameter-by-id",
        "Adds and updates the specified rendering parameter from the rendering placed on the item specified by ID.",
        {
            itemId: z.string().describe("The ID of the item holding the rendering."),
            renderingUniqueId: z.string().describe("The unique ID of the rendering holding the rendering parameter."),
            parameter: z.record(z.string(), z.string()).describe("The rendering parameter to add or update."),
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

            const setRenderingParameterParameters: Record<string, any> = {};
            setRenderingParameterParameters["Parameter"] = params.parameter;

            const setRenderingParameters: Record<string, any> = {};
            setRenderingParameters["Id"] = params.itemId;
            setRenderingParameters["Database"] = params.database;
            setRenderingParameters["FinalLayout"] = getSwitchParameterValue(params.finalLayout);
            setRenderingParameters["Language"] = params.language;
            
            const command = `
                $rendering = Get-Rendering ${commandBuilder.buildParametersString(getRenderingParameters)};
                Set-RenderingParameter -Instance $rendering ${commandBuilder.buildParametersString(setRenderingParameterParameters)} |
                    Set-Rendering ${commandBuilder.buildParametersString(setRenderingParameters)}
            `;

            return safeMcpResponse(runGenericPowershellCommand(config, command, {}));
        }
    );
}
