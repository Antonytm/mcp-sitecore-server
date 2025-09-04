import { type CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { type Config } from "@/config.js";
import RestfulItemServiceClient from "../../client.js";

/**
 * Calls the Sitecore RESTful ItemService to run a stored search.
 * @param conf {Config} - The configuration object.
 * @param id {string} - The GUID of the Sitecore search definition item.
 * @param options {object} - Search options (term, pageSize, page, database, language, includeStandardTemplateFields, fields, facet, sorting).
 * @returns {Promise<CallToolResult>} - The search results.
 */
export async function runStoredSearch(
  conf: Config,
  id: string,
  term: string,
  options: {
    pageSize?: number;
    page?: number;
    database?: string;
    language?: string;
    includeStandardTemplateFields?: boolean;
    fields?: string[];
    facet?: string;
    sorting?: string;
  }
): Promise<CallToolResult> {
  const client = new RestfulItemServiceClient(
    conf.itemService.serverUrl,
    conf.itemService.username,
    conf.itemService.password,
    conf.itemService.domain,
    conf.logLevel
  );
  const response = await client.runStoredSearch(id, term, options);
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
