import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function removeDomainPowerShellTool(server: McpServer, config: Config) {
    server.registerTool(
        "security-remove-domain",
        {
            description: "Removes a Sitecore domain.",
            inputSchema: {
                name: z.string()
                    .describe("The name of the domain to remove"),
            },
        },
        async (params) => {
            const command = `Remove-Domain`;
            const options: Record<string, any> = {
                "Name": params.name,
            };

            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );
}