import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import type { Config } from "../../../../config.js";
import { z } from "zod";
import { safeMcpResponse } from "../../../../helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function disableUserPowerShellTool(server: McpServer, config: Config) {
    server.tool(
        "security-disable-user",
        "Disables the Sitecore user account.",
        {
            identity: z.string(),
        },
        async (params) => {
            const command = `Disable-User`;
            const options: Record<string, any>= {
                "Identity": params.identity,
            };

            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );
}