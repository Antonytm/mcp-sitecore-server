import { describe, it, expect } from "vitest";
import { callTool } from "@modelcontextprotocol/inspector/cli/build/client/tools.js";
import { client, transport } from "../../../../client";

await client.connect(transport);

describe("powershell", () => {
    it("common-reset-item-field-by-id", async () => {
        // Arrange
        // /sitecore/content/Home/Tests/Common/Reset-Item-Field-By-Id
        const itemId = "{F862A147-873F-478F-8CC8-33F542B0C441}";

        const args: Record<string, any> = {
            id: itemId,
            name: ["Text"]
        };

        // Act
        await callTool(client, "common-reset-item-field-by-id", args);

        // Assert
        const getItemArgs: Record<string, any> = {
            id: itemId,
        };

        const result = await callTool(client, "provider-get-item-by-id", getItemArgs);
        const json = JSON.parse(result.content[0].text);

        expect(json.Obj[0].Text).toBe("");

        // Cleanup
        const editItemArgs: Record<string, any> = {
            id: itemId,
            data: {
                Text: "Sample text"
            }
        };

        await callTool(client, "item-service-edit-item", editItemArgs);
    });
});
