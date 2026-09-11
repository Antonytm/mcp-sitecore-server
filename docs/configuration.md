# Configuration

Every setting is an environment variable. In an MCP client they go in the server entry's
`env` map; running locally or in Docker they come from a `.env` file — copy
[`.env.template`](../.env.template) to `.env` and fill it in.

The endpoints below assume the Sitecore side is already enabled. See
[Preparing your Sitecore instance](./sitecore-setup.md) for the SPE Remoting and Item
Service configuration these settings talk to.

## Transport

| Variable         | Default        | Description                                                                                                                                                                                                                       |
| ---------------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `TRANSPORT`      | `stdio`        | `stdio` or `streamable-http`. Streamable HTTP serves MCP at `/mcp`, with a `/health` liveness endpoint. An unrecognised value falls back to `stdio` and says so on stderr. `sse` is gone — see [SSE removal](#sse-removal) below. |
| `PORT`           | `3001`         | Port the Streamable HTTP transport listens on. Ignored on stdio.                                                                                                                                                                  |
| `HOST`           | `127.0.0.1`    | Interface to bind. Loopback by default, so the port is not published to the network by a `TRANSPORT=streamable-http` that was set without reading this page. Set it to `0.0.0.0` to serve other machines — and set `AUTHORIZATION_HEADER` when you do. The container images set it to `0.0.0.0` themselves, because a published container port cannot reach the container's own loopback. |
| `MCP_ALLOWED_HOSTS` | loopback names | Extra hostnames this server answers to, comma-separated, added to `localhost`, `127.0.0.1` and `::1`. A request whose `Host` or `Origin` names anything else is refused with 403. Set it to the name your deployment is reached by; `*` turns the check off. See [DNS rebinding](#dns-rebinding) below. |
| `MCP_BODY_LIMIT` | `32mb`         | Maximum request body the `/mcp` endpoint accepts. Express's own default of 100kb is smaller than a single base64 image, so `media-upload`'s inline `content` needs the headroom.                                                  |

### DNS rebinding

A browser cannot reach `/mcp` cross-origin on its own — the endpoint takes
`application/json`, which is not a CORS-simple content type, and no CORS headers are sent.
DNS rebinding steps around that: a page on a name that resolves first to the attacker's
address and then to `127.0.0.1` is treated by the browser as *same-origin* with whatever is
listening there. The MCP specification requires servers to validate `Origin` for this
reason, and the SDK does not do it.

So every request's `Host` and `Origin` are checked before anything else runs — before the
body is even parsed. Loopback names are allowed by default; a request naming anything else
gets a 403 that says which header was wrong and how to permit it. A client that sends
neither header is allowed through, because only a browser is obliged to send `Origin` and
only a browser can be made to lie about `Host` — CLI clients, curl and the container health
check are unaffected.

Deployments reached by a name of their own list it:

```shell
MCP_ALLOWED_HOSTS=mcp.example.com,10.0.0.5
```

`MCP_ALLOWED_HOSTS=*` disables the check, for a proxy that forwards hostnames not known
ahead of time. It is reported on stderr at startup, and it leaves this server only as
protected as the network in front of it.

### SSE removal

The SSE transport was removed from the MCP specification and from the SDK, so
`http://<host>:3001/sse` and its companion `/messages` endpoint no longer exist. Setting
`TRANSPORT=sse` still starts a server — Streamable HTTP on port 3001 at `/mcp` — and says
so on stderr, so a container keeps listening while you repoint its clients. Change the
client's URL to `http://<host>:3001/mcp` and its transport type to "Streamable HTTP".

## Sitecore endpoints

| Variable                  | Default    | Description                                                       |
| ------------------------- | ---------- | ----------------------------------------------------------------- |
| `GRAPHQL_ENDPOINT`        | —          | The GraphQL endpoint URL for the Sitecore instance.               |
| `GRAPHQL_SCHEMAS`         | —          | The Sitecore schemas to use for the GraphQL API, comma-separated. |
| `GRAPHQL_API_KEY`         | —          | The API key for the GraphQL endpoint, sent as an HTTP header.     |
| `GRAPHQL_HEADERS`         | —          | Additional headers to include in the GraphQL requests.            |
| `ITEM_SERVICE_SERVER_URL` | —          | The base URL for the Item Service API.                            |
| `ITEM_SERVICE_DOMAIN`     | `sitecore` | The domain for Item Service API authentication.                   |
| `ITEM_SERVICE_USERNAME`   | —          | The username for Item Service API authentication.                 |
| `ITEM_SERVICE_PASSWORD`   | —          | The password for Item Service API authentication.                 |
| `POWERSHELL_SERVER_URL`   | —          | The base URL for the Sitecore PowerShell Remoting API.            |
| `POWERSHELL_DOMAIN`       | `sitecore` | The domain for PowerShell Remoting API authentication.            |
| `POWERSHELL_USERNAME`     | —          | The username for PowerShell Remoting API authentication.          |
| `POWERSHELL_PASSWORD`     | —          | The password for PowerShell Remoting API authentication.          |
| `POWERSHELL_SITE_CONTEXT` | `shell`    | The Sitecore site every script runs under (a `SiteContextSwitcher` around the script body). `shell` is what the Content Editor and the SPE ISE use, and it is the context in which a template's default workflow is applied to a created item. Set it to an empty value to run scripts under whichever site the request host resolves to, which on a multi-site CM is a content site with workflow off — see the note below. |
| `POWERSHELL_CONTEXT_DATABASE` | `master` | `Context.Database` inside that switch. `shell` alone would make it `core`, the shell site's own database. Empty leaves the site's database in place. |

**Why scripts run as `shell`.** Sitecore applies a template's `__Default workflow` to a created item only
when `Context.Site.EnableWorkflow` is true. The Content Editor, Pages and the SPE ISE run as `shell`, where
it is. The remoting endpoint resolves its site from the request host like any other request, which on a CM
serving several sites is whichever content site claims that hostname, with workflow off — so a script that
created pages there left every one of them outside its workflow, and nothing reported it. Every script is
therefore wrapped in a `SiteContextSwitcher` (plus a `DatabaseSwitcher`, because `shell` on its own makes
`Context.Database` the `core` database). A `try` block opens no scope in PowerShell, so the script's
variables, output and `return` are unaffected; the one visible difference is that `[Sitecore.Context]::Site.Name`
reads `shell`. Passing `sc_site=shell` on the query string instead does not work: the shell site redirects an
unauthenticated request to its login page before SPE's basic-auth handler runs.

## Authoring and Management API

The [Authoring and Management GraphQL API](https://doc.sitecore.com/sai/en/developers/sitecoreai/content-modeling-and-presentation/sitecore-authoring-and-management-graphql-api.html)
is a separate endpoint from the `GRAPHQL_*` block above, with separate credentials. That
one talks to the Edge and preview endpoints under `/sitecore/api/graph/` using an
`sc_apikey`; this one talks to the CM's authoring schema at
`/sitecore/api/authoring/graphql/v1/` using an OAuth 2.0 bearer token.

| Variable                  | Default                                                           | Description                                                                                                                                                 |
| ------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `AUTHORING_ENDPOINT`      | `ITEM_SERVICE_SERVER_URL` + `/sitecore/api/authoring/graphql/v1/` | The endpoint URL. Sitecore always serves it from that path, so this only needs setting when the authoring CM is a different host from the Item Service one. |
| `AUTHORING_CLIENT_ID`     | —                                                                 | Client ID for the client-credentials grant. On SitecoreAI this comes from an XM Cloud Deploy automation client with the `xmcloud.cm:admin` scope.           |
| `AUTHORING_CLIENT_SECRET` | —                                                                 | The matching client secret.                                                                                                                                 |
| `AUTHORING_TOKEN`         | —                                                                 | A bearer token supplied directly, instead of the pair above. Wins when both are set.                                                                        |
| `AUTHORING_AUTHORITY`     | `https://auth.sitecorecloud.io`                                   | The token authority. `/oauth/token` is appended.                                                                                                            |
| `AUTHORING_AUDIENCE`      | `https://api.sitecorecloud.io`                                    | The audience the token is requested for.                                                                                                                    |

Set **either** `AUTHORING_CLIENT_ID` + `AUTHORING_CLIENT_SECRET` **or** `AUTHORING_TOKEN`.
Prefer the credentials pair: tokens carry an `expires_in`, and only that route can renew
one mid-session. The server caches each token until shortly before it expires and mints a
new one on demand, so a long-running session needs no attention.

`AUTHORING_TOKEN` is for the cases where this server cannot mint a token itself — the
`accessToken` in `.sitecore/user.json` after `dotnet sitecore cloud login`, or a token from
a controller in front of the Sitecore Identity Server on XM/XP. It will expire.

On XM/XP, point `AUTHORING_AUTHORITY` and `AUTHORING_AUDIENCE` at your own Sitecore
Identity Server instead of the Sitecore Cloud defaults.

If nothing is configured, the `authoring-*` tools stay registered but every call fails with
a message naming both options — the server has no way to know at startup whether you
intended to use this API. Set `TOOL_PROFILE=no-authoring-api` if you do not, and they stay
unregistered instead of failing one call at a time.

## Tool surface

All three are unset by default, which registers every tool. See
[Tool selection](./tool-selection.md) for the full treatment.

| Variable         | Default | Description                                                                                                                                                                                                                                                                   |
| ---------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `TOOL_GROUPS`    | —       | Comma-separated allowlist of tool groups to register. Unset registers every group.                                                                                                                                                                                            |
| `DISABLED_TOOLS` | —       | Comma-separated list of exact tool names to leave unregistered. Always wins on conflict.                                                                                                                                                                                      |
| `TOOL_PROFILE`   | —       | Comma-separated list of preset denylists. `no-spe`, `no-item-service`, `no-edge-graphql` and `no-authoring-api` each hide one API surface your instance does not serve; `no-account-management` hides the twelve tools that create or edit a CM account, for a deployment that would rather an agent could not manage accounts. Everything named is unioned. |

## Limits and behaviour

| Variable                 | Default           | Description                                                                                                                                           |
| ------------------------ | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POWERSHELL_TIMEOUT_MS`  | `600000` (10 min) | Timeout for a single PowerShell Remoting request.                                                                                                     |
| `POWERSHELL_FULL_ERRORS` | `false`           | `true` returns the complete .NET error record instead of the shaped summary when a command fails. Individual tools also accept `full: true` per call. |
| `REQUEST_TIMEOUT_MS`     | `30000` (30 s)    | Timeout for Item Service and GraphQL requests.                                                                                                        |
| `DESCENDANTS_MAX_ITEMS`  | `5000`            | Node cap for `item-service-get-item-descendants`, which reports truncation rather than exhausting memory on a large or circular tree.                 |

## Security

| Variable                         | Default | Description                                                                                                                                                                                                                                   |
| -------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `AUTHORIZATION_HEADER`           | —       | If set, the server expects an `authorization` header matching this value. If unset, no authorization check is performed. Set it whenever the HTTP port is reachable by anything other than your own machine.                                  |
| `NODE_TLS_REJECT_UNAUTHORIZED`   | —       | Read by Node itself. `.env.template` ships it set to `0` so the server can talk to a local Sitecore instance with a self-signed certificate.                                                                                                  |
| `MEDIA_LOCAL_FILE_ROOT`          | —       | Directory that `media-upload`'s `filePath` and `media-download`'s `saveTo` are confined to. Required to use those parameters at all under `TRANSPORT=streamable-http`; see [Media and the local filesystem](#media-and-the-local-filesystem). |
| `MEDIA_ALLOW_PRIVATE_SOURCE_URL` | `false` | `true` lets `media-upload`'s `sourceUrl` reach private, loopback and link-local addresses. Leave it off unless you are deliberately importing from your own network.                                                                          |

> **Warning:** `NODE_TLS_REJECT_UNAUTHORIZED=0` disables TLS certificate verification for
> every outbound request. Set it to `1`, or remove it, in production or on an untrusted
> network.

### Media and the local filesystem

`media-upload` can read bytes from `filePath`, and `media-download` can write them to
`saveTo`. Both act on the machine running this MCP server, not on Sitecore.

On stdio that is unremarkable: the server is a subprocess of your own client and can
already reach anything you can. Over `TRANSPORT=streamable-http` it is not, because
`AUTHORIZATION_HEADER` is empty by default and anyone who can reach the port would get
arbitrary file read and write on the host. So both parameters are **refused** on the HTTP
transport unless `MEDIA_LOCAL_FILE_ROOT` names a directory, and when it is set every path
— on either transport — must resolve inside it.

`sourceUrl` is the other way out of the process: the server fetches it. Only `http` and
`https` are accepted, and hostnames that resolve to private, loopback or link-local
addresses (including the `169.254.169.254` cloud metadata endpoint) are refused unless
`MEDIA_ALLOW_PRIVATE_SOURCE_URL=true`.

## Resources

- `config` — returns the configuration of the server. Use it to check that everything is
  properly configured.
