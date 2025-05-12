import { describe, it, expect } from "vitest";
import { callTool } from "@modelcontextprotocol/inspector/cli/build/client/tools.js";
import { client, transport } from "../../../../client";

await client.connect(transport);

describe("powershell", () => {
    it("security-add-item-acl-by-id", async () => {
        const itemId = "{4E79D567-5396-4987-B350-57D1DCE6B1DA}";

        // Clean up 
        const clearupAclArgs: Record<string, any> = {
            id: itemId,
        };

        await callTool(client, "security-clear-item-acl-by-id", clearupAclArgs);

        const getAclArgs: Record<string, any> = {
            id: itemId,
        };

        // Add a new ACL entry - Deny read access to the Everyone role
        const addAclArgs: Record<string, any> = {
            id: itemId,
            identity: "sitecore\\Everyone",
            accessRight: "item:read",
            propagationType: "Entity",
            securityPermission: "DenyAccess"
        };

        const addAclResult = await callTool(client, "security-add-item-acl-by-id", addAclArgs);
        const addAclJson = JSON.parse(addAclResult.content[0].text);

        // Verify the ACL was added by retrieving the item ACL again
        const getUpdatedAclResult = await callTool(client, "security-get-item-acl-by-id", getAclArgs);
        const updatedAclJson = JSON.parse(getUpdatedAclResult.content[0].text);

        // Find the ACL entry we just added
        const hasAddedAcl = updatedAclJson.Obj.some((aclEntry: any) =>
            aclEntry.Account?.Name === "sitecore\\Everyone" &&
            aclEntry.AccessRight?.Name === "item:read" &&
            aclEntry.PropagationType?.ToString === "Entity" &&
            aclEntry.SecurityPermission?.ToString === "DenyAccess"
        );

        expect(hasAddedAcl).toBe(true);

        // Clean up 
        await callTool(client, "security-clear-item-acl-by-id", clearupAclArgs);
    });
});