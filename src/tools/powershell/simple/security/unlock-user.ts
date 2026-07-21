import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function unlockUserPowerShellTool(server: McpServer, config: Config) {
    server.tool(
        "security-unlock-user",
        "Unlocks a Sitecore user account that has been locked out due to failed login attempts.",
        {
            identity: z.string()
                .describe("The identity of the user to unlock (e.g. 'admin' or full path 'sitecore\\admin')"),
        },
        async (params) => {
            const command = `Unlock-User`;
            const options: Record<string, any> = {
                "Identity": params.identity,
            };

            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );
}