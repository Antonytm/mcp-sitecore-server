import { describe, it, expect } from "vitest";
import { callTool } from "@modelcontextprotocol/inspector/cli/build/client/tools.js";
import { client, transport } from "../../../../client";

await client.connect(transport);

describe("powershell", () => {
    it("common-new-item-workflow-event-by-path", async () => {
        // Arrange
        const itemPath = "sitecore/content/Home/Tests/Common/New-Item-Workflow-Event-By-Path";

        const args: Record<string, any> = {
            path: itemPath,
            newState: "{46DA5376-10DC-4B66-B464-AFDAA29DE84F}",
            text: "Action Comment"
        };

        // Act
        await callTool(client, "common-new-item-workflow-event-by-path", args);
        
        // Assert
        const getWorkflowArgs: Record<string, any> = {
            path: itemPath,
        };

        const result = await callTool(client, "common-get-item-workflow-event-by-path", getWorkflowArgs);

        const json = JSON.parse(result.content[0].text);
        const lastEvent = json.Obj[json.Obj.length - 1];

        // sitecore/system/Workflows/Sample Workflow/Draft
        expect(lastEvent.OldState).toBe("{190B1C84-F1BE-47ED-AA41-F42193D9C8FC}");

        // /sitecore/system/Workflows/Sample Workflow/Awaiting Approval
        expect(lastEvent.NewState).toBe("{46DA5376-10DC-4B66-B464-AFDAA29DE84F}");

        expect(lastEvent.CommentFields[0].Value).toBe("Action Comment");

        // Cleanup
        const revertStateArgs: Record<string, any> = {
            path: itemPath,
            newState: "{190B1C84-F1BE-47ED-AA41-F42193D9C8FC}",
        };

        // Act
        await callTool(client, "common-new-item-workflow-event-by-path", revertStateArgs);
    });
});
