import { describe, it, expect } from "vitest";
import { callTool } from "@modelcontextprotocol/inspector/cli/build/client/tools.js";
import { client, transport } from "../../../../client";

await client.connect(transport);

describe("powershell", () => {
    it("common-update-item-referrer-by-path", async () => {
        // Arrange
        // /sitecore/content/Home/Tests/Common/Update-Item-Referrer-By-Path
        const itemPath = "{1856552C-118B-48B6-B766-A12A0069BEED}";
        const newTarget = "/sitecore/content/Home/Tests/Common/Update-Item-Referrer-By-Path-Target";
        
        const args: Record<string, any> = {
            path: itemPath,
            newTarget: newTarget
        };

        // Act
        await callTool(client, "common-update-item-referrer-by-path", args);
        
        // Assert
        const itemReferrerArgs: Record<string, any> = {
            path: itemPath,
        };

        const targetReferrerArgs: Record<string, any> = {
            path: newTarget,
        };

        // Act
        const itemReferrersResult = await callTool(client, "common-get-item-referrer-by-path", itemReferrerArgs);
        const targetReferrersResult = await callTool(client, "common-get-item-referrer-by-path", targetReferrerArgs);

        const itemReferrersJson = JSON.parse(itemReferrersResult.content[0].text);
        const targetReferrersJson = JSON.parse(targetReferrersResult.content[0].text);

        expect(itemReferrersJson.Obj).toBeUndefined();
        expect(targetReferrersJson.Obj).toBeDefined();
        expect(targetReferrersJson.Obj[0].FullPath).toBe("/sitecore/content/Home/Tests/Common/Update-Item-Referrer-By-Id");

        // Cleanup
        const updateReferrerArgs: Record<string, any> = {
            path: newTarget,
            newTarget: "/sitecore/content/Home/Tests/Common/Update-Item-Referrer-By-Path"
        };

        // Act
        await callTool(client, "common-update-item-referrer-by-path", updateReferrerArgs);
    });
});
