import { describe, it, expect } from "vitest";
import { callTool } from "@modelcontextprotocol/inspector/cli/build/client/tools.js";
import { client, transport } from "../../../client";

await client.connect(transport);

// /sitecore/content/Home/Tests/Presentation/Get-Placeholder-Setting-By-Id
const itemId = "{D507DFEC-C58E-4D5B-88D5-06E60A402968}";

// /sitecore/layout/Placeholder Settings/Feature/Tests/Placeholder-Settings
const placeholderSettingId = "{2B3B1A5E-E231-40DF-BB5F-3EB0061ACC41}";

const uniqueId = "{E59BAEAE-9F59-44CB-BD23-61F5C8278BE1}";

const database = "master";

const overridenPlaceholderSettingKey = "test_placeholder_override_key";

describe("powershell", () => {
    it("presentation-get-placeholder-setting-by-id-using-uniqueid", async () => {
        // Arrange
        const args: Record<string, any> = {
            itemId,
            database,
            uniqueId,
            language: "ja-jp",
            finalLayout: "true",
        };

        // Act
        const result = await callTool(client, "presentation-get-placeholder-setting-by-id", args);
        
        // Assert
        const json = JSON.parse(result.content[0].text);
        const objectToAssert = json.Obj[0];
        expect(objectToAssert.UniqueId.toLowerCase()).toBe(uniqueId.toLowerCase());
        expect(objectToAssert.Key).toBe("test_placeholder");
        expect(objectToAssert.MetaDataItemId.toLowerCase()).toBe(placeholderSettingId.toLowerCase());
    });

    it("presentation-get-placeholder-setting-by-id-using-key", async () => {
        // Arrange
        const args: Record<string, any> = {
            itemId,
            database,
            key: overridenPlaceholderSettingKey,
            language: "ja-jp",
            finalLayout: "true",
        };

        // Act
        const result = await callTool(client, "presentation-get-placeholder-setting-by-id", args);
        
        // Assert
        const json = JSON.parse(result.content[0].text);
        const objectToAssert = json.Obj[0];
        expect(objectToAssert.Key).toBe(overridenPlaceholderSettingKey);
        expect(objectToAssert.MetaDataItemId.toLowerCase()).toBe(placeholderSettingId.toLowerCase());
    });
});
