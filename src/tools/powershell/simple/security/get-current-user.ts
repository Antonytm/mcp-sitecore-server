import type { ToolServer } from "@/tool-server.js";
import type { Config } from "@/config.js";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function getCurrentUserPowerShellTool(server: ToolServer, config: Config) {
    server.tool(
        "security-get-current-user",
        "Get the current Sitecore user.",
        {},
        async () => {
            const command = `Get-User`;
            const options: Record<string, any>= {
                "Current": "",
            };
            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );
}
