import type { ToolServer } from "@/tool-server.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../../simple/generic.js";
import { quotePowerShellString } from "../../command-builder.js";

export function removeSearchIndexItemByIdPowerShellTool(server: ToolServer, config: Config) {
    server.tool(
        "indexing-remove-search-index-item-by-id",
        "Removes the item with the specified ID from the search index. Supports wildcard filtering for the index name.",
        {
            id: z.string()
                .describe("The ID of the item to remove from the index"),
            path: z.string()
                .default("master:")
                .optional(),
            indexName: z.string()
                .default("sitecore_*_index")
                .optional()
                .describe("The name of the index to remove the item from"),
        },
        async (params) => {
            const command = `
                $item = Get-Item -Id ${quotePowerShellString(params.id)} -Path ${quotePowerShellString(params.path)};
                $indexName = ${quotePowerShellString(params.indexName)};
                Remove-SearchIndexItem -Item $item -Name $indexName
            `.replaceAll(/[\n]+/g, "");

            return safeMcpResponse(runGenericPowershellCommand(config, command, {}));
        }
    );
}
