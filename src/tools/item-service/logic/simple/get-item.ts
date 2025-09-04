import { type CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { type Config } from "@/config.js";
import { get } from "http";
import RestfulItemServiceClient from "../../client.js";

export async function getItemById(conf: Config,
    id: string, options: {
        database?: string;
        language?: string;
        version?: string;
        includeStandardTemplateFields?: boolean;
        includeMetadata?: boolean;
        fields?: string[]
    }
): Promise<CallToolResult> {
    const client = new RestfulItemServiceClient(conf.itemService.serverUrl,
        conf.itemService.username,
        conf.itemService.password,
        conf.itemService.domain,
        conf.logLevel
    );

    const response = await client.getItemById(id, options);

    return {
        content: [
            {
                type: "text",
                text: JSON.stringify(response, null, 2),
            },
        ],
        isError: false,
    }
}