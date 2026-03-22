# Plan 001-003: button

_Ticket: ./ticket.md_

## API Contract

None — this ticket is entirely client-side.

## Frontend Plan

**Components to create:**

None.

**Components to modify:**

| Component                                 | Change                                                                | Blast radius                                                                      |
| ----------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `src/tokens/tokens.ts`                    | 3 token corrections (focus ring + border-strong in both modes)        | Low — no other components built yet; all future components inherit correct values |
| `src/components/Button/Button.module.css` | Secondary variant border-color → `--color-border-strong`              | Button only                                                                       |
| `src/components/Button/Button.tsx`        | Add `onKeyDown` handler to `<a>` render path for Space key activation | Button only                                                                       |
| `src/components/Button/Button.test.tsx`   | Add 1 test: Space key activates onClick on href button                | Button only                                                                       |

**State design:**

No state changes. All fixes are to CSS values or event handling.

**Implementation sequence:**

1. Edit `src/tokens/tokens.ts`:
   - `lightTokens['focus-ring-color']`: `ref('color-blue-400')` → `ref('color-blue-600')`
   - `lightTokens['color-border-strong']`: `ref('color-neutral-400')` → `ref('color-neutral-500')`
   - `darkTokens['color-border-strong']`: `ref('color-neutral-600')` → `ref('color-neutral-500')`

2. Run `npm run build -w @lucas/ui` to regenerate `dist/tokens/tokens.css`
   and `dist/tokens/tokens-dark.css` — required before any visual verification.

3. Edit `src/components/Button/Button.module.css`:
   - `.button--secondary` `border-color`: `var(--color-border-default)` →
     `var(--color-border-strong)`

4. Edit `src/components/Button/Button.tsx`:
   - Add `handleKeyDown` callback on the `<a>` render path:
     ```ts
     const handleKeyDown = useCallback(
       (e: React.KeyboardEvent<HTMLAnchorElement>) => {
         if (e.key === ' ') {
           e.preventDefault();
           // Space activates role=button anchors per ARIA spec.
           // Cast is required: KeyboardEvent is not a MouseEvent.
           // onClick consumers must not rely on mouse-coordinate properties.
           onClick?.(e as unknown as React.MouseEvent<HTMLAnchorElement>);
         }
       },
       [onClick],
     );
     ```
   - Add `onKeyDown={handleKeyDown}` prop to the `<a>` element.

5. Edit `src/components/Button/Button.test.tsx`:
   - Add to the anchor-button describe block:
     ```ts
     it('Space key activates onClick on an href button', async () => {
       const user = userEvent.setup();
       const onClick = vi.fn();
       render(<Button href="/next" onClick={onClick}>Continue</Button>);
       await user.tab();
       await user.keyboard(' ');
       expect(onClick).toHaveBeenCalledTimes(1);
     });
     ```

6. Run `npm run typecheck && npm test -w @lucas/ui` — all tests must pass.

7. **Manual verification in Storybook** (after step 2 build):
   - Under light theme: Tab to each variant, verify focus ring is visibly
     distinct against white background.
   - Under dark theme: Tab to each variant, verify focus ring is visibly
     distinct against dark background.
   - Under light theme: verify secondary button has a visible border against
     the white canvas.

**Test approach:**

Existing axe tests cover: all 5 variants (default), disabled state, loading
state, anchor button, disabled anchor, icon-only. These are unchanged.

New test added: Space key keyboard activation for href button.

Manual test scenarios (non-automatable via jsdom, documented in ticket.md):

- Focus ring contrast ≥ 3:1 in both themes — verified visually in Storybook
- Secondary border contrast ≥ 3:1 in light theme — verified visually in Storybook

**Risk areas:**

- `onKeyDown` cast from `KeyboardEvent` to `MouseEvent` is pragmatic; onClick
  consumers must not use mouse-coordinate properties (`clientX`, `clientY`, etc.)
- Token changes require a manual `npm run build` before visual changes appear
  in Storybook; automated tests use jsdom and do not resolve CSS custom properties

## Backend Plan

None.

## Rejected Approaches

| Approach                                                                                             | Why rejected                                                                                                                                       |
| ---------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Scoped CSS override using a non-border token (e.g. `--color-text-muted`) for secondary button border | Semantically wrong — text tokens carry different meaning; future developers would find it confusing                                                |
| Per-component CSS override for secondary button border without fixing the token                      | Deferred the real problem; every future component with a visible border would need the same workaround                                             |
| Using `--color-border-strong` as-is (neutral-400 in light mode)                                      | #94a3b8 achieves only 2.49:1 on white — below the 3:1 WCAG 1.4.11 minimum. The refinement assumption was wrong; the token itself needed correction |
| Keeping `--focus-ring-color` as `--color-blue-400` and overriding per-component                      | #60a5fa achieves ~2.5:1 on white — below 3:1. Token-level fix is correct and benefits all future components                                        |

## ADRs and Diagrams

None required.

## Sign-off

- Approved by: Lucas
- Date: 2026-03-22
- Ready for: Implementation
