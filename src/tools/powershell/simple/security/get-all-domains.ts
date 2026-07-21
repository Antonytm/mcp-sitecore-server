import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function getAllDomainsPowerShellTool(server: McpServer, config: Config) {
    server.tool(
        "security-get-domain",
        "Get all Sitecore domains.",
        {},
        async () => {
            const command = `Get-Domain`;
            const options: Record<string, any> = {};
            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );
}
