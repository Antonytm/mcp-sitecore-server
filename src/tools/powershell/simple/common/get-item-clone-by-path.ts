import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function getItemCloneByPathPowerShellTool(server: McpServer, config: Config) {
    server.registerTool(
        "common-get-item-clone-by-path",
        {
            description: "Returns all the clones for the specified item by its path.",
            inputSchema: {
                path: z.string()
                    .describe("The path of the item to be analysed for clones presence."),
                database: z.string().optional()
                    .describe("The database containing the item (defaults to the context database).")
            },
        },
        async (params) => {
            const options: Record<string, any> = {
                "Path": params.path
            };
            const command = `Get-ItemClone`;

            if (params.database) {
                options["Database"] = params.database;
            }

            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );
}
