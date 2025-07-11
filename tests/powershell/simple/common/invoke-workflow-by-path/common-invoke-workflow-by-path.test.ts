import { describe, it, expect } from "vitest";
import { callTool } from "@modelcontextprotocol/inspector/cli/build/client/tools.js";
import { client, transport } from "../../../../client";

await client.connect(transport);

describe("powershell", () => {
    it("common-invoke-workflow-by-path", async () => {
        // Arrange
        const itemId = "{25C1BAEA-DA84-495D-9656-4CE1A5342F8C}";
        const itemPath = "/sitecore/content/Home/Tests/Common/Invoke-Workflow-By-Path";
        
        const args: Record<string, any> = {
            path: itemPath,
            commandName: "Submit"
        };

        // Act
        await callTool(client, "common-invoke-workflow-by-path", args);
        
        // Assert
        const getWorkflowArgs: Record<string, any> = {
            id: itemId,
        };

        const result = await callTool(client, "common-get-item-workflow-event-by-id", getWorkflowArgs);

        const json = JSON.parse(result.content[0].text);
        const lastEvent = json.Obj[json.Obj.length - 1];

        // sitecore/system/Workflows/Sample Workflow/Draft
        expect(lastEvent.OldState).toBe("{190B1C84-F1BE-47ED-AA41-F42193D9C8FC}");

        // /sitecore/system/Workflows/Sample Workflow/Awaiting Approval
        expect(lastEvent.NewState).toBe("{46DA5376-10DC-4B66-B464-AFDAA29DE84F}");

        // Cleanup
        const editItemArgs: Record<string, any> = {
            id: itemId,
            data: {
                "__Workflow State": "{190B1C84-F1BE-47ED-AA41-F42193D9C8FC}"
            }
        };

        await callTool(client, "item-service-edit-item", editItemArgs);
    });
});
