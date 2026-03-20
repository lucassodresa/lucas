# Component Library — Phase Plan

## Conversation context

This plan was built from a design conversation with the following decisions already made:

| Decision            | Choice                                                | Rationale                                 |
| ------------------- | ----------------------------------------------------- | ----------------------------------------- |
| Framework           | React                                                 | Primary target                            |
| Styling             | CSS Modules                                           | No runtime cost, no consumer dependency   |
| Monorepo            | npm workspaces                                        | Start simple, feel the pain, evolve later |
| Testing — behaviour | Vitest + React Testing Library + jest-axe             | Survives future refactors                 |
| Testing — visual    | Storybook 8 + Chromatic (Phase 2)                     | Visual regression safety net              |
| Distribution        | Local / monorepo only                                 | No npm publish yet                        |
| Team                | 2–5 people, internal                                  | Needs contribution discipline             |
| Tokens              | CSS custom properties on :root                        | Single source of truth                    |
| Future direction    | Extract ui-core (headless logic) once tests are green | Phased, pain-driven                       |
| Versioning          | Manual now → Changesets when it hurts                 | Deliberate evolution                      |
| Build orchestration | None now → Turborepo when builds feel slow            | Deliberate evolution                      |

## How to use this file

- Work through phases in order. Do not skip ahead.
- At the start of EACH phase, read the **Clarifying questions** block and ask
  the user every question before writing a single line of code.
- Collect all answers, confirm your understanding, then execute.
- Mark each phase complete in the checklist in CLAUDE.md before moving on.

---

## Phase 1 — Minimal workspace scaffold

**Goal:** The lightest possible npm workspaces monorepo. No Turborepo, no CI,
no Changesets. Just enough to start building and feel what's missing.

### Clarifying questions — ask ALL of these before writing any code

1. **Package scope** — what npm scope should packages use?
   e.g. `@acme/ui`, `@ds/ui`, `@myorg/ui`. If you don't have one yet, `@ui` works locally.

2. **Node version** — what Node version are you running? (`node -v`)
   This sets the `engines` field and the `.nvmrc`.

3. **Package manager** — confirm you want plain `npm` workspaces (not pnpm or yarn).
   npm ≥ 7 is required. Run `npm -v` and share the output.

4. **Playground app** — do you want a `apps/playground` Vite + React app wired up
   from day one so you can see your components render outside Storybook?
   Yes / No.

5. **Git** — should I initialise a git repo and create an initial commit?
   Yes / No.

6. **Editor** — are you using VS Code? If yes, should I add a `.vscode/` folder
   with recommended extensions and settings (ESLint, Prettier, CSS Modules intellisense)?

### What gets built

```
/
├── package.json              ← root, private: true, workspaces config
├── .nvmrc
├── .gitignore
├── PAIN_POINTS.md            ← documents when to evolve each tool
├── packages/
│   └── ui/
│       ├── src/
│       │   └── index.ts
│       ├── package.json
│       ├── tsconfig.json
│       └── vite.config.ts
└── apps/
    └── playground/           ← only if answered Yes above
```

### Pain points to document

- `npm run build --workspaces` runs serially, no caching → **add Turborepo** when >5s
- Script order is not guaranteed → **add Turborepo `dependsOn`** when builds fail due to ordering
- Version bumps are manual → **add Changesets** when you have >3 components
- No CI → **add GitHub Actions** before inviting a second contributor

---

## Phase 2 — Design token system

**Goal:** All design decisions live in CSS custom properties. No raw values
in component CSS Modules ever.

### Clarifying questions — ask ALL of these before writing any code

1. **Brand colors** — do you have existing brand colors (hex values) to use,
   or should I generate a neutral, professional palette you can customise later?

2. **Dark mode** — do you want dark mode support from day one?
   Options:
   - `@media (prefers-color-scheme: dark)` only — automatic, no toggle
   - `[data-theme="dark"]` attribute — requires a toggle but gives user control
   - Both — recommended, slightly more CSS

3. **Typography scale** — do you have a preferred base font size and type scale,
   or should I use a standard modular scale (base 16px, ratio 1.25)?

4. **Spacing scale** — base-4 (4, 8, 12, 16, 24, 32, 48, 64) or base-8 (8, 16, 24, 32…)?
   Base-4 is more granular, base-8 is simpler.

5. **Custom font** — do you want to load a custom web font (Google Fonts, local file),
   or use a system font stack for now?

6. **Token naming style** — semantic names (`--color-primary`) or scale names
   (`--color-blue-500`)? Semantic is easier to consume; scale gives more flexibility.
   Recommended: both — scale tokens as primitives, semantic tokens as aliases.

### What gets built

```
packages/ui/src/tokens/
├── tokens.css          ← all :root custom properties
├── tokens-dark.css     ← dark mode overrides
└── tokens.ts           ← typed TS constants (for tests + Storybook controls)
```

---

## Phase 3 — Button (first component, full stack)

**Goal:** One complete component — markup, styles, behaviour tests, stories.
This is the template every future component follows.

### Clarifying questions — ask ALL of these before writing any code

1. **Variants** — which visual variants do you need?
   Standard set: `primary | secondary | ghost | danger`
   Remove any you don't need, add any you do.

2. **Sizes** — `sm | md | lg` or a different set?

3. **Icon support** — should Button accept `leftIcon` and `rightIcon` slots?
   These are `React.ReactNode` props. Yes / No.

4. **Loading state** — when `isLoading` is true:
   - Show a spinner and hide the label (label becomes aria-label)
   - Show a spinner alongside the label
     Which do you prefer?

5. **RTL test depth** — besides the standard tests (renders, click, disabled,
   loading, axe), are there any specific behaviours you want tested?

6. **Story structure** — should each story be a single component instance,
   or a grid showing all variants side-by-side?
   Single = cleaner visual diff. Grid = easier to review at a glance.

### What gets built

```
packages/ui/src/components/Button/
├── Button.tsx
├── Button.module.css
├── Button.test.tsx      ← RTL: behaviour + axe, NO implementation details
├── Button.stories.tsx   ← deterministic stories, stable visual targets
└── index.ts
```

---

## Phase 4 — Storybook + visual regression baseline

**Goal:** Storybook running, all Button stories rendering correctly, Chromatic
baseline established. Every future component gets stories before merge.

### Clarifying questions — ask ALL of these before writing any code

1. **Chromatic account** — do you have a Chromatic account and project token?
   If not, I'll set everything up locally and leave a `CHROMATIC_PROJECT_TOKEN`
   placeholder for when you're ready.

2. **Storybook port** — default is 6006. Any conflict?

3. **Story format** — CSF3 (recommended, cleaner) or CSF2 (older style)?

4. **Viewport presets** — which viewports should be tested visually?
   Suggested: Mobile 375px, Tablet 768px, Desktop 1280px.
   Adjust or add as needed.

5. **Dark mode story** — should every component have a dedicated dark mode story,
   or should dark mode be a Storybook global toggle applied to all stories?
   Global toggle = less story files. Dedicated story = easier to spot regressions.

6. **GitHub Actions** — should I add a `.github/workflows/chromatic.yml` that
   runs visual tests on every PR? Requires the Chromatic token as a GitHub secret.
   Yes / No (set up later).

### What gets built

```
packages/ui/
├── .storybook/
│   ├── main.ts
│   └── preview.ts       ← imports tokens.css globally
└── src/components/Button/
    └── Button.stories.tsx   ← updated with all viewport + dark mode stories
```

### Visual regression contract

Every story must be:

- **Deterministic** — same output every render (no Date.now(), no Math.random())
- **Self-contained** — no external data fetching
- **Static** — animations disabled or set to `prefers-reduced-motion: reduce`
- **Named clearly** — `Primary/Default`, `Primary/Loading`, `Secondary/Disabled`

---

## Phase 5 — Core component set

**Goal:** Build the remaining primitive and form components, each following
the same pattern established in Phase 3.

### Clarifying questions — ask ALL of these before writing any code

1. **Component list** — which components do you need first?
   Below is a suggested priority order. Remove what you don't need,
   reorder as fits your product.

   Tier 1 — layout primitives (build these first, used by everything else):
   - [ ] Box (polymorphic div)
   - [ ] Text (polymorphic p/span/h1…)
   - [ ] Flex (flex box props)

   Tier 2 — form controls:
   - [ ] Input
   - [ ] Textarea
   - [ ] Checkbox
   - [ ] Select
   - [ ] FormField (Label + error + helper wrapper)

   Tier 3 — feedback & overlay:
   - [ ] Badge
   - [ ] Modal
   - [ ] Tooltip

2. **Build order** — should I build them all at once or one at a time
   so you can review each before the next?

3. **Polymorphic Box** — the `as` prop lets `<Box as="section">` render a `<section>`.
   This requires a generic TypeScript type. Do you want this complexity now,
   or a simpler `<div>`-only Box you can make polymorphic later?

4. **Form validation** — should form components integrate with React Hook Form
   via `register()` props, or stay uncontrolled-first with simple `onChange`?

5. **Modal focus trap** — implement with a custom `useFocusTrap` hook (no dependencies)
   or use `focus-trap-react` package?

6. **Tooltip positioning** — use `@floating-ui/react` for smart positioning,
   or a simple CSS-only tooltip for now?

### What gets built

One folder per component following the Button template:

```
ComponentName/
├── ComponentName.tsx
├── ComponentName.module.css
├── ComponentName.test.tsx
├── ComponentName.stories.tsx
└── index.ts
```

Plus an updated `packages/ui/src/index.ts` barrel export.

---

## Phase 6 — Accessibility hardening

**Goal:** Every interactive component meets WCAG AA. Automated checks run in CI.

### Clarifying questions — ask ALL of these before writing any code

1. **WCAG level** — AA (standard) or AAA (strict)?
   AA is the industry standard. AAA is very hard to achieve in all contexts.

2. **axe integration** — jest-axe runs in unit tests already. Should I also
   add `@storybook/addon-a11y` so axe runs visually in Storybook per story?
   Yes / No.

3. **Keyboard nav audit** — should I produce a markdown table documenting
   the expected keyboard behaviour for each interactive component?
   (Useful as a review checklist and onboarding doc.)

4. **Focus style** — do you want a custom focus ring style (matching your tokens)
   or the browser default (`:focus-visible` only)?

5. **Colour contrast** — should I audit all token colour pairs against WCAG AA
   contrast ratios and flag any failures?

### What gets built

- Updated components with ARIA fixes and keyboard nav
- `ACCESSIBILITY.md` — keyboard nav table + ARIA pattern references
- (Optional) contrast audit report in `packages/ui/docs/contrast-audit.md`
