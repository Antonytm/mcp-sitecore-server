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
- **TLS verification is no longer disabled by default.** `.env.template` no longer ships
  with certificate verification turned off; the setting is commented out with a warning
  and uses the correct Node variable name `NODE_TLS_REJECT_UNAUTHORIZED` (the previous
  `NODE_REJECT_UNAUTHORIZED` was not recognized by Node and had no effect).
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
  (Item Service, GraphQL, and PowerShell clients). Defaults: 30s for REST/GraphQL, 120s
  for PowerShell; both configurable via `REQUEST_TIMEOUT_MS` / `POWERSHELL_TIMEOUT_MS`.
- **Traversal guard** in `get-item-descendants`: a visited-set for cycle protection and a
  configurable node cap (`DESCENDANTS_MAX_ITEMS`, default 5000) that reports truncation
  instead of exhausting memory on large or circular item trees.
- **Unit test suite** (`tests/unit/`) covering the PowerShell escaper and tool-annotation
  inference, runnable without a live Sitecore instance via `npm run test:unit`.
- **CI workflow** (`.github/workflows/ci.yml`) that type-checks, builds, bundles, runs the
  unit tests, and audits dependencies on every pull request and push to `main`.
- `npm run typecheck` script (`tsc --noEmit`).
- Docker `HEALTHCHECK` directives for the Linux and Windows images.

### Changed

- Tool-registration functions now accept a lightweight `ToolServer` type instead of the
  SDK's `McpServer`. This avoids extremely expensive TypeScript overload resolution at the
  ~140 registration call sites, which otherwise exhausted the `tsc` heap after the SDK
  upgrade. Build time dropped from an out-of-memory crash to roughly 2 seconds.
- Normalized all `McpServer` imports to the `.js` module specifier for consistency.
- Docker images pinned to **Node 24** (Linux previously floated on `node:lts-alpine`;
  Windows previously pinned Node 22), matching the CI Node version. `@types/node` bumped
  to ^24 to match the Node 24 runtime.
- Docker images that expose an HTTP port now default to the `streamable-http` transport.
- Tightened input validation on search/pagination parameters (bounded `page`/`pageSize`,
  non-empty search terms).
- `AUTORIZATION_HEADER` renamed to the correctly-spelled `AUTHORIZATION_HEADER` across
  config and `smithery.yaml`; the old name is still accepted for backward compatibility.
- Disabled TypeScript declaration emit (the published artifact is `dist/bundle.js` and
  exposes no type declarations), reducing build cost.

### Fixed

- Corrected the server description typo "Modle Context Protocol" → "Model Context Protocol".
- Pinned `@antonytm/clixml-parser` to `^0.1.5` instead of the floating `latest` tag.
