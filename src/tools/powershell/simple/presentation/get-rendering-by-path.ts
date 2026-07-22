import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";
import { getSwitchParameterValue } from "../../utils.js";

export function getRenderingByPathPowershellTool(server: McpServer, config: Config) {
    server.registerTool(
        "presentation-get-rendering-by-path",
        {
            description: "Gets rendering definition by item path.",
            inputSchema: {
                path: z.string().describe("The id of the item to retrieve rendering for."),
                dataSource: z.string().describe("The rendering data source filter.").optional(),
                placeholder: z.string().describe("The rendering datasource filter.").optional(),
                language: z.string().describe("The item language.").optional(),
                finalLayout: z.boolean()
                    .describe("Specifies layout holding the rendering definition. If 'true', the final layout is used, otherwise - shared layout.")
                    .optional(),
                uniqueId: z.string().describe("The rendering definition unique id.").optional(),
            },
        },
        async (params) => {
            const command = `Get-Rendering`;
            const options: Record<string, any> = {};

            options["Path"] = params.path;
            options["DataSource"] = params.dataSource;
            options["Placeholder"] = params.placeholder;
            options["Language"] = params.language;
            options["FinalLayout"] = getSwitchParameterValue(params.finalLayout);
            options["UniqueId"] = params.uniqueId;

            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );
}