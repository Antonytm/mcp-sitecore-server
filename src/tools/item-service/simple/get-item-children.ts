import { type CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { type Config } from "../../../config.js";
import SitecoreRestfulItemServiceClient from "../client.js";

export async function getItemChildren(conf: Config,
    id: string, options: {
        database?: string;
        language?: string;
        version?: string;
        includeStandardTemplateFields?: boolean;
        includeMetadata?: boolean;
        fields?: string[]
    }
): Promise<CallToolResult> {
    const client = new SitecoreRestfulItemServiceClient(conf.itemService.serverUrl,
        conf.itemService.username,
        conf.itemService.password,
        conf.itemService.domain,
    );

    const response = await client.getItemChildren(id, options);

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