import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function getRoleByIdentityPowerShellTool(server: McpServer, config: Config) {
    server.tool(
        "security-get-role-by-identity",
        "Get a Sitecore role by its identity.",
        {
            identity: z.string().describe("The identity of the role to retrieve (e.g. 'sitecore\\Author')"),
        },
        async (params) => {
            const command = `Get-Role`;
            const options: Record<string, any> = {
                "Identity": params.identity,
            };
            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );
}
