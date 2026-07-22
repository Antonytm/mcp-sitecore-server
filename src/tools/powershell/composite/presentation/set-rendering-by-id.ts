import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../../simple/generic.js";
import { PowershellCommandBuilder } from "../../command-builder.js";
import { getSwitchParameterValue, getNumberParameterValue } from "../../utils.js";
import { renderingLookupGuard, renderingNotFoundMessage } from "./rendering-guard.js";

export function setRenderingByIdPowershellTool(server: McpServer, config: Config) {
    server.registerTool(
        "presentation-set-rendering-by-id",
        {
            description: "Updates rendering specified by item ID with new values.",
            inputSchema: {
                itemId: z.string().describe("The ID of the item holding the rendering."),
                uniqueId: z.string().describe("The unique ID of the rendering."),
                database: z.string().describe("The context database.").optional().default("master"),
                placeholder: z.string().describe("New rendering placeholder value if specified.").optional(),
                dataSource: z.string().describe("New rendering data source if specified.").optional(),
                finalLayout: z
                    .boolean()
                    .describe("Specifies the layout to update the rendering. If 'true', the final layout is used, otherwise - shared layout.")
                    .optional(),
                language: z.string().describe("The language version of the item holding the rendering.").optional(),
                index: z.number().describe("New index of the rendering in the layout.").optional(),
                parameter: z.record(z.string(), z.string()).describe("New rendering parameters if specified.").optional(),
            },
        },
        async (params) => {
            const commandBuilder = new PowershellCommandBuilder();

            const getRenderingParameters: Record<string, any> = {};
            getRenderingParameters["Id"] = params.itemId;
            getRenderingParameters["UniqueId"] = params.uniqueId;
            getRenderingParameters["Database"] = params.database;

            const setRenderingParameters: Record<string, any> = {};
            setRenderingParameters["Id"] = params.itemId;
            setRenderingParameters["Database"] = params.database;
            setRenderingParameters["Placeholder"] = params.placeholder;
            setRenderingParameters["DataSource"] = params.dataSource;
            setRenderingParameters["FinalLayout"] = getSwitchParameterValue(params.finalLayout);
            setRenderingParameters["Language"] = params.language;
            setRenderingParameters["Index"] = getNumberParameterValue(params.index);
            setRenderingParameters["Parameter"] = params.parameter;

            const notFound = renderingNotFoundMessage(
                `a rendering with unique ID '${params.uniqueId}' on the item with ID '${params.itemId}' in database '${params.database}'`,
                "presentation-get-rendering-by-id"
            );

            const command = `
                $rendering = Get-Rendering ${commandBuilder.buildParametersString(getRenderingParameters)};
                ${renderingLookupGuard("$rendering", notFound)}
                Set-Rendering -Instance $rendering ${commandBuilder.buildParametersString(setRenderingParameters)};
            `;

            return safeMcpResponse(runGenericPowershellCommand(config, command, {}));
        }
    );
}