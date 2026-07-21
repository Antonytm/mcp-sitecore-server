import type { ToolServer } from "@/tool-server.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function newUserPowerShellTool(server: ToolServer, config: Config) {
    server.tool(
        "security-new-user",
        "Creates a new Sitecore user.",
        {
            identity: z.string(),
            password: z.string().optional(),
            email: z.string().optional(),
            fullName: z.string().optional(),
            comment: z.string().optional(),
            portrait: z.string().optional(),
            enabled: z.boolean().optional(),
            profileItemId: z.string().optional(),
        },
        async (params) => {
            const command = `New-User`;
            const options: Record<string, any>= {
                "Identity": params.identity,
            };

            if (params.password) {
                options["Password"] = params.password;
            }
            if (params.email) {
                options["Email"] = params.email;
            }
            if (params.fullName) {
                options["FullName"] = params.fullName;
            }
            if (params.comment) {
                options["Comment"] = params.comment;
            }
            if (params.portrait) {
                options["Portrait"] = params.portrait;
            }
            if (params.enabled) {
                options["Enabled"] = "";
            }
            if (params.profileItemId) {
                options["ProfileItemId"] = params.profileItemId;
            }

            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );
}