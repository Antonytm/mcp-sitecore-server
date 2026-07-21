import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function mergeLayoutByPathPowershellTool(server: McpServer, config: Config) {
    server.registerTool(
        "presentation-merge-layout-by-path",
        {
            description: "Merges final and shared layouts by item path.",
            inputSchema: {
                path: z.string().describe("The path of the item to merge layout for."),
                language: z.string().optional().describe("The item language to merge layout for."),
            },
        },
        async (params) => {
            const command = `Merge-Layout`;
            const options: Record<string, any> = {};

            options["Path"] = params.path;
            options["Language"] = params.language;

            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );
}