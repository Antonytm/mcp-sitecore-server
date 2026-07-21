import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function getItemCloneByIdPowerShellTool(server: McpServer, config: Config) {
    server.tool(
        "common-get-item-clone-by-id",
        "Returns all the clones for the specified item by its ID.",
        {
            id: z.string()
                .describe("The ID of the item to be analysed for clones presence."),
            database: z.string().optional()
                .describe("The database containing the item (defaults to the context database).")
        },
        async (params) => {
            const options: Record<string, any> = {
                "Id": params.id
            };
            const command = `Get-ItemClone`;

            if (params.database) {
                options["Database"] = params.database;
            }

            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );
}
