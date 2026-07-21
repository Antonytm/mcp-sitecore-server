import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function unprotectItemByIdPowerShellTool(server: McpServer, config: Config) {
    server.tool(
        "security-unprotect-item-by-id",
        "Unprotect a Sitecore item by its ID.",
        {
            id: z.string()
                .describe("The ID of the item to unprotect"),
            passThru: z.boolean().optional()
                .describe("If set to true, passes the processed object back to the pipeline"),
            database: z.string().optional()
                .describe("The database containing the item (defaults to the context database)")
        },
        async (params) => {
            const command = `Unprotect-Item`;
            const options: Record<string, any> = {
                "Id": params.id,
            };

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
