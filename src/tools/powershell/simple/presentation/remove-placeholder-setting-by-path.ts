import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";
import { getSwitchParameterValue } from "../../utils.js";

export function removePlaceholderSettingByPathPowershellTool(server: McpServer, config: Config) {
    server.tool(
        "presentation-remove-placeholder-setting-by-path",
        "Removes placeholder setting from the item specified by path.",
        {
            itemPath: z.string().describe("The path of the item to remove placeholder settings from."),
            uniqueId: z.string().describe("The placeholder setting unique id to remove.").optional(),
            key: z.string().describe("The placeholder setting key to remove.").optional(),
            finalLayout: z.boolean()
                .describe("Specifies layout holding the placeholder setting. If 'true', the final layout is used, otherwise - shared layout.")
                .optional(),
            language: z.string().describe("The item language filter.").optional(),
        },
        async (params) => {
            const command = `Remove-PlaceholderSetting`;

            const options: Record<string, any> = {};
            options["Path"] = params.itemPath;
            options["UniqueId"] = params.uniqueId;
            options["Key"] = params.key;
            options["FinalLayout"] = getSwitchParameterValue(params.finalLayout);
            options["Language"] = params.language;

            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );
}
