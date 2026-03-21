# Plan 001-001: layout-primitives

_Ticket: ./ticket.md_

## API Contract

N/A — component library, no backend.

## Frontend Plan

**Components to create:**

| Component   | Responsibility                                                                                  | Why new              |
| ----------- | ----------------------------------------------------------------------------------------------- | -------------------- |
| `Separator` | Visual/semantic divider. Props: `orientation`, `decorative`, `as`, `className`. Default `<hr>`. | New per ticket scope |

**Components to modify:**

| Component       | Change                                         | Blast radius                           |
| --------------- | ---------------------------------------------- | -------------------------------------- |
| `Flex.test.tsx` | Add `describe('accessibility')` block with axe | Test file only — zero runtime blast    |
| `src/index.ts`  | Export `Separator` and `SeparatorProps`        | Additive — no existing exports changed |

**State design:**

No state. Separator is purely presentational. All output is derived from props: `orientation` drives CSS class and `aria-orientation`; `decorative` drives `aria-hidden` and `role`.

**Implementation sequence:**

1. Write failing tests in `Separator/Separator.test.tsx` — all AC scenarios:
   - Renders `<hr>` by default
   - `aria-hidden="true"` when `decorative=true` (default)
   - No `aria-hidden` when `decorative=false`
   - `role="separator"` set when `decorative=false`
   - No `aria-orientation` when `orientation="horizontal"` (default)
   - `aria-orientation="vertical"` when `orientation="vertical"`
   - Renders `as="div"` element
   - Forwards custom `className` via clsx
   - Passes axe for all four variant combinations
2. Create `Separator/Separator.tsx` — polymorphic component following Box/Flex/Text pattern. Resolves props to ARIA attrs and CSS classes. Sets `role="separator"` when `decorative=false` (idempotent on `<hr>`).
3. Create `Separator/Separator.module.css` — resets `<hr>` UA defaults (margin: 0, border: none), then applies orientation classes:
   - `.horizontal` → `width: 100%; border-top: 1px solid var(--color-border-default)`
   - `.vertical` → `height: 100%; border-left: 1px solid var(--color-border-default)`
4. Create `Separator/index.ts` — barrel export for `Separator` and `SeparatorProps`
5. Create `Separator/Separator.stories.tsx` — CSF3, stories cover: Default, Vertical, Decorative vs Semantic, AsDiv, Playground
6. Add `describe('accessibility')` to `Flex/Flex.test.tsx` — axe tests for default div, as="nav" with aria-label, as="ul" with li child
7. Add Separator export to `src/index.ts`

**Test approach:**

- Component tests (RTL): DOM assertions on tagName, ARIA attributes (`aria-hidden`, `aria-orientation`, `role`), className forwarding. Uses `data-testid` for element access consistent with existing tests.
- Axe audit: `axe(container)` for horizontal/decorative, vertical/decorative, horizontal/semantic, vertical/semantic variants.
- No `userEvent` — Separator has no interactions.
- Coverage: 100% enforced by vitest thresholds. No branches will be uncovered given the test matrix above.

**Risk areas:**

- `<hr>` UA stylesheet reset is critical — must explicitly clear margin and border before setting our values. Storybook provides visual verification.
- Vertical separator requires a container with defined height — documented in stories, not a component concern.
- `1px` used directly in CSS module for border-width, consistent with existing `Button.module.css` precedent.

## Backend Plan

N/A — component library.

## Rejected Approaches

| Approach                                       | Why rejected                                                                                                                                   |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Set `role="separator"` only when `as` ≠ `"hr"` | Requires inspecting `as` prop; `role` is idempotent on `<hr>` — always setting it when `decorative=false` is simpler                           |
| Add `--border-width-default` token             | Button already uses `1px` directly; ticket says no new token categories; adding one would be inconsistent with the existing codebase precedent |
| CSS custom property for orientation            | Adds runtime complexity for a purely static layout concern; class-based toggle is cleaner                                                      |

## ADRs and Diagrams

None.

## Sign-off

- Approved by: Lucas
- Date: 2026-03-21
- Ready for: Implementation
