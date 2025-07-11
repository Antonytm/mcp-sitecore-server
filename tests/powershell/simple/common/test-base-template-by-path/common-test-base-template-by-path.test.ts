import { describe, it, expect } from "vitest";
import { callTool } from "@modelcontextprotocol/inspector/cli/build/client/tools.js";
import { client, transport } from "../../../../client";

await client.connect(transport);

describe("powershell", () => {
    it("common-test-base-template-by-path", async () => {
        // Arrange
        const itemPath = "/sitecore/content/Home/Tests/Common/Test-Base-Template";
        const templatePath = "/sitecore/templates/Sample/Sample Item";
        
        const args: Record<string, any> = {
            path: itemPath,
            template: templatePath
        };

        // Act
        const result = await callTool(client, "common-test-base-template-by-path", args);
        
        // Assert
        const json = JSON.parse(result.content[0].text);
        
        expect(json).toBeDefined();
        expect(json.Obj[0]).toBeTruthy();
    });
});
