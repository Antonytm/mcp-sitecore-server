import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";
import { getSwitchParameterValue } from "../../utils.js";

export function resetItemFieldByPathPowerShellTool(server: McpServer, config: Config) {
    server.tool(
        "common-reset-item-field-by-path",
        "Resets item fields, specified as either names, fields or template fields by path.",
        {
            path: z.string()
                .describe("The path of the item to be analysed."),
            name: z.array(z.string()).optional()
                .describe("Array of field names to include - supports wildcards."),
            includeStandardFields: z.boolean().optional()
                .describe("Includes fields that are defined on Standard template."),
            database: z.string().optional()
                .describe("The database containing the item (defaults to the context database)."),
        },
        async (params) => {
            const options: Record<string, any> = {
                "Path": params.path,
            };
            const command = `Reset-ItemField`;

            if (params.name && params.name.length > 0) {
                options["Name"] = params.name;
            }

            if (params.includeStandardFields) {
                options["IncludeStandardFields"] = getSwitchParameterValue(params.includeStandardFields);
            }

            if (params.database) {
                options["Database"] = params.database;
            }

            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );
}
