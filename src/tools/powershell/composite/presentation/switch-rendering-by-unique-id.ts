import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../../simple/generic.js";
import { PowershellCommandBuilder } from "../../command-builder.js";
import { getSwitchParameterValue } from "../../utils.js";

export function switchRenderingByUniqueIdPowershellTool(server: McpServer, config: Config) {
    server.tool(
        "presentation-switch-rendering-by-unique-id",
        "Switches an existing rendering specified by unique ID with an alternate one for the item specified by item ID.",
        {
            itemId: z.string().describe("The ID of the item holding the rendering."),
            uniqueId: z.string().describe("The unique ID of the rendering to switch."),       
            newRenderingId: z.string().describe("The ID of the new rendering."),
            database: z.string().describe("The context database.").optional().default("master"),
            finalLayout: z
                .boolean()
                .describe("Specifies the layout to update the rendering. If 'true', the final layout is used, otherwise - shared layout.")
                .optional(),
            language: z.string().describe("The language version of the item holding the renderings.").optional(),
        },
        async (params) => {
            const commandBuilder = new PowershellCommandBuilder();

            const switchRenderingParameters: Record<string, any> = {};
            switchRenderingParameters["Id"] = params.itemId;
            switchRenderingParameters["UniqueId"] = params.uniqueId;
            switchRenderingParameters["Database"] = params.database;
            switchRenderingParameters["FinalLayout"] = getSwitchParameterValue(params.finalLayout);
            switchRenderingParameters["Language"] = params.language;

            const command = `
                $targetRendering = New-Rendering -Id "${params.newRenderingId}" -Database "${params.database}"
                Switch-Rendering -NewRendering $targetRendering ${commandBuilder.buildParametersString(switchRenderingParameters)}
            `;

            return safeMcpResponse(runGenericPowershellCommand(config, command, {}));
        }
    )
}