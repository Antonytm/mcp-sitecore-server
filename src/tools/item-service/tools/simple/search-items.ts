import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { searchItems } from "../../logic/simple/search-items.js";
import { safeMcpResponse } from "@/helper.js";

export function searchItemsTool(server: McpServer, config: Config) {
    server.registerTool(
        'item-service-search-items',
        {
            description: "Search Sitecore items using the ItemService RESTful API.",
            inputSchema: {
                term: z.string().min(1),
                fields: z.array(z.string()).optional(),
                facet: z.string().optional(),
                page: z.number().int().min(0).optional(),
                pageSize: z.number().int().min(1).max(1000).optional(),
                database: z.string().optional(),
                includeStandardTemplateFields: z.boolean().optional(),
            },
        },
        async (params) => {
            return safeMcpResponse(searchItems(config, params));
        }
    );
}
