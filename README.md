# Model Context Protocol server for Sitecore

[![Build](https://github.com/antonytm/mcp-sitecore-server/actions/workflows/publish-npm.yml/badge.svg)](https://github.com/Antonytm/mcp-sitecore-server/actions/workflows/publish-npm.yml)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![smithery badge](https://smithery.ai/badge/@Antonytm/mcp-sitecore-server)](https://smithery.ai/server/@Antonytm/mcp-sitecore-server)

## Implemented tools

- [x] GraphQL API
  - [x] `introspection-grahpql-{schema}`: returns the GraphQL schema
  - [x] `query-graphql-{schema}`: executes a GraphQL query
- [x] Item Service API
  - [x] `item-service-get-item`: returns an item by ID
  - [x] `item-service-get-item-children`: returns the children of an item by ID
  - [x] `item-service-get-item-by-path`: returns an item by path
  - [x] `item-service-create-item`: creates an item by providing a template ID and parent path.
  - [x] `item-service-edit-item`: edits an item by ID
  - [x] `item-service-delete-item`: deletes an item by ID
  - [x] `item-service-search-items`: searches for items
  - [x] `item-service-run-stored-query`: runs a stored query
  - [x] `item-service-run-stored-search`: runs a stored search
  - [x] Composite Item Service API
    - [x] `item-service-get-languages`: returns Sitcore languages in the instance
    - [x] `item-service-get-item-descendants`: returns the descendants of an item by ID
- [ ] Sitecore Powershell
  - [ ] Security
    - [x] `security-get-current-user`: returns the current user
    - [x] `security-get-user-by-identity`: returns a user by name
    - [x] `security-get-user-by-filter`: returns a user by filter
    - [x] `security-new-domain`: creates a new domain
    - [x] `security-new-user`: creates a new user
    - [x] `security-new-role`: creates a new role
    - [x] `security-remove-domain`: removes a domain
    - [x] `security-remove-user`: removes a user
    - [x] `security-remove-role`: removes a role
    - [x] `security-get-domain`: returns a domains
    - [x] `security-get-domain-by-name`: returns a domain by name
    - [x] `security-get-role-by-identity`: returns a role by name
    - [x] `security-get-role-by-filter`: returns a role by filter
    - [x] `security-get-role-member`: returns members of a role
    - [x] `security-enable-user`: enables a user
    - [x] `security-disable-user`: disables a user
    - [x] `security-set-user-password`: changes a user's password
    - [x] `security-lock-item-by-id`: locks an item by ID
    - [x] `security-unlock-item-by-id`: unlocks an item by ID
    - [x] `security-lock-item-by-path`: locks an item by path
    - [x] `security-unlock-item-by-path`: unlocks an item by path
    - [x] `security-protect-item-by-id`: protects an item by ID
    - [x] `security-protect-item-by-path`: protects an item by path
    - [x] `security-unprotect-item-by-id`: unprotects an item by ID
    - [x] `security-unprotect-item-by-path`: unprotects an item by path
    - [x] `security-test-acccount`: tests an account
    - [x] `security-unlock-user`: unlocks a user
      - [ ] test covergage requires logging user with wrong password
    - [ ] `security-login-user`: logs in a user. Blocked by [SPE issue](https://github.com/SitecorePowerShell/Console/issues/1367#issue-3055272174).
    - [ ] `security-logout-user`: logs out a user. Blocked by [SPE issue](https://github.com/SitecorePowerShell/Console/issues/1368)
    - [ ] `security-export-user`: exports a user. Blocked by [SPE issue](https://github.com/SitecorePowerShell/Console/issues/1370)
    - [ ] `security-import-user`: imports a user. Blocked by [SPE issue](https://github.com/SitecorePowerShell/Console/issues/1371)
    - [ ] `security-export-role`: exports a role. Blocked by [SPE issue](https://github.com/SitecorePowerShell/Console/issues/1369)
    - [ ] `security-import-role`: imports a role. Blocked by [SPE issue](https://github.com/SitecorePowerShell/Console/issues/1372)
    - [x] `security-add-role-member`: adds a member to a role
    - [x] `security-remove-role-member`: removes a member from a role
    - [x] `security-test-item-acl-by-id`: tests an item ACL by ID
    - [x] `security-test-item-acl-by-path`: tests an item ACL by path
    - [x] `security-add-item-acl-by-id`: adds an item ACL by ID
    - [x] `security-add-item-acl-by-path`: adds an item ACL by path
    - [x] `security-clear-item-acl-by-id`: clears an item ACL by ID
    - [x] `security-clear-item-acl-by-path`: clears an item ACL by path
    - [x] `security-set-item-acl-by-id`: sets an item ACL by ID
    - [x] `security-set-item-acl-by-path`: sets an item ACL by path
  - [x] Provider
    - [x] `provider-get-item-by-id`: returns an item by ID
    - [x] `provider-get-item-by-path`: returns an item by path
    - [x] `provider-get-item-by-query`: returns an item by query
    - [x] `provider-get-item-by-path`: returns an item by path
  - [x] Presentation
    - [x] `presentation-get-layout-by-id`: returns item presentation layout by ID
    - [x] `presentation-get-layout-by-path`: returns item presentation layout by path
    - [x] `presentation-set-layout-by-id`: sets item presentation layout by ID
    - [x] `presentation-set-layout-by-path`: sets item presentation layout by path
    - [x] `presentation-reset-layout-by-id`: resets item presentation layout by ID
    - [x] `presentation-reset-layout-by-path`: resets item presentation layout by path
    - [x] `presentation-merge-layout-by-id`: Merges final and shared layouts by item Id
    - [x] `presentation-merge-layout-by-path`: Merges final and shared layouts by item path
    - [x] `presentation-get-layout-device`: Gets the layout for the device specified
    - [x] `presentation-get-default-layout-device`: Gets the default layout
    - [x] `presentation-get-rendering-by-id`: Gets rendering definition by item id
    - [x] `presentation-get-rendering-by-path`: Gets rendering definition by item path
    - [x] `presentation-remove-rendering-by-path`: Removes renderings from an item by owners item path
    - [x] `presentation-remove-rendering-by-id`: Removes renderings from an item by owners item ID
    - [x] `presentation-add-rendering-by-path`: Adds a rendering to presentation of an item specified by path
    - [x] `presentation-add-rendering-by-id`: Adds a rendering to presentation of an item specified by item ID
    - [x] `presentation-set-rendering-by-path`: Updates rendering specified by item path with new values
    - [x] `presentation-set-rendering-by-id`: Updates rendering specified by item ID with new values
    - [x] `presentation-switch-rendering-by-id`: Switches an existing rendering specified by item ID with an alternate one for the item specified by item ID
    - [x] `presentation-switch-rendering-by-path`: Switches an existing rendering specified by path with an alternate one for the item specified by path
    - [x] `presentation-switch-rendering-by-unique-id`: Switches an existing rendering specified by unique ID with an alternate one for the item specified by item ID
    - [x] `presentation-get-placeholder-setting-by-id`: Gets placeholder setting assigned on the item specified by ID
    - [x] `presentation-get-placeholder-setting-by-path`: Gets placeholder setting assigned on the item specified by path
    - [x] `presentation-add-placeholder-setting-by-id`: Adds a placeholder setting to the item specified by ID
    - [x] `presentation-add-placeholder-setting-by-path`: Adds a placeholder setting to the item specified by path
    - [x] `presentation-remove-placeholder-setting-by-id`: Removes placeholder setting from the item specified by ID
    - [x] `presentation-remove-placeholder-setting-by-path`: Removes placeholder setting from the item specified by path
    - [x] `presentation-get-rendering-parameter-by-id`: Gets rendering parameter for the item specified by ID
    - [x] `presentation-get-rendering-parameter-by-path`: Gets rendering parameter for the item specified by path
    - [x] `presentation-remove-rendering-parameter-by-id`: Removes the specified rendering parameter from the rendering placed on the item specified by ID
    - [x] `presentation-remove-rendering-parameter-by-path`: Removes the specified rendering parameter from the rendering placed on the item specified by path
    - [x] `presentation-set-rendering-parameter-by-id`: Adds and updates the specified rendering parameter from the rendering placed on the item specified by ID
    - [x] `presentation-set-rendering-parameter-by-path`: Adds and updates the specified rendering parameter from the rendering placed on the item specified by path
  - [x] Indexing
    - [x] `indexing-initialize-search-index`: initializes one or more search indexes
    - [x] `indexing-get-search-index`: returns a search index
    - [x] `indexing-find-item`: finds an item in a search index    
    - [x] `indexing-suspend-search-index`: suspends one or more running search indexes
    - [x] `indexing-stop-search-index`: stops one or more running search indexes
    - [x] `indexing-resume-search-index`: resumes one or more paused search indexes
    - [x] `indexing-initialize-search-index-item-by-id`: rebuilds the index for a given tree with the specified root item by ID and index name
    - [x] `indexing-initialize-search-index-item-by-path`: rebuilds the index for a given tree with the specified root item by path and index name
    - [x] `indexing-remove-search-index-item-by-id`: removes the item with the specified ID from the search index
    - [x] `indexing-remove-search-index-item-by-path`: removes the item with the specified path from the search index
    - [ ] ~~`indexing-initialize-item`: initializes items with the PowerShell automatic properties for each field.~~ Skipped, no value for MCP server.
  - [x] Common
    - [x] `common-add-base-template-by-id`: adds a base template to a template item by ID
    - [x] `common-add-base-template-by-path`: adds a base template to a template item by path
    - [x] `common-add-item-version-by-id`: creates a version of the item (by its id) in a new language based on an existing language version
    - [x] `common-add-item-version-by-path`: creates a version of the item (by its path) in a new language based on an existing language version
    - [x] `common-convert-from-item-clone-by-id`: converts an item from a clone to a fully independent item by ID
    - [x] `common-convert-from-item-clone-by-path`: converts an item from a clone to a fully independent item by path
    - [x] `common-get-archive`: gets Sitecore database archives
    - [x] `common-get-archive-item`: gets a list of items found in the specified archive
    - [x] `common-get-cache`: gets information about Sitecore caches
    - [x] `common-get-database`: gets information about Sitecore databases
    - [x] `common-get-item-field-by-id`: gets item fields as either names or fields or template fields by ID
    - [x] `common-get-item-field-by-path`: gets item fields as either names or fields or template fields by path
    - [x] `common-get-item-clone-by-id`: gets all the clones for the specified item by ID
    - [x] `common-get-item-clone-by-path`: gets all the clones for the specified item by path
    - [x] `common-get-item-reference-by-id`: gets item references (where it is used) for a Sitecore item by ID
    - [x] `common-get-item-reference-by-path`: gets item references (where it is used) for a Sitecore item by path
    - [x] `common-get-item-referrer-by-id`: gets items referring to a Sitecore item by ID (which items reference it)
    - [x] `common-get-item-referrer-by-path`: gets items referring to a Sitecore item by path (which items reference it)
    - [x] `common-get-item-template-by-id`: gets template information for a Sitecore item by ID
    - [x] `common-get-item-template-by-path`: gets template information for a Sitecore item by path
    - [x] `common-get-item-workflow-event-by-id`: gets entries from the workflow history for the specified item by ID
    - [x] `common-get-item-workflow-event-by-path`: gets entries from the workflow history for the specified item by path
    - [x] `common-get-sitecore-job`: gets list of the current Sitecore jobs
    - [x] `common-invoke-workflow-by-id`: executes workflow action for a Sitecore item by ID
    - [x] `common-invoke-workflow-by-path`: executes workflow action for a Sitecore item by path
    - [x] `common-new-item-clone-by-id`: creates a new item clone based on the item provided by ID
    - [x] `common-new-item-clone-by-path`: creates a new item clone based on the item provided by path
    - [x] `common-new-item-workflow-event-by-id`: creates a new entry in the workflow history for a Sitecore item by ID
    - [x] `common-new-item-workflow-event-by-path`: creates a new entry in the workflow history for a Sitecore item by path
    - [x] `common-publish-item-by-id`: publishes a Sitecore item by ID
    - [x] `common-publish-item-by-path`: publishes a Sitecore item by path
    - [x] `common-remove-archive-item`: removes items permanently from the specified archive
    - [x] `common-remove-base-template-by-id`: removes a base template from a template item by ID
    - [x] `common-remove-base-template-by-path`: removes a base template from a template item by path
    - [x] `common-remove-item-version-by-id`: removes a version of a Sitecore item by ID
    - [x] `common-remove-item-version-by-path`: removes a version of a Sitecore item by path
    - [x] `common-reset-item-field-by-id`: resets item fields, specified as either names, fields or template fields by ID
    - [x] `common-reset-item-field-by-path`: resets item fields, specified as either names, fields or template fields by path
    - [x] `common-restart-application`: restarts the Sitecore Application pool
    - [x] `common-restore-archive-item`: restores items to the original database from the specified archive
    - [x] `common-set-item-template-by-id`: sets the item template by ID
    - [x] `common-set-item-template-by-path`: sets the item template by path
    - [x] `common-test-base-template-by-id`: checks if the item inherits from the specified template by ID
    - [x] `common-test-base-template-by-path`: checks if the item inherits from the specified template by path
    - [x] `common-update-item-referrer-by-id`: updates all references to the specified item (by ID) to point to a new provided in the -NewTarget or removes links to the item
    - [x] `common-update-item-referrer-by-path`: updates all references to the specified item (by path) to point to a new provided in the -NewTarget or removes links to the item
  - [x] Logging
    - [x] `logging-get-logs`: retrieves Sitecore logs from the log directory with filtering options

- [ ] Sitecore CLI

### Tools selection

AI Agents may have limit on the amount of tools they can use. Please make sure that you have disabled the tools you don't need. It will make your agent faster, cheaper and more efficient.

## Installation

Add the following Model Context Protocol server to your Cursor, VS Code, Claude:

```json
    "Sitecore": {
        "type": "stdio",
        "command": "npx",
        "args": ["@antonytm/mcp-sitecore-server@latest"],
        "env": {
          "TRANSPORT": "stdio",
          "GRAPHQL_ENDPOINT": "https://xmcloudcm.localhost/sitecore/api/graph/",
          "GRAPHQL_SCHEMAS": "edge,master,core",
          "GRAPHQL_API_KEY": "{6D3F291E-66A5-4703-887A-D549AF83D859}",
          "GRAPHQL_HEADERS": "",
          "ITEM_SERVICE_DOMAIN": "sitecore",
          "ITEM_SERVICE_USERNAME": "admin",
          "ITEM_SERVICE_PASSWORD": "b",
          "ITEM_SERVICE_SERVER_URL": "https://xmcloudcm.localhost/",
          "POWERSHELL_DOMAIN": "sitecore",
          "POWERSHELL_USERNAME": "admin",
          "POWERSHELL_PASSWORD": "b",
          "POWERSHELL_SERVER_URL": "https://xmcloudcm.localhost/",
        }
    }
```

### Environment Variables Description

- `TRANSPORT`: The transport protocol to use. Options are `streamable-http`, `stdio` or `sse`.
- `GRAPHQL_ENDPOINT`: The GraphQL endpoint URL for the Sitecore instance.
- `GRAPHQL_SCHEMAS`: The Sitecore schemas to use for the GraphQL API, comma-separated.
- `GRAPHQL_API_KEY`: The API key for the GraphQL endpoint.
- `GRAPHQL_HEADERS`: Additional headers to include in the GraphQL requests.
- `ITEM_SERVICE_DOMAIN`: The domain for the Item Service API authentication. Default is `sitecore`.
- `ITEM_SERVICE_USERNAME`: The username for the Item Service API authentication.
- `ITEM_SERVICE_PASSWORD`: The password for the Item Service API authentication.
- `ITEM_SERVICE_SERVER_URL`: The base URL for the Item Service API.
- `POWERSHELL_DOMAIN`: The domain for the Sitecore PowerShell Remoting API authentication. Default is `sitecore`.
- `POWERSHELL_USERNAME`: The username for the Sitecore PowerShell Remoting API authentication.
- `POWERSHELL_PASSWORD`: The password for the Sitecore PowerShell Remoting API authentication.
- `POWERSHELL_SERVER_URL`: The base URL for the Sitecore PowerShell Remoting API.
- `AUTORIZATION_HEADER`: Optional. If set, it will be used as an authorization header for access to the server. MCP server will expect `authorization` header to be passed with the value of this environment variable. If environment variable is not set, the server will not check for the authorization header.

## Docker images

- `antonytm/mcp-sitecore-linux`: [The Linux version](https://hub.docker.com/r/antonytm/mcp-sitecore-linux) of the MCP Sitecore server.
- `antonytm/mcp-sitecore-windows`: [The Windows version](https://hub.docker.com/r/antonytm/mcp-sitecore-windows) of the MCP Sitecore server.

## Resources list

- [x] `config`: returns the configuration of the server. Use it to check if everything is properly configured.

## Local Installation / Development

1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm run build` to build the project
4. Run `npm start` to start the server

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details.
