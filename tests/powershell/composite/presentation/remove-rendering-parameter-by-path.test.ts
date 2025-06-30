import { describe, it, expect } from "vitest";
import { callTool } from "@modelcontextprotocol/inspector/cli/build/client/tools.js";
import { client, transport } from "../../../client";
import { resetLayoutByPath } from "../../tools/reset-layout";
import { getRenderingByPath } from "../../tools/get-rendering";

await client.connect(transport);

const itemPath = "master:/sitecore/content/Home/Tests/Presentation/Remove-Rendering-Parameter-By-Path";

const renderingUniqueId = "{B343725A-3A93-446E-A9C8-3A2CBD3DB489}";
const name = "sample";
const finalLayout = "true";
const language = "ja-jp";

describe("powershell", () => {
    it("presentation-remove-rendering-parameter-by-path", async () => {
        // Arrange
        // Initialize item initial state before test.
        await resetLayoutByPath(client, itemPath, language, finalLayout);

        const removeRenderingParameterArgs: Record<string, any> = {
            itemPath,
            renderingUniqueId,
            name,
            language,
            finalLayout,
        };

        // Act
        await callTool(client, "presentation-remove-rendering-parameter-by-path", removeRenderingParameterArgs);

        // Assert
        const renderings = await getRenderingByPath(client, itemPath, renderingUniqueId, language, finalLayout);
        const rendering = renderings[0];
        expect(rendering.Parameters).not.toContain(name);
    });
});
