import type { ToolServer } from "@/tool-server.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { getItemById } from "../../logic/simple/get-item.js";
import { safeMcpResponse } from "@/helper.js";

export function getItemTool(server: ToolServer, config: Config) {
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
