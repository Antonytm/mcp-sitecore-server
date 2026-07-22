import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../../simple/generic.js";
import { quotePowerShellString } from "../../command-builder.js";

export function removeSearchIndexItemByPathPowerShellTool(server: McpServer, config: Config) {
    server.registerTool(
        "indexing-remove-search-index-item-by-path",
        {
            description: "Removes the item with the specified path from the search index. Supports wildcard filtering for the index name.",
            inputSchema: {
                path: z.string()
                    .describe("The path of the item to remove from the index"),
                indexName: z.string()
                    .default("sitecore_*_index")
                    .optional()
                    .describe("The name of the index to remove the item from"),
            },
        },
        async (params) => {
            const command = `
                $item = Get-Item -Path ${quotePowerShellString(params.path)};
                $indexName = ${quotePowerShellString(params.indexName)};
                Remove-SearchIndexItem -Item $item -Name $indexName
            `.replaceAll(/[\n]+/g, "");

            return safeMcpResponse(runGenericPowershellCommand(config, command, {}));
        }
    );
}
