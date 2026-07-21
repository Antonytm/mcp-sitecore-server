import type { ToolServer } from "@/tool-server.js";
import type { Config } from "@/config.js";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function getDefaultLayoutDevicePowershellTool(server: ToolServer, config: Config) {
    server.tool(
        "presentation-get-default-layout-device",
        "Gets the default layout.",
        {},
        async () => {
            const command = `Get-LayoutDevice -Default`;

            return safeMcpResponse(runGenericPowershellCommand(config, command, {}));
        }
    );
}