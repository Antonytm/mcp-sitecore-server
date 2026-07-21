import type { ToolServer } from "@/tool-server.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function removeBaseTemplateByPathPowerShellTool(server: ToolServer, config: Config) {
    server.tool(
        "common-remove-base-template-by-path",
        "Removes a base template from a template item by its path.",
        {
            path: z.string()
                .describe("The path of the item to remove the base template from."),
            template: z.string()
                .describe("The path representing the template item to remove as a base template."),
            database: z.string().optional()
                .describe("The database containing the item (defaults to the context database).")
        },
        async (params) => {
            const options: Record<string, any> = {
                "Path": params.path,
                "Template": params.template,
            };
            const command = `Remove-BaseTemplate`;

            if (params.database) {
                options["Database"] = params.database;
            }

            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );
}
