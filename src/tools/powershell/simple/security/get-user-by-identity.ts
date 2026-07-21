import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function getUserByIdentityPowerShellTool(server: McpServer, config: Config) {
    server.registerTool(
        "security-get-user-by-identity",
        {
            description: "Get a Sitecore user by its name.",
            inputSchema: {
                identity: z.string(),
            },
        },
        async (params) => {
            const command = `Get-User`;
            const options: Record<string, any>= {
                "Identity": params.identity,
            };
            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );
}
