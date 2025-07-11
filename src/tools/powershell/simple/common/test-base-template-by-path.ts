import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function testBaseTemplateByPathPowerShellTool(server: McpServer, config: Config) {
    server.tool(
        "common-test-base-template-by-path",
        "Checks if the item inherits from the specified template by its path.",
        {
            path: z.string()
                .describe("The path of the item to сheck template inheritance for."),
            template: z.string()
                .describe("The ID or path of the template to be analyzed."),
            database: z.string().optional()
                .describe("The database containing the item (defaults to the context database).")
        },
        async (params) => {
            const options: Record<string, any> = {
                "Path": params.path,
                "Template": params.template,
            };
            const command = `Test-BaseTemplate`;

            if (params.database) {
                options["Database"] = params.database;
            }

            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );
}
