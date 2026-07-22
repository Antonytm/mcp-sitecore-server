import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { getItemByPath } from "../../logic/simple/get-item-by-path.js";
import { safeMcpResponse } from "@/helper.js";

export function getItemByPathTool(server: McpServer, config: Config) {
    server.registerTool(
        'item-service-get-item-by-path',
        {
            description: "Get a Sitecore item by its path.",
            inputSchema: {
                path: z.string(),
                options: z.object({
                    database: z.string().optional(),
                    language: z.string().optional(),
                    version: z.string().optional(),
                    includeStandardTemplateFields: z.boolean().optional(),
                    includeMetadata: z.boolean().optional(),
                    fields: z.array(z.string()).optional(),
                }).optional(),
            },
        },
        async (params) => {
            return safeMcpResponse(getItemByPath(config, params.path, params.options || {}));
        }
    );
}
