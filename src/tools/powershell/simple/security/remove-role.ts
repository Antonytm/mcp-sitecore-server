import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function removeRolePowerShellTool(server: McpServer, config: Config) {
    server.tool(
        "security-remove-role",
        "Removes a Sitecore role.",
        {
            identity: z.string()
                .describe("The identity of the role to remove (e.g. 'CustomRole' or full path 'sitecore\\CustomRole')"),
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