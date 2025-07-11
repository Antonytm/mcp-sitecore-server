import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import FileUploadClient from "../client.js";

export function downloadFileTool(server: McpServer, config: Config)
{
    server.tool(
        "file-download",
        "Downloads a file from Sitecore endpoint.",
        {
            path: z.string().describe("The relative path of the file to download."),
            source: z.enum(["data", "log", "package", "app"]).describe("The source of the file to download.").default("package"),            
        },
        async (params) => {
            const client = new FileUploadClient(config.file.serverUrl, config.file.username, config.file.password);

            return safeMcpResponse(client.downloadFileBase64String(params.source, params.path));
        }
    );
}
