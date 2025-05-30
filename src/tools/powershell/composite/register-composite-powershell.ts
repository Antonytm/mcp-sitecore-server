import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import type { Config } from "../../../config.js";
import { registerSecurityPowerShell } from "./security/register-security-powershell.js";

export function registerCompositePowerShell(server: McpServer, config: Config) {
    registerSecurityPowerShell(server, config);
}
