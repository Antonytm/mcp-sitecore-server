import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function getItemReferenceByIdPowerShellTool(server: McpServer, config: Config) {
    server.tool(
        "common-get-item-reference-by-id",
        "Gets item references for a Sitecore item by its ID, showing where it is used throughout the system.",
        {
            id: z.string()
                .describe("The ID of the item to retrieve references for"),
            database: z.string().optional()
                .describe("The database containing the item (defaults to the context database)"),
            language: z.string().optional()
                .describe("The language of the item to check references for"),
            version: z.string().optional()
                .describe("The version of the item to check references for"),
        },
        async (params) => {
            const command = `Get-ItemReference`;
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
