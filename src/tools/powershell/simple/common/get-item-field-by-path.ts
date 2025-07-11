import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";
import { getSwitchParameterValue } from "../../utils.js";

export function getItemFieldByPathPowerShellTool(server: McpServer, config: Config) {
    server.tool(
        "common-get-item-field-by-path",
        "Gets item fields as either names or fields or template fields by its path.",
        {
            path: z.string()
                .describe("The path of the item to retrieve field information for."),
            name: z.array(z.string()).optional()
                .describe("The array of names to include - supports wildcards."),
            includeStandardFields : z.boolean().optional()
                .describe("Includes fields that are defined on 'Standard template'."),
            returnType : z.enum(["Name", "Field", "TemplateField"]).optional()
                .describe("Includes fields that are defined on 'Standard template'."),
            language: z.string().optional()
                .describe("The language that will be analysed."),
            database: z.string().optional()
                .describe("The database containing the item (defaults to the context database).")
        },
        async (params) => {
            const options: Record<string, any> = {
                "Path": params.path
            };
            const command = `Get-ItemField`;

            if (params.name && params.name.length > 0) {
                options["Name"] = params.name;
            }

            if (params.includeStandardFields) {
                options["IncludeStandardFields"] = getSwitchParameterValue(params.includeStandardFields);
            }

            if (params.returnType) {
                options["ReturnType"] = params.returnType;
            }

            if (params.language) {
                options["Language"] = params.language;
            }

            if (params.database) {
                options["Database"] = params.database;
            }

            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );
}
