import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { safeMcpResponse } from "./helper.js";
import { z } from "zod";
import { introspect } from "./tools/introspect.js";
import { graphqlQuery } from "./tools/graphql-query.js";
import { getItemById } from "./tools/item-service/get-item.js";
import { getItemChildren } from "./tools/item-service/get-item-children.js";
import { getItemByPath } from "./tools/item-service/get-item-by-path.js";
import { getLanguages } from "./tools/item-service/get-languages.js";

export function getServer(): McpServer {
    const server = new McpServer({
        name: "Sitecore MCP Server",
        version: "1.0.0"
    });

    // Helper to create DB connection

    // hardcode the config for now
    const conf = {
        name: "mcp-server-graphql",
        allowMutations: false,
        endpoint: "https://xmcloudcm.localhost/sitecore/api/graph/edge?sc_apikey={6D3F291E-66A5-4703-887A-D549AF83D859}",
        headers: {},
        itemService: {
            domain: "sitecore",
            username: "admin",
            password: "b",
            serverUrl: "https://xmcloudcm.localhost/",
        },
    };

    server.resource(
        "schema",
        "schema://main",
        async (uri) => {

            return {
                contents: [{
                    uri: uri.href,
                    text: "Schema",
                }]
            }
        }
    );

    server.tool(
        'introspect-graphql',
        "Introspect the Sitecore GraphQL schema, use this tool before doing a query to get the schema information if you do not have it available as a resource already.",
        {},
        () => {
            return safeMcpResponse(introspect(conf))
        }
    )

    server.tool(
        'query-graphql',
        "Query a Sitecore GraphQL endpoint with the given query and variables.",
        {
            query: z.string(),
            variables: z.string().optional(),
        },
        (params) => {
            return safeMcpResponse(graphqlQuery(conf, params.query, params.variables))
        }
    )

    server.tool(
        'mars-wheather',
        "What is the weather on Mars?",
        {

        },
        ({ }) => {
            return {
                content: [
                    {
                        type: "text",
                        text: "The weather on Mars is cold and dry.",
                    },
                ],
                isError: false,
            };
        }
    )

    server.tool(
        'item-service-get-item',
        "Get a Sitecore item by its ID.",
        {
            id: z.string(),
            options: z.object({
                database: z.string().optional(),
                language: z.string().optional(),
                version: z.string().optional(),
                includeStandardTemplateFields: z.boolean().optional(),
                includeMetadata: z.boolean().optional(),
                fields: z.array(z.string()).optional(),
            }).optional(),
        },
        async (params) => {
            return safeMcpResponse(getItemById(conf, params.id, params.options || {}));
        }
    )

    server.tool(
        'item-service-get-item-children',
        "Get children of a Sitecore item by its ID.",
        {
            id: z.string(),
            options: z.object({
                database: z.string().optional(),
                language: z.string().optional(),
                version: z.string().optional(),
                includeStandardTemplateFields: z.boolean().optional(),
                includeMetadata: z.boolean().optional(),
                fields: z.array(z.string()).optional(),
            }).optional(),
        },
        async (params) => {
            return safeMcpResponse(getItemChildren(conf, params.id, params.options || {}));
        }
    )

    server.tool(
        'item-service-get-item-by-path',
        "Get a Sitecore item by its path.",
        {
            path: z.string(),
            options: z.object({
                database: z.string().optional(),
                language: z.string().optional(),
                version: z.string().optional(),
                includeStandardTemplateFields: z.boolean().optional(),
                includeMetadata: z.boolean().optional(),
                fields: z.array(z.string()).optional(),
            }).optional(),
        },
        async (params) => {
            return safeMcpResponse(getItemByPath(conf, params.path, params.options || {}));
        }
    )

    server.tool(
        'get-languages',
        "Get Sitecore languages.",
        {},
        async () => {
            return safeMcpResponse(getLanguages(conf));
        }
    )

    return server;
}
