import { describe, it, expect } from "vitest";
import { callTool } from "@modelcontextprotocol/inspector/cli/build/client/tools.js";
import { client, transport } from "../../../../client";

await client.connect(transport);

describe("powershell", () => {
    it("common-get-item-workflow-event-by-id", async () => {
        // Arrange
        // /sitecore/content/Home/Tests/Common/Get-Item-Workflow-Event
        const itemId = "{15125CAD-DDBB-4A79-B54D-F6E798F9FFA1}";

        const args: Record<string, any> = {
            id: itemId
        };

        // Act
        const result = await callTool(client, "common-get-item-workflow-event-by-id", args);
        
        // Assert
        const json = JSON.parse(result.content[0].text);

        expect(json).toBeDefined();
        expect(json.Obj.length).toBeGreaterThan(0);
        expect(json.Obj[0].NewState).toBe("{190B1C84-F1BE-47ED-AA41-F42193D9C8FC}");
    });
});
