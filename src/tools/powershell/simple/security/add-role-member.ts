import type { ToolServer } from "@/tool-server.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function addRoleMemberPowerShellTool(server: ToolServer, config: Config) {
    server.tool(
        "security-add-role-member",
        "Adds a member to a Sitecore role.",
        {
            identity: z.string()
                .describe("The identity of the role to add members to (e.g. 'CustomRole' or full path 'sitecore\\CustomRole')"),
            members: z.string()
                .describe("The members to add to the role (comma-separated list of users or roles, e.g. 'sitecore\\user1,sitecore\\user2')"),
        },
        async (params) => {
            const command = `Add-RoleMember`;
            const options: Record<string, any> = {
                "Identity": params.identity,
                "Members": params.members.split(',').map((member: string) => member.trim()).join('","'),
            };

            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );
}