import { defineConfig } from 'vite';
import { resolve } from 'path';
import { existsSync, mkdirSync } from 'fs';

// Create dist directory if it doesn't exist
const distDir = './dist';
if (!existsSync(distDir)){
  mkdirSync(distDir, { recursive: true });
}

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: 'bundle',
    },
    outDir: 'dist',
    sourcemap: true,
    minify: false,
    rollupOptions: {
      output: {
        format: 'esm',
      },
      external: [
        'node:crypto', 'node:process', 'node:events', 'node:http', 
        'node:path', 'node:net', 'node:fs', 'node:zlib',
        'fs', 'path', 'url', 'crypto', 'http', 'stream', 'util',
        'querystring', 'async_hooks', 'buffer', 'string_decoder', 'events'
      ]
    },
    target: 'node16',
  },
  optimizeDeps: {
    exclude: ['url', 'path', 'fs'] // Exclude Node.js built-ins
  },
  resolve: {
    // Add any aliases if needed here
  },
});
