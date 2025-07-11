import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function newItemWorkflowEventByPathPowerShellTool(server: McpServer, config: Config) {
    server.tool(
        "common-new-item-workflow-event-by-path",
        "Creates a new entry in the workflow history for a Sitecore item by its path.",
        {
            path: z.string()
                .describe("The path of the item to have a new history entry added."),
            oldState : z.string().optional()
                .describe("The ID of the old state. If not provided - current item workflow state will be used."),
            newState : z.string().optional()
                .describe("The ID of the new state. If not provided - current item workflow state will be used."),
            text : z.string().optional()
                .describe("The action comment."),
            language: z.string().optional()
                .describe("The language that will be used as source language."),
            database: z.string().optional()
                .describe("The database containing the item (defaults to the context database).")
        },
        async (params) => {
            const options: Record<string, any> = {
                "Path": params.path
            };
            const command = `New-ItemWorkflowEvent`;

            if (params.oldState) {
                options["OldState"] = params.oldState;
            }

            if (params.newState) {
                options["NewState"] = params.newState;
            }

            if (params.text) {
                options["Text"] = params.text;
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
