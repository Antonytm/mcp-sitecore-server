import type { ToolServer } from "@/tool-server.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function initializeSearchIndexPowerShellTool(server: ToolServer, config: Config) {
    server.tool(
        "indexing-initialize-search-index",
        "Initialize one or more Sitecore search indexes. If no name is provided, all indexes will be initialized.",
        {
            name: z.string().optional().describe("The name of the index to initialize. If not provided, all indexes will be initialized."),
            includeRemoteIndex: z.boolean().optional().describe("Includes remote indexes in the initialization."),
            asJob: z.boolean().optional().describe("Run the command as a job."),
        },
        async (params) => {
            const command = `Initialize-SearchIndex`;
            const options: Record<string, any> = {};
            
            if (params.name) {
                options["Name"] = params.name;
            }

            if (params.includeRemoteIndex === true) {
                options["IncludeRemoteIndex"] = "";
            }

            if (params.asJob === true) {
                options["AsJob"] = "";
            }

            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );
}
