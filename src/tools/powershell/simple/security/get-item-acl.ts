import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function getItemAclPowerShellTool(server: McpServer, config: Config) {
    server.tool(
        "security-get-item-acl-by-id",
        "Gets the access control list (ACL) of a Sitecore item by its ID.",
        {
            id: z.string()
                .describe("The ID of the item to get ACL for"),
            includeInherited: z.boolean().optional()
                .describe("If set to true, includes inherited ACL entries"),
            includeSystem: z.boolean().optional()
                .describe("If set to true, includes system ACL entries"),
            database: z.string().optional()
                .describe("The database containing the item (defaults to the context database)")
        },
        async (params) => {
            const command = `Get-ItemAcl`;
            const options: Record<string, any> = {
                "ID": params.id,
            };

            if (params.includeInherited) {
                options["IncludeInherited"] = "";
            }

            if (params.includeSystem) {
                options["IncludeSystem"] = "";
            }

            if (params.database) {
                options["Database"] = params.database;
            }

            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );

    server.tool(
        "security-get-item-acl-by-path",
        "Gets the access control list (ACL) of a Sitecore item by its path.",
        {
            path: z.string()
                .describe("The path of the item to get ACL for (e.g. /sitecore/content/Home)"),
            includeInherited: z.boolean().optional()
                .describe("If set to true, includes inherited ACL entries"),
            includeSystem: z.boolean().optional()
                .describe("If set to true, includes system ACL entries"),
            database: z.string().optional()
                .describe("The database containing the item (defaults to the context database)")
        },
        async (params) => {
            const command = `Get-ItemAcl`;
            const options: Record<string, any> = {
                "Path": params.path,
            };

            if (params.includeInherited) {
                options["IncludeInherited"] = "";
            }

            if (params.includeSystem) {
                options["IncludeSystem"] = "";
            }

            if (params.database) {
                options["Database"] = params.database;
            }

            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );
}