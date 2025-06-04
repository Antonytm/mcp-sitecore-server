import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic";

export function getDatabasePowerShellTool(server: McpServer, config: Config) {
    server.tool(
        "common-get-database",
        "Gets information about Sitecore databases.",
        {
            name: z.string().optional()
                .describe("The name of the database to retrieve (e.g. 'master', 'core', 'web'). If not provided, all databases will be returned.")
        },
        async (params) => {
            const options: Record<string, any> = {};
            const command = `Get-Database`;

            if (params.name) {
                options["Name"] = params.name;
            }

            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );
}