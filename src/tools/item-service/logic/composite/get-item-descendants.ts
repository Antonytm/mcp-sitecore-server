import { type CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { type Config } from "@/config.js";
import RestfulItemServiceClient from "../../client.js";

export async function getItemDescendants(conf: Config,
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
    );

    // Guard against runaway traversals: cap the total number of items collected and
    // track visited IDs so a circular reference (or a pathologically large subtree)
    // cannot exhaust memory or spin forever.
    const maxItems = Number(process.env.DESCENDANTS_MAX_ITEMS) || 5000;

    const responseArray: any[] = [];
    const queue: string[] = [id];
    const visited = new Set<string>([id]);
    let truncated = false;

    while (queue.length > 0) {
        const idToProcess = queue.shift() ?? "";
        const children = await client.getItemChildren(idToProcess, options) as any;

        if (children) {
            for (const child of children) {
                if (responseArray.length >= maxItems) {
                    truncated = true;
                    break;
                }
                responseArray.push(child);
                if (child.ItemID && !visited.has(child.ItemID)) {
                    visited.add(child.ItemID);
                    queue.push(child.ItemID);
                }
            }
        }

        if (truncated) {
            break;
        }
    }

    const text = truncated
        ? `${JSON.stringify(responseArray, null, 2)}\n\n[Result truncated at ${maxItems} items. Narrow the starting item or raise DESCENDANTS_MAX_ITEMS to retrieve more.]`
        : JSON.stringify(responseArray, null, 2);

    return {
        content: [
            {
                type: "text",
                text,
            },
        ],
        isError: false,
    }
}