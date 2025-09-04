import { type CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { type Config } from "@/config.js";
import RestfulItemServiceClient from "../../client.js";

export async function getLanguages(conf: Config): Promise<CallToolResult> {
    const client = new RestfulItemServiceClient(conf.itemService.serverUrl,
        conf.itemService.username,
        conf.itemService.password,
        conf.itemService.domain,
        conf.logLevel
    );

    const languagesItemResponse = await client.getItemByPath("/sitecore/system/Languages") as unknown as { ItemID: string; };

    const itemId = languagesItemResponse.ItemID;

    const languagesChildrenResponse = await client.getItemChildren(itemId);

    return {
        content: [
            {
                type: "text",
                text: JSON.stringify(languagesChildrenResponse, null, 2),
            },
        ],
        isError: false,
    }
}