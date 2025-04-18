import { z } from "zod";

const ConfigSchema = z.object({
    name: z.string().default("mcp-sitecore-server"),
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
});

export type Config = z.infer<typeof ConfigSchema>;

