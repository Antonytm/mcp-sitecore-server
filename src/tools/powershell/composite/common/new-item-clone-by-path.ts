import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { PowershellCommandBuilder, quotePowerShellString } from "../../command-builder.js";
import { getSwitchParameterValue } from "../../utils.js";
import { runGenericPowershellCommand } from "../../simple/generic.js";

export function newItemCloneByPathPowerShellTool(server: McpServer, config: Config) {
    server.tool(
        "common-new-item-clone-by-path",
        "Creates a new item clone based on the item provided by its path.",
        {
            path: z.string()
                .describe("The path of the item to be cloned."),
            destination: z.string()
                .describe("The path of a parent item under which the clone should be created."),
            name: z.string()
                .describe("The name of the item clone."),
            recurse: z.boolean().optional()
                .describe("Adds the parameter to clone the whole branch rather than a single item."),
            database: z.string().optional()
                .describe("The database containing the item (defaults to the context database).")
        },
        async (params) => {
            const commandBuilder = new PowershellCommandBuilder();
            const addParameters: Record<string, any> = {};

            addParameters["Path"] = params.path;
            addParameters["Name"] = params.name;

            if (params.recurse) {
                addParameters["Recurse"] = getSwitchParameterValue(params.recurse);
            }

            if (params.database) {
                addParameters["Database"] = params.database;
            }

            const command = `
                $destinationItem = Get-Item -Path ${quotePowerShellString(params.destination)};
                New-ItemClone ${commandBuilder.buildParametersString(addParameters)} -destination $destinationItem;
            `;

            return safeMcpResponse(runGenericPowershellCommand(config, command, {}));
        }
    );
}
