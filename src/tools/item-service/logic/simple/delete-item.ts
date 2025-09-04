import { type CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { type Config } from "@/config.js";
import RestfulItemServiceClient from "../../client.js";

/**
 * Delete a Sitecore item by ID using the RESTful ItemService API.
 * @param conf - Sitecore connection config
 * @param id - The GUID of the Sitecore item to delete
 * @param options - Optional parameters (database, language, version)
 */
export async function deleteItem(
    conf: Config,
    id: string,
    options: { database?: string; language?: string; version?: string } = {}
): Promise<CallToolResult> {
    const client = new RestfulItemServiceClient(
        conf.itemService.serverUrl,
        conf.itemService.username,
        conf.itemService.password,
        conf.itemService.domain,
        conf.logLevel
    );
    const response = await client.deleteItem(id, options);
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
