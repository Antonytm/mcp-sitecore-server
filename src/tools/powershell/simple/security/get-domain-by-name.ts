import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function getDomainByNamePowerShellTool(server: McpServer, config: Config) {
    server.registerTool(
        "security-get-domain-by-name",
        {
            description: "Get a Sitecore domain by its name.",
            inputSchema: {
                name: z.string(),
            },
        },
        async (params) => {
            const command = `Get-Domain`;
            const options: Record<string, any> = {
                "Name": params.name,
            };
            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );
}
