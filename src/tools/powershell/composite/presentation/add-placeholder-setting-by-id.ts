import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../../simple/generic.js";
import { PowershellCommandBuilder } from "../../command-builder.js";
import { getSwitchParameterValue } from "../../utils.js";

export function addPlaceholderSettingByIdPowershellTool(server: McpServer, config: Config) {
    server.tool(
        "presentation-add-placeholder-setting-by-id",
        "Adds a placeholder setting to the item specified by ID.",
        {
            itemId: z.string().describe("The ID of the item to add the placeholder setting to."),
            placeholderSettingId: z.string().describe("The ID of the placeholder setting to add."),
            key: z.string().describe("The key of the placeholder setting to add."),
            database: z.string().describe("The context database.").optional().default("master"),
            finalLayout: z
                .boolean()
                .describe("Specifies layout to add the rendering placeholder setting to. If 'true', the final layout is used, otherwise - shared layout.")
                .optional(),
            language: z.string().describe("The language version of the item to add the placeholder setting to.").optional(),
        },
        async (params) => {
            const commandBuilder = new PowershellCommandBuilder();
            const createPlaceholderSettingParameters: Record<string, any> = {};
            createPlaceholderSettingParameters["Id"] = params.placeholderSettingId;
            createPlaceholderSettingParameters["Database"] = params.database;

            const addPlaceholderSettingParameters: Record<string, any> = {};
            addPlaceholderSettingParameters["Id"] = params.itemId;
            addPlaceholderSettingParameters["Key"] = params.key;
            addPlaceholderSettingParameters["Database"] = params.database;
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