import { describe, it, expect } from "vitest";
import { callTool } from "@modelcontextprotocol/inspector/cli/build/client/tools.js";
import { client, transport } from "../../../client";
import { resetLayoutById } from "../../tools/reset-layout";

await client.connect(transport);

// /sitecore/content/Home/Tests/Presentation/Add-Placeholder-Setting-By-Id
const itemId = "{DBF78579-BB3C-4F26-A481-E210D7E35C85}";

// /sitecore/layout/Placeholder Settings/Feature/Tests/Placeholder-Setting
const placeholderSettingId = "{2B3B1A5E-E231-40DF-BB5F-3EB0061ACC41}";
const placeholderSettingKey = "new_placeholder_setting";

const database = "master";
const language = "ja-jp";
const finalLayout = "true";

describe("powershell", () => {
    it("presentation-add-placeholder-setting-by-id", async () => {
        // Arrange
        // Initialize item initial state before test.
        await resetLayoutById(client, itemId, database, language, finalLayout);

        const addPlaceholderSettingArgs: Record<string, any> = {
            itemId,
            placeholderSettingId,
            key: placeholderSettingKey,
            database,
            finalLayout,
            language,
        };

        // Act
        await callTool(client, "presentation-add-placeholder-setting-by-id", addPlaceholderSettingArgs);

        // Assert
        const getPlaceholderSettingArgs: Record<string, any> = {
            itemId,
            database,
            language,
            finalLayout,
        };

        const result = await callTool(client, "presentation-get-placeholder-setting-by-id", getPlaceholderSettingArgs);
        
        const json = JSON.parse(result.content[0].text);
        const objectToAssert = json.Obj[0];
        expect(objectToAssert.Key).toBe(placeholderSettingKey);
        expect(objectToAssert.MetaDataItemId.toLowerCase()).toBe(placeholderSettingId.toLowerCase());
    });
});