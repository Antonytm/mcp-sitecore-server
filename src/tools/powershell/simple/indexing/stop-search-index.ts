import type { ToolServer } from "@/tool-server.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function stopSearchIndexPowerShellTool(server: ToolServer, config: Config) {
    server.tool(
        "indexing-stop-search-index",
        "Stop one or more Sitecore search indexes. If no name is provided, all running indexes will be stopped.",
        {
            name: z.string().optional().describe("The name of the index to stop. If not provided, all running indexes will be stopped."),
        },
        async (params) => {
            const command = `Stop-SearchIndex`;
            const options: Record<string, any> = {};
            
            if (params.name) {
                options["Name"] = params.name;
            }

            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );
}
