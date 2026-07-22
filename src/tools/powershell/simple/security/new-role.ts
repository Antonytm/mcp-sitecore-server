import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function newRolePowerShellTool(server: McpServer, config: Config) {
    server.registerTool(
        "security-new-role",
        {
            description: "Creates a new Sitecore role.",
            inputSchema: {
                identity: z.string()
                    .describe("The identity of the role to create (e.g. 'CustomRole' or full path 'sitecore\\CustomRole')"),
                },
        },
        async (params) => {
            const command = `New-Role`;
            const options: Record<string, any> = {
                "Identity": params.identity,
            };

            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );
}