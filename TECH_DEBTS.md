# Tech Debts — When to Evolve Each Tool

This file tracks deliberate trade-offs and known rough edges. When the pain threshold is reached,
address the debt. Don't fix preemptively.

## Build orchestration → Turborepo

**Current:** `npm run build --workspaces` runs packages serially, no caching.

**Upgrade when:** Root build takes >5 seconds, OR build failures occur because script ordering
is not guaranteed across workspaces.

**What to add:** `turbo.json` with `dependsOn` pipeline, `turbo` in root devDependencies.

---

## Versioning → Changesets

**Current:** Version bumps are manual edits to `package.json` files.

**Upgrade when:** You have >3 published/shared components and manual bumps feel error-prone.

**What to add:** `@changesets/cli`, `.changeset/` folder, `changeset` script in root.

---

## CI → GitHub Actions

**Current:** No automated checks on PRs.

**Upgrade when:** A second contributor joins the repo.

**What to add:** `.github/workflows/ci.yml` running lint, test, and build on every PR.

---

## Token watch mode → proper file watcher

**Current:** The `generateTokens` Vite plugin hooks into `closeBundle` to write `tokens.css` and
`tokens-dark.css` after each build. The `addWatchFile` call in `buildStart` tells Vite to watch
`tokens.ts`, so `vite build --watch` does re-run when the file changes — but the full bundle
rebuild is triggered, which is heavier than necessary. Additionally, `closeBundle` is not called
in Vite's dev server (only in build mode), so this approach doesn't compose well with a future
`vite dev` setup for the library.

**Known rough edge:** During `--watch` mode there can be a brief window where `dist/tokens.css`
doesn't exist between the `emptyOutDir` clear and the `closeBundle` write, which would break
any consumer running a concurrent dev server.

**Upgrade when:** Token editing frequency makes the full rebuild lag noticeable, OR you add a
Vite dev server to the library package.

**What to add:** Replace the Vite plugin with a dedicated `chokidar` watcher script
(`scripts/watch-tokens.ts`) that only regenerates the two CSS files on change — no full bundle
rebuild. Run it in parallel with `vite build --watch` via `concurrently` in the `dev` script.
This also unblocks moving `emptyOutDir: false` in the Vite lib config so the dist folder isn't
cleared between rebuilds.

---

## Visual regression → Chromatic

**Current:** No visual regression testing (Storybook will be added in Phase 4).

**Upgrade when:** Storybook is set up (Phase 4) and you want regression safety on PRs.

**What to add:** `CHROMATIC_PROJECT_TOKEN` GitHub secret, Chromatic CI step.
