import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "../../../../config.js";
import { z } from "zod";
import { getItemById } from "../../simple/get-item.js";
import { safeMcpResponse } from "../../../../helper.js";

export function registerGetItemTool(server: McpServer, config: Config) {
    server.tool(
        'item-service-get-item',
        "Get a Sitecore item by its ID.",
        {
            id: z.string(),
            options: z.object({
                database: z.string().optional(),
                language: z.string().optional(),
                version: z.string().optional(),
                includeStandardTemplateFields: z.boolean().optional(),
                includeMetadata: z.boolean().optional(),
                fields: z.array(z.string()).optional(),
            }).optional(),
        },
        async (params) => {
            return safeMcpResponse(getItemById(config, params.id, params.options || {}));
        }
    );
}
