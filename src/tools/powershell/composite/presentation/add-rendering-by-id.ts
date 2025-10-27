import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../../simple/generic.js";
import { PowershellCommandBuilder } from "../../command-builder.js";
import { getSwitchParameterValue, getNumberParameterValue } from "../../utils.js";

export function addRenderingByIdPowershellTool(server: McpServer, config: Config) {
    server.tool(
        "presentation-add-rendering-by-id",
        "Adds a rendering to presentation of an item specified by item ID.",
        {
            itemId: z.string().describe("The ID of the item to add the rendering to."),
            renderingId: z.string().describe("The ID of the rendering to add."),
            database: z.string().describe("The context database.").optional().default("master"),
            placeHolder: z.string().describe("The placeholder to add the rendering to."),
            dataSource: z.string().describe("The rendering data source.").optional(),
            finalLayout: z
                .boolean()
                .describe("Specifies layout to add the rendering to. If 'true', the final layout is used, otherwise - shared layout.")
                .optional(),
            language: z.string().describe("The language version of the item to add the rendering to.").optional(),
            index: z.number().describe("The index at which the Rendering should be inserted.").optional(),
        },
        async (params) => {
            const commandBuilder = new PowershellCommandBuilder();
            const addRenderingParameters: Record<string, any> = {};

            addRenderingParameters["Id"] = params.itemId;
            addRenderingParameters["Placeholder"] = params.placeHolder;
            addRenderingParameters["DataSource"] = params.dataSource;
            addRenderingParameters["FinalLayout"] = getSwitchParameterValue(params.finalLayout);
            addRenderingParameters["Database"] = params.database;
            addRenderingParameters["Language"] = params.language;
            addRenderingParameters["Index"] = getNumberParameterValue(params.index);
            
            const command = `
                $rendering = New-Rendering -Id ${params.renderingId} -Database ${params.database};
                Add-Rendering -Instance $rendering ${commandBuilder.buildParametersString(addRenderingParameters)};
            `;
            
            return safeMcpResponse(runGenericPowershellCommand(config, command, {}));
        }
    );
}
