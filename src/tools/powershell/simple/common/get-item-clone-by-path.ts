import type { ToolServer } from "@/tool-server.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function getItemCloneByPathPowerShellTool(server: ToolServer, config: Config) {
    server.tool(
        "common-get-item-clone-by-path",
        "Returns all the clones for the specified item by its path.",
        {
            path: z.string()
                .describe("The path of the item to be analysed for clones presence."),
            database: z.string().optional()
                .describe("The database containing the item (defaults to the context database).")
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
