import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "../../../../config.js";
import { z } from "zod";
import { runStoredSearch } from "../../simple/run-stored-search.js";
import { safeMcpResponse } from "../../../../helper.js";

export function runStoredSearchTool(server: McpServer, config: Config) {
    server.tool(
        'item-service-run-stored-search',
        "Run a stored Sitecore search by its definition item ID.",
        {
            id: z.string(),
            term: z.string(),
            options: z.object({
                pageSize: z.number().optional(),
                page: z.number().optional(),
                database: z.string().optional(),
                language: z.string().optional(),
                includeStandardTemplateFields: z.boolean().optional(),
                fields: z.array(z.string()).optional(),
                facet: z.string().optional(),
                sorting: z.string().optional(),
            }).optional(),
        },
        async (params) => {
            return safeMcpResponse(runStoredSearch(config, params.id, params.term, params.options || {}));
        }
    );
}
