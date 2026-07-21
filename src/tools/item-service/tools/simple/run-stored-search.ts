import type { ToolServer } from "@/tool-server.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { runStoredSearch } from "../../logic/simple/run-stored-search.js";
import { safeMcpResponse } from "@/helper.js";

export function runStoredSearchTool(server: ToolServer, config: Config) {
    server.tool(
        'item-service-run-stored-search',
        "Run a stored Sitecore search by its definition item ID.",
        {
            id: z.string(),
            term: z.string(),
            options: z.object({
                pageSize: z.number().int().min(1).max(1000).optional(),
                page: z.number().int().min(0).optional(),
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
