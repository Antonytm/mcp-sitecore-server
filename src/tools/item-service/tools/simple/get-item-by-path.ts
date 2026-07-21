import type { ToolServer } from "@/tool-server.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { getItemByPath } from "../../logic/simple/get-item-by-path.js";
import { safeMcpResponse } from "@/helper.js";

export function getItemByPathTool(server: ToolServer, config: Config) {
    server.tool(
        'item-service-get-item-by-path',
        "Get a Sitecore item by its path.",
        {
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
        async (params) => {
            return safeMcpResponse(getItemByPath(config, params.path, params.options || {}));
        }
    );
}
