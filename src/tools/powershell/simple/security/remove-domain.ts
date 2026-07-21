import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function removeDomainPowerShellTool(server: McpServer, config: Config) {
    server.tool(
        "security-remove-domain",
        "Removes a Sitecore domain.",
        {
            name: z.string()
                .describe("The name of the domain to remove"),
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