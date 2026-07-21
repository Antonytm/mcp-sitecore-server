import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../../simple/generic.js";
import { PowershellCommandBuilder } from "../../command-builder.js";
import { getSwitchParameterValue, getNumberParameterValue } from "../../utils.js";

export function setRenderingByPathPowershellTool(server: McpServer, config: Config) {
    server.tool(
        "presentation-set-rendering-by-path",
        "Updates rendering specified by item path with new values.",
        {
            itemPath: z.string().describe("The path of the item holding the rendering."),
            uniqueId: z.string().describe("The unique ID of the rendering."),
            placeholder: z.string().describe("New rendering placeholder value if specified.").optional(),
            dataSource: z.string().describe("New rendering data source if specified.").optional(),
            finalLayout: z
                .boolean()
                .describe("Specifies the layout to update the rendering. If 'true', the final layout is used, otherwise - shared layout.")
                .optional(),
            language: z.string().describe("The language version of the item holding the rendering.").optional(),
            index: z.number().describe("New index of the rendering in the layout.").optional(),
            parameter: z.record(z.string(), z.string()).describe("New rendering parameters if specified.").optional(),
        },
        async (params) => {
            const commandBuilder = new PowershellCommandBuilder();

            const getRenderingParameters: Record<string, any> = {};
            getRenderingParameters["Path"] = params.itemPath;
            getRenderingParameters["UniqueId"] = params.uniqueId;

            const setRenderingParameters: Record<string, any> = {};
            setRenderingParameters["Path"] = params.itemPath;
            setRenderingParameters["Placeholder"] = params.placeholder;
            setRenderingParameters["DataSource"] = params.dataSource;
            setRenderingParameters["FinalLayout"] = getSwitchParameterValue(params.finalLayout);
            setRenderingParameters["Language"] = params.language;
            setRenderingParameters["Index"] = getNumberParameterValue(params.index);
            setRenderingParameters["Parameter"] = params.parameter;
            
            const command = `
                $rendering = Get-Rendering ${commandBuilder.buildParametersString(getRenderingParameters)};
                Set-Rendering -Instance $rendering ${commandBuilder.buildParametersString(setRenderingParameters)};
            `;

            return safeMcpResponse(runGenericPowershellCommand(config, command, {}));
        }
    )
}
