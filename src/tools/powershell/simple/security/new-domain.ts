// filepath: c:\source\mcp-sitecore-server\src\tools\powershell\simple\security\register-new-domain.ts
import type { ToolServer } from "@/tool-server.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function newDomainPowerShellTool(server: ToolServer, config: Config) {
    server.tool(
        "security-new-domain",
        "Creates a new Sitecore domain.",
        {
            name: z.string().describe("The name of the domain to create"),
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