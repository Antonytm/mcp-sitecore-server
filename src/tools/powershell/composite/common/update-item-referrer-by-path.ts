import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../../simple/generic.js";
import { PowershellCommandBuilder } from "../../command-builder.js";

export function updateItemReferrerByPathPowerShellTool(server: McpServer, config: Config) {
    server.tool(
        "common-update-item-referrer-by-path",
        "Updates all references to the specified item (by its path) to point to a new provided in the -NewTarget or removes links to the item.",
        {
            path: z.string()
                .describe("The path of the item to be relinked."),
            newTarget: z.string().optional()
                .describe("The path to a new item the links should be pointing to."),
            removeLink: z.boolean().optional()
                .describe("Removes all links to the current target item."),
            database: z.string().optional()
                .describe("The database containing the item (defaults to the context database)"),
            language: z.string().optional()
                .describe("The language of the item."),
        },
        async (params) => {
            const commandBuilder = new PowershellCommandBuilder();
            const addParameters: Record<string, any> = {};

            addParameters["Path"] = params.path;

            if (params.language) {
                addParameters["Language"] = params.language;
            }

            if (params.database) {
                addParameters["Database"] = params.database;
            }

            if (params.removeLink) {
                const command = `
                    Update-ItemReferrer ${commandBuilder.buildParametersString(addParameters)} -RemoveLink;
                `;

                return safeMcpResponse(runGenericPowershellCommand(config, command, {}));
            }

            const command = `
                $newTargetItem = Get-Item -Path ${params.newTarget};
                Update-ItemReferrer ${commandBuilder.buildParametersString(addParameters)} -NewTarget $newTargetItem;
            `;

            return safeMcpResponse(runGenericPowershellCommand(config, command, {}));
        }
    );
}
