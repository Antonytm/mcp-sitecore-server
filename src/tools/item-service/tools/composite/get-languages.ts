import type { ToolServer } from "@/tool-server.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { getLanguages } from "../../logic/composite/get-languages.js";
import { safeMcpResponse } from "@/helper.js";

export function getLanguagesTool(server: ToolServer, config: Config) {
    server.tool(
        'item-service-get-languages',
        "Get Sitecore languages.",
        {},
        async () => {
            return safeMcpResponse(getLanguages(config));
        }
    );
}
