import type { ToolServer } from "@/tool-server.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../../simple/generic.js";
import { quotePowerShellString } from "../../command-builder.js";

export function initializeSearchIndexingItemByIdPowerShellTool(server: ToolServer, config: Config) {
    server.tool(
        "indexing-initialize-search-index-item-by-id",
        "Rebuilds the index for a given tree with the specified root item by id and index name. Supports wildcard filtering for the index name.",
        {
            id: z.string()
                .describe("The ID of the item to rebuild the index for"),
            path: z.string()
                .default("master:")
                .optional(),
            indexName: z.string()
                .default("sitecore_*_index")
                .optional()
                .describe("The name of the index to rebuild"),
        },
        async (params) => {
            const command = `
                $item = Get-Item -Id ${quotePowerShellString(params.id)} -Path ${quotePowerShellString(params.path)};
                $indexName = ${quotePowerShellString(params.indexName)};
                Initialize-SearchIndexItem -Item $item -Name $indexName
            `.replaceAll(/[\n]+/g, "");

            return safeMcpResponse(runGenericPowershellCommand(config, command, {}));
        }
    );
}

