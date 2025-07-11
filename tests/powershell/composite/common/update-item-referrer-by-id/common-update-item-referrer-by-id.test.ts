import { describe, it, expect } from "vitest";
import { callTool } from "@modelcontextprotocol/inspector/cli/build/client/tools.js";
import { client, transport } from "../../../../client";

await client.connect(transport);

describe("powershell", () => {
    it("common-update-item-referrer-by-id", async () => {
        // Arrange
        // /sitecore/content/Home/Tests/Common/Update-Item-Referrer-By-Id
        const itemId = "{A48AD4C0-CB64-40B6-BDD7-154A9D59F935}";
        const newTarget = "/sitecore/content/Home/Tests/Common/Update-Item-Referrer-By-Id-Target";
        
        const args: Record<string, any> = {
            id: itemId,
            newTarget: newTarget
        };

        // Act
        await callTool(client, "common-update-item-referrer-by-id", args);
        
        // Assert
        const itemReferrerArgs: Record<string, any> = {
            id: itemId,
        };

        const targetReferrerArgs: Record<string, any> = {
            path: newTarget,
        };

        // Act
        const itemReferrersResult = await callTool(client, "common-get-item-referrer-by-id", itemReferrerArgs);
        const targetReferrersResult = await callTool(client, "common-get-item-referrer-by-path", targetReferrerArgs);

        const itemReferrersJson = JSON.parse(itemReferrersResult.content[0].text);
        const targetReferrersJson = JSON.parse(targetReferrersResult.content[0].text);

        expect(itemReferrersJson.Obj).toBeUndefined();
        expect(targetReferrersJson.Obj).toBeDefined();
        expect(targetReferrersJson.Obj[0].FullPath).toBe("/sitecore/content/Home/Tests/Common/Update-Item-Referrer-By-Path");

        // Cleanup
        const updateReferrerArgs: Record<string, any> = {
            path: newTarget,
            newTarget: "/sitecore/content/Home/Tests/Common/Update-Item-Referrer-By-Id"
        };

        // Act
        await callTool(client, "common-update-item-referrer-by-path", updateReferrerArgs);
    });
});
