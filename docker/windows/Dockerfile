FROM mcr.microsoft.com/windows/servercore:ltsc2022 AS installer

SHELL ["powershell", "-Command", "$ErrorActionPreference = 'Stop';$ProgressPreference='silentlyContinue';"]

RUN Invoke-WebRequest -OutFile nodejs.zip -UseBasicParsing "https://nodejs.org/dist/v22.16.0/node-v22.16.0-win-x64.zip"; Expand-Archive nodejs.zip -DestinationPath C:\; Rename-Item "C:\\node-v22.16.0-win-x64" c:\nodejs

FROM mcr.microsoft.com/windows/servercore:ltsc2022

WORKDIR C:/nodejs
COPY --from=installer C:/nodejs/ .
RUN SETX PATH C:\nodejs
RUN npm config set registry https://registry.npmjs.org/

WORKDIR c:/app

# Install dependencies without prepare scripts
COPY package*.json tsconfig.json ./
RUN npm install --ignore-scripts

# Build application
COPY src ./src
RUN npm run build

RUN npm run bundle

# Remove dev dependencies
RUN npm prune --production

# Default start
CMD ["node","c:/app/dist/index.js"]

# Expose port 3001
EXPOSE 3001

