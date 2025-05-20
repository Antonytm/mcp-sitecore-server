# Contributing to Sitecore MCP Server repository

## Prerequisites

- Node.js (v22 or later)
- Sitecore XM, XP or XM Cloud instance
- Enabled Powershell Remoting API on the Sitecore instance

## Development setup

1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm run build` to build the project

## Debugging

1. Run `npm run start` to build the project and start the server.
2. It will start the local MCP server on port 3001 in SSE mode.
3. Run `npm run inspector` to start the inspector.
4. Open the inspector in your browser at `http://127.0.0.1:6274/#resources` and connect to `http://localhost:3001/sse` URL.

It allows you to inspect the requests and responses between the client and the server. You can run these commands in *JavaScript Debug Terminal* in VS Code to be able to debug the code.

## Testing

Sitecore Demo website is used for testing.
**TODO**: It will be added as a submodule in the future. It is not added yet because I have doubts that we need so complex setup for testing.

1. Clone <https://github.com/exdst/Sitecore.Demo.XMCloud.Verticals/tree/feature/mcp-playground>
2. Use branch `feature/mcp-playground`
3. Follow the instructions in the repository to set up the environment.
   1. Run `.\init.ps1 -InitEnv` to initialize the environment.
   2. Run `.\up.ps1` to start the environment.
4. Login to the Sitecore instance
5. Run `npm run build` to build the project.
6. Run `npm run test` to run tests.
