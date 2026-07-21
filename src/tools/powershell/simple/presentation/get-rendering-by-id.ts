import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";
import { getSwitchParameterValue } from "../../utils.js";

export function getRenderingByIdPowershellTool(server: McpServer, config: Config) {
    server.tool(
        "presentation-get-rendering-by-id",
        "Gets rendering definition by item id.",
        {
            itemId: z.string().describe("The id of the item to retrieve rendering for."),
            database: z.string().describe("The context database.").optional(),
            dataSource: z.string().describe("The rendering data source filter.").optional(),
            placeholder: z.string().describe("The rendering datasource filter.").optional(),
            language: z.string().describe("The item language filter.").optional(),
            finalLayout: z.boolean()
                .describe("Specifies layout holding the rendering definition. If 'true', the final layout is used, otherwise - shared layout.")
                .optional(),
            uniqueId: z.string().describe("The rendering definition unique id.").optional(),
        },
        async (params) => {
            const command = `Get-Rendering`;
            const options: Record<string, any> = {};

            options["Id"] = params.itemId;
            options["Database"] = params.database;
            options["DataSource"] = params.dataSource;
            options["Placeholder"] = params.placeholder;
            options["Language"] = params.language;  
            options["FinalLayout"] = getSwitchParameterValue(params.finalLayout);
            options["UniqueId"] = params.uniqueId;

            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );
}