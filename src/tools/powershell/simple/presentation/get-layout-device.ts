import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function getLayoutDevicePowershellTool(server: McpServer, config: Config) {
    server.tool(
        "presentation-get-layout-device",
        "Gets the layout for the device specified.",
        {
            name: z.string().describe("Name of the device to return."),
        },
        async (params) => {
            const command = `Get-LayoutDevice`;
            const options: Record<string, any> = {};

            options["Name"] = params.name;

            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );
}