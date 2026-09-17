# Preparing your Sitecore instance

The server talks to four Sitecore API surfaces, and none of them are fully open on a
default instance. This page covers what to enable, the config patch that enables it, and
how to verify each surface before you point an agent at it.

| Surface                                 | Endpoint the server calls                                    | Enabled by                                                                                                                        |
| --------------------------------------- | ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| Sitecore PowerShell Extensions (SPE)    | `POST /-/script/script/`, `/-/script/media/`                 | The SPE module, plus the `remoting` service and an authorization entry; the media tools also need `mediaUpload` / `mediaDownload` |
| Item Service (Sitecore Services Client) | `/sitecore/api/ssc/auth/login`, `/sitecore/api/ssc/item/...` | The `Sitecore.Services.SecurityPolicy` setting                                                                                    |
| Edge / preview GraphQL                  | `/sitecore/api/graph/...`                                    | An API key item and the endpoint your edition ships, authenticated with `sc_apikey`                                               |
| Authoring and Management GraphQL        | `/sitecore/api/authoring/graphql/v1/`                        | `GraphQL.Enabled`, plus an OAuth client — an entirely separate endpoint and credential from the row above                         |

The last two are both GraphQL, which is why they are easy to conflate, but they are
separate endpoints with separate configuration: Edge is the delivery-side read surface and
takes an API key, while Authoring and Management is the CM's own authoring surface and
takes a bearer token. Sections 4 and 5 below set them up independently.

You do not need all four. `TOOL_GROUPS` lets you register only the groups whose surface
you have configured — see [Tool selection](./tool-selection.md).

## 1. Install Sitecore PowerShell Extensions

Most of the tool surface (PowerShell, presentation, composition, security, indexing,
common, logging) runs through SPE, so install it first if it isn't already there.

- Download the package from the [SPE releases](https://github.com/SitecorePowerShell/Console/releases)
  and install it through the Installation Wizard, or add the `Spe` NuGet package to your
  platform project.
- SPE **8.0 or later** is recommended. The four security serialization tools
  (`security-export-account`, `security-import-account`) need 8.0 — the export cmdlets were
  broken before it.

Confirm it loaded by opening `/sitecore/shell/client/Applications/PowerShell/PowerShellIse`
in the Sitecore client.

## 2. Apply the remoting config patch

SPE ships with remoting **disabled**. Save the following as `SPERemoting.config` and
deploy it to `App_Config/Include/zzz/` on the CM so it patches after SPE's own config:

- **XM / XP:** drop it into `<webroot>\App_Config\Include\zzz\`.
- **XM Cloud / SitecoreAI:** commit it to your platform project at
  `src/platform/App_Config/Include/zzz/SPERemoting.config` and deploy.
- **Docker-based local dev:** mount or copy it into the CM container's
  `C:\inetpub\wwwroot\App_Config\Include\zzz\`.

```xml
<?xml version="1.0"?>
<configuration xmlns:patch="https://www.sitecore.net/xmlconfig/">
  <sitecore>
    <settings>
      <setting name="Sitecore.Services.AllowToLoginWithHttp">
        <patch:attribute name="value">true</patch:attribute>
      </setting>
      <setting name="Sitecore.Services.SecurityPolicy">
        <patch:attribute name="value" value="Sitecore.Services.Infrastructure.Web.Http.Security.ServicesOnPolicy, Sitecore.Services.Infrastructure" />
      </setting>
    </settings>
    <pipelines>
      <httpRequestBegin>
        <processor type="Sitecore.Pipelines.HttpRequest.RequireAuthentication, Sitecore.Kernel" resolve="true">
          <IgnoreRules hint="list:AddIgnoreRule">
            <prefix hint="spe">^\/sitecore\smodules\/PowerShell.*</prefix>
          </IgnoreRules>
        </processor>
      </httpRequestBegin>
      <owin.cookieAuthentication.validateIdentity>
        <processor type="Sitecore.Owin.Authentication.Pipelines.CookieAuthentication.ValidateIdentity.ValidateSiteNeutralPaths, Sitecore.Owin.Authentication">
          <siteNeutralPaths hint="list">
            <!-- This entry corrects the infinite loop of ExecuteCommand in the SPE Console -->
            <path hint="spe 1">/sitecore%20modules/PowerShell</path>
            <path hint="spe 2">/sitecore modules/PowerShell</path>
            <path hint="spe 3">/-/script/</path>
          </siteNeutralPaths>
        </processor>
      </owin.cookieAuthentication.validateIdentity>
    </pipelines>

    <powershell>
      <userAccountControl>
        <gates>
          <gate name="ISE">
            <patch:delete />
          </gate>
          <gate name="Console">
            <patch:delete />
          </gate>
          <gate name="ItemSave">
            <patch:delete />
          </gate>
          <gate name="ISE" token="Permissive" />
          <gate name="Console" token="Permissive" />
          <gate name="ItemSave" token="Permissive" />
        </gates>
        <tokens>
          <token name="Permissive" expiration="00:00:00" elevationAction="Allow" />
        </tokens>
      </userAccountControl>
      <services>
        <remoting enabled="true">
          <authorization>
            <add hint="spe 1" Permission="Allow" IdentityType="Role" Identity="sitecore\PowerShell Extensions Remoting"/>
            <add hint="spe 2" Permission="Allow" IdentityType="Role" Identity="sitecore\Developer"/>
            <add hint="spe 3" Permission="Allow" IdentityType="Role" Identity="sitecore\IsAdministrator"/>
          </authorization>
        </remoting>
        <mediaUpload enabled="true">
        </mediaUpload>
        <mediaDownload enabled="true">
        </mediaDownload>
      </services>
    </powershell>
  </sitecore>
</configuration>
```

> **This is a development configuration.** It opens remote script execution, relaxes the
> User Account Control gates and allows login over plain HTTP. Read
> [What each section does](#what-each-section-does) before putting any of it on an
> instance that is not yours, and see [Hardening](#hardening-for-shared-or-production-instances)
> for what to change.

### What each section does

**`Sitecore.Services.AllowToLoginWithHttp`** — lets the Item Service accept credentials
over unencrypted HTTP. Needed only when your CM is `http://`. If your instance is HTTPS
(including a self-signed local certificate), leave this setting alone.

**`Sitecore.Services.SecurityPolicy`** — the Item Service ships locked down by
`ServicesOffPolicy`, which returns `403` for every SSC request. `ServicesOnPolicy` turns
the whole Item Service on. This one setting is the difference between the
`item-service-*` tools working and every one of them failing with a `403`.

A `403` on its own does not prove the policy is the problem, though: the Item Service
returns the same status when the policy is on and the _credentials_ are refused. To tell
them apart, POST deliberately malformed JSON to `/sitecore/api/ssc/auth/login`. A `400` or
`500` means the controller is executing — so the endpoint is on and the account is what is
being rejected. A `403` regardless of what you send means the policy is still off.

**`RequireAuthentication` ignore rule** — stops the `httpRequestBegin` pipeline from
bouncing unauthenticated requests to the SPE paths before SPE's own authorization runs.
Without it, remoting requests are redirected to the login page instead of executing.

**`ValidateSiteNeutralPaths`** — marks the SPE paths as site-neutral for OWIN cookie
authentication. Without it, the SPE Console's `ExecuteCommand` can loop indefinitely.

**`userAccountControl` gates** — SPE's UAC gates normally prompt for elevation before the
ISE, the Console, or an item-save script runs. A remote caller has nowhere to answer a
prompt, so the patch replaces the gates with a `Permissive` token that auto-allows. This
is the single most consequential part of the patch: it removes the confirmation step in
front of arbitrary script execution.

**`remoting` service** — the service the MCP server actually uses. `run-powershell-script`
and every SPE-backed tool POST their script to `/-/script/script/` with HTTP Basic
authentication, and this block is what allows that. The three `authorization` entries
allow anyone in `sitecore\PowerShell Extensions Remoting`, `sitecore\Developer` or
`sitecore\IsAdministrator`; trim the list to the narrowest role that fits your setup.

**`mediaUpload` / `mediaDownload`** — the SPE media handlers behind the `media-upload` and
`media-download` tools (`/-/script/media/...`). Enabled in the patch; set both to
`enabled="false"` if you don't register the media tools.

For the full list of SPE web services, what each one exposes and SPE's own security
recommendations, see
[Web Services](https://doc.sitecorepowershell.com/security/web-services) in the SPE
documentation.

## 3. Give the account a role

The credentials in `POWERSHELL_USERNAME` / `POWERSHELL_PASSWORD` must belong to a user in
one of the roles listed in the `authorization` block. Either:

- add the user to `sitecore\PowerShell Extensions Remoting` (SPE creates this role on
  install — it is the narrowest of the three), or
- use an administrator account, which matches `sitecore\IsAdministrator`.

`POWERSHELL_DOMAIN` defaults to `sitecore`. Use the bare username in
`POWERSHELL_USERNAME` — the server builds the Basic auth header from the username and
password alone.

The Item Service authenticates separately: the server POSTs
`{ username, password, domain }` to `/sitecore/api/ssc/auth/login` and reuses the
`.AspNet.Cookies` value it gets back. `ITEM_SERVICE_*` can therefore point at a different,
lower-privileged account than `POWERSHELL_*` if you want the Item Service tools to run as
someone else.

## 4. Set up a GraphQL API key (optional)

Only needed for the `graphql` tool group.

1. In the Content Editor, create an **API Key** item under
   `/sitecore/system/Settings/Services/API Keys`.
2. Set **CORS Origins** and **Allowed Controllers** as your environment requires.
3. Publish the item.
4. Put the item's ID — braces included, e.g. `{6D3F291E-66A5-4703-887A-D549AF83D859}` —
   in `GRAPHQL_API_KEY`, and the endpoint in `GRAPHQL_ENDPOINT` (typically
   `https://<cm-host>/sitecore/api/graph/`).

The server sends the key as an HTTP header rather than the `sc_apikey` query parameter, so
it doesn't end up in access logs or proxy logs.

## 5. Enable the Authoring and Management API (optional)

Only needed for the `authoring.core`, `authoring.content` and `authoring.management` tool
groups. Nothing here is about SPE or the Item Service: this API is reached over plain HTTP
with an OAuth bearer token, which is exactly why it keeps working on instances where the
other two surfaces are switched off.

Sitecore's own documentation for this API:

- [Sitecore Authoring and Management GraphQL API](https://doc.sitecore.com/sai/en/developers/sitecoreai/content-modeling-and-presentation/sitecore-authoring-and-management-graphql-api.html)
  — the overview and the endpoint's own reference.
- [Walkthrough: Enabling and authorizing requests to the Authoring and Management API](https://doc.sitecore.com/sai/en/developers/sitecoreai/content-modeling-and-presentation/sitecore-authoring-and-management-graphql-api/walkthrough--enabling-and-authorizing-requests-to-the-authoring-and-management-api.html)
  — the supported route through the steps below, including creating the automation client.
- [Limitations of the GraphQL Authoring and Management API](https://doc.sitecore.com/sai/en/developers/sitecoreai/content-modeling-and-presentation/sitecore-authoring-and-management-graphql-api/limitations-of-the-graphql-authoring-and-management-api.html)
  — where the query depth cap and the paging defaults are written down.
- Query examples for [authoring](https://doc.sitecore.com/sai/en/developers/sitecoreai/content-modeling-and-presentation/sitecore-authoring-and-management-graphql-api/query-examples-for-authoring-operations.html)
  and [management](https://doc.sitecore.com/sai/en/developers/sitecoreai/content-modeling-and-presentation/sitecore-authoring-and-management-graphql-api/query-examples-for-management-operations.html)
  operations — useful when writing a document for `authoring-graphql`.

To allow the tools to work, you need a client ID and secret.
Follow [this](https://doc.sitecore.com/sai/en/developers/sitecoreai/deploying-sitecoreai/deploy-app/managing-sitecoreai-client-credentials/manage-client-credentials-for-a-sitecoreai-organization-or-environment.html) to set up an automation client credential.
Put them in `AUTHORING_CLIENT_ID` and `AUTHORING_CLIENT_SECRET`.

Or paste a token you already hold into `AUTHORING_TOKEN` instead — the `accessToken` in
`.sitecore/user.json` after `dotnet sitecore cloud login` is the quickest one to hand. Give
it the raw token, without `Bearer`; it is used as-is and wins over the client ID and secret
when both are set. It also expires, and nothing here renews it, so it suits trying the
tools out rather than a running setup.

## Hardening for shared or production instances

The patch above is written for a development CM you control. On anything shared:

- **Narrow the authorization list.** Keep only `sitecore\PowerShell Extensions Remoting`
  and put exactly one service account in it. Remove the `Developer` and `IsAdministrator`
  entries.
- **Reconsider the permissive UAC gates.** They exist because a remote caller cannot answer
  an elevation prompt, but the effect is that any authorized caller runs scripts with no
  confirmation. If that is unacceptable, do not enable remoting on that instance.
- **Delete the services you don't use.** This server needs `remoting`, plus
  `mediaUpload` / `mediaDownload` if you register the media tools; `restfulv2` and the
  file handlers can go.
- **Leave `GraphQL.ExposePlayground` off.** The Authoring and Management API itself is fine
  to leave enabled — it is authenticated — but the browser IDE has no reason to exist on a
  shared instance.
- **Scope the authoring client.** `xmcloud.cm:admin` is administrative access to the CM over
  HTTP. Treat `AUTHORING_CLIENT_SECRET` as you would the admin password, and use a client
  per environment so one can be revoked alone.
- **Drop `AllowToLoginWithHttp`.** Serve the CM over HTTPS and leave the setting at its
  default, so credentials are never sent in the clear.
- **Set `AUTHORIZATION_HEADER`** on the MCP server itself whenever its HTTP port is
  reachable by anything other than your own machine, and keep
  `NODE_TLS_REJECT_UNAUTHORIZED` at `1`. See [Configuration](./configuration.md).
- Remember that `run-powershell-script` is arbitrary remote code execution against the CM,
  driven by a language model. `DISABLED_TOOLS=run-powershell-script` removes it while
  leaving the typed tools in place.

## Troubleshooting

| Symptom                                                                                     | Likely cause                                                                                                                                                                                                                                                                                                                                      |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SPE calls return HTML (a login page) instead of CliXml                                      | The `RequireAuthentication` ignore rule is missing, or the config didn't patch after SPE's own config.                                                                                                                                                                                                                                            |
| SPE calls return `403`                                                                      | `remoting` is not `enabled="true"`, or the account is in none of the authorized roles.                                                                                                                                                                                                                                                            |
| SPE calls return `400` with an HTML page and an `x-auth0-requestid` header                  | The request never reached Sitecore. A CM whose login is federated to Sitecore Cloud redirects an unauthenticated remoting call to the identity provider, which answers with its own error page — HTTP Basic credentials cannot satisfy it. Use an account this CM actually accepts. A burst of these becomes `429`.                               |
| Every `item-service-*` tool returns `403`                                                   | Either the account is not valid on this instance, **or** `Sitecore.Services.SecurityPolicy` is still `ServicesOffPolicy`. Tell them apart by POSTing malformed JSON to `/sitecore/api/ssc/auth/login`: a `400` or `500` means the endpoint is live and it is the credentials being refused, while `403` for _every_ body means the policy is off. |
| Item Service login succeeds over HTTPS but fails over HTTP                                  | `Sitecore.Services.AllowToLoginWithHttp` is not `true`.                                                                                                                                                                                                                                                                                           |
| `self signed certificate` / `unable to verify the first certificate`                        | A local CM with a self-signed certificate. `.env.template` ships `NODE_TLS_REJECT_UNAUTHORIZED=0` for this; never carry it to production.                                                                                                                                                                                                         |
| SPE Console loops on `ExecuteCommand`                                                       | The `ValidateSiteNeutralPaths` entries are missing.                                                                                                                                                                                                                                                                                               |
| Every `authoring-*` tool reports "needs a bearer token, and none is configured"             | Neither `AUTHORING_CLIENT_ID`/`AUTHORING_CLIENT_SECRET` nor `AUTHORING_TOKEN` is set.                                                                                                                                                                                                                                                             |
| `authoring-*` tools report `AUTH_NOT_AUTHENTICATED` on an HTTP 200                          | The endpoint is reachable but the token is missing, expired, or issued for a different audience or environment.                                                                                                                                                                                                                                   |
| `authoring-*` tools return `404`                                                            | `GraphQL.Enabled` is not `true`, or `AUTHORING_ENDPOINT` points somewhere other than the CM.                                                                                                                                                                                                                                                      |
| The token endpoint returns `access_denied`                                                  | The automation client lacks the `xmcloud.cm:admin` scope, or `AUTHORING_AUDIENCE` is wrong.                                                                                                                                                                                                                                                       |
| `authoring-upload-media` reports "The specified key is not a valid size for this algorithm" | `GraphQL.UploadMediaOptions.EncryptionKey` has no value.                                                                                                                                                                                                                                                                                          |
| `authoring-get-item-template` says a template "doesn't exist" for a path that does          | The path must be relative to `/sitecore/templates` with no leading slash — `Sample/Sample Item`.                                                                                                                                                                                                                                                  |

Check `/sitecore/admin/showconfig.aspx` on the CM to confirm your patch merged the way you
expect.
