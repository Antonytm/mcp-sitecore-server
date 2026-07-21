import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../../simple/generic.js";
import { PowershellCommandBuilder, quotePowerShellString } from "../../command-builder.js";
import { getSwitchParameterValue } from "../../utils.js";
import { renderingLookupGuard, renderingNotFoundMessage } from "./rendering-guard.js";

export function switchRenderingByIdPowershellTool(server: McpServer, config: Config) {
    server.registerTool(
        "presentation-switch-rendering-by-id",
        {
            description: "Switches an existing rendering specified by item ID with an alternate one for the item specified by item ID.",
            inputSchema: {
                itemId: z.string().describe("The ID of the item holding the renderings."),
                oldRenderingId: z. string().describe("The ID of the rendering to switch."),
                newRenderingId: z.string().describe("The ID of the new rendering."),
                database: z.string().describe("The context database.").optional().default("master"),
                finalLayout: z
                    .boolean()
                    .describe("Specifies the layout to update the rendering. If 'true', the final layout is used, otherwise - shared layout.")
                    .optional(),
                language: z.string().describe("The language version of the item holding the renderings.").optional(),
            },
        },
        async (params) => {
            const commandBuilder = new PowershellCommandBuilder();

            const getRenderingParameters: Record<string, any> = {};
            getRenderingParameters["Id"] = params.itemId;
            getRenderingParameters["Database"] = params.database;
            getRenderingParameters["Language"] = params.language;
            getRenderingParameters["FinalLayout"] = getSwitchParameterValue(params.finalLayout);

            const newRenderingParameters: Record<string, any> = {};
            newRenderingParameters["Id"] = params.newRenderingId;
            newRenderingParameters["Database"] = params.database;

            const switchRenderingParameters: Record<string, any> = {};
            switchRenderingParameters["Id"] = params.itemId;
            switchRenderingParameters["Database"] = params.database;
            switchRenderingParameters["Language"] = params.language;
            switchRenderingParameters["FinalLayout"] = getSwitchParameterValue(params.finalLayout);

            const notFound = renderingNotFoundMessage(
                `a rendering with ID '${params.oldRenderingId}' on the item with ID '${params.itemId}' in database '${params.database}'`,
                "presentation-get-rendering-by-id"
            );

            const command = `
                $sourceRenderings = Get-Rendering ${commandBuilder.buildParametersString(getRenderingParameters)} | Where-Object { $_.ItemID -ceq ${quotePowerShellString(params.oldRenderingId)} };
                ${renderingLookupGuard("$sourceRenderings", notFound, { collection: true })}
                $targetRendering = New-Rendering ${commandBuilder.buildParametersString(newRenderingParameters)}
                foreach($sourceRendering in $sourceRenderings) {
                    Switch-Rendering -Instance $sourceRendering -NewRendering $targetRendering ${commandBuilder.buildParametersString(switchRenderingParameters)}
                }
            `;

            return safeMcpResponse(runGenericPowershellCommand(config, command, {}));
        }
    );
}