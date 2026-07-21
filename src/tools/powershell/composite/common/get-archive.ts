import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../../simple/generic.js";
import { PowershellCommandBuilder, quotePowerShellString } from "../../command-builder.js";

export function getArchivePowerShellTool(server: McpServer, config: Config) {
    server.tool(
        "common-get-archive",
        "Gets Sitecore database archives.",
        {
            name: z.string().optional()
                .describe("The name of the archive to retrieve."),
            database: z.string().optional()
                .describe("The database for which the archives should be retrieved."),
        },
        async (params) => {
            const commandBuilder = new PowershellCommandBuilder();
            const parameters: Record<string, any> = {};

            if (params.name) {
                parameters["Name"] = params.name;
            }

            const command = `
                $database = Get-Database -Name ${quotePowerShellString(params.database)};
                Get-Archive ${commandBuilder.buildParametersString(parameters)} -database $database;
            `;

            return safeMcpResponse(runGenericPowershellCommand(config, command, {}));
        }
    );
}
