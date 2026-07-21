import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function getItemReferrerByPathPowerShellTool(server: McpServer, config: Config) {
    server.tool(
        "common-get-item-referrer-by-path",
        "Gets items referring to a Sitecore item by its path, showing which items reference it.",
        {
            path: z.string()
                .describe("The path of the item to retrieve referrers for (e.g. /sitecore/content/Home)"),
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
