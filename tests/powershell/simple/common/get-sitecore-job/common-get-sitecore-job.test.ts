import { describe, it, expect } from "vitest";
import { callTool } from "@modelcontextprotocol/inspector/cli/build/client/tools.js";
import { client, transport } from "../../../../client";

await client.connect(transport);

describe("powershell", () => {
    it("common-get-sitecore-job", async () => {
        // Act
        const result = await callTool(client, "common-get-sitecore-job", {});
        
        // Assert
        const json = JSON.parse(result.content[0].text);

        expect(json.Obj.length).toBeGreaterThan(0);
        expect(json.Obj.map(x => x.ToString)).toContain("Sitecore.Jobs.DefaultJob");
    });
});
