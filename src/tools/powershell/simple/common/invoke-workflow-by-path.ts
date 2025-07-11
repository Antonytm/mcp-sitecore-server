import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function invokeWorkflowByPathPowerShellTool(server: McpServer, config: Config) {
    server.tool(
        "common-invoke-workflow-by-path",
        "Executes workflow action for a Sitecore item by its path.",
        {
            path: z.string()
                .describe("The path of the item to have the workflow action executed."),
            commandName: z.string()
                .describe("The name of the workflow command."),
            comments: z.string().optional()
                .describe("The comment to be saved in the history table for the action."),
            language: z.string().optional()
                .describe("The language that will be used as source language."),
            database: z.string().optional()
                .describe("The database containing the item (defaults to the context database).")
        },
        async (params) => {
            const options: Record<string, any> = {
                "Path": params.path,
                "CommandName": params.commandName,
            };
            const command = `Invoke-Workflow`;

            if (params.comments) {
                options["Comments"] = params.comments;
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
