import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function removeRoleMemberPowerShellTool(server: McpServer, config: Config) {
    server.tool(
        "security-remove-role-member",
        "Removes members from a Sitecore role.",
        {
            identity: z.string()
                .describe("The identity of the role to remove members from (e.g. 'CustomRole' or full path 'sitecore\\CustomRole')"),
            members: z.string()
                .describe("The members to remove from the role (comma-separated list of users or roles, e.g. 'sitecore\\user1,sitecore\\user2')"),
        },
        async (params) => {
            const command = `Remove-RoleMember`;
            const options: Record<string, any> = {
                "Identity": params.identity,
                "Members": params.members.split(',').map((member: string) => member.trim()).join('","'),
            };

            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );
}