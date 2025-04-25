# Model Context Protocol server for Sitecore

![Build](https://github.com/antonytm/mcp-sitecore-server/actions/workflows/publish-npm.yml/badge.svg)
[![smithery badge](https://smithery.ai/badge/@Antonytm/mcp-sitecore-server)](https://smithery.ai/server/@Antonytm/mcp-sitecore-server)

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

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
- [ ] Sitecore CLI

## Installation

### Installing via Smithery

To install Sitecore Server for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@Antonytm/mcp-sitecore-server):

```bash
npx -y @smithery/cli install @Antonytm/mcp-sitecore-server --client claude
```

Add the following Model Context Protocol server to your Cursor, VS Code, Claud:

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
        "ITEM_SERVICE_SERVER_URL": "https://xmcloudcm.localhost/"
        }
    }
```

### Environment Variables Description

- `TRANSPORT`: The transport protocol to use. Options are `stdio` or `sse`.
- `GRAPHQL_ENDPOINT`: The GraphQL endpoint URL for the Sitecore instance.
- `GRAPHQL_SCHEMAS`: The Sitecore schemas to use for the GraphQL API, comma-separated.
- `GRAPHQL_API_KEY`: The API key for the GraphQL endpoint.
- `GRAPHQL_HEADERS`: Additional headers to include in the GraphQL requests.
- `ITEM_SERVICE_DOMAIN`: The domain for the Item Service API login. Default is `sitecore`.
- `ITEM_SERVICE_USERNAME`: The username for the Item Service API login.
- `ITEM_SERVICE_PASSWORD`: The password for the Item Service API login.
- `ITEM_SERVICE_SERVER_URL`: The base URL for the Item Service API.

## Resources list

- [x] `config`: returns the configuration of the server. Use it to check if everything is properly configured.

## Local Installation / Development

1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm run build` to build the project
4. Run `npm start` to start the server
