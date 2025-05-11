// filepath: c:\source\mcp-sitecore-server\tests\powershell\simple\security\protect-item\security-protect-item-by-path.test.ts
import { describe, it, expect } from "vitest";
import { callTool } from "@modelcontextprotocol/inspector/cli/build/client/tools.js";
import { client, transport } from "../../../../client";

await client.connect(transport);

describe("powershell", () => {
    it("security-protect-item-by-path", async () => {
        const itemPath = "/sitecore/content/Home/Tests/Security/Protect-Item/Protect-Item-By-Path"; 
        
        // Test protecting item by path
        const args: Record<string, any> = {
            path: itemPath,
            passThru: "true"
        };
        
        const result = await callTool(client, "security-protect-item-by-path", args);
        const json = JSON.parse(result.content[0].text);
        
        // Verify the item is protected
        expect(json.Obj[0]["__Read Only"]).toBe(1);

        await callTool(client, "security-unprotect-item-by-path", args);
    });
});