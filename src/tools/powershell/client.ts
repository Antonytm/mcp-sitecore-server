import { generateUUID, fetchWithTimeout } from "@/utils.js";
import { convertObject, parseXMLString } from "@antonytm/clixml-parser";
import { PowershellCommandBuilder } from "./command-builder.js";

class PowershellClient {
    private serverUrl: string;
    private username: string;
    private password: string;
    private domain: string;
    private bearertoken: string | null = null;
    private commandBuilder: PowershellCommandBuilder = new PowershellCommandBuilder();

    constructor(serverUrl: string, username: string, password: string, domain: string = 'sitecore') {
        this.serverUrl = serverUrl;
        this.username = username;
        this.password = password;
        this.domain = domain;
        this.bearertoken = "Basic " + Buffer.from(`${username}:${password}`).toString("base64");
    }

    async executeScript(script: string, parameters: Record<string, any> = {}): Promise<any> {
        const uuid = generateUUID();
        // Consider passing `rawOutput=True` and use custom serialization to CSV/JSON
        // ConvertTo-CliXml that is used internally in SPE relies on System.Management.Automation.Serializer, which seems has bad performance.
        const url = `${this.serverUrl}/-/script/script/?sessionId=${uuid}&rawOutput=False&persistentSession=False `;
        const headers = {
            'Authorization': this.bearertoken || '',
            'Content-Type': 'application/json',
        };

        const scriptWithParameters = this.commandBuilder.buildCommandString(script, parameters);
        const body = `${scriptWithParameters}\r\n <#${uuid}#>\r\n`;
        // Default to 10 minutes. The previous 60s default was tuned to the tool-call
        // timeout most AI agents enforce, but in practice it fired constantly on larger
        // scripts (index rebuilds, publishing, bulk item updates) and aborted work that
        // would have succeeded. A generous default is the safer failure mode here: this
        // timeout exists to stop a hung Sitecore endpoint holding the connection open
        // forever, not to bound legitimate script runtime — and the calling agent's own
        // timeout still cuts things short first if it is set lower. Override with
        // POWERSHELL_TIMEOUT_MS to raise or lower it.
        const timeoutMs = Number(process.env.POWERSHELL_TIMEOUT_MS) || 600000;
        const response = await fetchWithTimeout(url, {
            method: 'POST',
            headers: headers,
            body: body,
        }, timeoutMs);

        if (!response.ok) {
            throw new Error(`Error executing script: ${response.statusText}`);
        }
        return response.text();
    }

    async executeScriptJson(script: string, parameters: Record<string, any> = {}): Promise<any> {
        return this.executeScript(script, parameters).then((text) => {
            const json = parseXMLString(text
                .trim("'")
                .trim('"')
                .replaceAll("\\\"", "\""));
            return JSON.stringify(convertObject(json));
        });
    }
}

export { PowershellClient };