import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

/**
 * The MCP server type used by tool-registration functions.
 *
 * This is the SDK's own `McpServer` type — every member (`resource`, `prompt`,
 * `connect`, …) comes straight from the SDK — with a single exception: the
 * deprecated, heavily-overloaded generic `tool()` method is replaced with a
 * non-generic equivalent.
 *
 * Why override just `tool()`: the SDK's `tool<Args extends ZodRawShapeCompat>()`
 * overloads infer the handler's parameter types from the Zod schema at every call
 * site. Across this server's ~140 `server.tool(...)` registrations that overload
 * resolution makes `tsc` exhaust its heap — annotating these functions with the raw
 * `McpServer` type OOMs the type-checker (it does not complete even with an 8 GB
 * heap), whereas this shim type-checks in a couple of seconds. The `tool()` method
 * is `@deprecated` in the SDK (superseded by `registerTool`), so this only relaxes a
 * method the SDK itself is moving away from.
 *
 * The concrete `McpServer` instance created in server.ts is assignable to this type,
 * so runtime behaviour is unchanged. The only trade-off is that a handler's `params`
 * is typed `any` rather than inferred from the Zod schema; the schema is still
 * enforced at runtime by the SDK.
 *
 * TODO: drop this shim once the SDK's `tool()`/`registerTool()` typings no longer
 * blow up `tsc` at this scale (to be raised upstream in @modelcontextprotocol/sdk).
 */
type ToolHandler = (params: any, extra: any) => unknown;

export type ToolServer = Omit<McpServer, "tool"> & {
    tool(name: string, cb: ToolHandler): unknown;
    tool(name: string, descriptionOrSchema: string | Record<string, any>, cb: ToolHandler): unknown;
    tool(name: string, description: string, schema: Record<string, any>, cb: ToolHandler): unknown;
    tool(name: string, description: string, schema: Record<string, any>, annotations: Record<string, any>, cb: ToolHandler): unknown;
};
