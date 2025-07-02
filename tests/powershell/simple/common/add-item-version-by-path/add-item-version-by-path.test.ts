import { describe, it, expect } from "vitest";
import { callTool } from "@modelcontextprotocol/inspector/cli/build/client/tools.js";
import { client, transport } from "../../../../client";

await client.connect(transport);

describe("powershell", () => {
    it("common-add-item-version-by-path", async () => {
        // Arrange
        const itemPath = "/sitecore/content/Home/Tests/Common/Add-Item-Version-By-Path";
        const language = "en";
        const targetLanguage = "fr-CA";

        const args: Record<string, any> = {
            path: itemPath,
            language: language,
            targetLanguage: targetLanguage
        };

        // Act
        await callTool(client, "common-add-item-version-by-path", args);

        // Assert
        const getItemArgs: Record<string, any> = {
            path: itemPath,
            language: targetLanguage,
        };

        const result = await callTool(client, "provider-get-item-by-path", getItemArgs);
        const json = JSON.parse(result.content[0].text);
        
        expect(json.Obj).toBeDefined();

        // Cleanup
        const removeVersionArgs: Record<string, any> = {
            path: itemPath,
            language: targetLanguage,
        };

        await callTool(client, "common-remove-item-version-by-path", removeVersionArgs);
    });
});
