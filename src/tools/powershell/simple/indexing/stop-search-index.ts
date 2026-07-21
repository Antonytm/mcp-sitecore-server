import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function stopSearchIndexPowerShellTool(server: McpServer, config: Config) {
    server.registerTool(
        "indexing-stop-search-index",
        {
            description: "Stop one or more Sitecore search indexes. If no name is provided, all running indexes will be stopped.",
            inputSchema: {
                name: z.string().optional().describe("The name of the index to stop. If not provided, all running indexes will be stopped."),
            },
        },
        async (params) => {
            const command = `Stop-SearchIndex`;
            const options: Record<string, any> = {};
            
            if (params.name) {
                options["Name"] = params.name;
            }

            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );
}
