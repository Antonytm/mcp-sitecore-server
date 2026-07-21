import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { envSchema, type Config, type EnvConfig } from "./config.js";
import fs from 'fs';
import path from 'path';
import { registerAll } from "./register.js";
import { withInferredAnnotations } from "./tool-annotations.js";
import type { ToolServer } from "./tool-server.js";



export async function getServer(config: Config): Promise<McpServer> {
    const server = new McpServer({
        name: `Sitecore MCP Server: ${config.name}`,
        description: "Model Context Protocol for Sitecore",
        version: config.version || "0.0.1",
    });

    // Automatically attach inferred read-only/destructive annotations to every tool
    // registered below, so MCP clients can distinguish safe reads from mutations.
    withInferredAnnotations(server);

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

    // The concrete McpServer only differs from ToolServer in the (deprecated) tool()
    // overload we relax, so it is compatible at runtime; the cast bridges the two.
    await registerAll(server as unknown as ToolServer, config);

    return server;
}
