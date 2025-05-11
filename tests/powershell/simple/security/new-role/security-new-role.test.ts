import { describe, it, expect } from "vitest";
import { callTool } from "@modelcontextprotocol/inspector/cli/build/client/tools.js";
import { client, transport } from "../../../../client";

await client.connect(transport);

describe("powershell", () => {
    it("security-new-role", async () => {
        // Create a test role with a random suffix to avoid conflicts
        const randomHexSuffix = Math.floor(Math.random() * 1000000).toString(16);
        const newRoleArgs: Record<string, any> = {
            identity: `custom-role-${randomHexSuffix}`,
            description: "Test role created by the MCP Sitecore server tests"
        };
        
        // Create the role
        const createResult = await callTool(client, "security-new-role", newRoleArgs);
        const createJson = JSON.parse(createResult.content[0].text);
        expect(createJson.Obj[0].Name).toBe(`sitecore\\custom-role-${randomHexSuffix}`);
        
        // Get the role to verify it was created
        const getRoleArgs: Record<string, string> = {
            identity: `sitecore\\custom-role-${randomHexSuffix}`
        };
        const getRoleResult = await callTool(client, "security-get-role-by-identity", getRoleArgs);
        const getRoleJson = JSON.parse(getRoleResult.content[0].text);
        
        // Verify the role was created correctly
        expect(getRoleJson.Obj[0].Name).toBe(`sitecore\\custom-role-${randomHexSuffix}`);
        
        const removeRoleArgs: Record<string, string> = {
            identity: `sitecore\\custom-role-${randomHexSuffix}`
        };

        // Remove the role
        const removeResult = await callTool(client, "security-remove-role", removeRoleArgs);
        const removeJson = JSON.parse(removeResult.content[0].text);
    });
});