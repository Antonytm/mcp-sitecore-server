import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function testAccountPowerShellTool(server: McpServer, config: Config) {
    server.tool(
        "security-test-account",
        "Tests if a Sitecore user exists and has specific properties.",
        {
            identity: z.string()
                .describe("The identity of the user to test (e.g. 'admin' or full path 'sitecore\\admin')"),
            accountType: z.enum(["All", "User", "Role"]).optional()
                .describe("The type of account to test (defaults to 'All')"),
        },
        async (params) => {
            const command = `Test-Account`;
            const options: Record<string, any> = {
                "Identity": params.identity
            };

            if (params.accountType) {
                options["AccountType"] = params.accountType;
            }

           return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );
}