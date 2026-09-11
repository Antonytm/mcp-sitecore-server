# Changelog

All notable changes to this project will be documented in this file. The format is based
on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

Major versions of this project include breaking changes to the tool surface and track the
Model Context Protocol revision the server implements, though not strictly bound to it.

Our versioning strategy is as follows:

- Patch: no breaking changes (e.g. bug fixes, minor improvements)
- Minor: non-breaking feature additions – no breaking changes (e.g. new tools, improvements)
- Major: new features + breaking changes (e.g. SDK upgrades, tool renames, protocol revisions)

## 2.0.1

### 🛠 Changed

- **Scripts now run as the `shell` site with `Context.Database` pinned to `master`**, the same
  context the Content Editor and the SPE ISE use. Sitecore applies a template's `__Default workflow`
  to a created item only when `Context.Site.EnableWorkflow` is true; the remoting endpoint otherwise
  resolves its site from the request host, which on a multi-site CM is a content site with workflow
  off — so items created through `run-powershell-script` (and every SPE-backed tool) landed outside
  their workflow, silently, while the same create in the Content Editor landed in Draft. Every script
  is wrapped in a `SiteContextSwitcher` + `DatabaseSwitcher`; a `try` block opens no scope in
  PowerShell, so output, variables and `return` are unchanged. Visible differences: `[Sitecore.Context]::Site.Name`
  reads `shell` inside a script, and created items now carry their template's default workflow. New
  settings `POWERSHELL_SITE_CONTEXT` (default `shell`; empty restores the previous behaviour) and
  `POWERSHELL_CONTEXT_DATABASE` (default `master`). `sc_site=shell` on the query string was measured and
  rejected: the shell site redirects to its login page before SPE's basic-auth handler runs.

## 2.0.0

_Released 2026-09 — a fourth API surface, a tool surface a third smaller per operation, on the v2
MCP SDK and MCP protocol revision 2026-07-28._

### 🧱 Build & Release

- `[build]` **The version is stated once, in `package.json`.** It used to be written by
  hand in five places and had already drifted — the release workflows still tagged v2
  images `1.4.2`. `scripts/version.mjs` (the npm `version` lifecycle step) carries it into
  `server.json`, `scripts/docker.mjs` reads it for the local `docker:*` scripts, and both
  Docker workflows plus the npm workflow resolve it at release time. A prerelease no
  longer takes `latest`: the images are tagged with the version alone and the npm publish
  goes to the `beta` dist-tag.
- `[build]` **Fixed: both Docker images failed to build.** `npm run build` ends in
  `node scripts/copy-docs.mjs`, but neither Dockerfile copied `scripts/`, so the build step
  exited with `ERR_MODULE_NOT_FOUND`. CI never builds an image, so the first symptom would
  have been a failed release.
- `[build]` **Fixed: the `docker:*` npm scripts were broken on Windows.** They interpolated
  `$npm_package_version`, which `cmd.exe` — npm's default script shell there — does not
  expand, so the tag became that literal string.

### 🎉 New Features & Improvements

- `[sdk]` **The server runs on the v2 MCP TypeScript SDK and speaks MCP protocol revision
  2026-07-28.** This is the headline of the release: `@modelcontextprotocol/sdk` is replaced
  by `@modelcontextprotocol/server` and `@modelcontextprotocol/node`, tool schemas are built
  with zod 4's own JSON Schema conversion, and both transports serve the 2026-07-28 revision
  _and_ the 2025 handshake from the same tool registrations — a client on either revision
  sees the same tools, so nothing has to move revision to keep working. The new revision has
  no initialize handshake and no protocol-level session, so Streamable HTTP is served
  statelessly: no per-session transport map, no session IDs, no sniffing the first request.

#### New tools

- `[authoring]` **Support for the [Sitecore Authoring and Management GraphQL
  API](https://doc.sitecore.com/sai/en/developers/sitecoreai/content-modeling-and-presentation/sitecore-authoring-and-management-graphql-api.html)
  — 22 new tools, the largest single addition in this release.** This is the surface Sitecore
  supports for authoring writes, and the one that matters most on SitecoreAI: it reaches the
  CM over plain HTTP with an OAuth bearer token, so it needs neither SPE Remoting nor the
  Item Service, and it keeps working on environments where both are switched off. It also
  expresses operations the other surfaces cannot — building a data template with its
  sections and fields in a single call, for one.

  The endpoint and its credentials are separate from the existing `GRAPHQL_*` block, which
  talks to Edge and preview with an `sc_apikey`. New settings: `AUTHORING_ENDPOINT` (which
  defaults to `ITEM_SERVICE_SERVER_URL` plus the fixed
  `/sitecore/api/authoring/graphql/v1/` path, so it rarely needs setting),
  `AUTHORING_CLIENT_ID` / `AUTHORING_CLIENT_SECRET` for the client-credentials grant,
  `AUTHORING_TOKEN` for a token you already hold, and `AUTHORING_AUTHORITY` /
  `AUTHORING_AUDIENCE`, which default to the Sitecore Cloud values. Tokens are minted on
  demand, cached until shortly before they expire and renewed without attention, and
  concurrent tool calls share one token request rather than one each.

  The tools, in three new groups:
  - `authoring.core` — `authoring-introspect-schema`, `authoring-graphql`. Two tools that
    between them reach the _entire_ schema, including the parts no typed tool wraps:
    workflow, archiving, rules, security, languages, databases, site creation.
  - `authoring.content` — `authoring-get-item`, `authoring-create-item`,
    `authoring-update-item`, `authoring-delete-item`, `authoring-copy-item`,
    `authoring-move-item`, `authoring-rename-item`, `authoring-search`,
    `authoring-get-item-template`, `authoring-create-item-template`,
    `authoring-update-item-template`, `authoring-upload-media`,
    `authoring-get-media-item`, `authoring-list-sites`, `authoring-get-site`.
  - `authoring.management` — `authoring-publish-item`, `authoring-publishing-status`,
    `authoring-rebuild-indexes`, `authoring-get-job`, `authoring-list-jobs`.

  Every input type, field name and selection set was taken from a live endpoint's own SDL
  rather than from the documentation's examples, and the 28-test live suite in
  `tests/authoring/authoring-live.test.ts` runs each tool against a real CM.

- `[authoring]` **`authoring-upload-media` does both halves of the upload.** Sitecore's
  `uploadMedia` mutation returns a pre-signed URL rather than accepting bytes, so a tool
  that stopped there would hand an agent a URL it has no way to POST to. This one fetches
  the pre-signed URL and uploads the file behind it, taking the bytes from a `sourceUrl`
  this server fetches, a `filePath` local to the server, or inline base64 — the same three
  sources as `media-upload`, and confined by the same `MEDIA_LOCAL_FILE_ROOT` and private-
  address guards.

- `[authoring]` **`authoring-introspect-schema` ships its own introspection query.**
  graphql-js's `getIntrospectionQuery()` nests `ofType` nine levels deep and the endpoint
  enforces a maximum query depth of 13, so the standard query is refused outright with
  _"The query exceded the maximum allowed execution depth of 13"_ and returns no schema at
  all. The shipped query is the same document with the type-reference chain shortened to
  seven levels — still far more wrapping than any real type uses, and verified to return the
  full 117KB SDL from a live endpoint.

- `[authoring]` **An unauthenticated call is reported as one.** The endpoint answers an
  unauthorized request with HTTP 200 and an `AUTH_NOT_AUTHENTICATED` entry in `errors`, so a
  client that checks only the status code reports "no data returned" for what is really a
  credentials problem. The client inspects the GraphQL errors and says which it is; a 404
  names `GraphQL.Enabled`, and a token rejection names the audience.

- `[composition]` **`add-rendering-to-placeholder`** — the tool to compose a page with.
  Adds a rendering to a placeholder and _refuses_ it when the placeholder's settings do not
  allow that component, naming the allow-list in the error; `presentation-add-rendering`
  writes whatever it is told, and an invalid layout still saves and renders. Assigns a
  collision-free `DynamicPlaceholderId` when the rendering's parameters template defines one,
  writes the full parameter set the template declares, and returns the placeholder path a
  child rendering should target — so a nested build is one call per level. `force=true`
  skips validation for migration and repair work.

- `[composition]` **`get-allowed-components-by-placeholder`** — lists the renderings a
  placeholder actually allows on a given page, resolving site-level settings
  (`<site>/Presentation/Placeholder Settings`) first and falling back to the global tree;
  `settingsItemPath` reports which item answered. Handles dynamic placeholders by matching a
  runtime path's leaf segment against wildcard keys such as `container-{*}`. Allowed control
  IDs that resolve to no item are surfaced under `Unresolved` rather than dropped, and
  `Found=false` means no settings item governs the key at all.

- `[composition]` **`create-component-datasource`** — creates a component's datasource item
  from the Datasource Template and Datasource Location declared on the rendering itself.
  `placement='page-local'` (default) creates `<page>/Data/<name>` and returns the
  `local:/Data/<name>` reference form authored pages use; `placement='shared'` walks the
  rendering's pipe-separated location candidates in order and creates the item in the first
  that exists, failing with every candidate it tried rather than guessing. Field values
  passed in `fields` are set on the new item.

- `[presentation]` **`presentation-list-renderings`** — reads a page's presentation as rows
  rather than a layout XML blob: `Index`, `Placeholder`, `RenderingName`, `RenderingID`,
  `Datasource` and `UniqueId`, which are the identifiers the other presentation tools
  address. Defaults to the final layout, the effective presentation for the page.
  `includeParameters` is off by default — on an SXA or Stride site the URL-encoded parameter
  blobs more than doubled the response for a 25-rendering page.

- `[media]` **`media-upload`** — uploads a file into the media library over the SPE
  `mediaUpload` handler. Takes its bytes from a `sourceUrl` fetched by the server (the
  migration path — nothing large ever passes through the model), a server-local `filePath`,
  or base64 `content`, and returns the created media item with its ID, setting `alt` in the
  same round trip.

- `[media]` **`media-download`** — pulls a media item's bytes back out over the SPE
  `mediaDownload` handler, writing to a server-local file via `saveTo` or returning
  size-capped inline base64. Both media tools need their SPE service enabled on the CM; the
  setup doc's patch now ships `mediaUpload` / `mediaDownload` enabled. Verified live against
  a SitecoreAI development CM: download-to-file, oversized-inline refusal, upload from a
  local file, and upload straight from a live site URL.

- `[composition]` **`list-sites`** — lists the content sites registered on the CM with name,
  root path, start path, database, hostname and the root item's ID and template. Sitecore's
  own infrastructure sites (shell, login, service, …) are filtered out unless
  `includeSystemSites` is passed.

- `[composition]` **`get-site-information`** — returns one site's definition plus the paths
  the rest of the composition set needs: home item, site-level Placeholder Settings root,
  Available Renderings root, shared Data folder, site definition item, and the project
  (tenant) folder used to resolve global placeholder settings. Address it by site name, or by
  any item path inside the site.

- `[composition]` **`list-site-components`** — the site's component inventory, grouped by its
  Available Renderings groups (Page Content, Page Structure, FEaaS, Forms, Global on a Stride
  site). Explicitly _not_ an allow-list — the groups say nothing about where a rendering may
  be placed, which is what `get-allowed-components-by-placeholder` answers.

- `[composition]` **`get-pages-by-site`** — lists a site's pages, where "page" means the item
  has presentation (a layout on the item or on its template's standard values) rather than a
  guess from template naming. Returns `Matched`, `Returned` and `Truncated` alongside the
  rows, so a truncated listing is visible as one; `rootPath` scopes the scan to a section.

- `[composition]` **`search-site-pages`** — the same page rows, filtered by a
  case-insensitive substring match against `Name`, display name, `Title` and
  `NavigationTitle`.

- `[composition]` **`list-insert-options`** — the templates and branches that may be created
  under an item, read from `__Masters` (which inherits from the template's standard values).
  Each row reports `Kind`, since a `Branch` copies a whole subtree and a `Template` creates a
  single item. Insert _rules_ are not evaluated — the `uiGetMasters` pipeline is not available
  on a SitecoreAI CM — so a project that uses them may see more options in the Content Editor
  than are listed here.

- `[security]` **`security-export-user`** and **`security-import-user`** — serialize a user
  to disk and read one back, wrapping `Export-User` / `Import-User` with `identity` plus an
  optional `root` or `path`.

- `[security]` **`security-export-role`** and **`security-import-role`** — the same for
  roles, over `Export-Role` / `Import-Role`.

  All four are unblocked by SPE 8.0 and verified against a SitecoreAI development CM running
  it. The export cmdlets were broken before SPE 8.0
  ([SPE #1369](https://github.com/SitecorePowerShell/Console/issues/1369),
  [#1370](https://github.com/SitecorePowerShell/Console/issues/1370)); the import cmdlets NRE
  only when the serialized file does not exist yet
  ([#1371](https://github.com/SitecorePowerShell/Console/issues/1371),
  [#1372](https://github.com/SitecorePowerShell/Console/issues/1372)) — export first.
  `security-login-user` and `security-logout-user` will not be added: SPE 8.0 hollowed
  `Login-User` and `Logout-User` and marked them obsolete for removal
  ([#1367](https://github.com/SitecorePowerShell/Console/issues/1367),
  [#1368](https://github.com/SitecorePowerShell/Console/issues/1368)). Sitecore CLI is the
  supported serialization route.

#### New guides

- `[guides]` **The server now serves guide resources — three of them, for the workflows the
  tools can perform but do not encode.** A resource costs nothing until it is read, unlike
  the server `instructions`, which are paid every session, so this is where task-specific
  guidance lives:
  - **`guide://compose-page`** — the composition procedure in the right order, with the
    placeholder-path, dynamic-placeholder, SXA Container/splitter and grid-parameter
    knowledge whose absence produces a page that saves, renders, and is wrong. Its step 5
    also requires the new datasource's text fields to be filled — placeholder copy where the
    caller gave no content — because `create-component-datasource` sets only the fields it is
    given, and a component added and left alone renders blank and reads as a failed
    deployment rather than a page awaiting copy. Offered only
    when `powershell.composition` and `add-rendering-to-placeholder` are enabled, so it never
    describes a workflow whose first call does not exist.
  - **`guide://bulk-update`** — the same change across many items, as a
    `run-powershell-script` script that follows the safe pattern: every ID resolved from the
    instance rather than guessed, the subtree and the item filter established with the user
    rather than inferred, filter to the items that actually need the change, dry run whose
    output the user approves before anything is written, edits bracketed in
    `BeginEdit`/`EndEdit` with a per-item `try`/`catch`, and a final summary. Offered only
    when `powershell.core` and `run-powershell-script` are enabled.
  - **`guide://diagnose-connection`** — which of the four surfaces can reach the instance,
    and what each failure signature actually means — including the ones that read as the
    opposite of their cause, like the Authoring API's unauthorized-but-HTTP-200 and SPE's
    400-with-an-identity-provider's-HTML-page. Never gated: which surfaces are absent is the
    question it answers.

  **Resources rather than MCP prompts, deliberately.** All three were prototyped as prompts
  as well, and the prompt half was dropped before release: the server advertises no prompts
  capability. A prompt is user-triggered and one-shot — somebody has to know it exists, pick
  it before the first tool call, and it cannot be consulted again once injected — while the
  failures these bodies guard against surface *mid-task*, several calls in, when an agent
  meets a Column Splitter, has to put a value in `GridParameters`, or gets a 400 with an
  HTML body back from SPE. A resource is readable at the moment the question arises,
  re-readable, and reachable by an agent that would never have gone looking through a prompt
  list. The prompt argument was carrying nothing either: the request is already in the
  agent's context in the user's own message, and a slash-command client that splits one
  string across declared arguments turned `/add-component-to-page create a fresh page and
  add header banner heading and content block` into `page: "create"`, `component: "a"` —
  four well-formed strings that are collectively nonsense, which nothing in the schema
  rejects.

- `[guides]` **Each guide is named where an agent already reads.** A client lists resources
  separately from tools and an agent has no reason to go looking, so the
  `guide://tool-selection` resource discloses each URI and when to reach for it, and — the
  pointer that lands mid-task — the description of the tool each guide is about names it:
  `add-rendering-to-placeholder` names `guide://compose-page`, and `run-powershell-script`
  names `guide://bulk-update`. Each guide is gated with the tools its steps call, since a
  procedure whose every step names an absent tool is misleading rather than merely useless.
  See [Guides](docs/guides.md).

#### Performance and token cost

- **`tools/list` serves 121 tools / 135,573 characters, down from 162 tools / 150,038 in
  1.4.2** — 41 fewer tools and about 3,700 fewer tokens on every turn, while the release
  *adds* the composition set, the two media tools, the four security serialization tools and
  the 22 Authoring and Management tools (less the three removed: `sitecore-cli-documentation`,
  `item-service-run-stored-query` and `item-service-run-stored-search`). Measured against the
  same SitecoreAI CM throughout. Three passes paid for the additions:
  - **The `-by-id` / `-by-path` merge, and the twelve families merged after it.** In isolation
    this took 1.4.2's 162 tools / 150,038 characters to 111 / 100,091 — the whole tool-count
    reduction and most of the schema — with zod 4's tighter JSON Schema taking the remaining
    106,822 → 100,091. 426 of 472 parameters still carried a description at that point, the
    same 426 as before, the other 46 being parameters that never had one. Everything this
    release adds lands on top of that figure.
  - **Inferred `annotations.title` is gone.** `toTitle` only title-cased the tool name, so 134
    of 136 titles restated a field the client already had, at ~4,800 characters per
    `tools/list`. The two tools whose title says more than the name set it explicitly and keep
    it.
  - **The most-repeated parameter descriptions were cut to one line each:** the `full` flag's
    (246 → 93 characters, spread across 33 tools), the `fields` flag's (132 → 81, across 15),
    `finalLayout`'s (224 → 99, across 7), and three wordings of the `database` parameter
    collapsed into one 51-character constant across 28 files.

  A `$schema`-stripping pass was written, measured at a further ~7,600 characters, and then
  **reverted**: re-wrapping the converted schema with the SDK's `fromJsonSchema` validates
  arguments but does not *apply* JSON Schema `default` values the way zod's `.default()` does.
  32 defaults across 20 tool files rely on that, and the round trip silently dropped every one
  — `authoring-get-item` began failing live with "Variable `ownFields` of type `Boolean!`
  must not be null". `tool-profiles.ts` records why, so the next attempt starts from the
  constraint rather than rediscovering it.

  **121 is the tool surface.** The `graphql` group registers a query tool and an introspection
  tool per entry in `GRAPHQL_SCHEMAS`, so the default `edge,master` puts 123 on the wire and
  every further schema adds two; every figure here is measured at one schema. For a much
  larger saving than any pass above, set `TOOL_PROFILE` or `TOOL_GROUPS` for the instance you
  actually run against: `TOOL_PROFILE=no-account-management` serves 109 tools / 128,140
  characters,
  `TOOL_PROFILE=no-spe` 33 tools / 41,168, and `TOOL_GROUPS=authoring.core,authoring.content`
  18 tools / 26,954 — an 80% reduction. See [Tool selection](docs/tool-selection.md).

- **Response projection for the item-returning PowerShell tools.** `fields` names the fields
  to return and `full` opts back into the whole set, so a call that needs three fields no
  longer pays for every field on the item.

- **`common-get-archive-item` pages, and reports the archive's total.** New `first` (default 100) and `skip` parameters, and the response is now an object carrying `Archive`, `Total`,
  `Skip`, `First`, `Returned` and `Items` rather than a bare row list. A recycle bin is a tail
  nobody trims: the CM this was measured against holds 9,769 entries, and an unfiltered call
  returned roughly 3.3M characters even after response projection. The default page is
  ~32,000 characters, and `Total` means an agent can see it is looking at a page instead of
  discovering the archive's size by paying for it.

- **Error shaping** reduces a failed SPE call to the message and the parameter sets, rather
  than returning the whole CliXml exception.

- **Tool gating via `TOOL_GROUPS`, `DISABLED_TOOLS` and `TOOL_PROFILE`** lets a deployment
  register only the groups it uses, which is the largest single lever on `tools/list` cost.
  **Every profile is a `no-*` entry; none names a platform.** A preset keyed to the product
  would have to guess which tools that product's operators do not want, and the guess misses
  in both directions: `powershell.security` holds account management _and_ item security,
  only the first of which is ever unwanted, while an operator who does want account
  management withheld may be on any platform. Which surface is absent, and which operation
  you would rather an agent could not perform, are things an operator can state precisely —
  so they are the only two things the table asks for.

- **Five `TOOL_PROFILE` presets**, and `TOOL_PROFILE` takes a comma-separated list so they
  compose. Four name an API surface: `no-spe`, `no-item-service`, `no-edge-graphql` and
  `no-authoring-api` each hide the groups belonging to one of the server's four surfaces,
  for an instance that does not serve it. `no-spe` is the significant one: SPE ships with
  `remoting` disabled, and without it roughly three quarters of this server's tools cannot
  run — schema an agent otherwise pays for on every turn. Saying which surface is absent
  beats the equivalent `TOOL_GROUPS` allowlist, which has to enumerate every group you _do_
  want and needs revisiting whenever a group is added.

  The fifth, **`no-account-management`**, is the one that is not about a missing surface.
  Those four say _this instance cannot serve that_; this one says _I would rather an agent
  could not do that_. The twelve tools it hides work on any CM — `security-new-user`,
  `-remove-user`, `-set-user`, `-set-user-password`, `-disable-user`, `-enable-user`,
  `-unlock-user`, `-test-account`, `-new-domain`, `-remove-domain`, `-export-account`,
  `-import-account` — and that is the point: creating a user, resetting a password or
  serializing an account out to disk are consequential, easy to do by accident, and rarely
  what the agent was asked for. Not registering the tool is a stronger guarantee than a
  prompt telling it not to, and it costs the schema too. Deployments that administer
  accounts elsewhere anyway (the Cloud Portal on SitecoreAI, an external identity provider
  on a federated XM/XP) are the obvious case, but the profile stands on its own anywhere.

  It hides nothing else: item security is set from the CM on every platform, so
  `security-set-item-acl`, `-get-item-acl`, `-test-item-acl`, `-set-item-lock` and
  `-set-item-protection` stay, and so do the account and role _reads_ an agent needs in
  order to name an identity in an access rule.

  Nothing probes Sitecore to infer any of this: a startup probe that misread a transient
  network failure would silently delete most of the tool surface.

- `[graphql]` **The two GraphQL introspection tools are progressively disclosed instead of
  returning the whole SDL.** Both previously took no arguments at all, so there was no way to
  ask for less. `introspection-graphql-{schema}` returned **777,501 characters** against a live Edge
  endpoint — roughly 194,000 tokens, more than most context windows hold, so no agent could
  call it and survive. Both now accept `type`, `search`, `full` and `includeDescriptions` —
  the same shape `get-powershell-documentation` uses (see below).
  - With no arguments, `introspection-graphql-{schema}` returns the root operations plus the
    `Item` and `ItemField` interfaces: **3,950 characters**, down from 777,501. That is the
    whole contract — the schema has four root fields, and every field of every item is
    reachable through `field(name:)` on `Item`. What is no longer returned was 66%
    descriptions of which only 14% were distinct (one sentence appeared 597 times), plus 36
    GUID-suffixed duplicate types, 26 of them near-identical to a friendly-named twin.
  - With no arguments, `authoring-introspect-schema` returns the operation index: 127 queries
    and mutations, one line each, **10,332 characters** down from 117,188. That schema is
    dense rather than repetitive — 324 definitions averaging 362 characters, descriptions 74%
    distinct — so it is sliced, not replaced. Roughly 107 of its 127 operations have no typed
    `authoring-*` tool, which makes this the only way to discover the rest of the surface.
  - `type: "<name>"` returns one type or root operation in full, and for an operation it
    closes over the input and enum types its arguments reference, so a single call is enough
    to write the document: `type: "createUser"` returns the mutation and `CreateUserInput`
    together in 1,083 characters.
  - `includeDescriptions: false` cuts the full Edge SDL from 777,501 to 234,980 characters.
- `[powershell]` **Sixteen further tools project their responses.** The projection described above
  reached the item-returning *read* tools first and initially missed the writes and the
  infrastructure reads; a live sweep of every tool found them. Every figure below is measured on the same live CM, before → after:
  - `common-get-cache` with no arguments, the form its own description invites: 110,299 → 26,332
  - `common-get-sitecore-job`, which takes no arguments at all: 42,018 → 8,920
  - `common-get-database` for all databases: 21,761 → 642
  - `common-get-archive`: 8,265 → 84, and it now reports each archive's entry count
  - `common-add-item-version`: 47,459 → 260
  - `common-new-item-clone`: 59,587 → 270
  - `security-lock-item` and `security-unlock-item` with `passThru`: ~51,000 → 260.
    `security-protect-item`, `security-unprotect-item` and `common-convert-from-item-clone`
    get the same projection on their `passThru`.
  - `security-get-current-user`: 4,466 → 253. `security-get-user-by-identity` and
    `security-get-user-by-filter`: 3,385 → 233. `security-get-role-member`: 4,919 → 233.
    `security-get-role-by-identity` / `-by-filter` and `security-new-role`: → 173.
    `security-get-domain`: 2,051 → 745. `security-get-item-acl`: 756 per rule → ~120.
  - Each of these takes `full: true` to return the unprojected object graph, like every
    other projected tool.
- `[item-service]` **`item-service-search-items` no longer returns the facet breakdown unless
  asked.** The endpoint returns it on every search whether or not the caller wants it, and it
  dominated the response: 62,277 characters for a `pageSize: 5` search, of which `Facets` was
  46,014 and `Results` 1,720. Pass `includeFacets: true` to get it back, with the per-value
  `Link` callbacks dropped.

#### Existing tools

- `[powershell]` **`get-powershell-documentation` reveals the SPE reference progressively
  instead of returning all of it.** It used to concatenate all 148 command pages — about
  570KB of markdown — into a single tool result, so an agent that wanted the parameters of one
  cmdlet paid for the parameter tables of the other 147. It now answers in widening steps,
  each one telling you how to make the next: no arguments returns every command name with a
  one-line summary grouped by category (~13KB, about 2% of the corpus); `search` matches
  names, summaries and page bodies for when you know the task but not the cmdlet; `category`
  lists one group; and `command` returns the full page for up to five named commands.
  Case-insensitive, and a miss suggests the nearest names rather than just failing — a typo
  like `Get-ItemTemplates` is answered with `Get-ItemTemplate` first. There is deliberately no
  "return everything" mode.

- `[powershell]` **The 19 SPE console-only command pages are no longer bundled.** Every
  script this server runs goes over the `remoting` service, where there is no browser, no
  Sheer UI and no interactive host, so the pages for commands that only exist inside the SPE
  console described a capability the agent does not have: `Invoke-JavaScript`,
  `Send-SheerMessage`, `Read-Variable`, `Close-Window`, `Get-UserAgent`, `Set-HostProperty`,
  `Out-Download`, `Send-File`, `Receive-File`, `Update-ListView` and the nine `Show-*` dialog
  commands. A model that reads the `Show-Confirm` page has been told it can ask the user a
  question mid-script, which is worse than not finding a page at all. The corpus is 129 pages
  / ~510KB, down from 148 / ~570KB, and the no-argument index is 11,454 characters.

- `[powershell]` **The bundled SPE command reference is re-synced with upstream.** 145 of the
  149 pages were already byte-identical to `SitecorePowerShell/Book`; four had drifted, and
  `Find-Item` was the one that mattered — the bundled page documented neither `-Path`,
  `-Template`, `-Property` nor `-LatestVersion`, all of which a real search script needs.
  `Invoke-JavaScript`, `Show-ModalDialog` and `Send-SheerMessage` were refreshed too.
  `packaging/import-item-1.md`, a byte-identical duplicate of `import-item.md`, and
  `commands-list.md`, whose every link pointed at a path that exists in neither this repo nor
  upstream, are both dropped — the index is generated from the pages now. One page is
  corrected rather than copied: `restore-archiveitem.md` is headed `# Remove-ArchiveItem`
  upstream, though its filename, syntax block and body are all `Restore-ArchiveItem`.

- `[presentation]` **`presentation-switch-rendering` returns the switched instance(s).**
  SPE's `Switch-Rendering` assigns the replacement a NEW uniqueId, so the id the caller
  passed in dies with the old instance — and the tool used to return nothing, leaving every
  follow-up call aimed at an id that no longer existed. The tool now diffs the rendering
  list around the switch and returns one row per switched instance (new `UniqueId`,
  `RenderingID`, `Placeholder`, `Datasource`). The uniqueId form also fails loudly when the
  diff comes back empty, so a switch that changed nothing can never read as success (SPE 8
  throws its own error for an unknown id; the guard covers SPE paths that no-op instead).

### 🛠 Breaking Changes

- `[powershell]` **Six tools move from `simple/` to `composite/`.** No tool name, schema or
  behaviour changes — this is the source layout only, and it is worth recording because the
  rule it follows decides where the next tool goes: a tool that always runs the same one
  cmdlet is `simple`, and a tool that makes several calls, or picks its cmdlet from the
  parameters it was given, is `composite`. The merged tools are all the second kind.
  Moved: `indexing-set-search-index-state` (`Suspend-`/`Stop-`/`Resume-SearchIndex`),
  `indexing-rebuild-search-index` (`Initialize-SearchIndex`/`Initialize-SearchIndexItem`),
  `common-set-base-template` (`Add-`/`Remove-BaseTemplate`), `security-set-item-lock`
  (`Lock-`/`Unlock-Item`), `security-set-item-protection` (`Protect-`/`Unprotect-Item`) and
  `security-export-account` / `security-import-account` (`Export-`/`Import-User` or `-Role`).

- `[item-service]` **`item-service-run-stored-query` and `item-service-run-stored-search`
  are removed.** Both ran a saved query or search _definition item_ by GUID — a Sitecore
  feature that assumes someone has already authored the definition in the content tree. No
  caller ever had that GUID to hand, so the tools cost schema on every turn without being
  reachable in practice. `item-service-search-items`, `authoring-search` and
  `indexing-find-item` cover searching from a query you actually have.

- `[sitecore-cli]` **`sitecore-cli-documentation` is removed, along with its `sitecore-cli`
  tool group.** The tool served a bundled snapshot of the Sitecore CLI documentation, which
  had gone out of date and could only ever go further out of date. Sitecore's own
  documentation MCP server answers the same questions against the live docs, so carrying a
  stale copy cost a tool's schema on every turn to give worse answers. `TOOL_GROUPS` no
  longer accepts `sitecore-cli` — an entry naming it is reported on stderr and ignored, as
  any unknown group is.

- **The `-by-id` / `-by-path` tool families are merged into one tool per operation.** 99
  tools were variants of 48 operations, differing only in how the caller named the item.
  Each merged tool drops the suffix and takes optional `id` and `path`, requiring exactly
  one; the old names are gone and are **not** aliased, because keeping them would double the
  surface again and defeat the point. Supplying both, or neither, is an input error naming
  the valid inputs, rejected in TypeScript before any PowerShell runs — two inputs used to be
  resolved only by Sitecore's own cmdlet precedence, which the caller cannot see.

  Merged operations, all following `<name>-by-id` / `<name>-by-path` → `<name>`:
  - `common-` — `add-base-template`, `add-item-version`, `convert-from-item-clone`,
    `get-item-clone`, `get-item-field`, `get-item-reference`, `get-item-referrer`,
    `get-item-template`, `get-item-workflow-event`, `invoke-workflow`, `new-item-clone`,
    `new-item-workflow-event`, `publish-item`, `remove-base-template`,
    `remove-item-version`, `reset-item-field`, `set-item-template`, `test-base-template`,
    `update-item-referrer`
  - `presentation-` — `add-placeholder-setting`, `add-rendering`, `get-layout`,
    `get-placeholder-setting`, `get-rendering`, `get-rendering-parameter`,
    `list-renderings`, `merge-layout`, `remove-placeholder-setting`, `remove-rendering`,
    `remove-rendering-parameter`, `reset-layout`, `set-layout`, `set-rendering`,
    `set-rendering-parameter`, `switch-rendering`
  - `security-` — `add-item-acl`, `clear-item-acl`, `get-item-acl`, `lock-item`,
    `protect-item`, `set-item-acl`, `test-item-acl`, `unlock-item`, `unprotect-item`
  - `indexing-` — `initialize-search-index-item`, `remove-search-index-item`
  - `item-service-get-item` (was `-by-path` only) and `provider-get-item`

  Three families take a wider union: `provider-get-item` accepts `id`, `path`, `query` or
  `uri`; `presentation-switch-rendering` names the rendering to replace with
  `oldRenderingId`, `oldRenderingPath` or `uniqueId`, keeping the `-UniqueId` route through
  SPE (and issue #62's guard on the two branches that select with `Where-Object`); and the
  tools addressing two things at once — `presentation-add-rendering`,
  `presentation-add-placeholder-setting`, `presentation-set-layout` — validate the item and
  the rendering/setting/layout independently, which makes previously unreachable
  combinations work, such as an item by path with a rendering by ID.

- **Parameter changes that came with the merge.** The presentation tools that took `itemId`
  / `itemPath` now take `id` / `path`, like everything else. `database` is sent only when
  addressing by `id`, since a path carries its own prefix
  (`master:/sitecore/content/Home`); where a variant tool used `path` defaulting to
  `master:` purely as the drive for `-Id` (`provider-get-item`, `security-set-item-acl`,
  both `indexing-*-search-index-item`, `presentation-set-layout`), that role moved to
  `database` with the same default. The `.default("master:")` on `path` in
  `presentation-get-layout`, `-reset-layout` and `-set-layout` is gone: a defaulted path is
  indistinguishable from a supplied one, so every id-addressed call would have looked like
  it named two targets. `security-test-item-acl` keeps the `accessRight` enum from its ID
  variant rather than the path variant's loose string, and `security-add-item-acl` keeps the
  `passThrough` switch only its path variant exposed.

- `[transport]` **The SSE endpoint is gone.** `SSEServerTransport` was removed from the MCP
  specification and from the SDK, so `http://<host>:3001/sse` no longer exists and neither
  does the `/messages` endpoint that went with it. **Any client configured against `/sse`
  must be repointed at Streamable HTTP on `/mcp`** — same host, same port 3001, one endpoint
  instead of two. This affects XM/XP and SitecoreAI deployments alike.

  _Migration:_ change the client's server URL from `http://<host>:3001/sse` to
  `http://<host>:3001/mcp`, and its transport type from "SSE" to "Streamable HTTP".
  `TRANSPORT=sse` still starts a server rather than failing: it serves Streamable HTTP on
  port 3001 and says so on stderr, so a container keeps listening while you repoint its
  clients. The `start:sse` npm script and `src/app.ts` are removed; `npm start` now means
  Streamable HTTP.

- `[deps]` **The SDK packages changed.** `@modelcontextprotocol/sdk` is replaced by
  `@modelcontextprotocol/server`, `@modelcontextprotocol/node` and (for tests)
  `@modelcontextprotocol/client` — see the v2 SDK entry under New Features for what that
  buys.

  _Migration:_ none required for clients. Anyone embedding this package's modules directly
  should note that `McpServer` and `CallToolResult` now come from
  `@modelcontextprotocol/server`.

- `[deps]` **The supported runtime is the latest Node.js LTS release**, with `engines.node`
  set to `>=22` as the hard floor. The v2 SDK does not support older runtimes, and Node 20
  reached end of life in April 2026.

  _Migration:_ upgrade Node. The published Docker images already run Node 24.

- `[deps]` **zod 4.2 or later is required**, and `zod` is now a direct dependency rather
  than something inherited from the SDK. v2 builds tool schemas with zod's own JSON Schema
  conversion; on zod 3 the first `tools/list` fails silently, and on zod 4.0–4.1 every
  parameter description is dropped from the schema.

  _Migration:_ none for users of the published package. A checkout needs a fresh
  `npm install`.

- **The Smithery integration is removed.** `smithery.yaml` and the Smithery-generated root
  `Dockerfile` are deleted, along with the README badge. Neither was built by CI — the
  published images come from `docker/linux/Dockerfile` and `docker/windows/Dockerfile` — and
  the config had drifted, exposing none of the tool-gating settings. Install with
  `npx @antonytm/mcp-sitecore-server@latest` or one of the Docker images instead.

- `[powershell]` **Twelve more tool families merged, on the same principle as the `-by-id` /
  `-by-path` merge above: where two tools differed only in a value, the value became an
  input.** 26 tools become 13, and each merged tool validates its discriminator rather than
  guessing.
  - `security-get-user-by-identity` + `security-get-user-by-filter` → **`security-get-user`**,
    and `security-get-role-by-*` → **`security-get-role`**. Both take `identity` or `filter`
    and reject zero or two, exactly as the addressing merges do.
  - `security-get-domain-by-name` folded into **`security-get-domain`**: `Get-Domain` already
    treats a missing `-Name` as "every domain", so the two tools were one call apart.
  - `security-lock-item` + `security-unlock-item` → **`security-set-item-lock`**, and
    `security-protect-item` + `security-unprotect-item` →
    **`security-set-item-protection`**, each with an `action`. These stay *two* tools rather
    than one: an editing lock and delete protection are independent flags — an item can be
    locked, protected, both or neither — so a single `state` enum would claim they are
    alternatives and make "protect this locked item" unexpressible. `force` lives on the lock
    tool only, and is refused for `action: "unlock"`, because SPE's `Unlock-Item` has no
    `-Force`.
  - `security-export-user` + `-export-role` → **`security-export-account`**, and
    `security-import-user` + `-import-role` → **`security-import-account`**, with an
    `accountType`. Direction stays two tools: export writes a file, import overwrites the
    live account, and one tool covering both would have to declare `destructiveHint: true`
    for the export case too — a safety annotation that is wrong half the time is worse than
    two tools.
  - `indexing-suspend-search-index` + `-stop-search-index` + `-resume-search-index` →
    **`indexing-set-search-index-state`** with an `action`. The rebuild is deliberately *not*
    folded in: it reads like a fourth state but is a different operation, with item scoping and
    an `includeRemoteIndex` parameter that would be meaningless for the other three values.
  - `indexing-initialize-search-index` + `indexing-initialize-search-index-item` →
    **`indexing-rebuild-search-index`**, with the item optional. These were one question —
    "rebuild what?" — split across two tools whose names differed by a suffix, and the narrower
    one was the harder to find precisely because `-search-index-item` reads like a variant of
    the other rather than the scoped form of it. Omit `id` and `path` to rebuild whole indexes;
    supply either to rebuild just that subtree. They are two different cmdlets underneath
    (`Initialize-SearchIndex` and `Initialize-SearchIndexItem`), so the tool dispatches rather
    than passing a flag through: `asJob` is on both, while `includeRemoteIndex` exists only on
    the whole-index cmdlet and is refused with an item rather than silently dropped. The index
    name's default differs by mode — every index for a whole rebuild, `sitecore_*_index` for a
    subtree — so it is applied per branch rather than as a schema default that would silently
    change the other mode's meaning. "Rebuild" is SPE's own verb here:
    `Rebuild-SearchIndexItem` is the documented alias for the item cmdlet.
  - `security-add-item-acl` + `security-set-item-acl` + `security-clear-item-acl` →
    **`security-set-item-acl`** with `action: add | replace | clear`. The split actively
    misled: `add` and `set` differed in whether the existing rules survive — the single most
    important thing about the call — and that was discoverable only by reading two
    descriptions side by side. `identity` and `accessRight` are required for `add` and
    `replace` and refused for `clear`, since a `clear` that also named an identity was most
    likely meant to be a `replace`. Three cmdlets underneath (`Add-ItemAcl`, `New-ItemAcl`
    piped into `Set-ItemAcl`, `Clear-ItemAcl`), so it dispatches rather than passing a flag.
  - `presentation-get-layout-device` + `presentation-get-default-layout-device` →
    **`presentation-get-layout-device`**, with `name` optional. `Get-LayoutDevice` has exactly
    two parameter sets, `[-Name]` and `[-Default]`, so the two tools were one switch apart.
  - `common-add-base-template` + `common-remove-base-template` →
    **`common-set-base-template`** with an `action`. The merged tool declares
    `destructiveHint: true` unconditionally: removing a base template strips its fields from
    every item built on the template, and with one tool the annotation has to cover the worse
    case.
- `[powershell]` **`indexing-remove-search-index-item` is removed.** An index entry deleted
  by hand reappears on the next crawl, so it fixed nothing that
  `indexing-rebuild-search-index` does not fix properly, and it invited an agent to
  "clean up" an index in a way that does not hold.
- `[server]` **Inferred `annotations.title` is gone from all but two tools.** A client that
  displayed the title now displays the tool name — the same words, since `toTitle` only
  title-cased the name — and the two tools whose title says more than their name keep theirs.
  What this saved, and the rest of the `tools/list` budget, is under
  [Performance and token cost](#performance-and-token-cost).


### 🔒 Security

- `[http]` **Streamable HTTP validates `Host` and `Origin`, and binds loopback by default.**
  A browser cannot reach `/mcp` cross-origin on its own — `application/json` is not a
  CORS-simple content type and no CORS headers are sent — but DNS rebinding steps around
  that entirely: a page on a name that resolves first to the attacker's address and then to
  `127.0.0.1` is treated by the browser as _same-origin_ with whatever is listening there,
  with no preflight and full read access to the response. On this server that is
  administrative control of the configured Sitecore instance, since `AUTHORIZATION_HEADER`
  is empty by default. The MCP specification requires servers to validate `Origin` for this
  reason and the SDK does not do it, so both headers are now checked ahead of every route
  and ahead of body parsing: loopback names pass, anything else gets a 403 naming the header
  and how to permit it, and a request sending neither header is allowed through, because only
  a browser is obliged to send `Origin` and only a browser can be made to lie about `Host`.
  `HOST` now defaults to `127.0.0.1` rather than every interface, so a
  `TRANSPORT=streamable-http` set without reading the configuration docs no longer publishes
  the port to the network, and binding elsewhere with no `AUTHORIZATION_HEADER` set warns on
  stderr. Deployments reached by a name of their own list it in `MCP_ALLOWED_HOSTS`
  (comma-separated; `*` turns the check off and says so at startup). **Two behaviour changes
  to note:** the container images set `HOST=0.0.0.0` themselves, because a published
  container port cannot reach the container's own loopback — what the port is exposed to is
  decided by the `-p` mapping as before — and a non-container deployment that relied on the
  old all-interfaces default must now set `HOST` explicitly. See
  [DNS rebinding](./docs/configuration.md#dns-rebinding).

- `[media]` **`filePath` and `saveTo` are refused over the HTTP transport by default.**
  Both read and write the filesystem of the machine running this server, which is
  unremarkable on stdio and is arbitrary file read/write for anyone who can reach the port
  under `TRANSPORT=streamable-http`, where `AUTHORIZATION_HEADER` is empty by default. Set
  `MEDIA_LOCAL_FILE_ROOT` to a directory to allow them, confined to it; the confinement
  applies on both transports once set. See
  [Media and the local filesystem](./docs/configuration.md#media-and-the-local-filesystem).

- `[media]` **`sourceUrl` cannot reach private networks.** The server fetches this URL from
  wherever it is deployed, so an unrestricted value would be a server-side request forgery
  primitive against the cloud metadata endpoint and anything else on the CM's network. Only
  `http`/`https` is accepted, hostnames that resolve into private, loopback or link-local
  space are refused unless `MEDIA_ALLOW_PRIVATE_SOURCE_URL=true`, and the fetch is subject to
  the same timeout as every other outbound request.

- `[server]` **The `config` tool and `config://main` resource redact secrets.** Both
  returned the full configuration — the Item Service and PowerShell passwords, the GraphQL
  API key and the server's own `AUTHORIZATION_HEADER` — to any client that could call a
  tool. `AUTHORING_TOKEN` and `AUTHORING_CLIENT_SECRET` are masked on the same footing;
  `AUTHORING_CLIENT_ID` stays visible, since it identifies which automation client is in use
  and is not a credential on its own. The keys remain present so "is one configured?" is
  still answerable.

- `[http]` **The authorization check is constant-time and the `Bearer` strip is anchored.**
  `===` on a shared secret leaks, through timing, how many leading characters were right,
  and the unanchored `Bearer` pattern also matched inside a token that happened to contain
  it. Unauthorized responses are now JSON rather than plain text.

### 🐛 Bug Fixes

- `[indexing]` **`indexing-find-item` failed outright when two criteria named the same
  field.** The tool projects one `Select-Object` column per criterion, so a range written
  the ordinary way — `GreaterThan` and `LessThan` on one `_tdt` field — asked for that column
  twice. `Select-Object` refuses a duplicate property name with a *non-terminating* error
  raised once per result row ("The property cannot be processed because the property X
  already exists"), and SPE serializes the error stream into the same object graph as the
  results, so the shared error detection found it and returned the search as a failure with
  every hit discarded. The projection is now deduplicated per distinct field —
  case-insensitively, because PowerShell property names are, and seeded with the five fixed
  identity columns so a criterion on `TemplateName` cannot collide with one of those either.
  Both criteria still reach `Find-Item`; only the duplicated *column* is dropped.

- `[indexing]` **`indexing-find-item` returns a paging envelope instead of a bare array.**
  The response is now an object carrying `Skip`, `First`, `Returned`, `HasMore` and `Items`,
  the shape `common-get-archive-item` already uses. `Find-Item` wraps the Content Search
  API, which returns no total, so a caller could not tell a full page from the end of the
  results — the tool's own notes list that, and "AI agents are bad at proceeding long
  lists", as two of its four known problems. A total still is not available, but the
  question an agent actually needs answered is "is there another page", and that costs one
  extra row rather than a second query: the search asks Sitecore for `first + 1`, returns
  `first`, and reports whether the extra row existed. `Items` is always a list, including
  for a single result, which CLIXML would otherwise deliver as a bare object.

- `[indexing]` **`indexing-find-item` documents its range syntax, and caps `first`.** The
  `start | end` form that `InclusiveRange` and `ExclusiveRange` require was named nowhere
  but inside the error thrown when you got it wrong — the schema said only "The value to
  search for" — so an agent had to fail once to learn it, and the obvious thing to reach for
  instead was two criteria on one field, which is precisely the case above. It is now in the
  `value` description with a worked date example. `first` had no ceiling at all despite the
  tool's own header comment opening with "Huge amount of data to return" as its first known
  problem; it is capped at 500, with the description pointing at `skip` for anything beyond.

- `[indexing]` **`indexing-find-item` reported a failed search as an empty one.** It bypassed
  the shared error shaping entirely, returning the full serialized .NET `ErrorRecord` with
  `isError` unset. It now shapes errors like every other PowerShell tool. Its `first`/`skip`
  are integers, and `criteria` requires at least one entry rather than sending `-Criteria @()`.

- `[logging]` **`logging-get-logs` discarded the shaped error message.** It parsed the tool
  result as JSON without checking `isError`, so a PowerShell failure surfaced as
  "Unexpected token" instead of the message the error shaping had just built. An
  unparseable `date` now errors instead of globbing for `NaNNaNNaN`, and the date is
  formatted in UTC rather than the MCP host's local timezone.

- `[powershell]` **A non-JSON response from the CM was reported as a parse bug.** An HTML
  error page from the CM produced "Unexpected token <" from the very function that owns
  error presentation; it now says what actually happened and shows the start of the response.

- `[http]` **The `/mcp` body limit was Express's 100kb default**, which is smaller than a
  single base64 image, so `media-upload`'s inline `content` failed — as an HTML error, which
  is what the JSON 404 fallback exists to prevent. The limit is now 32mb (`MCP_BODY_LIMIT`)
  and a malformed or oversized body answers in JSON.

- `[config]` **A malformed `GRAPHQL_HEADERS` killed the process during module import**, which
  on stdio is a subprocess that dies with no explanation. It is now reported and ignored, the
  same way an unknown `TOOL_PROFILE` is.

- `[config]` **An unrecognised `TRANSPORT` fell through to stdio in silence**, so a typo in a
  container's config left nothing listening and no clue why. It now says so on stderr.

- `[annotations]` **`query-graphql-<schema>` claimed `readOnlyHint` while forwarding any
  document, mutations included.** The name-based inference in `tool-annotations.ts` reads the
  leading verb, and "query" reads as a read — but the tool only syntax-checks what it is
  given, so a mutation goes through as readily as a query. It now declares its own
  annotations rather than accepting the inferred ones.

- `[http]` **The listen port was hardcoded.** `PORT` and `HOST` are now read, the server logs
  where it is listening, and `EADDRINUSE` explains itself instead of surfacing as an
  unhandled error.

- `[build]` **`prepare` did not produce `dist/bundle.js`**, which `main` and `bin` point at,
  so a git install shipped a `bin` target that did not exist. The Docker image tags now come
  from `$npm_package_version` instead of three hardcoded copies of it.

- `[graphql]` **`query-graphql-<schema>` sent `variables` as a string.** The MCP parameter
  is a JSON string, but it was forwarded verbatim, so the request body carried
  `"variables": "{...}"` instead of a JSON object and GraphQL endpoints rejected any
  parameterized query. The string is now parsed before sending, with a clear error naming
  the expected format when it is not valid JSON. Both GraphQL tools also carry real
  descriptions now — the introspection tool warns about its output size, and the query
  tool spells out what each schema can see (`edge` serves published content only) and
  documents the `query` / `variables` parameters.

- `[presentation]` **`presentation-set-rendering` could never find a rendering that lives
  only in the final layout**, whatever the caller passed for `finalLayout`: its
  `Get-Rendering` lookup sent neither `-FinalLayout` nor `-Language`, so it always searched
  the shared layout in the context language and reported "No matching rendering was found"
  for uniqueIds that `presentation-list-renderings` had just returned. The lookup now targets
  the same layout and language as the update.

- `[presentation]` **The rendering-instance tools now default `finalLayout` to `true`**,
  matching `presentation-list-renderings`: `presentation-get-rendering`, `-set-rendering`,
  `-switch-rendering`, `-remove-rendering`, `-get-rendering-parameter`,
  `-set-rendering-parameter` and `-remove-rendering-parameter`. The final layout is the
  effective presentation and is where the uniqueIds a caller reads from `list-renderings`
  live; with the old shared-layout default, an id straight out of a listing failed for any
  instance that exists only in the final layout. Pass `finalLayout: false` to target the
  shared layout, as before.

- `[common]` `common-publish-item`'s `fromDate` parameter was declared as `z.date()`. zod 4
  refuses to represent a `Date` in JSON Schema, and because the whole tool list is built in
  one pass that single parameter made **`tools/list` fail outright** — the server advertised
  no tools at all. It is now a string carrying the accepted ISO 8601 format in its
  description. Nothing is lost: JSON-RPC parameters are JSON, so a `Date` object could never
  have reached the tool anyway.

- `[deps]` `express` was declared as a devDependency, but rollup keeps it external, so the
  published `dist/bundle.js` opens with `import express from 'express'` and could not start
  without it — on **stdio too**, because the import is eager. It is now a runtime dependency.
  This affected every published version that bundled this way, not just this one.

- `[powershell]` **`get-powershell-documentation` was broken in the published package.** It
  resolved the command reference relative to its own module, which is correct for the loose
  build but not for `dist/bundle.js` — the file `bin` points at, and the one `npx` runs. Every
  user of the npm package or the Docker images got
  `ENOENT ... dist\documentation` while it worked in local development against
  `dist/index.js`. The lookup now tries the layouts both builds produce. Two related causes
  are fixed with it: rollup's copy step was flattening the category folders, and `npm run
build` did not copy the markdown at all, so the loose build only worked if some earlier
  `npm run bundle` had left files behind.

- `[powershell]` **A failed SPE call now says what actually answered.** `executeScript`
  threw `response.statusText` and discarded the body, so a CM whose login is federated to
  Sitecore Cloud — which redirects an unauthenticated remoting call to its identity
  provider, and gets back a 3KB HTML error page and a `400` — reported the two words "Bad
  Request". That is enough to send someone after a disabled `remoting` service when the
  real problem is that HTTP Basic credentials cannot satisfy a cloud CM. The error now
  carries the status, an excerpt of the body with HTML reduced to its visible text, and,
  when the response came from the identity provider rather than Sitecore, says so outright.
  A `404` still points at the remoting service, and a `429` says the one thing about it
  that is actionable: SPE's remoting endpoint does no rate limiting of its own, so a 429
  never came from Sitecore — on a cloud-federated CM it is the identity provider throttling
  a burst of redirects set off by calls it will not authenticate. It is a symptom of bad
  credentials, not of calling too fast, and the message says so rather than inviting the
  reader to slow down.

- `[item-service]` **`Login failed` now carries the status and the reason.** A `403` from
  the Item Service means one of two very different things — the account is not valid on this
  instance, or `Sitecore.Services.SecurityPolicy` is still `ServicesOffPolicy` — and the old
  message distinguished neither. It now reports the status, names the account it tried, and
  explains the test that separates the two causes. The other nine call sites in that client
  threw a bare `HTTP error! status: <n>`; all of them now include the status text and a body
  excerpt, which is where the Item Service puts the reason.

- `[powershell]` **Five tools passed parameters that SPE's cmdlets do not define, so any call
  setting one failed outright** with "A parameter cannot be found that matches parameter
  name ...". Each was verified live before and after the fix.
  - `security-get-role-member`: `userOnly` / `roleOnly` sent `-UserOnly` / `-RoleOnly`; the
    cmdlet takes `-UsersOnly` / `-RolesOnly`. Two of its three parameter sets were
    unreachable. The repository's own bundled reference, `documentation/security/get-rolemember.md`,
    had the correct spelling all along.
  - `indexing-get-search-index`: `database`, `running` and `corrupted` are not parameters of
    `Get-SearchIndex`, which has only `[-Name <string>]`. They are removed, and the response
    now reports `IndexingState` and the `Summary` health flags so the same filtering can be
    done on the result instead.
  - `security-get-item-acl`: `includeInherited` and `includeSystem` are not parameters of
    `Get-ItemAcl`. They are replaced by the cmdlet's real filters, `identity` and `filter`.
  - `security-unlock-item`: `force` is not a parameter of `Unlock-Item`, which unlocks
    regardless of owner anyway. Removed. `security-lock-item` does take `-Force` and keeps it.
  - `common-get-cache`: `database` is not a parameter of `Get-Cache`. Removed.
- `[powershell]` **`common-get-cache` could not find a cache by the name it had just
  reported.** Every Sitecore cache name contains square brackets (`master[items]`), and
  `Get-Cache -Name` matches its argument as a wildcard pattern in which `[...]` is a
  character class — so the obvious call returned an empty result with no error to explain it.
  The name is now matched literally unless it contains `*` or `?`.
- `[powershell]` **`common-get-archive-item` returned the entire archive when `itemId`
  matched nothing.** This is SPE's own behaviour — the raw `Get-ArchiveItem -ItemId` answered
  with all 12,657 entries for a GUID that is not in the archive, against 1 for a GUID that
  is — so a mistyped GUID silently became a full archive dump that read like a match. The
  filter is now re-applied after the cmdlet returns.
- `[powershell]` **`media-upload` reported success when it had stored nothing.** A
  `destination` whose leaf named an existing non-media item — most often a folder, since
  `Project/MySite` resolves to the MySite folder itself — came back with `UploadedBytes` set,
  `Size: 0` and no error. It now checks that the resolved item actually carries the blob
  before claiming success, and says how to address the destination correctly.
- `[powershell]` **`security-set-user-password` failed whenever it was called the way its own
  schema described.** `oldPassword` was documented as optional, but `Set-UserPassword` has two
  parameter sets and both are gated: one requires `-OldPassword`, the other `-Reset`. A call
  with only `newPassword` satisfied neither and failed with a message that named no remedy.
  The tool now requires one of the two and refuses before sending.
- `[powershell]` **`security-*-item-acl` offered a propagation type that does not exist.**
  `propagationType` listed `Descendants | Children | Entity`, but
  `Sitecore.Security.AccessControl.PropagationType` is `Unknown | Descendants | Entity | Any`
  — passing `Children` failed with "Unable to match the identifier name Children to a valid
  enumerator name". It was the obvious choice for "just the immediate children", and it never
  worked; Sitecore has no children-only propagation. The value is gone, and
  `securityPermission` gains the `AllowInheritance` / `DenyInheritance` values Sitecore's own
  rules use — reading the ACL of `/sitecore/content` returns `AllowInheritance` rules these
  tools could not have written.
- `[authoring]` **`authoring-publish-item` sent callers to the wrong value for
  `targetDatabases`.** Its description pointed at `publishingTargets { name }`, which returns
  `Edge` on SitecoreAI — and publishing with `Edge` fails, because the field wants the
  target's *database* name, `experienceedge`. The description now says which is which.

### 📝 Documentation

- [Configuration](docs/configuration.md) gains an [Authoring and Management
  API](docs/configuration.md#authoring-and-management-api) section covering both auth routes
  and when to prefer each.
- [Preparing your Sitecore instance](docs/sitecore-setup.md) gains step 5 — switching
  GraphQL on, getting credentials on SitecoreAI and on XM/XP, and the media-upload
  encryption key — plus seven new troubleshooting rows, and links to Sitecore's own
  documentation for the Authoring and Management API: the overview, the enabling and
  authorizing walkthrough, the limitations page where the query-depth cap is written down,
  and the authoring and management query examples. Its opening table now counts **four**
  surfaces rather than three: Edge GraphQL and the Authoring and Management API were one
  row, which reads as one thing to configure when they are two endpoints with two sets of
  credentials. It also no longer claims that a `403` from the Item Service proves
  `ServicesOffPolicy`: it can equally be a refused account, and the page now gives the
  one-request test that tells the two apart.
- [Tool selection](docs/tool-selection.md) explains what separates the three authoring
  groups, and when to reach for the Authoring API over the Item Service or PowerShell. Its
  read-latency section gives the ranking of the three surfaces rather than millisecond
  figures — the ranking is a property of the surfaces and held everywhere it was tried,
  while the absolute numbers were a property of one CM's hardware and network and invited
  being read as a promise. It also separates two things that are easy to
  conflate: a `TOOL_GROUPS` name is a value for an environment variable and never reaches a
  client, so its length costs nothing, while the tool names themselves do run into real
  limits — the Claude API's `^[a-zA-Z0-9_-]{1,64}$`, against which Claude Code's
  `mcp__{server}__{tool}` prefix counts, and Cursor's silent drop at a 60-character
  `{server}{tool}`. With the README's `sitecore-mcp`, the longest name on the wire is
  `mcp__sitecore-mcp__presentation-remove-rendering-parameter` at 58 of the API's 64, so
  the page now records a margin of 6 rather than leaving it to be rediscovered.
- [Tool reference](docs/tools.md) documents three endpoint path rules that are easy to trip
  over: template paths are relative to `/sitecore/templates` with no leading slash, a
  media `itemPath` carries no file extension, and template sections and fields are matched
  by ID rather than by name.
- [Contributing](CONTRIBUTING.md) states what the integration suite actually requires — it
  addresses seeded fixture content by hard-coded GUID, so it fails in bulk against any other
  instance — and maps each failure signature to its cause, so a wall of red is diagnosable
  at a glance.

- `[docs]` `docs/tools.md` listed `security-test-acccount` (three c's) for
  `security-test-account`, and omitted `security-set-user` and `security-get-item-acl`
  entirely. Fixed, and the entries for the tools changed above now say what their parameters
  actually do.

### ✨ Chores

- `[transport]` Removed the per-session transport map in the Streamable HTTP server, along
  with the initialize-request sniffing, the session-ID generator and the separate GET/DELETE
  session handlers. The 2026-07-28 revision has no initialize handshake and no
  protocol-level session, so there is nothing to key a map on; requests are served
  statelessly and 2025-era GET/DELETE session operations answer `405`. The `/health`
  endpoint, the RFC 9728 OAuth protected-resource metadata route, the JSON 404 fallback and
  the `AUTHORIZATION_HEADER` check are unchanged.

- `[tests]` Removed the MCP inspector's CLI internals from the test suite. `tests/client.ts`
  builds its transport with `StdioClientTransport` from `@modelcontextprotocol/client`, and
  `callTool` is a local helper instead of an undeclared import from
  `@modelcontextprotocol/inspector/cli/build/client/tools.js`.

- `[build]` **Added ESLint.** `npm run lint` (and `npm run lint:fix`) runs the flat config in
  `eslint.config.js` over `src/`, `tests/` and the build scripts, and CI runs it alongside the
  type-check. The lint is syntax-only — `npm run typecheck` already does the type-aware pass.
  The first run found dead imports (including
  three `import e from "express"` in security tests), a handful of single-\ identities
  such as `"sitecore\admin"` that JavaScript was silently collapsing to `sitecoreadmin`,
  rethrows in `item-service/client.ts` that dropped the original error, and `Object` used
  where `object` was meant; all are fixed. `no-explicit-any` is a warning rather than an
  error: 124 remain, and four loosely-typed remote surfaces are why.

- `[tests]` **The live suite seeds its own content.** It used to address a tree of fixtures
  someone had built by hand on one demo instance — `/sitecore/content/Home/Tests/...` and a
  hard-coded GUID per test. Of the 75 GUIDs it named, 11 resolve on a stock CM; the other 64
  existed nowhere else, so pointing the suite at any other instance failed it in bulk with
  `Unexpected token 'G', "Get-Item …"` and no hint that the content, not the code, was
  missing. Every live file now creates what it needs through `tests/fixtures.ts`, asserts
  against what it created, and deletes it again — including anything it archived on the way
  through, so repeat runs do not fill the recycle bin. The fixtures build on templates
  Sitecore ships (`Common/Folder` and the three behind a data template), so nothing assumes
  XM/XP versus SitecoreAI, a Sample site, or a project's own components.

  The assertions moved with the content: a test that expected the template name
  `Sample Item` now expects `scratch.template.name`, and around forty that still described
  the pre-2.0 unprojected object graph (`ToString`, `ID.ToString`, a `User`'s fifteen fields)
  now describe what the projections actually return. `vitest.config.ts` gained the `@/` alias
  so the unit files collect under it too, a four-process cap and one retry — 159 files each
  spawning a server against a single CM is what made an unconstrained run flaky.

  159 files, 542 tests, green against an XM Cloud instance with nothing seeded on it.

- `[tests]` **Pointed the live suite at the merged tool names.** 41 test files still called
  tools this release retired — `security-add-item-acl` / `security-clear-item-acl`,
  `security-lock-item` / `-unlock-item`, `security-protect-item` / `-unprotect-item`,
  `common-add-base-template` / `-remove-base-template`, the three index-state verbs, the
  `-by-identity` / `-by-filter` / `-by-name` account lookups, `security-export-user` and its
  three siblings, and `indexing-initialize-search-index[-item]` — so every one of them failed
  at the first call with _"Tool … not found"_ rather than testing anything. Each now calls the
  merged tool with the `action` (or `accountType`) that names the branch it was testing, and
  `indexName` becomes `name` for the rebuild tool. `indexing-remove-search-index-item` had no
  successor to point at — the tool was removed outright — so its two files are deleted.

- `[build]` Dropped two unused devDependencies: `ts-node`, which nothing in the repo ever
  imported or ran, and `@modelcontextprotocol/inspector`, which `npm run inspector` fetches
  as `npx @modelcontextprotocol/inspector@latest` and so never resolved locally. Together
  with the ESLint additions the lockfile is around 1,300 lines smaller.

## 1.4.2

_Released 2026-07-30._

### 🎉 New Features & Improvements

- `[powershell]` **Default PowerShell script timeout raised from 60 seconds to 10 minutes.**
  The 60s default was tuned to the tool-call timeout most AI agents enforce, but in practice
  it fired constantly on larger scripts (index rebuilds, publishing, bulk item updates) and
  aborted work that would have succeeded. The timeout exists to stop a hung Sitecore
  endpoint holding a connection open forever, not to bound legitimate script runtime, so a
  generous default is the safer failure mode — and the calling agent's own tool-call timeout
  still cuts things short first when it is set lower. Override with `POWERSHELL_TIMEOUT_MS`.

## 1.4.1

_Released 2026-07-22._

### 🐛 Bug Fixes

- `[docker]` Docker Hub publish workflows only: the Windows image build now waits for the
  Docker daemon to accept API calls before building, and the published image tags were
  brought up to the current version. No changes to the server itself.

## 1.4.0

_Released 2026-07-22._

### 🔒 Security

- `[powershell]` **PowerShell command injection fixed.** All user-supplied values are now
  escaped as single-quoted PowerShell literals via a new `quotePowerShellString` helper in
  `command-builder.ts` (and `prepareArgsString` in `utils.ts`). Previously values were
  interpolated with basic double-quote wrapping — or, in composite tools, not quoted at all
  — allowing `"`, `$`, backticks and `;` to break out and execute arbitrary commands. All
  composite tools that interpolated parameters directly (indexing, security ACL, archive,
  item clone, item referrer, layout, and rendering tools) now route those values through the
  escaper.

- `[indexing]` `[logging]` `find-item` now escapes the free-text search `value` and `index`;
  `get-logs` restricts the `name` parameter to a safe filename charset (it is interpolated
  into a path glob that cannot be single-quoted).

- `[graphql]` **GraphQL API key moved out of the URL.** The `sc_apikey` is now sent as an
  HTTP header instead of a query-string parameter in `query` and `introspection`, so it is
  no longer captured in access logs, proxies, or browser history.

- **Corrected the TLS-verification environment variable.** `.env.template` now uses the
  Node-recognized `NODE_TLS_REJECT_UNAUTHORIZED`; the previous `NODE_REJECT_UNAUTHORIZED`
  was not recognized by Node and silently had no effect. It still ships set to `0`, since
  the server primarily targets local development against Sitecore/SitecoreAI instances with
  self-signed certificates, but now carries a prominent warning to set it to `1` (or remove
  it) in production or on untrusted networks.

- `[deps]` Updated dependencies to resolve all known advisories — `npm audit` now reports
  **0 vulnerabilities** (previously 18, including 4 critical). Notably bumps
  `@modelcontextprotocol/sdk` to ^1.29.0 and patches transitive `fast-xml-parser`,
  `minimatch`, `brace-expansion`, `body-parser`, and others.

### 🎉 New Features & Improvements

- **Tool annotations for every tool.** A `server.tool` wrapper (`tool-annotations.ts`) now
  infers `readOnlyHint`, `destructiveHint`, and a human-readable `title` from each tool's
  name, so MCP clients can distinguish safe reads from mutations and destructive operations.
  `run-powershell-script` is flagged destructive and open-world.

- **Request timeouts** on all outbound HTTP calls via a shared `fetchWithTimeout` helper
  (Item Service, GraphQL, and PowerShell clients). Defaults: 30s for REST/GraphQL, 60s for
  PowerShell; both configurable via `REQUEST_TIMEOUT_MS` / `POWERSHELL_TIMEOUT_MS`. (60s
  aligns with the tool-call timeout most AI agents enforce, so a longer default would only
  cause the agent to abort before this timeout fires.) The PowerShell default was later
  raised to 10 minutes in 1.4.2.

- `[item-service]` **Traversal guard** in `get-item-descendants`: a visited-set for cycle
  protection and a configurable node cap (`DESCENDANTS_MAX_ITEMS`, default 5000) that
  reports truncation instead of exhausting memory on large or circular item trees.

- `[tests]` **Unit test suite** (`tests/unit/`) covering the PowerShell escaper and
  tool-annotation inference, runnable without a live Sitecore instance via
  `npm run test:unit`.

- **CI workflow** (`.github/workflows/ci.yml`) that type-checks, builds, bundles, runs the
  unit tests, and audits dependencies on every pull request and push to `main`, plus an
  `npm run typecheck` script (`tsc --noEmit`).

- `[transport]` A `/health` liveness endpoint on the HTTP transports (`streamable-http` and
  `sse`) that returns `200 {"status":"ok"}`, plus Docker `HEALTHCHECK` directives for the
  Linux and Windows images that probe it. (The health check reports that the HTTP server is
  accepting requests — the appropriate signal for a container — rather than probing the
  OAuth discovery endpoint.)

- `[deps]` **Migrated to TypeScript 6.** The SDK's generic `tool()` overloads made the `tsc`
  5.x type-checker exhaust its heap across the ~140 registration call sites (the build did
  not complete even with an 8 GB heap). TypeScript 6 type-checks the same code in about three
  seconds, so tool-registration functions use the SDK's `McpServer` type directly with no
  custom indirection. `tsconfig.json` was migrated with it: `moduleResolution` is now
  `"bundler"` and the removed `baseUrl` option was dropped (path aliases retained as
  `"@/*": ["./src/*"]`).

  Not 7: typescript-eslint cannot load against the native compiler, whose `typescript` entry
  point exports a version string where the JS API used to be, so `npm run lint` does not run
  on it (typescript-eslint/typescript-eslint#10940). 6.x is the last line carrying that API.

- **Migrated all tool registrations from the deprecated `server.tool()` to
  `server.registerTool()`.** The SDK deprecated `tool()` in favour of `registerTool()`;
  every registration now passes a config object (`{ description, inputSchema }`) and the
  `withInferredAnnotations` wrapper injects annotations into that config rather than as a
  positional argument. (Feasible now that the compiler upgrade removed the
  overload-resolution heap blow-up that affected `tool()` and `registerTool()` alike.)

- `[docker]` Docker images pinned to **Node 24** (Linux previously floated on
  `node:lts-alpine`; Windows previously pinned Node 22), matching the CI Node version.
  `@types/node` bumped to ^24 to match the Node 24 runtime. Images that expose an HTTP port
  now default to the `streamable-http` transport.

- Tightened input validation on search/pagination parameters (bounded `page`/`pageSize`,
  non-empty search terms).

### 🛠 Breaking Changes

- `AUTORIZATION_HEADER` renamed to the correctly-spelled `AUTHORIZATION_HEADER` across
  config and `smithery.yaml`. The old misspelled name is no longer recognized.

### 🐛 Bug Fixes

- `[presentation]` **Clearer errors when a rendering lookup finds nothing** (issue #62). The
  presentation tools that resolve a rendering via `Get-Rendering` before acting on it
  previously failed with the opaque PowerShell error "Cannot bind argument to parameter
  'Instance' because it is null." — or, for the switch tools, silently did nothing — when
  the item/rendering/language/layout didn't match. A shared guard (`rendering-guard.ts`) now
  reports an actionable error (via `Write-Error`, which the SPE transport returns as a
  normal response rather than an opaque HTTP 500) naming what was searched for and pointing
  at `presentation-get-rendering-by-id` / `-by-path` to list the item's renderings. Applied
  to all ten affected tools: `set-rendering-by-id`/`-by-path`,
  `set-/get-/remove-rendering-parameter-by-id`/`-by-path`, and
  `switch-rendering-by-id`/`-by-path`.

- Corrected the server description typo "Modle Context Protocol" → "Model Context Protocol".

- `[deps]` Pinned `@antonytm/clixml-parser` to `^0.1.5` instead of the floating `latest` tag.

### ✨ Chores

- Normalized all `McpServer` imports to the `.js` module specifier for consistency.
