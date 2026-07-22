import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";
import { getSwitchParameterValue } from "../../utils.js";

export function resetItemFieldByIdPowerShellTool(server: McpServer, config: Config) {
    server.registerTool(
        "common-reset-item-field-by-id",
        {
            description: "Resets item fields, specified as either names, fields or template fields by ID.",
            inputSchema: {
                id: z.string()
                    .describe("The ID of the item to be analysed."),
                name: z.array(z.string()).optional()
                    .describe("Array of field names to include - supports wildcards."),
                includeStandardFields: z.boolean().optional()
                    .describe("Includes fields that are defined on Standard template."),
                database: z.string().optional()
                    .describe("The database containing the item (defaults to the context database)."),
            },
        },
        async (params) => {
            const options: Record<string, any> = {
                "Id": params.id,
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
