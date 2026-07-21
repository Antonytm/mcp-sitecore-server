import type { ToolServer } from "@/tool-server.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function suspendSearchIndexPowerShellTool(server: ToolServer, config: Config) {
    server.tool(
        "indexing-suspend-search-index",
        "Suspend one or more Sitecore search indexes. If no name is provided, all running indexes will be suspended.",
        {
            name: z.string().optional().describe("The name of the index to suspend. If not provided, all running indexes will be suspended."),
        },
        async (params) => {
            const command = `Suspend-SearchIndex`;
            const options: Record<string, any> = {};
            
            if (params.name) {
                options["Name"] = params.name;
            }

            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );
}
