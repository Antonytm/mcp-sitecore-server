import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

// Config for fast, self-contained unit tests that do NOT require a running Sitecore
// instance. Run with `npm run test:unit`. The default vitest.config.ts is used by the
// integration tests, which exercise the bundled server against a live endpoint.
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    include: ['tests/unit/**/*.test.ts'],
  },
});
