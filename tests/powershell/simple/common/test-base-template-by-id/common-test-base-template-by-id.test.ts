import { describe, it, expect } from "vitest";
import { callTool } from "@modelcontextprotocol/inspector/cli/build/client/tools.js";
import { client, transport } from "../../../../client";

await client.connect(transport);

describe("powershell", () => {
    it("common-test-base-template-by-id", async () => {
        // Arrange
        // /sitecore/content/Home/Tests/Common/Test-Base-Template
        const itemId = "{C9E88066-3A0D-4C87-BA12-2B9C8BBCB791}";
        const templatePath = "/sitecore/templates/Sample/Sample Item";
        
        const args: Record<string, any> = {
            id: itemId,
            template: templatePath
        };

        // Act
        const result = await callTool(client, "common-test-base-template-by-id", args);
        
        // Assert
        const json = JSON.parse(result.content[0].text);
        
        expect(json).toBeDefined();
        expect(json.Obj[0]).toBeTruthy();
    });
});
