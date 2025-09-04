import { type CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { type Config } from "@/config.js";
import RestfulItemServiceClient from "../../client.js";

/**
 * Calls the Sitecore RESTful ItemService to run a stored query.
 * @param conf {Config} - The configuration object.
 * @param id {string} - The GUID of the Sitecore query definition item.
 * @param options {object} - Optional parameters for the request.
 * @returns {Promise<CallToolResult>} - The query results.
 */
export async function runStoredQuery(
  conf: Config,
  id: string,
  options: {
    database?: string;
    language?: string;
    page?: number;
    pageSize?: number;
    fields?: string[];
    includeStandardTemplateFields?: boolean;
  } = {}
): Promise<CallToolResult> {
  const client = new RestfulItemServiceClient(
    conf.itemService.serverUrl,
    conf.itemService.username,
    conf.itemService.password,
    conf.itemService.domain,
    conf.logLevel
  );
  const response = await client.runStoredQuery(id, options);
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(response, null, 2),
      },
    ],
    isError: false,
  };
}
