// filepath: c:\source\mcp-sitecore-server\tests\powershell\simple\security\protect-item\security-protect-item-by-id.test.ts
import { describe, it, expect } from "vitest";
import { callTool } from "@modelcontextprotocol/inspector/cli/build/client/tools.js";
import { client, transport } from "../../../../client";

await client.connect(transport);

describe("powershell", () => {
    it("security-protect-item-by-id", async () => {
        const itemId = "{F8AE75E0-CA84-43D9-8B04-14D97BD2F601}"; 
        
        // Test protecting item by ID
        const args: Record<string, any> = {
            id: itemId,
            passThru: "true"
        };
        
        const result = await callTool(client, "security-protect-item-by-id", args);
        const json = JSON.parse(result.content[0].text);
        
        // Verify the item is protected
        expect(json.Obj[0]["__Read Only"]).toBe(1);
        
        await callTool(client, "security-unprotect-item-by-id", args);
    });
});