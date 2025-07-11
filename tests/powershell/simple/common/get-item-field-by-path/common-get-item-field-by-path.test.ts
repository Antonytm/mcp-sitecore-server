import { describe, it, expect } from "vitest";
import { callTool } from "@modelcontextprotocol/inspector/cli/build/client/tools.js";
import { client, transport } from "../../../../client";

await client.connect(transport);

describe("powershell", () => {
    it("common-get-item-field-by-path", async () => {
        // Arrange
        const itemPath = "/sitecore/content/Home/Tests/Common/Get-Item-Field";

        const args: Record<string, any> = {
            path: itemPath
        };

        // Act
        const result = await callTool(client, "common-get-item-field-by-path", args);
        
        // Assert
        const json = JSON.parse(result.content[0].text);

        expect(json).toBeDefined();
        expect(json.Obj).toEqual(expect.arrayContaining([
            "Text",
            "Title",
        ]));
    });
});
