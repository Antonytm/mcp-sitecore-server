// filepath: c:\source\mcp-sitecore-server\src\tools\powershell\simple\security\register-new-domain.ts
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function newDomainPowerShellTool(server: McpServer, config: Config) {
    server.registerTool(
        "security-new-domain",
        {
            description: "Creates a new Sitecore domain.",
            inputSchema: {
                name: z.string().describe("The name of the domain to create"),
            },
        },
        async (params) => {
            const command = `New-Domain`;
            const options: Record<string, any> = {
                "Name": params.name,
            };

            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );
}