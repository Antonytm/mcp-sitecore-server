import { type CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { buildClientSchema, getIntrospectionQuery, printSchema } from "graphql";
import { type IntrospectionQuery } from "graphql";
import { type Config } from "@/config.js";
import { fetchWithTimeout } from "@/utils.js";

export async function introspection(conf: Config, schemaName: string): Promise<CallToolResult> {
    
    const url = `${conf.graphQL.endpoint}/${schemaName}`;

    const response = await fetchWithTimeout(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Pass the API key as a header rather than a query-string parameter so it
            // is not captured in access logs, proxies or browser history.
            'sc_apikey': conf.graphQL.apiKey,
            ...conf.graphQL.headers,
        },
        body: JSON.stringify({
            query: getIntrospectionQuery(),
        }),
    });

    if (!response.ok) {
		throw new Error(`GraphQL request failed: ${response.statusText}`);
	}

	const responseJson = await response.json() as unknown as { data: IntrospectionQuery };
	// Transform to a schema object
	const schema = buildClientSchema(responseJson.data);

	// Print the schema SDL
	return {
        content: [
            {
                type: "text",
                text: printSchema(schema),
            },
        ],
        isError: false,
    }
}