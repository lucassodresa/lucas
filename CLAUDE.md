# Component Library — Claude Code Instructions

## Progress checklist

- [x] Phase 1 — Minimal workspace scaffold
- [x] Phase 2 — Design token system
- [x] Phase 3 — Button (first component, full stack)
- [ ] Phase 4 — Storybook + visual regression baseline
- [ ] Phase 5 — Core component set
- [ ] Phase 6 — Accessibility hardening

Full phase specs and clarifying questions are in [PLAN.md](./PLAN.md).
Read it at the start of each phase before writing any code.

---

## Invariants — never violate these

**Token invariant:** No raw hex, px, or rem values in component CSS Modules.
All values come from CSS custom properties defined in `tokens.css`.

**Test contract invariant:** RTL tests assert only on DOM, ARIA, and events.
Never on internal state, hook names, or CSS class names (unless the class name is the public API).

**Story determinism invariant:** Stories must produce identical output on every
render. No `Date.now()`, `Math.random()`, or live data fetching.

**Coverage invariant:** 100% coverage is enforced via `vitest.config.ts` thresholds.
Exclusions: `index.ts` files, `*.stories.tsx`, `src/tokens/`.

---

## Component conventions

- No comments — express intent through descriptive variable names and test descriptions
- No inline ternaries in JSX props — extract to named variables before the return
- Extract repeated JSX patterns into internal components
- Use `clsx` for class composition, never manual array + filter + join
- Use TypeScript discriminated unions to enforce prop constraints at compile time instead of runtime warnings
- Extract stateful logic into named hooks
- Remove dead code that cannot be reached by real user interaction (if validated if test)

---

## Testing conventions

- Use `userEvent` over `fireEvent` — always
- `describe` blocks organise tests — no separator comments needed
- Use `vi.useFakeTimers({ shouldAdvanceTime: true })` with `userEvent.setup({ advanceTimers: vi.advanceTimersByTime })` when testing timer-based behaviour

---

## Monorepo conventions

- Workspace package `"types"` fields point at `./src/index.ts` — no build step needed for type resolution in this local-only monorepo
- Run `npm run typecheck` and `npm test` in `packages/ui` after any change to verify nothing is broken
