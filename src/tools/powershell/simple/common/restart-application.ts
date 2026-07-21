import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function restartApplicationPowerShellTool(server: McpServer, config: Config) {
    server.registerTool(
        "common-restart-application",
        {
            description: "Restarts the Sitecore Application pool.",
        },
        async () => {
            const command = `Restart-Application`;
            return safeMcpResponse(runGenericPowershellCommand(config, command, {}));
        }
    );
}