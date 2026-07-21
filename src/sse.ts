import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import express from "express";
import type { Request, Response } from "express";

import { getServer } from "./server.js";
import { config } from "./config.js";
import { authorizationHeaderName } from "./const.js";

export async function startSSE() {
  const server = await getServer(config);

  const app = express();

  // to support multiple simultaneous connections we have a lookup object from
  // sessionId to transport
  const transports: { [sessionId: string]: SSEServerTransport } = {};

  app.get("/sse", async (req: Request, res: Response) => {
    const authHeaderValue = (req.headers[authorizationHeaderName] as string ?? "")
            .replace(/Bearer\s+/i, '');
    if (config.authorizationHeader === ""
      || config.authorizationHeader === authHeaderValue) {
      const transport = new SSEServerTransport('/messages', res);
      transports[transport.sessionId] = transport;
      res.on("close", () => {
        delete transports[transport.sessionId];
      });
      await server.connect(transport);
    } else {
      res.status(401).send('Unauthorized');
    }
  });

  app.post("/messages", async (req: Request, res: Response) => {
    const authHeaderValue = (req.headers[authorizationHeaderName] as string ?? "")
            .replace(/Bearer\s+/i, '');
    if (config.authorizationHeader === ""
      || config.authorizationHeader === authHeaderValue) {
      const sessionId = req.query.sessionId as string;
      const transport = transports[sessionId];
      if (transport) {
        await transport.handlePostMessage(req, res);
      } else {
        res.status(400).send('No transport found for sessionId');
      }
    } else {
      res.status(401).send('Unauthorized');
    }
  });

  // Lightweight liveness endpoint for container/orchestrator health checks.
  app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
  });

  // RFC 9728 OAuth Protected Resource Metadata — signals "no auth required"
  // so MCP clients (e.g. Claude Code) don't flag the server as needing auth
  // on proactive discovery probes. See streamable-http.ts for the full rationale.
  app.get('/.well-known/oauth-protected-resource', (req, res) => {
    const host = req.headers.host ?? 'localhost';
    const proto = (req.headers['x-forwarded-proto'] as string) ?? req.protocol ?? 'http';
    res.status(200).json({
      resource: `${proto}://${host}/sse`,
      authorization_servers: [],
    });
  });

  // JSON 404 fallback for unknown routes so MCP clients probing other OAuth
  // discovery endpoints (/.well-known/oauth-authorization-server, /register)
  // don't crash on Express's default HTML 404 response.
  app.use((_req, res) => {
    res.status(404).json({ error: 'Not found' });
  });

  app.listen(3001);
}