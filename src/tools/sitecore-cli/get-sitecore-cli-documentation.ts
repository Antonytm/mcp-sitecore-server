import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { safeMcpResponse } from "@/helper.js";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

export function getSitecoreCliDocumentation(server: McpServer, config: Config) {
    server.registerTool(
        "sitecore-cli-documentation",
        {
            description: "Gets Sitecore CLI documentation describing the most often used commands like index rebuild, item serialization, etc.",
        },
        async (params) => {
            const getMarkdown = async (): Promise<CallToolResult> => {
                const __filename = fileURLToPath(import.meta.url);
                const __dirname = path.dirname(__filename);
                const markdownPath = path.resolve(__dirname, "sitecore-cli-documentation.md");
                const markDown = fs.readFileSync(markdownPath, "utf8");
                return new Promise((resolve) => {
                    resolve({
                        isError: false,
                        content: [
                            { type: "text", text: markDown }
                        ]
                    });
                });
            };

            return safeMcpResponse(getMarkdown());
        }
    );
}
