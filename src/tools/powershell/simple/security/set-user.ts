import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function setUserPowerShellTool(server: McpServer, config: Config) {
    server.registerTool(
        "security-set-user",
        {
            description: "Updates properties of a Sitecore user account.",
            inputSchema: {
                identity: z.string()
                    .describe("The identity of the user to update (e.g. 'admin' or full path 'sitecore\\admin')"),
                isAdministrator: z.boolean().optional()
                    .describe("Set the user as an administrator"),
                password: z.string().optional()
                    .describe("The new password for the user"),
                comment: z.string().optional()
                    .describe("Comment for the user"),
                email: z.string().optional()
                    .describe("Email for the user"),
                fullName: z.string().optional()
                    .describe("Full name of the user"),
                portrait: z.string().optional()
                    .describe("Portrait for the user"),
                profileItemId: z.string().optional()
                    .describe("Profile item ID for the user"),
                startUrl: z.string().optional()
                    .describe("Start URL for the user"),
                clientLanguage: z.string().optional()
                    .describe("Client language for the user"),
                enabled: z.boolean().optional()
                    .describe("Enable or disable the user"),
            },
        },
        async (params) => {
            const command = `Set-User`;
            const options: Record<string, any> = {
                "Identity": params.identity,
            };

            if (params.password) {
                options["Password"] = params.password;
            }

            if (params.comment) {
                options["Comment"] = params.comment;
            }

            if (params.email) {
                options["Email"] = params.email;
            }

            if (params.fullName) {
                options["FullName"] = params.fullName;
            }

            if (params.portrait) {
                options["Portrait"] = params.portrait;
            }

            if (params.startUrl) {
                options["StartUrl"] = params.startUrl;
            }

            if (params.clientLanguage) {
                options["ClientLanguage"] = params.clientLanguage;
            }

            if (params.profileItemId) {
                options["ProfileItemId"] = params.profileItemId;
            }
            
            if (params.isAdministrator) {
                options["IsAdministrator"] = params.isAdministrator;
            }

            if (params.enabled) {
                options["Enabled"] = params.enabled;
            }


            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );
}