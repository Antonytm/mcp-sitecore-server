import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../../simple/generic.js";
import { PowershellCommandBuilder } from "../../command-builder.js";

export function createPackageByItemIdPowershellTool(server: McpServer, config: Config) {
    server.tool(
        "packaging-create-package-by-item-id",
        "Creates a package from the item specified by ID.",
        {
            name: z.string().describe("The name of the package to create."),
            itemId: z.string().describe("The ID of the item to create a package from."),
            database: z.string().describe("The source database.").default("master").optional(),
            author: z.string().describe("The author metadata of the package.").optional(),
            publisher: z.string().describe("The publisher metadata of the package.").optional(),
            version: z.string().describe("The version metadata of the package.").optional(),
            readMe: z.string().describe("The readme metadata of the package.").optional(),
            installMode: z.enum(["Undefined", "Overwrite", "Merge", "SideBySide"])
                .describe("The installation mode of the package.").optional(),
            mergeMode: z.enum(["Undefined", "Clear", "Append", "Merge"])
                .describe("The merge mode of the package.").optional(),
        },
        async (params) => {
            const commandBuilder = new PowershellCommandBuilder();
            
            const getItemParameters: Record<string, any> = {};
            getItemParameters["Path"] = `${params.database}:/${params.itemId}`;

            const newItemSourceParameters: Record<string, any> = {};
            newItemSourceParameters["Name"] = "SourceItem";
            newItemSourceParameters["InstallMode"] = params.installMode;
            newItemSourceParameters["MergeMode"] = params.mergeMode;

            const exportPackageParameters: Record<string, any> = {};
            exportPackageParameters["Path"] = `${params.name}.zip`;
            exportPackageParameters["Zip"] = "";

            const command = `
                $package = New-Package ${params.name};
                $package.Sources.Clear();
                ${params.author && params.author.length > 0 ? `$package.Metadata.Author = "${params.author}";` : ""}
                ${params.publisher && params.publisher.length > 0 ? `$package.Metadata.Publisher = "${params.publisher}";` : ""}
                ${params.version && params.version.length > 0 ? `$package.Metadata.Version = "${params.version}";` : ""}
                ${params.readMe && params.readMe.length > 0 ? `$package.Metadata.Readme = "${params.readMe}";` : ""}
                $source = Get-Item ${commandBuilder.buildParametersString(getItemParameters)} | New-ItemSource ${commandBuilder.buildParametersString(newItemSourceParameters)};
                $package.Sources.Add($source);
                Export-Package -Project $package ${commandBuilder.buildParametersString(exportPackageParameters)};
            `;

            return safeMcpResponse(runGenericPowershellCommand(config, command, {}));
        }
    );
}
