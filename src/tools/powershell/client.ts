import { convertObject, parseXMLString } from "@antonytm/clixml-parser";
import { generateUUID } from "./utils";

class PowershellClient {
    private serverUrl: string;
    private username: string;
    private password: string;
    private domain: string;
    private bearertoken: string | null = null;

    constructor(serverUrl: string, username: string, password: string, domain: string = 'sitecore') {
        this.serverUrl = serverUrl;
        this.username = username;
        this.password = password;
        this.domain = domain;
        this.bearertoken = "Basic " + Buffer.from(`${username}:${password}`).toString("base64");
    }

    async executeScript(script: string, parameters: Record<string, any> = {}): Promise<any> {
        const uuid = generateUUID();
        const url = `${this.serverUrl}/-/script/script/?sessionId=${uuid}&rawOutput=False&persistentSession=False `;
        const headers = {
            'Authorization': this.bearertoken || '',
            'Content-Type': 'application/json',
        };

        let scriptWithParameters = script;
        if (parameters) {
            for (const parameter in parameters) {
                if (parameters[parameter] === "") {
                    scriptWithParameters += ` -${parameter}`;
                }
                else if (Array.isArray(parameters[parameter])) {
                    scriptWithParameters += ` -${parameter} "${parameters[parameter].join('","')}"`;
                } else {
                    scriptWithParameters += ` -${parameter} "${parameters[parameter]}"`;
                }
            }
        }

        const body = `${scriptWithParameters}\r\n <#${uuid}#>\r\n`;

        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: body,

        });

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