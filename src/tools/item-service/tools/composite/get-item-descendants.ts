import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { getItemDescendants } from "../../logic/composite/get-item-descendants.js";
import { safeMcpResponse } from "@/helper.js";

export function getItemDescendantsTool(server: McpServer, config: Config) {
    server.tool(
        'item-service-get-item-descendants',
        "Get descendants of a Sitecore item by its ID.",
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
            return safeMcpResponse(getItemDescendants(config, params.id, params.options || {}));
        }
    );
}
