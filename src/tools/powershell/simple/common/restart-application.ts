import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import type { Config } from "@/config.js";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function restartApplicationPowerShellTool(server: McpServer, config: Config) {
    server.tool(
        "common-restart-application",
        "Restarts the Sitecore Application pool.",
        {},
        async () => {
            const command = `Restart-Application`;
            return safeMcpResponse(runGenericPowershellCommand(config, command, {}));
        }
    );
}