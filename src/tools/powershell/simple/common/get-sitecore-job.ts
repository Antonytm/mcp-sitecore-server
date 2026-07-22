import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function getSitecoreJobPowerShellTool(server: McpServer, config: Config) {
    server.registerTool(
        "common-get-sitecore-job",
        {
            description: "Gets list of the current Sitecore jobs.",
        },
        async (params) => {
            const options: Record<string, any> = {};
            const command = `Get-SitecoreJob`;

            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );
}