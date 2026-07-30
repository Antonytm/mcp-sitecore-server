# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Security

- **PowerShell command injection fixed.** All user-supplied values are now escaped as
  single-quoted PowerShell literals via a new `quotePowerShellString` helper in
  `command-builder.ts` (and `prepareArgsString` in `utils.ts`). Previously values were
  interpolated with basic double-quote wrapping — or, in composite tools, not quoted at
  all — allowing `"`, `$`, backticks and `;` to break out and execute arbitrary commands.
  All composite tools that interpolated parameters directly (indexing, security ACL,
  archive, item clone, item referrer, layout, and rendering tools) now route those
  values through the escaper.
- `find-item` now escapes the free-text search `value` and `index`; `get-logs` restricts
  the `name` parameter to a safe filename charset (it is interpolated into a path glob
  that cannot be single-quoted).
- **GraphQL API key moved out of the URL.** The `sc_apikey` is now sent as an HTTP header
  instead of a query-string parameter in `query` and `introspection`, so it is no longer
  captured in access logs, proxies, or browser history.
- **Corrected the TLS-verification environment variable.** `.env.template` now uses the
  Node-recognized `NODE_TLS_REJECT_UNAUTHORIZED`; the previous `NODE_REJECT_UNAUTHORIZED`
  was not recognized by Node and silently had no effect. It still ships set to `0`, since
  the server primarily targets local development against Sitecore/XM Cloud instances with
  self-signed certificates, but now carries a prominent warning to set it to `1` (or
  remove it) in production or on untrusted networks.
- Updated dependencies to resolve all known advisories — `npm audit` now reports
  **0 vulnerabilities** (previously 18, including 4 critical). Notably bumps
  `@modelcontextprotocol/sdk` to ^1.29.0 and patches transitive `fast-xml-parser`,
  `minimatch`, `brace-expansion`, `body-parser`, and others.

### Added

- **Tool annotations for every tool.** A `server.tool` wrapper (`tool-annotations.ts`)
  now infers `readOnlyHint`, `destructiveHint`, and a human-readable `title` from each
  tool's name, so MCP clients can distinguish safe reads from mutations and destructive
  operations. `run-powershell-script` is flagged destructive and open-world.
- **Request timeouts** on all outbound HTTP calls via a shared `fetchWithTimeout` helper
  (Item Service, GraphQL, and PowerShell clients). Defaults: 30s for REST/GraphQL, 10
  minutes for PowerShell; both configurable via `REQUEST_TIMEOUT_MS` /
  `POWERSHELL_TIMEOUT_MS`. (The PowerShell default is deliberately generous — long-running
  scripts such as index rebuilds and publishing routinely exceed a short timeout, and the
  calling agent's own tool-call timeout will cut things short first if it is lower.)
- **Traversal guard** in `get-item-descendants`: a visited-set for cycle protection and a
  configurable node cap (`DESCENDANTS_MAX_ITEMS`, default 5000) that reports truncation
  instead of exhausting memory on large or circular item trees.
- **Unit test suite** (`tests/unit/`) covering the PowerShell escaper and tool-annotation
  inference, runnable without a live Sitecore instance via `npm run test:unit`.
- **CI workflow** (`.github/workflows/ci.yml`) that type-checks, builds, bundles, runs the
  unit tests, and audits dependencies on every pull request and push to `main`.
- `npm run typecheck` script (`tsc --noEmit`).
- A `/health` liveness endpoint on the HTTP transports (`streamable-http` and `sse`) that
  returns `200 {"status":"ok"}`, plus Docker `HEALTHCHECK` directives for the Linux and
  Windows images that probe it. (The health check reports that the HTTP server is
  accepting requests — the appropriate signal for a container — rather than probing the
  OAuth discovery endpoint.)

### Changed

- **Migrated to TypeScript 7.** The SDK's generic `tool()` overloads made the `tsc` 5.x
  type-checker exhaust its heap across the ~140 registration call sites (the build did not
  complete even with an 8 GB heap). The TypeScript 7 native compiler type-checks the same
  code in under a second, so tool-registration functions use the SDK's `McpServer` type
  directly with no custom indirection. `tsconfig.json` was migrated for TS7:
  `moduleResolution` is now `"bundler"` and the removed `baseUrl` option was dropped (path
  aliases retained as `"@/*": ["./src/*"]`).
- **Migrated all tool registrations from the deprecated `server.tool()` to
  `server.registerTool()`.** The SDK deprecated `tool()` in favour of `registerTool()`;
  every registration now passes a config object (`{ description, inputSchema }`) and the
  `withInferredAnnotations` wrapper injects annotations into that config rather than as a
  positional argument. (Feasible now that the TypeScript 7 switch removed the overload-
  resolution heap blow-up that affected `tool()` and `registerTool()` alike.)
- Normalized all `McpServer` imports to the `.js` module specifier for consistency.
- Docker images pinned to **Node 24** (Linux previously floated on `node:lts-alpine`;
  Windows previously pinned Node 22), matching the CI Node version. `@types/node` bumped
  to ^24 to match the Node 24 runtime.
- Docker images that expose an HTTP port now default to the `streamable-http` transport.
- Tightened input validation on search/pagination parameters (bounded `page`/`pageSize`,
  non-empty search terms).
- `AUTORIZATION_HEADER` renamed to the correctly-spelled `AUTHORIZATION_HEADER` across
  config and `smithery.yaml`. The old misspelled name is no longer recognized.

### Fixed

- **Clearer errors when a rendering lookup finds nothing** (issue #62). The presentation
  tools that resolve a rendering via `Get-Rendering` before acting on it previously failed
  with the opaque PowerShell error "Cannot bind argument to parameter 'Instance' because it
  is null." — or, for the switch tools, silently did nothing — when the item/rendering/
  language/layout didn't match. A shared guard (`rendering-guard.ts`) now reports an
  actionable error (via `Write-Error`, which the SPE transport returns as a normal
  response rather than an opaque HTTP 500) naming what was searched for and pointing at
  `presentation-get-rendering-by-id` / `-by-path` to list the item's renderings. Applied to
  all ten affected tools: `set-rendering-by-id`/`-by-path`,
  `set-/get-/remove-rendering-parameter-by-id`/`-by-path`, and
  `switch-rendering-by-id`/`-by-path`.
- Corrected the server description typo "Modle Context Protocol" → "Model Context Protocol".
- Pinned `@antonytm/clixml-parser` to `^0.1.5` instead of the floating `latest` tag.
