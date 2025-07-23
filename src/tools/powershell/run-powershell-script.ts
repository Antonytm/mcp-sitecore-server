import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { safeMcpResponse } from "@/helper.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { runGenericPowershellCommand } from "./simple/generic.js";

export function runPowershellScriptTool(server: McpServer, config: Config) {
    server.tool(
        "run-powershell-script",
        "Runs a PowerShell script and returns the output.",
        {
            script: z.string()
                .describe("The Powershell script to run."),
        },
        async (params) => {
            const command = params.script;
            return safeMcpResponse(runGenericPowershellCommand(config, command, {}));
        }
    );
}