import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function getRoleMemberPowerShellTool(server: McpServer, config: Config) {
    server.registerTool(
        "security-get-role-member",
        {
            description: "Get members of a Sitecore role.",
            inputSchema: {
                identity: z.string()
                    .describe("The identity of the role to get members from (e.g. 'sitecore\\Author')"),
                recurse: z.boolean().optional()
                    .describe("If set to true, gets all members recursively (including members of nested roles)"),
                userOnly: z.boolean().optional()
                    .describe("If set to true, only gets user members (excluding roles)"),
                roleOnly: z.boolean().optional()
                    .describe("If set to true, only gets role members (excluding users)"),
            },
        },
        async (params) => {
            const command = `Get-RoleMember`;
            const options: Record<string, any> = {
                "Identity": params.identity,
            };

            if (params.recurse) {
                options["Recurse"] = "";
            }

            if (params.userOnly) {
                options["UserOnly"] = "";
            }

            if (params.roleOnly) {
                options["RoleOnly"] = "";
            }

            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );
}