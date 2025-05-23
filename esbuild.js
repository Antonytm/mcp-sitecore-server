import * as esbuild from 'esbuild';
import { existsSync, mkdirSync } from 'fs';
import { dirname } from 'path';

// Create dist directory if it doesn't exist
const distDir = './dist';
if (!existsSync(distDir)){
  mkdirSync(distDir, { recursive: true });
}

const watch = process.argv.includes('--watch');

const defaultOptions = {
  entryPoints: ['./src/index.ts'],
  bundle: true,
  platform: 'node',
  target: 'node16',
  outfile: './dist/bundle.js',  format: 'esm',
  minify: false,
  sourcemap: true,
};

if (watch) {
  // Watch mode
  const context = await esbuild.context(defaultOptions);
  await context.watch();
  console.log('Watching for changes...');
} else {
  // Build once
  const result = await esbuild.build(defaultOptions);
  console.log('Build complete:', result);
}
