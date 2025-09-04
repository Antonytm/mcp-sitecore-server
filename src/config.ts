import path from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";
import fs from "node:fs";
import 'dotenv/config.js';
import { LogLevel } from "./logLevel.js";

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
    }).default({
        domain: "sitecore",
        username: "admin",
        password: "b",
        serverUrl: "https://xmcloudcm.localhost/",
    }),
    authorizationHeader: z.string().default(""),
    logLevel: z.string().default(LogLevel.INFO),
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
    AUTORIZATION_HEADER: z.string().optional(),
    LOG_LEVEL: z.string().optional(),
});

export const envStartSchema = z.object({
    //* The transport to use for the server. Can be one of 'stdio' or 'sse'.
    //* If not specified, the default is 'stdio'.
    //* The 'stdio' transport is used for local work.
    //* The 'streamable-http' transport is used for HTTP-based communication.
    //* The 'sse' remains for legacy support.
    TRANSPORT: z.string().default("stdio").optional().transform((val) => {
        if (val?.toLowerCase() === "sse") return "sse";
        if (val?.toLowerCase() === "streamable-http") return "streamable-http";
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

const ENV: EnvConfig = envSchema.parse(process.env);
const config: Config = {
    name: `${name} ${version}`,
    graphQL: {
        endpoint: ENV.GRAPHQL_ENDPOINT || "https://xmcloudcm.localhost/sitecore/api/graph/",
        schemas: ENV.GRAPHQL_SCHEMAS ? ENV.GRAPHQL_SCHEMAS.split(",").map(x => x.trim()) : ["edge", "master"],
        apiKey: ENV.GRAPHQL_API_KEY || "{6D3F291E-66A5-4703-887A-D549AF83D859}",
        headers: ENV.GRAPHQL_HEADERS ? JSON.parse(ENV.GRAPHQL_HEADERS) : {},
    },
    itemService: {
        domain: ENV.ITEM_SERVICE_DOMAIN || "sitecore",
        username: ENV.ITEM_SERVICE_USERNAME || "admin",
        password: ENV.ITEM_SERVICE_PASSWORD || "b",
        serverUrl: ENV.ITEM_SERVICE_SERVER_URL || "https://xmcloudcm.localhost/",
    },
    powershell: {
        domain: ENV.POWERSHELL_DOMAIN || "sitecore",
        username: ENV.POWERSHELL_USERNAME || "admin",
        password: ENV.POWERSHELL_PASSWORD || "b",
        serverUrl: ENV.POWERSHELL_SERVER_URL || "https://xmcloudcm.localhost/",
    },
    authorizationHeader: ENV.AUTORIZATION_HEADER || "",
    logLevel: ENV.LOG_LEVEL || LogLevel.INFO,
};

export { config };