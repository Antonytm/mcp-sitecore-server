import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { createTransport } from "@modelcontextprotocol/inspector/cli/build/transport.js";

export type TransportOptions = {
    transportType: "sse" | "stdio";
    command?: string;
    args?: string[];
    url?: string;
};

const transportOptions: TransportOptions = {
    transportType: "stdio",
    command: "node",
    args: [`${__dirname}/../dist/bundle.js`],
};

const client = new Client({
    name: "mcp-sitecore-server",
    version: "1.2.3-verbose-logging",
});

const transport = createTransport(transportOptions);


export { client, transport };