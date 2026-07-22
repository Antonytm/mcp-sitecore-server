import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";
import { getSwitchParameterValue } from "../../utils.js";

export function removeRenderingByPathPowershellTool(server: McpServer, config: Config) {
    server.registerTool(
        "presentation-remove-rendering-by-path",
        {
            description: "Removes renderings from an item by owners item path.",
            inputSchema: {
                path: z.string().describe("The path of the item to remove rendering from."),
                uniqueId: z.string().describe("The rendering definition unique id."),
                dataSource: z.string().describe("The rendering data source filter.").optional(),
                placeholder: z.string().describe("The rendering placeholder filter.").optional(),
                language: z.string().describe("The item language filter.").optional(),
                finalLayout: z.boolean()
                    .describe("Specifies layout holding the rendering definition. If 'true', the final layout is used, otherwise - shared layout.")
                    .optional(),
            },
        },
        async (params) => {
            const command = `Remove-Rendering`;

            const options: Record<string, any> = {};

            options["Path"] = params.path;
            options["UniqueId"] = params.uniqueId;
            options["DataSource"] = params.dataSource;
            options["Placeholder"] = params.placeholder;
            options["Language"] = params.language;
            options["FinalLayout"] = getSwitchParameterValue(params.finalLayout);

            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );
}