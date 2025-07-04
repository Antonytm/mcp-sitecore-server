import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function setItemTemplateByPathPowerShellTool(server: McpServer, config: Config) {
    server.tool(
        "common-set-item-template-by-path",
        "Sets the item template by the item's path.",
        {
            path: z.string()
                .describe("The path of the item to set the template for."),
            template: z.string()
                .describe("The path representing the template item."),
            fieldsToCopy: z.record(z.string(), z.string()).optional()
                .describe("The key-value pairs map the old template fields to the new template fields. The key represents the old template field, and the value represents the new template field."),
            database: z.string().optional()
                .describe("The database containing the item (defaults to the context database).")
        },
        async (params) => {
            const options: Record<string, any> = {
                "Path": params.path,
                "Template": params.template,
            };
            const command = `Set-ItemTemplate`;

            if (params.fieldsToCopy) {
                options["FieldsToCopy"] = params.fieldsToCopy;
            }

            if (params.database) {
                options["Database"] = params.database;
            }

            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );
}
