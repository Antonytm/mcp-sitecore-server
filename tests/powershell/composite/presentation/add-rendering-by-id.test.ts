import { describe, it, expect } from "vitest";
import { callTool } from "@modelcontextprotocol/inspector/cli/build/client/tools.js";
import { client, transport } from "../../../client";
import { resetLayoutById } from "../../tools/reset-layout";
import { getRenderingById } from "../../tools/get-rendering";

await client.connect(transport);

// /sitecore/content/Home/Tests/Presentation/Add-Rendering-By-Id
const itemId = "{EA968F75-3F40-4493-A710-11902D4749B7}";
// /sitecore/layout/Renderings/Sample/Sample Rendering
const renderingId = "{493B3A83-0FA7-4484-8FC9-4680991CF743}";
const language = "ja-jp";
const placeHolder = "/test/placeholder";
const dataSource = "test_datasource";
const database = "master";
const finalLayout = "true";

describe("powershell", () => {
    it("presentation-add-rendering-by-id", async () => {
        // Arrange
        // Initialize item initial state before test.
        await resetLayoutById(client, itemId, database, language, finalLayout);

        const addRenderingArgs: Record<string, any> = {
            itemId,
            database,
            renderingId,
            placeHolder,
            dataSource,
            finalLayout,
            language,
            index: 0,
        };

        // Act
        await callTool(client, "presentation-add-rendering-by-id", addRenderingArgs);

        // Assert
        const renderings = await getRenderingById(client, itemId, database, undefined, language, finalLayout);
        expect(renderings.length).toBe(4);
        const addedRendering = renderings[0];
        expect(addedRendering.ItemID).toBe(renderingId);
        expect(addedRendering.Placeholder).toBe(placeHolder);
        expect(addedRendering.Datasource).toBe(dataSource);
    });
});
