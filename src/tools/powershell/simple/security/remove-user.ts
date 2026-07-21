import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function removeUserPowerShellTool(server: McpServer, config: Config) {
    server.registerTool(
        "security-remove-user",
        {
            description: "Removes the Sitecore user.",
            inputSchema: {
                identity: z.string(),
            },
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