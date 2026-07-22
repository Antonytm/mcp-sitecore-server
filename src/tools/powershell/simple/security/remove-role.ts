import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function removeRolePowerShellTool(server: McpServer, config: Config) {
    server.registerTool(
        "security-remove-role",
        {
            description: "Removes a Sitecore role.",
            inputSchema: {
                identity: z.string()
                    .describe("The identity of the role to remove (e.g. 'CustomRole' or full path 'sitecore\\CustomRole')"),
            },
        },
        async (params) => {
            const command = `Remove-Role`;
            const options: Record<string, any> = {
                "Identity": params.identity,
            };

            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );
}