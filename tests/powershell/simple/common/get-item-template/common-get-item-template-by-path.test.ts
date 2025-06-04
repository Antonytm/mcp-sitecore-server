import { describe, it, expect } from "vitest";
import { callTool } from "@modelcontextprotocol/inspector/cli/build/client/tools.js";
import { client, transport } from "../../../../client";

await client.connect(transport);

describe("powershell", () => {
    it("common-get-item-template-by-path", async () => {
        // Use the Home item path which exists in any Sitecore instance
        const homePath = "/sitecore/content/Home";
        
        const args: Record<string, any> = {
            path: homePath
        };

        const result = await callTool(client, "common-get-item-template-by-path", args);
        const json = JSON.parse(result.content[0].text);
        
        // Verify that the command executed successfully and returned template information
        expect(json).toBeDefined();
        expect(json.Obj).toBeDefined();
        
        // Verify that the template object has expected properties
        const template = json.Obj[0];
        expect(template).toBeDefined();
        expect(template.ToString).toContain("Template");
        expect(template.Name).toBeDefined();
        expect(template.ID).toBeDefined();
        
        // Template should have fields and sections
        expect(template.Fields).toBeDefined();
        expect(template.BaseTemplates).toBeDefined();
    });
});
