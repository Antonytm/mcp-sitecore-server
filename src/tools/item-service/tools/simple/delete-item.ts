import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { deleteItem } from "../../logic/simple/delete-item.js";
import { safeMcpResponse } from "@/helper.js";

export function deleteItemTool(server: McpServer, config: Config) {
    server.tool(
        'item-service-delete-item',
        "Delete a Sitecore item by its ID.",
        {
            id: z.string(),
            options: z.object({
                database: z.string().optional(),
                language: z.string().optional(),
                version: z.string().optional(),
            }).optional(),
        },
        async (params) => {
            return safeMcpResponse(deleteItem(config, params.id, params.options || {}));
        }
    );
}
