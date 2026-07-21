import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function unlockItemPowerShellTool(server: McpServer, config: Config) {
    server.registerTool(
        "security-unlock-item-by-id",
        {
            description: "Unlocks a Sitecore item by its ID.",
            inputSchema: {
                id: z.string().describe("The ID of the item to unlock"),
                force: z.boolean().optional().describe("When specified the item is unlocked regardless of the owner"),
                passThru: z.boolean().optional().describe("When specified returns the item to the pipeline"),
                database: z.string().optional().describe("The database containing the item"),
            },
        },
        async (params) => {
            const command = `Unlock-Item`;
            const options: Record<string, any> = {
                "ID": params.id,
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

    server.registerTool(
        "security-unlock-item-by-path",
        {
            description: "Unlocks a Sitecore item by its path.",
            inputSchema: {
                path: z.string()
                    .describe("The path to the item to unlock"),
                force: z.boolean().optional()
                    .describe("When specified the item is unlocked regardless of the owner"),
                passThru: z.boolean().optional()
                    .describe("When specified returns the item to the pipeline"),
                database: z.string().optional()
                    .describe("The database containing the item"),
            },
        },
        async (params) => {
            const command = `Unlock-Item`;
            const options: Record<string, any> = {
                "Path": params.path,
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