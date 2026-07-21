/**
 * A minimal structural view of the MCP server as used by tool-registration functions.
 *
 * Tool files only ever call `server.tool(...)`. Referencing the full `McpServer` type
 * at every one of the ~140 registration call sites forces TypeScript to resolve the
 * SDK's heavily-overloaded, deeply-generic `tool()` signature against deep Zod schema
 * types over and over, which makes `tsc` exhaust its heap. These lightweight, non-generic
 * overloads avoid that: overload resolution is cheap and the handler's `params` gets a
 * contextual type (so it is not an implicit `any`). The real `McpServer` created in
 * server.ts is structurally assignable to this interface, so nothing changes at runtime.
 *
 * The trade-off is that `params` is typed as `any` inside handlers rather than being
 * inferred from the Zod schema. The Zod schema is still enforced at runtime by the SDK.
 */
export type ToolHandler = (params: any, extra: any) => unknown;

// A Zod raw shape or an annotations object — both are plain objects here.
export type ToolObjectArg = Record<string, any>;

export interface ToolServer {
    tool(name: string, cb: ToolHandler): unknown;
    tool(name: string, descriptionOrSchema: string | ToolObjectArg, cb: ToolHandler): unknown;
    tool(name: string, description: string, schema: ToolObjectArg, cb: ToolHandler): unknown;
    tool(name: string, description: string, schema: ToolObjectArg, annotations: ToolObjectArg, cb: ToolHandler): unknown;
}
