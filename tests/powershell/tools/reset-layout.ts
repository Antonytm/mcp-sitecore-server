import { callTool } from "@modelcontextprotocol/inspector/cli/build/client/tools.js";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";

export async function resetLayoutById(
    client: Client,
    itemId: string,
    database: string,
    language: string | undefined,
    finalLayout: string) {
    const resetLayoutArgs: Record<string, any> = {
        id: itemId,
        database,
        language,
        finalLayout,            
    };

    await callTool(client, "presentation-reset-layout-by-id", resetLayoutArgs);
};

export async function resetLayoutByPath(
    client: Client,
    itemPath: string,
    language: string | undefined,
    finalLayout: string) {
    const resetLayoutArgs: Record<string, any> = {
        path: itemPath,
        language,
        finalLayout,            
    };

    await callTool(client, "presentation-reset-layout-by-path", resetLayoutArgs);
};
