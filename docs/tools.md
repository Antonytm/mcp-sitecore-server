# Tool reference

121 tools across search, query, create, read, update, delete, media, PowerShell, logging,
security and presentation, covering the Item Service, GraphQL Edge, the Authoring and
Management GraphQL API and Sitecore PowerShell Extensions.

See [Tool selection](./tool-selection.md) for trimming this surface down to what your
agent actually needs.

## Addressing an item

Most tools that act on an item take **`id` or `path`**, and exactly one of them must be
supplied — supplying both, or neither, is an input error that names the valid inputs and
never reaches Sitecore. Some take a wider union: `provider-get-item` also accepts `query`
and `uri`, and `presentation-switch-rendering` names the rendering to replace with
`oldRenderingId`, `oldRenderingPath` or `uniqueId`. A tool that addresses two things at
once (an item _and_ a rendering, placeholder setting or layout) validates each
independently. `database` is only sent when addressing by id: a path carries its own
prefix, as in `master:/sitecore/content/Home`.

Before 2.0.0 these were separate `-by-id` / `-by-path` tools. See
[`CHANGELOG.md`](../CHANGELOG.md) for the old-to-new name mapping.

## Paths in the Authoring and Management API

The `authoring-*` tools address items the same way, but three of the endpoint's own path
rules are worth knowing before you hit them. All three were confirmed against a live CM.

- **Template paths are relative to `/sitecore/templates`, with no leading slash.**
  `authoring-get-item-template` takes `Sample/Sample Item`, not
  `/sitecore/templates/Sample/Sample Item` — the absolute form is rejected as a template
  that "doesn't exist or you don't have access rights to it". This is the same value the
  API reports as a template's `fullName`.
- **`authoring-upload-media`'s `itemPath` is relative to the media library and carries no
  file extension.** `Project/MySite/hero`, not `hero.png` and not
  `/sitecore/media library/...`. The extension comes from `fileName` (or the source URL or
  file), and Sitecore reads it to choose the media template: a `.png` becomes an Image item
  with an `Alt` field, a `.txt` becomes a File item that has none — so `alt` silently has
  nowhere to go on a non-image upload.
- **`authoring-create-item` and `authoring-create-item-template` take a parent *ID*, not a
  parent path.** Resolve the path with `authoring-get-item` first.

Sections and fields inside a template are matched **by ID, never by name**. To add a field
to a section that already exists, pass that section's ID as `templateSectionId` — read from
`authoring-get-item-template`, where it is reported as `itemTemplateSectionId`. Naming an
existing section without its ID is rejected for creating a duplicate.

## Tools

- [x] GraphQL API (Edge / preview)
  - [x] `introspection-graphql-{schema}`: explores the GraphQL schema, revealed progressively. No
    arguments returns the root operations plus the `Item` interface — the whole contract for
    querying the endpoint; `type` returns one type or operation in full, `search` finds one by
    keyword, and `full` returns the entire SDL (777,501 characters on a live Edge endpoint, two
    thirds of it repeated descriptions). `includeDescriptions: false` cuts any of these by ~70%.
  - [x] `query-graphql-{schema}`: executes a GraphQL query
- [x] Authoring and Management GraphQL API
  - [x] `authoring-introspect-schema`: explores the authoring/management schema, revealed
    progressively. No arguments returns the operation index — 127 queries and mutations, one line
    each; `type` returns one operation or type in full, with the input types its arguments need,
    so a single call is enough to write the document; `search` finds an operation by keyword;
    `full` returns the whole SDL. Around 107 of the 127 operations have no typed `authoring-*`
    tool, so this is how the rest of the surface is discovered.
  - [x] `authoring-graphql`: executes any query or mutation against the authoring endpoint
  - [x] Items
    - [x] `authoring-get-item`: returns an item with its fields, addressed by `id` or `path`
    - [x] `authoring-create-item`: creates an item from a template under a parent ID
    - [x] `authoring-update-item`: sets or resets field values on an item
    - [x] `authoring-delete-item`: deletes an item, to the recycle bin or permanently
    - [x] `authoring-copy-item`: copies an item, optionally without its subtree
    - [x] `authoring-move-item`: moves an item to another parent, preserving links
    - [x] `authoring-rename-item`: renames an item, preserving its ID
  - [x] Search
    - [x] `authoring-search`: searches a Sitecore index by field criteria, with sort and paging
  - [x] Templates
    - [x] `authoring-get-item-template`: returns a template's sections and field definitions
    - [x] `authoring-create-item-template`: creates a template with its sections and fields in one call
    - [x] `authoring-update-item-template`: updates a template's sections, fields and base templates
  - [x] Media
    - [x] `authoring-upload-media`: uploads a file to the media library (pre-signed URL plus the POST)
    - [x] `authoring-get-media-item`: returns a media item's mime type, size, alt text and URL
  - [x] Sites
    - [x] `authoring-list-sites`: returns the configured sites with their root paths and IDs
    - [x] `authoring-get-site`: returns one site's full configuration by name
  - [x] Management
    - [x] `authoring-publish-item`: queues a publish and returns its `operationId`
    - [x] `authoring-publishing-status`: reads the state of a queued publish
    - [x] `authoring-rebuild-indexes`: starts a search index rebuild and returns its jobs
    - [x] `authoring-get-job`: returns one background job's state and progress
    - [x] `authoring-list-jobs`: lists background jobs, with wildcard matching on the name
- [x] Item Service API
  - [x] `item-service-get-item`: returns an item, addressed by `id` or `path`
  - [x] `item-service-get-item-children`: returns the children of an item by ID
  - [x] `item-service-create-item`: creates an item by providing a template ID and parent path.
  - [x] `item-service-edit-item`: edits an item by ID
  - [x] `item-service-delete-item`: deletes an item by ID
  - [x] `item-service-search-items`: searches for items
  - [x] Composite Item Service API
    - [x] `item-service-get-languages`: returns Sitecore languages in the instance
    - [x] `item-service-get-item-descendants`: returns the descendants of an item by ID
- [x] Sitecore PowerShell
  - [x] `get-powershell-documentation`: the SPE command reference, revealed progressively. No arguments returns an index of all 129 commands with one-line summaries (~11KB); `command` returns the full page for up to 5 named commands; `search` finds a command by what it does; `category` lists one group. It no longer returns the whole corpus in one result, and the pages for commands that only work inside the SPE console's own UI (`Show-*`, `Invoke-JavaScript`, `Read-Variable`, …) are not bundled at all — nothing reachable over the `remoting` service can call them.
  - [x] `run-powershell-script`: runs a PowerShell script and returns the output; its description points at the [`guide://bulk-update`](./guides.md) resource for the safe mass-write pattern. Like every SPE-backed tool it runs as the `shell` site with `master` as the context database (`POWERSHELL_SITE_CONTEXT` / `POWERSHELL_CONTEXT_DATABASE` in [configuration](./configuration.md)), so an item a script creates receives its template's default workflow exactly as it would from the Content Editor
  - [x] Security
    - [x] `security-get-current-user`: returns the current user
    - [x] `security-get-user`: returns users by exact `identity` or wildcard `filter` (supply one)
    - [x] `security-set-user`: updates a user's profile, administrator flag and enabled state
    - [x] `security-new-domain`: creates a new domain
    - [x] `security-new-user`: creates a new user
    - [x] `security-new-role`: creates a new role
    - [x] `security-remove-domain`: removes a domain
    - [x] `security-remove-user`: removes a user
    - [x] `security-remove-role`: removes a role
    - [x] `security-get-domain`: returns domains; omit `name` for all of them
    - [x] `security-get-role`: returns roles by exact `identity` or wildcard `filter` (supply one)
    - [x] `security-get-role-member`: returns members of a role. `userOnly` and `roleOnly` send
      SPE's `-UsersOnly` / `-RolesOnly`; before 2.0.0 they sent the singular form and failed the call.
    - [x] `security-enable-user`: enables a user
    - [x] `security-disable-user`: disables a user
    - [x] `security-set-user-password`: changes a user's password. Supply either `oldPassword`
      (validated) or `resetPassword: true` (administrative reset) — SPE requires one of the two,
      and a call with neither is refused before it is sent.
    - [x] `security-set-item-lock`: locks or unlocks an item (`action`). `force` is lock-only — SPE's
      `Unlock-Item` has no such parameter
    - [x] `security-set-item-protection`: protects or unprotects an item against deletion and renaming
      (`action`). Independent of the editing lock, so it stays a separate tool from
      `security-set-item-lock`.
    - [x] `security-test-account`: tests an account
    - [x] `security-unlock-user`: unlocks a user (verified live: a user locked out by repeated failed logins is unlocked by the tool)
    - ~~`security-login-user`: logs in a user~~ won't be implemented: SPE hollowed `Login-User` in 8.0 and marked it obsolete for removal — session login is an Identity-provider concern, not a CM cmdlet ([1367](https://github.com/SitecorePowerShell/Console/issues/1367))
    - ~~`security-logout-user`: logs out a user~~ won't be implemented: SPE hollowed `Logout-User` in 8.0 and marked it obsolete for removal ([1368](https://github.com/SitecorePowerShell/Console/issues/1368))
    - [x] `security-export-account`: exports a user or role (`accountType`) to the server filesystem.
      Fixed in SPE 8.0 ([1369](https://github.com/SitecorePowerShell/Console/issues/1369),
      [1370](https://github.com/SitecorePowerShell/Console/issues/1370))
    - [x] `security-import-account`: imports a user or role (`accountType`) from the server filesystem
      ([1371](https://github.com/SitecorePowerShell/Console/issues/1371),
      [1372](https://github.com/SitecorePowerShell/Console/issues/1372); works once the file exists —
      export first). Separate from the export tool because import overwrites the live account and
      export does not, so one tool could not annotate its destructiveness honestly.
    - [x] `security-add-role-member`: adds a member to a role
    - [x] `security-remove-role-member`: removes a member from a role
    - [x] `security-get-item-acl`: returns the access rules set on an item, optionally narrowed to one
      account with `identity` or `filter`. Takes no `includeInherited` / `includeSystem` — neither is a
      parameter of SPE's `Get-ItemAcl`; use `security-test-item-acl` for effective rights.
    - [x] `security-test-item-acl`: tests an item ACL
    - [x] `security-set-item-acl`: changes an item's access rules. `action: add` appends one rule,
      `replace` discards every existing rule and leaves only this one, `clear` removes them all.
      Replaces the old `security-add-item-acl` / `security-clear-item-acl` / `security-set-item-acl`
      trio, where the add-versus-replace distinction was only visible by reading two descriptions
      side by side. `propagationType` drops `Children`, which never worked — `PropagationType` is
      `Unknown | Descendants | Entity | Any`, and `Children` failed with "Unable to match the
      identifier name Children". `securityPermission` gains `AllowInheritance` /
      `DenyInheritance`, which Sitecore's own rules use and these tools could not write.
  - [x] Provider
    - [x] `provider-get-item`: returns an item, addressed by `id`, `path`, `query` or `uri`
  - [x] Presentation
    - [x] `presentation-get-layout`: returns the layout definition item assigned to the item -- not the renderings on the page
    - [x] `presentation-list-renderings`: lists the renderings placed on the item as structured rows -- the page's composition
    - [x] `presentation-set-layout`: sets item presentation layout
    - [x] `presentation-reset-layout`: resets item presentation layout
    - [x] `presentation-merge-layout`: Merges final and shared layouts
    - [x] `presentation-get-layout-device`: gets a layout device by `name`, or the default device
      when `name` is omitted. Replaces the old `presentation-get-default-layout-device`.
    - [x] `presentation-get-rendering`: Gets rendering definition
    - [x] `presentation-remove-rendering`: Removes renderings from an item
    - [x] `presentation-add-rendering`: Adds a rendering to presentation of an item
    - [x] `presentation-set-rendering`: Updates rendering with new values
    - [x] `presentation-switch-rendering`: Switches an existing rendering on an item for an alternate one; the rendering to replace is named by `oldRenderingId`, `oldRenderingPath` or `uniqueId`
    - [x] `presentation-get-placeholder-setting`: Gets placeholder setting assigned on the item
    - [x] `presentation-add-placeholder-setting`: Adds a placeholder setting to the item
    - [x] `presentation-remove-placeholder-setting`: Removes placeholder setting from the item
    - [x] `presentation-get-rendering-parameter`: Gets rendering parameter for the item
    - [x] `presentation-remove-rendering-parameter`: Removes the specified rendering parameter from the rendering placed on the item
    - [x] `presentation-set-rendering-parameter`: Adds and updates the specified rendering parameter from the rendering placed on the item
  - [x] Indexing
    - [x] `indexing-rebuild-search-index`: rebuilds search indexes. Omit `id`/`path` for whole
      indexes (omit `name` too for every index); supply `id` or `path` to rebuild just that item's
      subtree. Replaces the old `indexing-initialize-search-index` and
      `indexing-initialize-search-index-item`. `includeRemoteIndex` is whole-index only.
    - [x] `indexing-get-search-index`: returns a search index by name, with its `IndexingState` and
      health flags. Takes no `database`, `running` or `corrupted` filter — SPE's `Get-SearchIndex`
      has only `-Name`, so those failed the call; filter the returned rows instead.
    - [x] `indexing-find-item`: finds items in a search index. `criteria` takes at least one `{filter, field, value}`; a range is either one `InclusiveRange`/`ExclusiveRange` criterion whose `value` is `'start | end'`, or two criteria on the same field. `first` defaults to 200 and is capped at 500. The response is an object carrying `Skip`, `First`, `Returned`, `HasMore` and `Items` — `HasMore` is how you know to page with `skip`, since the Content Search API returns no total.
    - [x] `indexing-set-search-index-state`: suspends, stops or resumes indexes (`action`).
      `indexing-rebuild-search-index` stays separate: it rebuilds rather than changing state, and
      carries its own item scoping and `includeRemoteIndex` parameter.
    - ~~`indexing-remove-search-index-item`: removes an item from the search index~~ Removed: an
      index entry removed by hand reappears on the next crawl, so it fixes nothing that
      `indexing-rebuild-search-index` does not fix properly.
    - ~~`indexing-initialize-item`: initializes items with the PowerShell automatic properties for each field.~~ Skipped, no value for MCP server.
  - [x] Media
    - [x] `media-upload`: uploads a file into the media library via the SPE `mediaUpload` service — from a URL (fetched by the server, nothing passes through the model), a server-local file, or base64 — and returns the created item with its ID; sets alt text in the same call
    - [x] `media-download`: downloads a media item's blob via the SPE `mediaDownload` service, to a server-local file (`saveTo`) or inline as size-capped base64
  - [x] Site composition
    - [x] `get-allowed-components-by-placeholder`: lists the renderings a placeholder allows on a page, from the site-level and global placeholder settings items
    - [x] `create-component-datasource`: creates a component's datasource item from the Datasource Template and Datasource Location declared on the rendering, page-local or shared
    - [x] `add-rendering-to-placeholder`: adds a rendering to a placeholder, refusing one the placeholder settings forbid, assigning a collision-free `DynamicPlaceholderId` and writing the full parameter set; its description points at the [`guide://compose-page`](./guides.md) resource
    - [x] `list-sites`: lists the content sites registered on the CM with their root and start paths
    - [x] `get-site-information`: one site's definition plus the paths the composition tools need (home, placeholder settings, available renderings, shared data, site definition item)
    - [x] `get-pages-by-site`: the pages of a site as `{ID, Path, Template, TemplateID}`
    - [x] `search-site-pages`: the same set filtered by name or title
    - [x] `list-site-components`: the site's Available Renderings groups -- the component inventory, _not_ an allow-list
    - [x] `list-insert-options`: the templates and branches that may be created under an item
  - [x] Common
    - [x] `common-set-base-template`: adds or removes a base template on a template item (`action`).
      Removing one strips its fields from every item built on the template.
    - [x] `common-add-item-version`: creates a version of the item in a new language based on an existing language version
    - [x] `common-convert-from-item-clone`: converts an item from a clone to a fully independent item
    - [x] `common-get-archive`: gets Sitecore database archives
    - [x] `common-get-archive-item`: gets a list of items found in the specified archive
    - [x] `common-get-cache`: gets information about Sitecore caches
    - [x] `common-get-database`: gets information about Sitecore databases
    - [x] `common-get-item-field`: gets item fields as either names or fields or template fields
    - [x] `common-get-item-clone`: gets all the clones for the specified item
    - [x] `common-get-item-reference`: gets item references (where it is used) for a Sitecore item
    - [x] `common-get-item-referrer`: gets items referring to a Sitecore item (which items reference it)
    - [x] `common-get-item-template`: gets template information for a Sitecore item
    - [x] `common-get-item-workflow-event`: gets entries from the workflow history for the specified item
    - [x] `common-get-sitecore-job`: gets list of the current Sitecore jobs
    - [x] `common-invoke-workflow`: executes workflow action for a Sitecore item
    - [x] `common-new-item-clone`: creates a new item clone based on the item provided
    - [x] `common-new-item-workflow-event`: creates a new entry in the workflow history for a Sitecore item
    - [x] `common-publish-item`: publishes a Sitecore item
    - [x] `common-remove-archive-item`: removes items permanently from the specified archive
    - [x] `common-remove-item-version`: removes a version of a Sitecore item
    - [x] `common-reset-item-field`: resets item fields, specified as either names, fields or template fields
    - [x] `common-restart-application`: restarts the Sitecore Application pool
    - [x] `common-restore-archive-item`: restores items to the original database from the specified archive
    - [x] `common-set-item-template`: sets the item template
    - [x] `common-test-base-template`: checks if the item inherits from the specified template
    - [x] `common-update-item-referrer`: updates all references to the specified item to point to a new provided in the -NewTarget or removes links to the item
  - [x] Logging
    - [x] `logging-get-logs`: retrieves Sitecore logs from the log directory with filtering options. Reads files off the CM's data folder over SPE. On a local Docker CM the same files are on a mounted volume and reading them from disk is cheaper; on a deployed SitecoreAI environment the platform collects the logs, so the data folder may hold little.

## Resources

- `config`: returns the configuration of the server. Use it to check if everything is
  properly configured.
