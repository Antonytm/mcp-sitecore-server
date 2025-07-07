import { describe, it, expect } from "vitest";
import { callTool } from "@modelcontextprotocol/inspector/cli/build/client/tools.js";
import { client, transport } from "../../../../client";

await client.connect(transport);

describe("powershell", () => {
    it("common-get-item-clone-by-path", async () => {
        // Arrange
        const itemPath = "/sitecore/content/Home/Tests/Common/Get-Item-Clone-By-Id";
        const destinationPath = "/sitecore/content/Home/Tests/Common";
        const name = "Item Clone By Path Test";

        const newCloneArgs: Record<string, any> = {
            path: itemPath,
            destination: destinationPath,
            name: name,
        };

        await callTool(client, "common-new-item-clone-by-path", newCloneArgs);

        const args: Record<string, any> = {
            path: itemPath,
        };

        // Act
        const result = await callTool(client, "common-get-item-clone-by-path", args);

        // Assert
        const json = JSON.parse(result.content[0].text);
        const itemClone = json.Obj[0];

        expect(itemClone.Name).toBe(name);
        expect(itemClone.IsItemClone).toBeTruthy();

        // Cleanup
        const deleteItemArgs: Record<string, any> = {
            id: itemClone.ID.ToString,
        };

        await callTool(client, "item-service-delete-item", deleteItemArgs);
    });
});
