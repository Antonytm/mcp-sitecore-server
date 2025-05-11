import { describe, it, expect } from "vitest";
import { callTool } from "@modelcontextprotocol/inspector/cli/build/client/tools.js";
import { client, transport } from "../../../../client";
import { time } from "console";

await client.connect(transport);

describe("powershell", () => {
    it("security-lock-item-by-path", async () => {
        // Using a common content path that should exist in most Sitecore instances
        const args: Record<string, any> = {
            path: "/sitecore/content/Home/Tests/Security/Lock-Item/Lock-Item-By-Path",
            passThru: "true"
        };

        const result = await callTool(client, "security-lock-item-by-path", args);
        const json = JSON.parse(result.content[0].text);

        expect(json.Obj[0].__Lock).contains(
            "sitecore\\admin"
        );

        // Unlock the item after test to clean up
        const forceArgs: Record<string, any> = {
            path: "/sitecore/content/Home/Tests/Security/Lock-Item/Lock-Item-By-Path",
        };

        await callTool(client, "security-unlock-item-by-path", forceArgs);
    });
});