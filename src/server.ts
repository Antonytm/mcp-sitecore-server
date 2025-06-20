import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { envSchema, type Config, type EnvConfig } from "./config.js";
import fs from 'fs';
import path from 'path';
import { registerAll } from "./register.js";



export async function getServer(config: Config): Promise<McpServer> {
    const server = new McpServer({
        name: `Sitecore MCP Server: ${config.name}`,
        description: "Modle Context Protocol for Sitecore",
        version: config.version || "0.0.1",
    });

    // Parse the environment variables and set default values

    server.resource(
        "config",
        "config://main",
        async (uri) => {
            return {
                contents: [{
                    uri: uri.href,
                    text: JSON.stringify(config, null, 2),
                }]
            }
        }
    );

    server.tool(
        "config",
        "Prints the configuration of the Sitecore MCP server.",
        {},
        async (params) => {
            return {
                content: [
                    {
                        type: "text",
                        text: JSON.stringify(config, null, 2)
                    }
                ]
            };
        }
    );

    await registerAll(server, config);

    return server;
}
