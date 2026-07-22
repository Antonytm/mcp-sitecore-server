import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../../simple/generic.js";
import { PowershellCommandBuilder, quotePowerShellString } from "../../command-builder.js";

export function removeArchiveItemPowerShellTool(server: McpServer, config: Config) {
    server.registerTool(
        "common-remove-archive-item",
        {
            description: "Removes items permanently from the specified archive.",
            inputSchema: {
                archive: z.string()
                    .describe("The name of the archive to use when determining which items to remove."),
                database: z.string()
                    .describe("The database for which the archives should be retrieved."),
                itemId: z.string().optional()
                    .describe("The ID for the original item that should be processed."),
                identity: z.string().optional()
                    .describe("The user responsible for moving the item to the archive."),
            },
        },
        async (params) => {
            const commandBuilder = new PowershellCommandBuilder();
            const parameters: Record<string, any> = {};

            if (params.itemId) {
                parameters["ItemId"] = params.itemId;
            }

            if (params.identity) {
                parameters["Identity"] = params.identity;
            }

            const command = `
                $database = Get-Database -Name ${quotePowerShellString(params.database)};
                $archive = Get-Archive -Database $database -Name ${quotePowerShellString(params.archive)};
                Remove-ArchiveItem ${commandBuilder.buildParametersString(parameters)} -Archive $archive;
            `;

            return safeMcpResponse(runGenericPowershellCommand(config, command, {}));
        }
    );
}
