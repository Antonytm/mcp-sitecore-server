import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function getCachePowerShellTool(server: McpServer, config: Config) {
    server.tool(
        "common-get-cache",
        "Gets information about Sitecore caches.",
        {
            name: z.string().optional()
                .describe("The name of the cache to retrieve. Wildcards are supported. If not provided, all caches will be returned."),
            database: z.string().optional()
                .describe("The database containing the cache to retrieve."),
        },
        async (params) => {
            const options: Record<string, any> = {};
            const command = `Get-Cache`;

            if (params.name) {
                options["Name"] = params.name;
            }

            if (params.database) {
                options["Database"] = params.database;
            }

            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );
}
