import { type CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import RestfulItemServiceClient from "../../client.js";
import { LogLevel } from "@/logLevel.js";

/**
 * Edit a Sitecore item by ID using the RESTful ItemService API.
 * @param conf - Sitecore connection config
 * @param id - The GUID of the Sitecore item to edit
 * @param data - The data to update (fields, etc)
 * @param options - Optional parameters (database, language, version)
 */
export async function editItem(
    conf: any,
    id: string,
    data: { [key: string]: any },
    options: { database?: string; language?: string; version?: string } = {}
): Promise<CallToolResult> {
    const client = new RestfulItemServiceClient(
        conf.itemService.serverUrl,
        conf.itemService.username,
        conf.itemService.password,
        conf.itemService.domain,
        conf.logLevel
    );

    if(conf.logLevel === LogLevel.DEBUG) {
        console.log('Item Service Client: Editing item...', JSON.stringify({
            id,
            data,
            options
        }, null, '\t'));
    }
    const response = await client.editItem(id, data, options);
    
    if(conf.logLevel === LogLevel.DEBUG) {
        console.log('Item Service Client: Item edited successfully', JSON.stringify({
            id,
            response
        }, null, '\t'));
    }

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