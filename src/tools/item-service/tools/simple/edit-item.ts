import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { editItem } from "../../logic/simple/edit-item.js";
import { safeMcpResponse } from "@/helper.js";

export function editItemTool(server: McpServer, config: Config) {
    server.tool(
        'item-service-edit-item',
        "Edit a Sitecore item by its ID.",
        {
            id: z.string(),
            data:
                z.record(z.string(), z.string()),
            options: z.object({
                database: z.string().optional(),
                language: z.string().optional(),
                version: z.string().optional(),
            }).optional(),
        },
        async (params) => {
            console.log('Edit Item Tool: Executing tool...', JSON.stringify(params, null, '\t'));
            const result = await safeMcpResponse(editItem(config, params.id, params.data, params.options || {}));
            console.log('Edit Item Tool: Result', JSON.stringify(result, null, '\t'));
            return result;
        }
    );
}
