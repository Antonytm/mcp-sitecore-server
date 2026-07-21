import type { ToolServer } from "@/tool-server.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";
import { getSwitchParameterValue } from "../../utils.js";

export function removeItemVersionByIdPowerShellTool(server: ToolServer, config: Config) {
    server.tool(
        "common-remove-item-version-by-id",
        "Removes a version of a Sitecore item by ID.",
        {
            id: z.string()
                .describe("The ID of the item to remove version for."),
            language: z.string()
                .describe("Language that should be deleted form the provided item. Language parameter supports globbing so you can delete whole language groups using wildcards."),
            version: z.string().optional()
                .describe("Version that should be deleted form the provided item. Version parameter supports globbing so you can delete whole version groups using wildcards."),
            recurse: z.boolean().optional()
                .describe("Removes language versions from the item and all of its children."),
            maxRecentVersions: z.number().optional()
                .describe("Trims the selected language to value specified by this parameter."),
            database: z.string().optional()
                .describe("The database containing the item (defaults to the context database)."),
            archive: z.boolean().optional()
                .describe("Moves the items to the archive rather than recycle bin."),
        },
        async (params) => {
            const options: Record<string, any> = {
                "Id": params.id,
                "Language": params.language,
            };
            const command = `Remove-ItemVersion`;

            if (params.version) {
                options["Version"] = params.version;
            }

            if (params.recurse) {
                options["Recurse"] = getSwitchParameterValue(params.recurse);
            }

            if (params.maxRecentVersions) {
                options["MaxRecentVersions"] = params.maxRecentVersions;
            }

            if (params.database) {
                options["Database"] = params.database;
            }

            if (params.archive) {
                options["Archive"] = getSwitchParameterValue(params.archive);
            }

            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );
}
