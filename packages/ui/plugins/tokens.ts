import { type Plugin, type ViteDevServer } from 'vite';
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, resolve } from 'path';
import { writeFileSync, mkdirSync } from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

const tokensFile = resolve(__dirname, '../src/tokens/tokens.ts');
const tokensOutDir = resolve(__dirname, '../dist/tokens');

const nodeImport = new Function('url', 'return import(url)') as (
  url: string,
) => Promise<Record<string, unknown>>;

const renderVars = (tokens: Record<string, string>, indent = '  ') =>
  Object.entries(tokens)
    .map(([name, value]) => `${indent}--${name}: ${value};`)
    .join('\n');

async function generateTokenFiles(): Promise<void> {
  const { lightTokens, darkTokens } = (await nodeImport(
    pathToFileURL(tokensFile).href + `?v=${Date.now()}`,
  )) as { lightTokens: Record<string, string>; darkTokens: Record<string, string> };

  mkdirSync(tokensOutDir, { recursive: true });

  writeFileSync(
    resolve(tokensOutDir, 'tokens.css'),
    `@import '@fontsource-variable/inter';\n\n:root {\n${renderVars(lightTokens)}\n}\n`,
    'utf-8',
  );

  writeFileSync(
    resolve(tokensOutDir, 'tokens-dark.css'),
    `@media (prefers-color-scheme: dark) {\n  :root {\n${renderVars(darkTokens, '    ')}\n  }\n}\n\n[data-theme="dark"] {\n${renderVars(darkTokens)}\n}\n`,
    'utf-8',
  );
}

export function tokensPlugin(): Plugin {
  return {
    name: 'generate-tokens',

    buildStart() {
      this.addWatchFile(tokensFile);
    },

    async configureServer() {
      await generateTokenFiles();
    },

    async closeBundle() {
      await generateTokenFiles();
    },

    async handleHotUpdate({ file, server }: { file: string; server: ViteDevServer }) {
      if (file !== tokensFile) return;

      await generateTokenFiles();
      server.ws.send({ type: 'full-reload' });
      return [];
    },
  };
}
