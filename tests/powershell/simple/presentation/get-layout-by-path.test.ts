import { describe, it, expect } from "vitest";
import { callTool } from "@modelcontextprotocol/inspector/cli/build/client/tools.js";
import { client, transport } from "../../../client";

await client.connect(transport);

// /sitecore/content/Home/Tests/Presentation/Get-Layout-By-Path
const path = "master:/sitecore/content/Home/Tests/Presentation/Get-Layout-By-Path";
const sharedLayoutId = "{D6B14132-F0DE-4225-9006-1B41BC4E7852}";
const finalLayoutId = "{C36E76F8-576E-474F-9894-76C087CD89B5}";
const anotherLanguageLayoutId = "{800C8DAA-207D-43A7-8C69-EC84F1AF661D}";
const sharedLayoutDisplayName = "Shared";
const finalLayoutDisplayName = "Final";
const anotherLanguageLayoutDisplayName = "Another Language";

describe("powershell", () => {
    it("presentation-get-layout-by-path", async () => {
        // Arrange
        const args: Record<string, any> = {
            path: path,        
        };

        // Act
        const result = await callTool(client, "presentation-get-layout-by-path", args);
        const json = JSON.parse(result.content[0].text);

        // Assert
        const testObject = json.Obj[0];
        expect(testObject.ID.ToString.toLowerCase()).toBe(sharedLayoutId.toLowerCase());
        expect(testObject.DisplayName).toBe(sharedLayoutDisplayName);
    });

    it("presentation-get-layout-by-path-final-layout", async () => {
        // Arrange
        const args: Record<string, any> = {
            path: path,
            finalLayout: "true",
        };

        // Act
        const result = await callTool(client, "presentation-get-layout-by-path", args);
        const json = JSON.parse(result.content[0].text);

        // Assert
        const testObject = json.Obj[0];
        expect(testObject.ID.ToString.toLowerCase()).toBe(finalLayoutId.toLowerCase());
        expect(testObject.DisplayName).toBe(finalLayoutDisplayName);
    });

    it("presentation-get-layout-by-path-language", async () => {
        // Arrange
        const args: Record<string, any> = {
            path: path,
            finalLayout: "true",
            language: "ja-jp",
        };

        // Act
        const result = await callTool(client, "presentation-get-layout-by-path", args);
        const json = JSON.parse(result.content[0].text);

        // Assert
        const testObject = json.Obj[0];
        expect(testObject.ID.ToString.toLowerCase()).toBe(anotherLanguageLayoutId.toLowerCase());
        expect(testObject.DisplayName).toBe(anotherLanguageLayoutDisplayName);
    });
});