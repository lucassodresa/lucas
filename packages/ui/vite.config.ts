import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, resolve } from 'path';
import { writeFileSync, mkdirSync } from 'node:fs';

// new Function prevents Rollup from statically analyzing and trying to bundle
// the import — we want a real Node.js ESM import, not a bundled one
const nodeImport = new Function('url', 'return import(url)') as (
  url: string,
) => Promise<Record<string, unknown>>;

const __dirname = dirname(fileURLToPath(import.meta.url));

function generateTokens(): Plugin {
  const renderVars = (tokens: Record<string, string>, indent = '  ') =>
    Object.entries(tokens)
      .map(([name, value]) => `${indent}--${name}: ${value};`)
      .join('\n');

  return {
    name: 'generate-tokens',
    async buildStart() {
      const tokensFile = resolve(__dirname, 'src/tokens/tokens.ts');

      // Tell Vite to watch tokens.ts — any change triggers a rebuild and re-runs this hook
      this.addWatchFile(tokensFile);

      // file:// URL bypasses Vite's resolver; ?v= busts the ESM module cache
      const { lightTokens, darkTokens } = (await nodeImport(
        pathToFileURL(tokensFile).href + `?v=${Date.now()}`,
      )) as {
        lightTokens: Record<string, string>;
        darkTokens: Record<string, string>;
      };

      const tokensDir = resolve(__dirname, 'dist/tokens');
      mkdirSync(tokensDir, { recursive: true });

      writeFileSync(
        resolve(tokensDir, 'tokens.css'),
        `@import '@fontsource-variable/inter';\n\n:root {\n${renderVars(lightTokens)}\n}\n`,
        'utf-8',
      );

      writeFileSync(
        resolve(tokensDir, 'tokens-dark.css'),
        `@media (prefers-color-scheme: dark) {\n  :root {\n${renderVars(darkTokens, '    ')}\n  }\n}\n\n[data-theme="dark"] {\n${renderVars(darkTokens)}\n}\n`,
        'utf-8',
      );
    },
  };
}

export default defineConfig({
  plugins: [react(), generateTokens()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
        },
      },
    },
  },
});
