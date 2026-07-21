import type { ToolServer } from "@/tool-server.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";
import { AccessRights } from "./access-rights.js";

export function testItemAclPowerShellTool(server: ToolServer, config: Config) {
    server.tool(
        "security-test-item-acl-by-id",
        "Tests whether a user or role has specific access rights to a Sitecore item by its ID.",
        {
            id: z.string()
                .describe("The ID of the item to test access rights on"),
            identity: z.string()
                .describe("The identity of the user or role to test (e.g. 'sitecore\\admin')"),
            accessRight: z.enum(AccessRights as [string, ...string[]])
                .describe("The access right to test (e.g. 'item:read', 'item:write')"),
            propType: z.enum(["Descendants", "Children", "Entity"]).optional()
                .describe("The propagation type for the access right"),
            database: z.string().optional()
                .describe("The database containing the item (defaults to the context database)")
        },
        async (params) => {
            const command = `Test-ItemAcl`;
            const options: Record<string, any> = {
                "ID": params.id,
                "Identity": params.identity,
                "AccessRight": params.accessRight,
            };

            if (params.propType) {
                options["PropType"] = params.propType;
            }

            if (params.database) {
                options["Database"] = params.database;
            }

            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );

    server.tool(
        "security-test-item-acl-by-path",
        "Tests whether a user or role has specific access rights to a Sitecore item by its path.",
        {
            path: z.string()
                .describe("The path of the item to test access rights on (e.g. /sitecore/content/Home)"),
            identity: z.string()
                .describe("The identity of the user or role to test (e.g. 'sitecore\\admin')"),
            accessRight: z.string()
                .describe("The access right to test (e.g. 'item:read', 'item:write')"),
            propType: z.enum(["Descendants", "Children", "Entity"]).optional()
                .describe("The propagation type for the access right"),
            database: z.string().optional()
                .describe("The database containing the item (defaults to the context database)")
        },
        async (params) => {
            const command = `Test-ItemAcl`;
            const options: Record<string, any> = {
                "Path": params.path,
                "Identity": params.identity,
                "AccessRight": params.accessRight,
            };

            if (params.propType) {
                options["PropType"] = params.propType;
            }

            if (params.database) {
                options["Database"] = params.database;
            }

            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );
}