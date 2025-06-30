import { describe, it, expect } from "vitest";
import { callTool } from "@modelcontextprotocol/inspector/cli/build/client/tools.js";
import { client, transport } from "../../../client";
import { resetLayoutByPath } from "../../tools/reset-layout";

await client.connect(transport);

const itemPath = "/sitecore/content/Home/Tests/Presentation/Remove-Placeholder-Setting-By-Path";

const placeholderSettingUniqueId = "{77CD012F-A0EC-4B09-9F51-4AD4587B6490}";
const placeholderSettingKey = "test_placeholder";

const language = "ja-jp";
const finalLayout = "true";

async function getItemPlaceholderSettings(): Promise<any> {
    const getPlaceholderSettingArgs: Record<string, any> = {
        itemPath,
        language,
        finalLayout,
    };

    const result = await callTool(client, "presentation-get-placeholder-setting-by-path", getPlaceholderSettingArgs);    
    const json = JSON.parse(result.content[0].text);

    return json.Obj;
}

describe("powershell", () => {
    it("presentation-remove-placeholder-setting-by-path-using-uniqueid", async () => {
        // Arrange
        // Initialize item initial state before test.        
        await resetLayoutByPath(client, itemPath, language, finalLayout);

        const removePlaceholderSettingArgs: Record<string, any> = {
            itemPath,
            uniqueId: placeholderSettingUniqueId,
            finalLayout,
            language,
        };

        // Act
        await callTool(client, "presentation-remove-placeholder-setting-by-path", removePlaceholderSettingArgs);

        // Assert
        const placeholderSettings = await getItemPlaceholderSettings();

        expect(placeholderSettings).toBeUndefined();
    });

    it("presentation-remove-placeholder-setting-by-path-using-key", async () => {
        // Arrange
        // Initialize item initial state before test.        
        await resetLayoutByPath(client, itemPath, language, finalLayout);

        const removePlaceholderSettingArgs: Record<string, any> = {
            itemPath,
            key: placeholderSettingKey,
            finalLayout,
            language,
        };

        // Act
        await callTool(client, "presentation-remove-placeholder-setting-by-path", removePlaceholderSettingArgs);

        // Assert
        const placeholderSettings = await getItemPlaceholderSettings();

        expect(placeholderSettings).toBeUndefined();
    });
});
