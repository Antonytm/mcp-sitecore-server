import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function getItemWorkflowEventByIdPowerShellTool(server: McpServer, config: Config) {
    server.tool(
        "common-get-item-workflow-event-by-id",
        "Gets entries from the workflow history for the specified item by its ID.",
        {
            id: z.string()
                .describe("The ID of the item to have its history items returned."),
            identity : z.string().optional()
                .describe("The user that has been associated with the enteries. Wildcards are supported."),
            language: z.string().optional()
                .describe("The language that will be used as source language."),
            database: z.string().optional()
                .describe("The database containing the item (defaults to the context database).")
        },
        async (params) => {
            const options: Record<string, any> = {
                "Id": params.id
            };
            const command = `Get-ItemWorkflowEvent`;

            if (params.identity) {
                options["Identity"] = params.identity;
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
