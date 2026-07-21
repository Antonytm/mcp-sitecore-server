import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function getItemReferrerByIdPowerShellTool(server: McpServer, config: Config) {
    server.tool(
        "common-get-item-referrer-by-id",
        "Gets items referring to a Sitecore item by its ID, showing which items reference it.",
        {
            id: z.string()
                .describe("The ID of the item to retrieve referrers for"),
            database: z.string().optional()
                .describe("The database containing the item (defaults to the context database)"),
            language: z.string().optional()
                .describe("The language of the item to check referrers for"),
            version: z.string().optional()
                .describe("The version of the item to check referrers for"),
        },
        async (params) => {
            const command = `Get-ItemReferrer`;
            const options: Record<string, any> = {
                "ID": params.id,
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
