import type { ToolServer } from "@/tool-server.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";
import { getSwitchParameterValue } from "../../utils.js";

export function resetLayoutByIdPowershellTool(server: ToolServer, config: Config) {
    server.tool(
        "presentation-reset-layout-by-id",
        "Resets the layout of an item by Id.",
        {
            id: z.string().describe("The ID of the item to reset the layout for."),
            finalLayout: z.boolean().describe("Specifies layout to be reset. If 'true', the final layout is reset, otherwise - shared layout.").optional(),
            language: z.string().describe("Specifies the item language to reset layout for.").optional(),
        },
        async (params) => {
            const command = `Reset-Layout`;
            const options: Record<string, any> = {};

            options["Id"] = params.id;
            options["FinalLayout"] = getSwitchParameterValue(params.finalLayout);
            options["Language"] = params.language;

            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );
}