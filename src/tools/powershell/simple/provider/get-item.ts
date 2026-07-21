import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function getItemPowerShellTool(server: McpServer, config: Config) {
    server.tool(
        "provider-get-item-by-path",
        "Gets a Sitecore item by its path.",
        {
            path: z.string()
                .describe("The path of the item to retrieve (e.g. /sitecore/content/Home)"),
            database: z.string().optional()
                .describe("The database containing the item (defaults to the context database)"),
            language: z.string().optional()
                .describe("The language of the item to retrieve"),
            version: z.string().optional()
                .describe("The version of the item to retrieve"),
        },
        async (params) => {
            const command = `Get-Item`;
            const options: Record<string, any> = {
                "Path": params.path,
            };

            if (params.database) {
                options["Database"] = params.database;
            }

            if (params.language) {
                options["Language"] = params.language;
            }

            if (params.version) {
                options["Version"] = params.version;
            }

            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );

    server.tool(
        "provider-get-item-by-id",
        "Gets a Sitecore item by its ID.",
        {
            path: z.string()
                .default("master:")
                .describe("The path of the item to retrieve (e.g. master:\\content\\home)"),
            id: z.string()
                .describe("The ID of the item to retrieve (e.g. {110D559F-DEA5-42EA-9C1C-8A5DF7E70EF9})"),
            database: z.string().optional()
                .describe("The database containing the item (defaults to the context database)"),
            language: z.string().optional()
                .describe("The language of the item to retrieve"),
            version: z.string().optional()
                .describe("The version of the item to retrieve"),
        },
        async (params) => {
            const command = `Get-Item`;
            const options: Record<string, any> = {
                "ID": params.id,
                "Path": params.path,
            };

            if (params.database) {
                options["Database"] = params.database;
            }

            if (params.language) {
                options["Language"] = params.language;
            }

            if (params.version) {
                options["Version"] = params.version;
            }

            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );

    server.tool(
        "provider-get-item-by-query",
        "Gets a Sitecore item by Sitecore query.",
        {
            path: z.string()
                .default("master:")
                .describe("The path of the item to retrieve (e.g. master:\\content\\home)"),
            query: z.string()
                .describe("The Sitecore query to execute (e.g. /sitecore/content/home/*/*)"),
            database: z.string().optional()
                .describe("The database containing the item (defaults to the context database)"),
            language: z.string().optional()
                .describe("The language of the item to retrieve"),
            version: z.string().optional()
                .describe("The version of the item to retrieve"),
        },
        async (params) => {
            const command = `Get-Item`;
            const options: Record<string, any> = {
                "Query": params.query,
                "Path": params.path,
            };

            if (params.database) {
                options["Database"] = params.database;
            }

            if (params.language) {
                options["Language"] = params.language;
            }

            if (params.version) {
                options["Version"] = params.version;
            }

            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );

    server.tool(
        "provider-get-item-by-uri",
        "Gets a Sitecore item by its URI.",
        {
            path: z.string()
                .default("master:")
                .describe("The path of the item to retrieve (e.g. master:\\content\\home)"),
            uri: z.string()
                .describe("The URI of the item to retrieve (e.g. sitecore://master/home)"),
            database: z.string().optional()
                .describe("The database containing the item (defaults to the context database)"),
            language: z.string().optional()
                .describe("The language of the item to retrieve"),
            version: z.string().optional()
                .describe("The version of the item to retrieve"),
        },
        async (params) => {
            const command = `Get-Item`;
            const options: Record<string, any> = {
                "Uri": params.uri,
                "Path": params.path,
            };

            if (params.database) {
                options["Database"] = params.database;
            }

            if (params.language) {
                options["Language"] = params.language;
            }

            if (params.version) {
                options["Version"] = params.version;
            }

            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );
}
