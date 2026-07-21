import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function getUserByFilterPowerShellTool(server: McpServer, config: Config) {
    server.tool(
        "security-get-user-by-filter",
        "Get a Sitecore users by filter.",
        {
            filter: z.string(),
        },
        async (params) => {
            const command = `Get-User`;
            const options: Record<string, any>= {
                "Filter": params.filter,
            };
            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );
}
