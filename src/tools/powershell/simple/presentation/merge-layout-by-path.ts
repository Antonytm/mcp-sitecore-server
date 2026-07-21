import type { ToolServer } from "@/tool-server.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function mergeLayoutByPathPowershellTool(server: ToolServer, config: Config) {
    server.tool(
        "presentation-merge-layout-by-path",
        "Merges final and shared layouts by item path.",
        {
            path: z.string().describe("The path of the item to merge layout for."),
            language: z.string().optional().describe("The item language to merge layout for."),
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