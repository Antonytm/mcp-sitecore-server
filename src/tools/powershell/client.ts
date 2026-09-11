import { generateUUID, fetchWithTimeout } from "@/utils.js";
import { convertObject, parseXMLString } from "@antonytm/clixml-parser";
import { PowershellCommandBuilder, wrapInScriptContext, DEFAULT_SCRIPT_CONTEXT, type ScriptContext } from "./command-builder.js";

/**
 * Turns a failed SPE response into a message that says what actually answered.
 *
 * `response.statusText` alone is actively misleading here. A CM whose login is federated
 * to Sitecore Cloud does not reject an unauthenticated remoting call with 403: it redirects
 * to the identity provider, which replies with its own HTML error page and a 400 — so the
 * only thing the caller ever saw was "Bad Request", and the 3KB body naming the real
 * problem was thrown away. That one omission is enough to send someone diagnosing this
 * after a disabled `remoting` service, which is not what is wrong.
 *
 * So: keep the status, name the responder when a known one is identifiable from the
 * headers, and carry an excerpt of the body. HTML is stripped to its visible text, because
 * an error page's markup is noise and its wording is the entire point.
 */
export async function describeFailedSpeResponse(
    response: Response,
    url: string
): Promise<string> {
    let body = "";
    try {
        body = await response.text();
    } catch {
        // A body that cannot be read must not mask the status, which is the useful part.
    }

    const contentType = response.headers.get("content-type") ?? "";
    const isHtml = contentType.includes("html") || /^\s*<(!doctype|html)/i.test(body);
    const visible = isHtml
        ? body
            .replace(/<(script|style)[\s\S]*?<\/\1>/gi, " ")
            .replace(/<[^>]*>/g, " ")
            .replace(/&#39;/g, "'")
            .replace(/&quot;/g, '"')
            .replace(/&amp;/g, "&")
            .split(/\s+/)
            .join(" ")
            .trim()
        : body.split(/\s+/).join(" ").trim();

    // Identity providers in front of a cloud CM announce themselves in the headers, and
    // "this never reached Sitecore" is the single most useful thing to say when true.
    const responder = response.headers.get("x-auth0-requestid")
        ? "The response came from Auth0, not Sitecore: the request was redirected to the "
        + "identity provider, so it never reached the SPE remoting endpoint. The credentials "
        + "are not a Sitecore account this CM accepts, or the CM requires a Sitecore Cloud "
        + "session that HTTP Basic authentication cannot provide."
        : "";

    const rateLimited = response.status === 429
        ? " A 429 does not come from SPE, which does not rate limit: instead this response "
        + "is used when there is an authentication issue."
        : "";

    const hint = response.status === 404
        ? " A 404 here usually means the SPE remoting service is not enabled, or SPE is not "
        + "installed on this instance."
        : "";

    return [
        `Error executing script: ${response.status} ${response.statusText} from ${url.trim()}.`,
        responder,
        rateLimited.trim(),
        hint.trim(),
        visible ? `Response: ${visible.slice(0, 600)}` : "",
    ].filter(Boolean).join(" ");
}

class PowershellClient {
    private serverUrl: string;
    private username: string;
    private password: string;
    private domain: string;
    private bearertoken: string | null = null;
    private commandBuilder: PowershellCommandBuilder = new PowershellCommandBuilder();
    private context: ScriptContext;

    /**
     * `context` is the site (and content database) every script runs under — see
     * `wrapInScriptContext` for why the default is `shell` / `master` rather than whatever
     * site the request host resolves to. Pass `{ site: "" }` to run scripts unwrapped.
     */
    constructor(
        serverUrl: string,
        username: string,
        password: string,
        domain: string = 'sitecore',
        context: ScriptContext = DEFAULT_SCRIPT_CONTEXT
    ) {
        this.serverUrl = serverUrl;
        this.username = username;
        this.password = password;
        this.domain = domain;
        this.context = context;
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
        // The site/database switch wraps the whole script, so a create inside it gets the
        // template's default workflow the way it would from the Content Editor.
        const body = `${wrapInScriptContext(scriptWithParameters, this.context)}\r\n <#${uuid}#>\r\n`;
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
            throw new Error(await describeFailedSpeResponse(response, url));
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