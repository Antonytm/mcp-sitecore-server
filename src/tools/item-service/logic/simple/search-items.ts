import { type CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { type Config } from "@/config.js";
import RestfulItemServiceClient from "../../client.js";

export async function searchItems(
  conf: Config,
  options: {
    term: string;
    fields?: string[];
    facet?: string;
    page?: number;
    pageSize?: number;
    database?: string;
    includeStandardTemplateFields?: boolean;
  }
): Promise<CallToolResult> {
  const client = new RestfulItemServiceClient(
    conf.itemService.serverUrl,
    conf.itemService.username,
    conf.itemService.password,
    conf.itemService.domain,
    conf.logLevel
  );
  const response = await client.searchItems(options);
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
