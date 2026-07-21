# Pinned to Node 24 to match the Windows image and CI, so all environments behave
# identically.
FROM node:24-alpine

WORKDIR /app

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
CMD ["node","dist/index.js"]

# Expose port
EXPOSE 3001

# Report unhealthy if the HTTP endpoint stops responding.
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -q -O - http://localhost:3001/.well-known/oauth-protected-resource || exit 1