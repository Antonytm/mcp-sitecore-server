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
        conf.logLevel
    );

    const responseArray = [];
    const idsSet = new Set<string>();

    idsSet.add(id);

    while(idsSet.size > 0) {
        const idToProcess = idsSet.values().next().value ?? "";
        idsSet.delete(idToProcess);
        const children = await client.getItemChildren(idToProcess, options) as any;
        
        if (children) {
            for (const child of children) {
                idsSet.add(child.ItemID);
            }
            responseArray.push(...children);
        }
    }

    return {
        content: [
            {
                type: "text",
                text: JSON.stringify(responseArray, null, 2),
            },
        ],
        isError: false,
    }
}