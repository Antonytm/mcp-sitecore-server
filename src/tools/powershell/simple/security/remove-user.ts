import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function removeUserPowerShellTool(server: McpServer, config: Config) {
    server.tool(
        "security-remove-user",
        "Removes the Sitecore user.",
        {
            identity: z.string(),
        },
        async (params) => {
            const command = `Remove-User`;
            const options: Record<string, any>= {
                "Identity": params.identity,
            };

            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );
}