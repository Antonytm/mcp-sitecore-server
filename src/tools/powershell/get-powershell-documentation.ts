import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { safeMcpResponse } from "@/helper.js";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

export function getPowershellDocumentationTool(server: McpServer) {
    server.tool(
        "get-powershell-documentation",
        "Gets the documentation describing all Sitecore Powershell commands.",
        {},
        async () => {
            const getMarkdown = async (): Promise<CallToolResult> => {
                const __filename = fileURLToPath(import.meta.url);
                const __dirname = path.dirname(__filename);
                const documentationDir = path.resolve(__dirname, "documentation");
                const markdownFiles = getAllMarkdownFiles(documentationDir);

                const separator = '\n\n---\n\n';
                let mergedContent = '';
                
                for (const mdFile of markdownFiles) {
                    const content = fs.readFileSync(mdFile, "utf8");
                    if (mergedContent) {
                        mergedContent += separator;
                    }
                    mergedContent += content;
                }

                return new Promise((resolve) => {
                    resolve({
                        isError: false,
                        content: [
                            { type: "text", text: mergedContent }
                        ]
                    });
                });
            };

            return safeMcpResponse(getMarkdown());
        }
    );
}

function getAllMarkdownFiles(dir: string): string[] {
    let results: string[] = [];
    const list = fs.readdirSync(dir, { withFileTypes: true });
    for (const file of list) {
        const filePath = path.join(dir, file.name);
        if (file.isDirectory()) {
            results = results.concat(getAllMarkdownFiles(filePath));
        } else if (file.isFile() && file.name.endsWith(".md")) {
            results.push(filePath);
        }
    }
    return results;
}