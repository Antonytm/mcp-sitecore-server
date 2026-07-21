import type { ToolServer } from "@/tool-server.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function removeUserPowerShellTool(server: ToolServer, config: Config) {
    server.tool(
        "security-remove-user",
        "Removes the Sitecore user.",
        {
            identity: z.string(),
        },
        async (params) => {
            const command = `Remove-User`;
            const options: Record<string, any>= {
                "Identity": params.identity,
            };

            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );
}