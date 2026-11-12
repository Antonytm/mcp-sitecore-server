# Contributing to Sitecore Community MCP

Want to contribute to the Sitecore Community MCP server? There are a few things you need
to know.

## Pre-requisites

- `node.js` — version 20 or later (`node -v` to test). We develop on 22; 20 is the minimum
  the MCP SDK supports.
- `npm` (`>= 10`) installed (`npm -v` to test).
- A Sitecore XM, XP or SitecoreAI instance with SPE Remoting and the Item Service
  enabled — see [Preparing your Sitecore instance](docs/sitecore-setup.md).

## Developing

See [Branching overview](#branching-overview) below — we use `main` for our current
development.

1. [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your own
   GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/)
   it to your local device.
2. Create a new branch, e.g. `git switch -c feature/my-mcp-feature`.
3. When you're happy with your changes, open a Pull Request targeting the `main` branch of
   the `Antonytm/mcp-sitecore-server` repository.
4. Note: CI type-checks, builds, bundles, runs the unit tests and audits dependencies on
   every pull request. Please make sure these pass or your PR can not be merged.

## Setting up

From the root of the repository:

- `npm install` — installs dependencies.
- `npm run build` — compiles TypeScript to `dist/` and rewrites path aliases.
- `npm run bundle` — produces the published single-file `dist/bundle.js` via rollup.
- `npm run typecheck` — type-checks without emitting.
- `npm run lint` — ESLint over `src/`, `tests/` and the build scripts; `npm run lint:fix`
  applies what it can fix. It is syntax-only, so it is fast and needs no Sitecore instance.

Copy [`.env.template`](.env.template) to `.env` and point it at your Sitecore instance.
Every setting is documented in [Configuration](docs/configuration.md).

Running the server locally:

```shell
npm start           # builds, then serves Streamable HTTP on port 3001 at /mcp
npm run start:stdio # builds, then serves stdio
```

## Debugging

There is no SSE endpoint any more — the MCP SDK removed the SSE transport, so the server
speaks Streamable HTTP or stdio.

Over stdio, `npm run inspector` does the whole job: it launches the inspector with
`node dist/index.js` as the server, which defaults to stdio.

Over Streamable HTTP:

1. Run `npm start` to build the project and start the server. It listens on port 3001 and
   serves Streamable HTTP at `/mcp`.
2. Run `npx @modelcontextprotocol/inspector@latest` with no server arguments.
3. Open the inspector at `http://127.0.0.1:6274/#resources`, choose the *Streamable HTTP*
   transport and connect to `http://localhost:3001/mcp`.

Either way, the inspector lets you see the requests and responses between the client and
the server. Run these commands in a *JavaScript Debug Terminal* in VS Code to be able to
debug the code.

## Code style guidelines

There are a few coding guidelines worth mentioning here that will cause less friction when
trying to get a PR merged.

- **TypeScript:** make sure everything has the appropriate type. The build runs on
  TypeScript 6; tool-registration functions use the SDK's `McpServer` type directly.
- **Tool naming:** tools are named `<group>-<verb>-<noun>` and live under the directory
  that matches their group — the groups in
  [Tool selection](docs/tool-selection.md) are the directory layout, not a separate
  taxonomy.
  Keep the name under 45 characters: a client prefixes it (`mcp__<server key>__<tool>`)
  and the Anthropic API caps the prefixed form at 64, so a longer name is dropped from the
  session silently. `npm run lint` fails on one.
- **Item addressing:** a tool that acts on an item takes optional `id` and `path` and
  requires exactly one, validated before anything reaches Sitecore. Don't reintroduce
  `-by-id` / `-by-path` variants.
- **PowerShell escaping:** every user-supplied value interpolated into a script must go
  through `quotePowerShellString` (or `prepareArgsString` in `utils.ts`). This is a
  command-injection boundary, not a style preference.

## Run unit tests

To keep everything running smoothly, please include unit tests when applicable. The unit
suite needs no Sitecore instance:

```shell
npm run test:unit
```

## Run integration tests

The full suite runs against a live Sitecore instance — any instance. Point `.env` at a CM
with SPE Remoting enabled and run:

```shell
npm test
```

There is nothing to seed first. Every live test creates the content it needs, asserts
against what it created, and deletes it again, so the suite is repeatable against a shared
environment and leaves nothing behind. The fixtures live in `tests/fixtures.ts`:

| Fixture | What it gives you |
| --- | --- |
| `seedScratch(label, [names])` | `/sitecore/content/MCP-<label>-<unique>` with one item per name, built from a template it also creates. Pair it with `afterAll(() => scratch.cleanup())`. |
| `seedPresentation` / `applyPresentation` | Layouts, renderings and a placeholder setting, and an item with presentation on it. |
| `seedUser` / `seedRole` | An account in the `sitecore` domain that removes itself. |
| `assignWorkflow` / `addWorkflowEvent` | Puts an item into Sample Workflow and gives it history. |
| `ensureLanguage(code)` | A second language. Pass a **different locale in each file** — files run in parallel, and a shared language is deleted out from under whoever is still using it. |
| `seedTemplate`, `seedChild`, `linkItems`, `setField` | A second template, a child item, a reference between two items, a field value. |

Everything is built from templates Sitecore itself ships, so nothing here assumes XM/XP or
SitecoreAI, a Sample site, or a particular project's components.

Two habits keep new live tests working. Assert against the seed rather than a constant
(`scratch.template.name`, not `"Sample Item"`), and remember that these tools return the
**projected** shape rather than the .NET object graph — `ID` rather than `ID.ToString`, nine
fields on an account rather than the whole `User`. `src/tools/powershell/projection.ts` is
the list; `full: true` is the escape hatch when a test genuinely needs the graph.

### Reading a wall of failures

| What you see | What it means |
| --- | --- |
| `Unexpected token 'G', "Get-Item …"` (or any cmdlet name) | SPE returned its own error text instead of JSON — usually an item the test expected to exist. Note that SPE reports a missing item as an error result, not an empty one, so check `isError` rather than parsing. |
| `fixture script failed after 3 attempts` | The CM refused the seed. Check SPE Remoting is enabled and the instance is up. |
| `Tool … rejected its arguments before reaching Sitecore` | A schema mismatch in the test itself — usually a string where the schema says `z.boolean()`. Fix the test. |
| `Login failed: 403 …` / `came from Auth0, not Sitecore` | Credentials or endpoint configuration. See [Preparing your Sitecore instance](docs/sitecore-setup.md#troubleshooting). |
| An `AssertionError` comparing real values | A genuine defect, or an assertion that has drifted from what the tool now returns. Read the values before deciding. |

The suite runs four files at a time and retries once (`vitest.config.ts`): 159 files each
spawning their own server against one CM is what makes an unconstrained run flaky.

`npm run test:unit` needs no instance at all and should always pass.

## Documentation

The README is deliberately short: it covers installation, a pointer to each doc, and how
to contribute. Detail belongs in [`docs/`](docs) —
[tools.md](docs/tools.md) for the tool reference,
[configuration.md](docs/configuration.md) for environment variables,
[tool-selection.md](docs/tool-selection.md) for tool gating,
[sitecore-setup.md](docs/sitecore-setup.md) for the Sitecore-side prerequisites,
[running.md](docs/running.md) for the ways to start the server and
[docker.md](docs/docker.md) for the images. A new tool needs an entry in
[tools.md](docs/tools.md) and a [CHANGELOG](CHANGELOG.md) line in the same PR.

# Troubleshooting

Problem: the build fails with `cannot find module ...`

Solution: if dependencies changed, you may need to reinstall them. From the root of the
repository:

```shell
npm install
```

Problem: `tools/list` returns nothing, or parameter descriptions are missing.

Solution: check your installed `zod` version. The server builds tool schemas with zod's own
JSON Schema conversion and requires **zod 4.2 or later** — on zod 3 the first `tools/list`
fails silently, and on zod 4.0–4.1 every parameter description is dropped.

# Branching overview

- `main` — latest changes for the next release
- `feature/*` — work in progress, opened as a PR against `main`
