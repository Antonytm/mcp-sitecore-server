import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "../../config.js";
import { safeMcpResponse } from "../../helper.js";
import { introspection } from "./generic/introspection.js";
import { z } from "zod";
import { query } from "./generic/query.js";


function registerIntrospectionTool(server: McpServer, config: Config, schema: string) {
    server.tool(
        `introspection-graphql-${schema}`,
        `Introspection Sitecore GraphQL ${schema} schema, use this tool before doing a query to get the schema information if you do not have it available as a resource already.`,
        {},
        () => {
            return safeMcpResponse(introspection(config, schema))
        }
    )
}

function registerQueryTool(server: McpServer, config: Config, schema: string) {
    server.tool(
        `query-graphql-${schema}`,
        `Query a Sitecore GraphQL ${schema} endpoint with the given query and variables.`,
        {
            query: z.string(),
            variables: z.string().optional(),
        },
        (params) => {
            return safeMcpResponse(query(config, schema, params.query, params.variables))
        }
    )
}

export function registerGraphQL(server: McpServer, config: Config) {
    config.graphQL.schemas.forEach((schema) => {
        registerIntrospectionTool(server, config, schema);
        registerQueryTool(server, config, schema);
    })
}