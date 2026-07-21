import type { ToolServer } from "@/tool-server.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";
import { getSwitchParameterValue } from "../../utils.js";

export function convertFromItemCloneByPathPowerShellTool(server: ToolServer, config: Config) {
    server.tool(
        "common-convert-from-item-clone-by-path",
        "Converts an item from a clone to a fully independent item by its path.",
        {
            path: z.string()
                .describe("The path of the item to be analysed for clones presence."),
            recurse: z.boolean().optional()
                .describe("Converts the whole branch rather than a single item."),
            passThru : z.boolean().optional()
                .describe("Returns the item that was converted from a clone."),
            database: z.string().optional()
                .describe("The database containing the item (defaults to the context database).")
        },
        async (params) => {
            const options: Record<string, any> = {
                "Path": params.path
            };
            const command = `ConvertFrom-ItemClone`;

            if (params.recurse) {
                options["Recurse"] = getSwitchParameterValue(params.recurse);
            }

            if (params.passThru) {
                options["PassThru"] = getSwitchParameterValue(params.passThru);
            }

            if (params.database) {
                options["Database"] = params.database;
            }

            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );
}
