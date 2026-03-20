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

## ~~Token watch mode~~ ✅ Resolved

Token generation is now handled by `packages/ui/plugins/tokens.ts`, a shared Vite plugin
used by both `vite.config.ts` and `.storybook/main.ts` (via `viteFinal`).

- `configureServer` — generates tokens at dev-server startup (Storybook, future vite dev)
- `closeBundle` — generates tokens after build (handles `emptyOutDir` timing)
- `handleHotUpdate` — regenerates + triggers full-reload when `tokens.ts` changes in dev

`vite build --watch` still triggers a full bundle rebuild on token changes (via `addWatchFile`).
This is acceptable for now; revisit if rebuild lag becomes noticeable.

---

## ~~Storybook token dependency~~ ✅ Resolved

`npm run storybook` now works on a completely fresh checkout with no prior build.
The `tokensPlugin` injected via `viteFinal` runs `configureServer` before the Storybook
dev server accepts connections, writing `dist/tokens/tokens.css` unconditionally at startup.

---

## Visual regression → Chromatic

**Current:** No visual regression testing (Storybook will be added in Phase 4).

**Upgrade when:** Storybook is set up (Phase 4) and you want regression safety on PRs.

**What to add:** `CHROMATIC_PROJECT_TOKEN` GitHub secret, Chromatic CI step.
