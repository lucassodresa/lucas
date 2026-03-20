# Pain Points — When to Evolve Each Tool

This file tracks deliberate trade-offs made at project start. When the pain threshold is reached,
upgrade the tool. Don't upgrade preemptively.

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

## Visual regression → Chromatic

**Current:** No visual regression testing (Storybook will be added in Phase 4).

**Upgrade when:** Storybook is set up (Phase 4) and you want regression safety on PRs.

**What to add:** `CHROMATIC_PROJECT_TOKEN` GitHub secret, Chromatic CI step.
