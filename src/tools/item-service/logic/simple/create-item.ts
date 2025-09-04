import { type CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { type Config } from "@/config.js";
import RestfulItemServiceClient from "../../client.js";

export async function createItem(conf: Config,
    parentPath: string,
    data: {
        ItemName: string;
        TemplateID: string;
        [key: string]: any;
    },
    options: {
        database?: string;
        language?: string;
    } = {}
): Promise<CallToolResult> {
    const client = new RestfulItemServiceClient(
        conf.itemService.serverUrl,
        conf.itemService.username,
        conf.itemService.password,
        conf.itemService.domain,
        conf.logLevel
    );

    const response = await client.createItem(parentPath, data, options);

    return {
        content: [
            {
                type: "text",
                text: JSON.stringify(response, null, 2),
            },
        ],
        isError: false,
    };
}
