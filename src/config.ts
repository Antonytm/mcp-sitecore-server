import path from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";
import fs from "node:fs";
import 'dotenv/config.js';

// Only ever consumed by `z.infer` below: the shape is the single definition of `Config`,
// and nothing parses against it, so the linter cannot see it as a used value.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ConfigSchema = z.object({
    name: z.string().default("mcp-sitecore-server"),
    version: z.string().optional(),
    graphQL: z.object({
        endpoint: z.string().url().min(1, "endpoint is required"),
        schemas: z.array(z.string()),
        apiKey: z.string(),
        headers: z.record(z.string(), z.string()).optional(),
    }).default({
        endpoint: "https://xmcloudcm.localhost/sitecore/api/graph/",
        schemas: ["edge", "master"],
        apiKey: "{6D3F291E-66A5-4703-887A-D549AF83D859}",
        headers: {},
    }),
    itemService: z.object({
        domain: z.string(),
        username: z.string(),
        password: z.string(),
        serverUrl: z.string().url(),
    }).default({
        domain: "sitecore",
        username: "admin",
        password: "b",
        serverUrl: "https://xmcloudcm.localhost/",
    }),
    powershell: z.object({
        domain: z.string(),
        username: z.string(),
        password: z.string(),
        serverUrl: z.string().url(),
        /**
         * The site every script runs under, via a `SiteContextSwitcher` around the script body.
         * Sitecore applies a template's default workflow at create time only where
         * `Context.Site.EnableWorkflow` is true; the remoting endpoint otherwise resolves its
         * site from the request host, which on a multi-site CM is a content site with workflow
         * off. `shell` is what the Content Editor and the SPE ISE run as. Empty = no switch.
         */
        siteContext: z.string(),
        /** `Context.Database` inside that switch; `shell` alone would make it `core`. Empty = leave it. */
        contextDatabase: z.string(),
    }).default({
        domain: "sitecore",
        username: "admin",
        password: "b",
        serverUrl: "https://xmcloudcm.localhost/",
        siteContext: "shell",
        contextDatabase: "master",
    }),
    /**
     * The Authoring and Management GraphQL API: one endpoint on the CM that serves the
     * whole authoring schema (items, templates, media, sites, search) plus the management
     * schema (publishing, jobs, indexing, workflow, security).
     *
     * It shares nothing with the `graphQL` block above. That one talks to the Edge/preview
     * endpoints under `/sitecore/api/graph/`, authenticating with an `sc_apikey` header.
     * This one lives at `/sitecore/api/authoring/graphql/v1/` and authenticates with an
     * OAuth 2.0 bearer token — so it needs its own endpoint and its own credentials.
     *
     * https://doc.sitecore.com/sai/en/developers/sitecoreai/content-modeling-and-presentation/sitecore-authoring-and-management-graphql-api.html
     */
    authoring: z.object({
        endpoint: z.string(),
        /**
         * A bearer token supplied directly, for the cases where this server cannot mint
         * one itself: `dotnet sitecore cloud login` writes an `accessToken` to
         * `.sitecore/user.json`, and on XM/XP the token comes from a controller in front
         * of the Sitecore Identity Server. Short-lived either way, so the client-credentials
         * fields below are the option that survives a long session.
         */
        token: z.string(),
        clientId: z.string(),
        clientSecret: z.string(),
        authority: z.string(),
        audience: z.string(),
    }),
    authorizationHeader: z.string().default("")
});

export const envSchema = z.object({
    GRAPHQL_ENDPOINT: z.string().url().optional(),
    GRAPHQL_SCHEMAS: z.string().optional(),
    GRAPHQL_API_KEY: z.string().optional(),
    GRAPHQL_HEADERS: z.string().optional(),
    ITEM_SERVICE_DOMAIN: z.string().optional(),
    ITEM_SERVICE_USERNAME: z.string().optional(),
    ITEM_SERVICE_PASSWORD: z.string().optional(),
    ITEM_SERVICE_SERVER_URL: z.string().url().optional(),
    POWERSHELL_DOMAIN: z.string().optional(),
    POWERSHELL_USERNAME: z.string().optional(),
    POWERSHELL_PASSWORD: z.string().optional(),
    POWERSHELL_SERVER_URL: z.string().url().optional(),
    POWERSHELL_SITE_CONTEXT: z.string().optional(),
    POWERSHELL_CONTEXT_DATABASE: z.string().optional(),
    AUTHORING_ENDPOINT: z.string().url().optional(),
    AUTHORING_TOKEN: z.string().optional(),
    AUTHORING_CLIENT_ID: z.string().optional(),
    AUTHORING_CLIENT_SECRET: z.string().optional(),
    AUTHORING_AUTHORITY: z.string().url().optional(),
    AUTHORING_AUDIENCE: z.string().optional(),
    AUTHORIZATION_HEADER: z.string().optional(),
});

export const envStartSchema = z.object({
    //* The transport to use for the server. Can be one of 'stdio' or 'streamable-http'.
    //* If not specified, the default is 'stdio'.
    //* The 'stdio' transport is used for local work.
    //* The 'streamable-http' transport is used for HTTP-based communication.
    //* 'sse' is gone from the MCP spec and the SDK. Anyone who set it wanted an HTTP
    //* server on port 3001, so it falls through to 'streamable-http' -- same port,
    //* endpoint /mcp instead of /sse -- and says so on stderr. Falling back to
    //* 'stdio' instead would leave a container with no listener at all.
    TRANSPORT: z.string().optional().transform((val) => {
        const transport = val?.trim().toLowerCase();
        if (transport === "sse") {
            console.error("TRANSPORT=sse is no longer supported: the SSE transport was removed in MCP SDK v2. Serving Streamable HTTP instead -- point your client at /mcp, not /sse.");
            return "streamable-http";
        }
        if (transport === "streamable-http") return "streamable-http";
        if (transport !== undefined && transport !== "" && transport !== "stdio") {
            // Falling through silently means a typo in a container's config starts a stdio
            // server that nothing is connected to, with no clue as to why.
            console.error(
                `TRANSPORT: unknown transport '${val}'. Known transports: stdio, streamable-http. `
                + `Defaulting to stdio.`
            );
        }
        return "stdio";
    })
});

export type Config = z.infer<typeof ConfigSchema>;
export type EnvConfig = z.infer<typeof envSchema>;
export type EnvStartConfig = z.infer<typeof envStartSchema>;

// Read package.json data
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packagePath = path.resolve(__dirname, '..', 'package.json');
const packageData = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
const { version, name } = packageData;

/**
 * `GRAPHQL_HEADERS` is JSON in an environment variable, so a stray comma is a realistic
 * mistake. Throwing here kills the process during module import — before any transport
 * starts, and on stdio with nothing to show the user but a dead subprocess. Report it and
 * carry on with no extra headers, the same way a bad TOOL_PROFILE is reported.
 */
function parseGraphQLHeaders(raw: string | undefined): Record<string, string> {
    if (!raw || raw.trim() === "") {
        return {};
    }
    try {
        const parsed = JSON.parse(raw);
        if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
            throw new Error("not a JSON object");
        }
        return parsed as Record<string, string>;
    } catch (error) {
        console.error(
            `GRAPHQL_HEADERS: ignoring the value because it is not a JSON object `
            + `({"Header": "value"}): ${error instanceof Error ? error.message : String(error)}`
        );
        return {};
    }
}

/** The path the Authoring and Management API is always served from. */
export const AUTHORING_GRAPHQL_PATH = "/sitecore/api/authoring/graphql/v1/";

/**
 * Where the Authoring and Management API lives.
 *
 * `AUTHORING_ENDPOINT` wins when set. Otherwise it is derived from the CM host this
 * server is already pointed at, because the endpoint's path is fixed by Sitecore and
 * making every user restate their own host would be a config variable that can only ever
 * hold one value. `ITEM_SERVICE_SERVER_URL` is the CM root — `GRAPHQL_ENDPOINT` is not,
 * since it already includes `/sitecore/api/graph/` and may point at Edge rather than the
 * CM at all.
 */
export function resolveAuthoringEndpoint(
    explicit: string | undefined,
    serverUrl: string
): string {
    if (explicit && explicit.trim() !== "") {
        return explicit.trim();
    }
    return `${serverUrl.replace(/\/+$/, "")}${AUTHORING_GRAPHQL_PATH}`;
}

const ENV: EnvConfig = envSchema.parse(process.env);
const itemServiceServerUrl = ENV.ITEM_SERVICE_SERVER_URL || "https://xmcloudcm.localhost/";
const config: Config = {
    name: `${name} ${version}`,
    graphQL: {
        endpoint: ENV.GRAPHQL_ENDPOINT || "https://xmcloudcm.localhost/sitecore/api/graph/",
        schemas: ENV.GRAPHQL_SCHEMAS ? ENV.GRAPHQL_SCHEMAS.split(",").map(x => x.trim()) : ["edge", "master"],
        apiKey: ENV.GRAPHQL_API_KEY || "{6D3F291E-66A5-4703-887A-D549AF83D859}",
        headers: parseGraphQLHeaders(ENV.GRAPHQL_HEADERS),
    },
    itemService: {
        domain: ENV.ITEM_SERVICE_DOMAIN || "sitecore",
        username: ENV.ITEM_SERVICE_USERNAME || "admin",
        password: ENV.ITEM_SERVICE_PASSWORD || "b",
        serverUrl: itemServiceServerUrl,
    },
    powershell: {
        domain: ENV.POWERSHELL_DOMAIN || "sitecore",
        username: ENV.POWERSHELL_USERNAME || "admin",
        password: ENV.POWERSHELL_PASSWORD || "b",
        serverUrl: ENV.POWERSHELL_SERVER_URL || "https://xmcloudcm.localhost/",
        // `??`, not `||`: an explicitly empty value is the documented way to turn the switch off.
        siteContext: ENV.POWERSHELL_SITE_CONTEXT ?? "shell",
        contextDatabase: ENV.POWERSHELL_CONTEXT_DATABASE ?? "master",
    },
    authoring: {
        endpoint: resolveAuthoringEndpoint(ENV.AUTHORING_ENDPOINT, itemServiceServerUrl),
        token: ENV.AUTHORING_TOKEN || "",
        clientId: ENV.AUTHORING_CLIENT_ID || "",
        clientSecret: ENV.AUTHORING_CLIENT_SECRET || "",
        // The Sitecore Cloud defaults. An XM/XP instance authorizing against its own
        // Sitecore Identity Server overrides both.
        authority: ENV.AUTHORING_AUTHORITY || "https://auth.sitecorecloud.io",
        audience: ENV.AUTHORING_AUDIENCE || "https://api.sitecorecloud.io",
    },
    authorizationHeader: ENV.AUTHORIZATION_HEADER || "",
};

/**
 * The configuration with every secret replaced by a placeholder.
 *
 * The `config` tool and the `config://main` resource exist so an agent can see which
 * endpoint and which account the server is pointed at. Neither needs the passwords, the
 * GraphQL API key or the server's own bearer token, and both are readable by any client
 * that can call a tool — over the HTTP transport that is anyone who can reach the port.
 * The keys stay present, so "is a password configured at all?" is still answerable.
 */
export function redactConfig(source: Config): Config {
    const mask = (value: string) => (value === "" ? "" : "***redacted***");
    return {
        ...source,
        graphQL: { ...source.graphQL, apiKey: mask(source.graphQL.apiKey) },
        itemService: { ...source.itemService, password: mask(source.itemService.password) },
        powershell: { ...source.powershell, password: mask(source.powershell.password) },
        // clientId stays visible: it identifies which automation client is in use, which
        // is exactly what someone debugging a 403 needs, and it is not a credential on
        // its own. The secret and the bearer token are.
        //
        // Guarded rather than assumed: this function's whole job is to make a config safe
        // to hand out, so throwing on an unexpected shape would take down the `config`
        // tool and the `config://main` resource with it. A block that is not there is
        // left not there rather than invented.
        ...(source.authoring
            ? {
                authoring: {
                    ...source.authoring,
                    token: mask(source.authoring.token),
                    clientSecret: mask(source.authoring.clientSecret),
                },
            }
            : {}),
        authorizationHeader: mask(source.authorizationHeader),
    };
}

export { config };