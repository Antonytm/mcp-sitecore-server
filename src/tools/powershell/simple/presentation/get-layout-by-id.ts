import type { ToolServer } from "@/tool-server.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";
import { getSwitchParameterValue } from "../../utils.js";

export function getLayoutByIdPowershellTool(server: ToolServer, config: Config) {
    server.tool(
        "presentation-get-layout-by-id",
        "Gets item layout by Id.",
        {
            id: z.string().describe("The ID of the item to retrieve layout for."),
            finalLayout: z
                .boolean()
                .optional()
                .describe("Specifies layout to be retrieved. If 'true', the final layout is retrieved, otherwise - shared layout."),
            language: z.string()
                .optional()
                .describe("Specifies the item language to retrieve layout."),
        },
        async (params) => {
            const command = `Get-Layout`;
            const options: Record<string, any> = {};

            options["Id"] = params.id;
            options["FinalLayout"] = getSwitchParameterValue(params.finalLayout);
            options["Language"] = params.language;

            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );
};