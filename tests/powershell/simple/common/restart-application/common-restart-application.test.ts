import { describe, it, expect } from "vitest";
import { callTool } from "@modelcontextprotocol/inspector/cli/build/client/tools.js";
import { client, transport } from "../../../../client";

await client.connect(transport);

describe("powershell", () => {
    it("common-restart-application", async () => {
        // Act
        const result = await callTool(client, "common-restart-application", {});
        
        // Assert
        const json = JSON.parse(result.content[0].text);
        expect(json).toEqual({});
    });
});
