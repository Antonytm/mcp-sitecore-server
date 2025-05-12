import { describe, it, expect } from "vitest";
import { callTool } from "@modelcontextprotocol/inspector/cli/build/client/tools.js";
import { client, transport } from "../../../../client";

await client.connect(transport);

describe("powershell", () => {
    it("security-clear-item-acl-by-id", async () => {
        // Use the specific ID mentioned in the task requirements
        const itemId = "{ECFF05F9-8334-4BCA-8CE8-00A3F42AEE1D}";
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



        // Clean up 
        await callTool(client, "security-clear-item-acl-by-id", clearupAclArgs);

        // Verify the ACL was removed by retrieving the item ACL again
        const getUpdatedAclResult = await callTool(client, "security-get-item-acl-by-id", getAclArgs);
        const updatedAclJson = JSON.parse(getUpdatedAclResult.content[0].text);

        expect(updatedAclJson).toMatchObject({});
    });
});