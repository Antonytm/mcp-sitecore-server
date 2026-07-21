import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { prepareArgsString } from "../../utils.js";
import { AccessRights } from "../../simple/security/access-rights.js";
import { runGenericPowershellCommand } from "../../simple/generic.js";
import { quotePowerShellString } from "../../command-builder.js";

export function setItemAclByIdPowerShellTool(server: McpServer, config: Config) {
    server.tool(
        "security-set-item-acl-by-id",
        "Sets an access control entry to a Sitecore item by its ID.",
        {
            id: z.string()
                .describe("The ID of the item to add ACL entry for"),
            path: z.string()
                .default("master:")
                .optional(),
            identity: z.string()
                .describe("The identity of the account (user or role) to grant permissions to (e.g. 'sitecore\\admin')"),
            accessRight: z.enum(AccessRights as [string, ...string[]])
                .describe("The access right to grant (e.g. 'item:read', 'item:write')"),
            propagationType: z.enum(["Descendants", "Children", "Entity"]).default("Entity")
                .describe("The propagation type for the access right"),
            securityPermission: z.enum(["AllowAccess", "DenyAccess"]).default("AllowAccess")
                .describe("Whether to allow or deny the specified access right"),
        },
        async (params) => {
            const parameters1Obj: any = {};

            parameters1Obj["Identity"] = params.identity;
            parameters1Obj["AccessRight"] = params.accessRight;
            parameters1Obj["PropagationType"] = params.propagationType;
            parameters1Obj["SecurityPermission"] = params.securityPermission;

            const parameters1 = prepareArgsString(parameters1Obj);
            const command = `
                $acl = New-ItemAcl ${parameters1};
                Get-Item -Id ${quotePowerShellString(params.id)} -Path ${quotePowerShellString(params.path)} | Set-ItemAcl -AccessRules $acl
            `.replaceAll(/[\n]+/g, "");

            return safeMcpResponse(runGenericPowershellCommand(config, command, {}));
        }
    );
}
