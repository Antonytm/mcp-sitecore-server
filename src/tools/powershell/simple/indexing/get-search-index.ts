import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function getSearchIndexPowerShellTool(server: McpServer, config: Config) {
    server.registerTool(
        "indexing-get-search-index",
        {
            description: "Get information about Sitecore search indexes. Can filter by name, database, running status, or corrupted status.",
            inputSchema: {
                name: z.string().optional().describe("The name of the index to retrieve information for. Supports wildcards."),
                database: z.string().optional().describe("Filter indexes by database name."),
                running: z.boolean().optional().describe("Filter to show only running indexes."),
                corrupted: z.boolean().optional().describe("Filter to show only corrupted indexes."),
            },
        },
        async (params) => {
            const command = `Get-SearchIndex`;
            const options: Record<string, any> = {};
            
            if (params.name) {
                options["Name"] = params.name;
            }

            if (params.database) {
                options["Database"] = params.database;
            }

            if (params.running === true) {
                options["Running"] = "";
            }

            if (params.corrupted === true) {
                options["Corrupted"] = "";
            }

            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );
}
