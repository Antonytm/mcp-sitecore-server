import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function suspendSearchIndexPowerShellTool(server: McpServer, config: Config) {
    server.registerTool(
        "indexing-suspend-search-index",
        {
            description: "Suspend one or more Sitecore search indexes. If no name is provided, all running indexes will be suspended.",
            inputSchema: {
                name: z.string().optional().describe("The name of the index to suspend. If not provided, all running indexes will be suspended."),
            },
        },
        async (params) => {
            const command = `Suspend-SearchIndex`;
            const options: Record<string, any> = {};
            
            if (params.name) {
                options["Name"] = params.name;
            }

            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );
}
