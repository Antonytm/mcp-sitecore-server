import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function lockItemByIdPowerShellTool(server: McpServer, config: Config) {
    server.registerTool(
        "security-lock-item-by-id",
        {
            description: "Lock a Sitecore item by its ID.",
            inputSchema: {
                id: z.string()
                    .describe("The ID of the item to lock"),
                force: z.boolean().optional()
                    .describe("If set to true, will force the lock even if the item is locked by another user"),
                passThru: z.boolean().optional()
                    .describe("If set to true, passes the processed object back to the pipeline"),
                database: z.string().optional()
                    .describe("The database containing the item (defaults to the context database)")
            },
        },
        async (params) => {
            const command = `Lock-Item`;
            const options: Record<string, any> = {
                "Id": params.id,
            };

            if (params.force) {
                options["Force"] = "";
            }

            if (params.passThru) {
                options["PassThru"] = "";
            }

            if (params.database) {
                options["Database"] = params.database;
            }

            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );
}
