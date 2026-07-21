import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function addBaseTemplateByPathPowerShellTool(server: McpServer, config: Config) {
    server.registerTool(
        "common-add-base-template-by-path",
        {
            description: "Adds a base template to a template item by its path.",
            inputSchema: {
                path: z.string()
                    .describe("The path of the item to add the base template to."),
                template: z.string()
                    .describe("The path representing the template item to add as a base template."),
                database: z.string().optional()
                    .describe("The database containing the item (defaults to the context database).")
            },
        },
        async (params) => {
            const options: Record<string, any> = {
                "Path": params.path,
                "Template": params.template,
            };
            const command = `Add-BaseTemplate`;

            if (params.database) {
                options["Database"] = params.database;
            }

            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );
}
