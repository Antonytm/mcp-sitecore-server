import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function setUserPasswordPowerShellTool(server: McpServer, config: Config) {
    server.tool(
        "security-set-user-password",
        "Sets a new password for a Sitecore user.",
        {
            identity: z.string()
                .describe("The identity of the user to update the password for (e.g. 'admin' or full path 'sitecore\\admin')"),
            newPassword: z.string()
                .describe("The new password for the user"),
            resetPassword: z.boolean().optional()
                .describe("If true, the user will be required to change password on next login"),
            oldPassword: z.string().optional()
                .describe("The old password. If provided, it will be validated before setting the new password"),
        },
        async (params) => {
            const command = `Set-UserPassword`;
            const options: Record<string, any> = {
                "Identity": params.identity,
                "NewPassword": params.newPassword,
            };

            if (params.resetPassword) {
                options["Reset"] = "";
            }

            if (params.oldPassword) {
                options["OldPassword"] = params.oldPassword;
            }

            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );
}