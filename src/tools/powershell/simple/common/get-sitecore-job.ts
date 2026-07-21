import type { ToolServer } from "@/tool-server.js";
import type { Config } from "@/config.js";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function getSitecoreJobPowerShellTool(server: ToolServer, config: Config) {
    server.tool(
        "common-get-sitecore-job",
        "Gets list of the current Sitecore jobs.",
        {},
        async (params) => {
            const options: Record<string, any> = {};
            const command = `Get-SitecoreJob`;

            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );
}