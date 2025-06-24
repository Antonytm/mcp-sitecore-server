import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../../simple/generic.js";
import { PowershellCommandBuilder } from "../../command-builder.js";
import { PowershellVariable } from "../../variable.js";
import { getSwitchParameterValue } from "../../utils.js";

export function setRenderingByIdPowershellTool(server: McpServer, config: Config) {
    server.tool(
        "presentation-set-rendering-by-id",
        "Update rendering specified by item ID with new values.",
        {
            itemId: z.string().describe("The ID of the item holding the rendering."),
            uniqueId: z.string().describe("The unique ID of the rendering."),
            database: z.string().describe("The context database.").default("master"),
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
            getRenderingParameters["Id"] = params.itemId;
            getRenderingParameters["UniqueId"] = params.uniqueId;
            getRenderingParameters["Database"] = params.database;

            const setRenderingParameters: Record<string, any> = {};
            setRenderingParameters["Id"] = params.itemId;
            setRenderingParameters["Database"] = params.database;
            setRenderingParameters["Instance"] = new PowershellVariable("rendering");
            setRenderingParameters["Placeholder"] = params.placeholder;
            setRenderingParameters["DataSource"] = params.dataSource;
            setRenderingParameters["FinalLayout"] = getSwitchParameterValue(params.finalLayout);
            setRenderingParameters["Language"] = params.language;

            if (params.index || params.index === 0)
            {
                setRenderingParameters["Index"] = params.index;
            }
            setRenderingParameters["Parameter"] = params.parameter;

            const command = `
                $rendering = ${commandBuilder.buildCommandString('Get-Rendering', getRenderingParameters)};
                ${commandBuilder.buildCommandString('Set-Rendering', setRenderingParameters)};
            `;

            return safeMcpResponse(runGenericPowershellCommand(config, command, {}));
        }
    );
}