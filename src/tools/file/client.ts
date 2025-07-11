import { type CallToolResult } from '@modelcontextprotocol/sdk/types.js';

class FileEndpointClient
{
    private _serverUrl: string;
    private _username: string;
    private _password: string;

    constructor(serverUrl: string, username: string, password: string)
    {
        if (!serverUrl)
        {
            throw new Error("Server URL is not defined.");
        }

        if (!username)
        {
            throw new Error("Username is not defined.");
        }

        if (!password)
        {
            throw new Error("Password is not defined.");
        }

        this._serverUrl = serverUrl;
        this._username = username;
        this._password = password;
    }

    async downloadFileBase64String(
        source: "data" | "log" | "package" | "app" ,
        path: string
    ): Promise<CallToolResult>
    {
        const params = new URLSearchParams();

        params.set("apiVersion", "file");
        params.set("user", this._username);
        params.set("password", this._password);
        params.set("scriptDb", source);
        params.set("path", this.normalizeFilePath(path));

        const url = `${this._serverUrl}/sitecore modules/PowerShell/Services/RemoteScriptCall.ashx?${params.toString()}`;

        const response = await fetch(url, {
            method: "GET",
        });

        if (!response.ok)
        {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return {
            content: [
                {
                    type: "resource",
                    resource: {
                        uri: `resource://${source}/${path}`,
                        mimeType: response.headers.get("Content-Type") ?? "",
                        blob: await this.getResponseBase64String(response),
                    }
                },
            ],
            isError: false,
        };
    }

    private async getResponseBase64String(response: Response): Promise<string>
    {
        const buffer = await response.arrayBuffer();
        return Buffer.from(buffer).toString("base64");
    }

    private normalizeFilePath(path: string): string
    {
        if (path.startsWith("/") || path.startsWith("\\"))
        {
            return path.substring(1);
        }

        return path;
    }
}

export default FileEndpointClient;
