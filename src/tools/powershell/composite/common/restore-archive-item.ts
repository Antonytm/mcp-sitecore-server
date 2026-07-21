import type { ToolServer } from "@/tool-server.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../../simple/generic.js";
import { PowershellCommandBuilder, quotePowerShellString } from "../../command-builder.js";

export function restoreArchiveItemPowerShellTool(server: ToolServer, config: Config) {
    server.tool(
        "common-restore-archive-item",
        "Restores items to the original database from the specified archive.",
        {
            archive: z.string()
                .describe("The name of the archive to use when determining which items to restore."),
            database: z.string()
                .describe("The database for which the archives should be retrieved."),
            itemId: z.string().optional()
                .describe("The ID for the original item that should be processed."),
            identity: z.string().optional()
                .describe("The user responsible for moving the item to the archive."),
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
                Restore-ArchiveItem ${commandBuilder.buildParametersString(parameters)} -Archive $archive;
            `;

            return safeMcpResponse(runGenericPowershellCommand(config, command, {}));
        }
    );
}
