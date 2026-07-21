import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../../simple/generic.js";
import { quotePowerShellString } from "../../command-builder.js";

export function initializeSearchIndexingItemByPathPowerShellTool(server: McpServer, config: Config) {
    server.registerTool(
        "indexing-initialize-search-index-item-by-path",
        {
            description: "Rebuilds the index for a given tree with the specified root item by path and index name. Supports wildcard filtering for the index name.",
            inputSchema: {
                path: z.string()
                    .describe("The path of the item to rebuild the index for"),
                indexName: z.string()
                    .default("sitecore_*_index")
                    .optional()
                    .describe("The name of the index to rebuild"),
            },
        },
        async (params) => {
            const command = `
                $item = Get-Item -Path ${quotePowerShellString(params.path)};
                $indexName = ${quotePowerShellString(params.indexName)};
                Initialize-SearchIndexItem -Item $item -Name $indexName
            `.replaceAll(/[\n]+/g, "");

            return safeMcpResponse(runGenericPowershellCommand(config, command, {}));
        }
    );
}

