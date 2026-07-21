import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";
import { getSwitchParameterValue } from "../../utils.js";

export function getPlaceholderSettingByPathPowershellTool(server: McpServer, config: Config) {
    server.tool(
        "presentation-get-placeholder-setting-by-path",
        "Gets placeholder setting assigned on the item specified by path.",
        {
            itemPath: z.string().describe("The path of the item to get placeholder setting for."),
            key: z.string().describe("The key filter.").optional(),
            uniqueId: z.string().describe("The placeholder setting unique id.").optional(),
            language: z.string().describe("The language version of the item to retrieve placeholder setting for.").optional(),
            finalLayout: z
                .boolean()
                .describe("Specifies layout holding the placeholder setting. If 'true', the final layout is used, otherwise - shared layout.")
                .optional(),
        },
        async (params) => {
            const command = `Get-PlaceholderSetting`;
            const options: Record<string, any> = {};

            options["Path"] = params.itemPath;
            options["Key"] = params.key;
            options["UniqueId"] = params.uniqueId;
            options["Language"] = params.language;
            options["FinalLayout"] = getSwitchParameterValue(params.finalLayout);

            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );
}
