import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../../simple/generic.js";
import { PowershellCommandBuilder } from "../../command-builder.js";
import { getSwitchParameterValue } from "../../utils.js";

export function addPlaceholderSettingByPathPowershellTool(server: McpServer, config: Config) {
    server.registerTool(
        "presentation-add-placeholder-setting-by-path",
        {
            description: "Adds a placeholder setting to the item specified by path.",
            inputSchema: {
                itemPath: z.string().describe("The path of the item to add the placeholder setting to."),
                placeholderSettingPath: z.string().describe("The path of the placeholder setting to add."),
                key: z.string().describe("The key of the placeholder setting to add."),
                finalLayout: z
                    .boolean()
                    .describe("Specifies layout to add the rendering placeholder setting to. If 'true', the final layout is used, otherwise - shared layout.")
                    .optional(),
                language: z.string().describe("The language version of the item to add the placeholder setting to.").optional(),
            },
        },
        async (params) => {
            const commandBuilder = new PowershellCommandBuilder();
            const createPlaceholderSettingParameters: Record<string, any> = {};
            createPlaceholderSettingParameters["Path"] = params.placeholderSettingPath;

            const addPlaceholderSettingParameters: Record<string, any> = {};
            addPlaceholderSettingParameters["Path"] = params.itemPath;
            addPlaceholderSettingParameters["Key"] = params.key;
            addPlaceholderSettingParameters["FinalLayout"] = getSwitchParameterValue(params.finalLayout);
            addPlaceholderSettingParameters["Language"] = params.language;

            const command = `
                $placeholderSetting = New-PlaceholderSetting ${commandBuilder.buildParametersString(createPlaceholderSettingParameters)}
                Add-PlaceholderSetting -Instance $placeholderSetting ${commandBuilder.buildParametersString(addPlaceholderSettingParameters)}
            `;

            return safeMcpResponse(runGenericPowershellCommand(config, command, {}));
        }
    );
}