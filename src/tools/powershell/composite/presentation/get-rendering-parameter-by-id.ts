import type { ToolServer } from "@/tool-server.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../../simple/generic.js";
import { PowershellCommandBuilder } from "../../command-builder.js";
import { getSwitchParameterValue } from "../../utils.js";

export function getRenderingParameterByIdPowershellTool(server: ToolServer, config: Config) {
    server.tool(
        "presentation-get-rendering-parameter-by-id",
        "Gets rendering parameter for the item specified by ID.",
        {
            itemId: z.string().describe("The ID of the item holding the rendering."),
            renderingUniqueId: z.string().describe("The unique ID of the rendering holding the rendering parameter."),
            database: z.string().describe("The context database.").optional().default("master"),
            name: z.string().describe("The name of the rendering parameter to get.").optional(),
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

            const getRenderingParameterParameters: Record<string, any> = {};
            getRenderingParameterParameters["Name"] = params.name;

            const command = `
                $rendering = Get-Rendering ${commandBuilder.buildParametersString(getRenderingParameters)};
                Get-RenderingParameter -Instance $rendering ${commandBuilder.buildParametersString(getRenderingParameterParameters)};
            `;

            return safeMcpResponse(runGenericPowershellCommand(config, command, {}));
        }
    );
}
