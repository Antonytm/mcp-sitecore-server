import type { ToolServer } from "@/tool-server.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function enableUserPowerShellTool(server: ToolServer, config: Config) {
    server.tool(
        "security-enable-user",
        "Enables the Sitecore user account.",
        {
            identity: z.string(),
        },
        async (params) => {
            const command = `Enable-User`;
            const options: Record<string, any>= {
                "Identity": params.identity,
            };

            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );
}