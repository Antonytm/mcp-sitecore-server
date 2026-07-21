import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function getRoleByFilterPowerShellTool(server: McpServer, config: Config) {
    server.tool(
        "security-get-role-by-filter",
        "Get Sitecore roles by filter criteria.",
        {
            filter: z.string().describe("The filter criteria to search for roles (e.g. 'sitecore\\*' or '*Author*')"),
        },
        async (params) => {
            const command = `Get-Role`;
            const options: Record<string, any> = {
                "Filter": params.filter,
            };
            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );
}
