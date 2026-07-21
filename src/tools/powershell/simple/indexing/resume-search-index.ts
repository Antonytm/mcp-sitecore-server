import type { ToolServer } from "@/tool-server.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function resumeSearchIndexPowerShellTool(server: ToolServer, config: Config) {
    server.tool(
        "indexing-resume-search-index",
        "Resume one or more Sitecore search indexes. If no name is provided, all paused indexes will be resumed.",
        {
            name: z.string().optional().describe("The name of the index to resume. If not provided, all paused indexes will be resumed."),
        },
        async (params) => {
            const command = `Resume-SearchIndex`;
            const options: Record<string, any> = {};
            
            if (params.name) {
                options["Name"] = params.name;
            }

            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );
}
