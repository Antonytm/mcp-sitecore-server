import { describe, it, expect } from "vitest";
import { callTool } from "@modelcontextprotocol/inspector/cli/build/client/tools.js";
import { client, transport } from "../../../../client";

await client.connect(transport);

describe("powershell", () => {
    it("common-get-item-reference-by-id", async () => {
        const itemId = "{C20B746A-D74E-4A2F-B3D1-3D864C7835AD}";
        const args: Record<string, any> = {
            id: itemId
        };

        const result = await callTool(client, "common-get-item-reference-by-id", args);
        const json = JSON.parse(result.content[0].text);

        // Verify that the command executed successfully and returned reference information
        expect(json.Obj[0].Name).toBe("Sample Item");
        expect(json.Obj[1].Name).toBe("Draft");
        expect(json.Obj[2].Name).toBe("Sample Workflow");
    });
});
