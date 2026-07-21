import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { createItem } from "../../logic/simple/create-item.js";
import { safeMcpResponse } from "@/helper.js";

export function createItemTool(server: McpServer, config: Config) {
    server.tool(
        'item-service-create-item',
        "Create a new Sitecore item under parent path with name using template id.",
        {
            parentPath: z.string(),
            itemName: z.string(),
            templateId: z.string(),
            data:
                z.record(z.string(), z.string()).optional(),    
            options: z.object({
                database: z.string().optional(),
                language: z.string().optional(),
            }).optional(),
        },
        async (params) => {
            return safeMcpResponse(createItem(config, params.parentPath, { ItemName: params.itemName, TemplateID: params.templateId, ...params.data }, params.options || {}));
        }
    );
}
