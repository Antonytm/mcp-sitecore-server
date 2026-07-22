import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";
import { AccessRights } from "./access-rights.js";

export function addItemAclPowerShellTool(server: McpServer, config: Config) {
    server.registerTool(
        "security-add-item-acl-by-id",
        {
            description: "Adds an access control entry to a Sitecore item by its ID.",
            inputSchema: {
                id: z.string()
                    .describe("The ID of the item to add ACL entry for"),
                identity: z.string()
                    .describe("The identity of the account (user or role) to grant permissions to (e.g. 'sitecore\\admin')"),
                accessRight: z.enum(AccessRights as [string, ...string[]])
                    .describe("The access right to grant (e.g. 'item:read', 'item:write')"),
                propagationType: z.enum(["Descendants", "Children", "Entity"]).default("Entity")
                    .describe("The propagation type for the access right"),
                securityPermission: z.enum(["AllowAccess", "DenyAccess"]).default("AllowAccess")
                    .describe("Whether to allow or deny the specified access right"),
                database: z.string().optional()
                    .describe("The database containing the item (defaults to the context database)")
            },
        },
        async (params) => {
            const command = `Add-ItemAcl`;
            const options: Record<string, any> = {
                "ID": params.id,
                "Identity": params.identity,
                "AccessRight": params.accessRight,
                "PropagationType": params.propagationType,
                "SecurityPermission": params.securityPermission
            };

            if (params.database) {
                options["Database"] = params.database;
            }

            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );

    server.registerTool(
        "security-add-item-acl-by-path",
        {
            description: "Adds an access control entry to a Sitecore item by its path.",
            inputSchema: {
                path: z.string()
                    .describe("The path of the item to add ACL entry for (e.g. /sitecore/content/Home)"),
                identity: z.string()
                    .describe("The identity of the account (user or role) to grant permissions to (e.g. 'sitecore\\admin')"),
                accessRight: z.enum(AccessRights as [string, ...string[]])
                    .describe("The access right to grant (e.g. 'item:read', 'item:write')"),
                propagationType: z.enum(["Descendants", "Children", "Entity"]).default("Entity")
                    .describe("The propagation type for the access right"),
                securityPermission: z.enum(["AllowAccess", "DenyAccess"]).default("AllowAccess")
                    .describe("Whether to allow or deny the specified access right"),
                database: z.string().optional()
                    .describe("The database containing the item (defaults to the context database)"),
                passThrough: z.boolean().optional()
                    .describe("")
            },
        },
        async (params) => {
            const command = `Add-ItemAcl`;
            const options: Record<string, any> = {
                "Path": params.path,
                "Identity": params.identity,
                "AccessRight": params.accessRight,
                "PropagationType": params.propagationType,
                "SecurityPermission": params.securityPermission
            };

            if (params.database) {
                options["Database"] = params.database;
            }

            if (params.passThrough) {
                options["PassThru"] = "";
            }

            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );
}