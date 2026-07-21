import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function getItemReferenceByPathPowerShellTool(server: McpServer, config: Config) {
    server.tool(
        "common-get-item-reference-by-path",
        "Gets item references for a Sitecore item by its path, showing where it is used throughout the system.",
        {
            path: z.string()
                .describe("The path of the item to retrieve references for (e.g. /sitecore/content/Home)"),
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
