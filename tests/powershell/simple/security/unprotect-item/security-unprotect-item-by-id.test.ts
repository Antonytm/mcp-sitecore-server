// filepath: c:\source\mcp-sitecore-server\tests\powershell\simple\security\unprotect-item\security-unprotect-item-by-id.test.ts
import { describe, it, expect } from "vitest";
import { callTool } from "@modelcontextprotocol/inspector/cli/build/client/tools.js";
import { client, transport } from "../../../../client";

await client.connect(transport);

describe("powershell", () => {
    it("security-unprotect-item-by-id", async () => {
        const itemId = "{F8AE75E0-CA84-43D9-8B04-14D97BD2F601}"; 

        const args: Record<string, any> = {
            id: itemId,
            passThru: "true"
        };

        // First protect the item to ensure we have something to unprotect
        const protectResult = await callTool(client, "security-protect-item-by-id", args);
        const protectJson = JSON.parse(protectResult.content[0].text);
        expect(protectJson.Obj[0]["__Read Only"]).toBe(1);
        // Test unprotecting item by ID

        
        const unprotectResult = await callTool(client, "security-unprotect-item-by-id", args);
        const unprotectJson = JSON.parse(unprotectResult.content[0].text);
        
        // Verify the item is no longer protected
        expect(unprotectJson.Obj[0]["__Read Only"]).toBe("");
    });
});