import { type CallToolResult } from '@modelcontextprotocol/sdk/types.js';

export async function safeMcpResponse(exec: Promise<CallToolResult>): Promise<CallToolResult> {
    try {
        console.log('Safe MCP Response: Executing tool...');
        let result = await exec;
        console.log('Safe MCP Response: Success', result);
        return result;
    } catch (error) {
        console.error('Error executing tool:', error);
        return {
            isError: true,
            content: [
                {
                    type: 'text',
                    text: `Error executing tool: ${error}`,
                },
            ],
        };
    }
}