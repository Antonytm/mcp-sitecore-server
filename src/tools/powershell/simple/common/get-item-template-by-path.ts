import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function getItemTemplateByPathPowerShellTool(server: McpServer, config: Config) {
    server.tool(
        "common-get-item-template-by-path",
        "Gets template information for a Sitecore item by its path.",
        {
            path: z.string()
                .describe("The path of the item to retrieve template information for (e.g. /sitecore/content/Home)."),
            database: z.string().optional()
                .describe("The database containing the item (defaults to the context database).")
        },
        async (params) => {
            const options: Record<string, any> = {
                "Path": params.path
            };
            const command = `Get-ItemTemplate`;

            if (params.database) {
                options["Database"] = params.database;
            }

            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );
}
