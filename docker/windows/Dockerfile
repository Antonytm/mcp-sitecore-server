FROM mcr.microsoft.com/windows/servercore:ltsc2022 AS installer

SHELL ["powershell", "-Command", "$ErrorActionPreference = 'Stop';$ProgressPreference='silentlyContinue';"]

RUN Invoke-WebRequest -OutFile nodejs.zip -UseBasicParsing "https://nodejs.org/dist/v24.14.0/node-v24.14.0-win-x64.zip"; Expand-Archive nodejs.zip -DestinationPath C:\; Rename-Item "C:\\node-v24.14.0-win-x64" c:\nodejs

FROM mcr.microsoft.com/windows/servercore:ltsc2022

WORKDIR C:/nodejs
COPY --from=installer C:/nodejs/ .
RUN SETX PATH C:\nodejs
RUN npm config set registry https://registry.npmjs.org/

WORKDIR c:/app

# Install dependencies without prepare scripts
COPY package*.json tsconfig.json rollup.config.js ./
RUN npm install --ignore-scripts

# Build application
COPY src ./src
RUN npm run build

RUN npm run bundle

# Remove dev dependencies
RUN npm prune --production

# This image exposes an HTTP port, so serve over streamable-http by default.
ENV TRANSPORT=streamable-http

# Default start
CMD ["node","c:/app/dist/index.js"]

# Expose port 3001
EXPOSE 3001

# Report unhealthy if the HTTP endpoint stops responding.
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD powershell -command "try { Invoke-WebRequest -UseBasicParsing http://localhost:3001/.well-known/oauth-protected-resource | Out-Null; exit 0 } catch { exit 1 }"

