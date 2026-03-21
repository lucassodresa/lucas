# Plan 001-002: typography

_Ticket: ./ticket.md_

## API Contract

N/A — component library, no backend.

## Frontend Plan

**Components to create:**

| Component | Responsibility                                                                                                            | Why new              |
| --------- | ------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `Heading` | Polymorphic heading. Props: `as` (h1–h6), `size` (xl\|l\|m\|s), `weight`, `color`, `truncate`, `className`. Default `h2`. | New per ticket scope |

**Components to modify:**

| Component      | Change                              | Blast radius                           |
| -------------- | ----------------------------------- | -------------------------------------- |
| `src/index.ts` | Export `Heading` and `HeadingProps` | Additive — no existing exports changed |

**State design:**

No state. Heading is purely presentational. All output is derived from props passed through to Text.

**Type design:**

```ts
export type HeadingElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type HeadingSize = 'xl' | 'l' | 'm' | 's';

export interface HeadingProps {
  as?: HeadingElement;
  size?: HeadingSize;
  weight?: TextWeight;
  color?: TextColor;
  truncate?: boolean;
  className?: string;
  children?: React.ReactNode;
}
```

`TextWeight` and `TextColor` are re-used from `Text` — no new prop concepts.

**Internal size mapping:**

| HeadingSize | Text size passed internally |
| ----------- | --------------------------- |
| `xl`        | `heading-xl`                |
| `l`         | `heading-l`                 |
| `m`         | `heading-m`                 |
| `s`         | `heading-s`                 |

**Implementation sequence:**

1. Write failing tests in `Heading/Heading.test.tsx` — all AC scenarios:
   - Renders `<h2>` by default
   - Default size applies `heading-l` (via Text's size prop — assert rendered tagName only; CSS is Storybook concern)
   - `size="xl"` passes correct Text size prop (`heading-xl`)
   - `size="l"` passes correct Text size prop (`heading-l`)
   - `size="m"` passes correct Text size prop (`heading-m`)
   - `size="s"` passes correct Text size prop (`heading-s`)
   - `as="h1"` renders `<h1>`
   - `as="h6"` renders `<h6>`
   - `as="h3" size="xl"` renders `<h3>` (semantic and visual are independent)
   - `weight="medium"` forwarded to Text
   - `color="muted"` forwarded to Text
   - `truncate={true}` forwarded to Text
   - Custom `className` forwarded
   - Ref forwarding — `ref.current` is heading element
   - Passes axe for all size/element combinations
2. Create `Heading/Heading.tsx` — wraps `Text` with restricted prop surface. Uses `React.forwardRef<HTMLHeadingElement, HeadingProps>`. Maps `size` to Text's internal heading size. Passes `as` directly to Text (Text already accepts h1–h6). No CSS module — all styles delegated to Text.
3. Create `Heading/index.ts` — barrel export for `Heading` and `HeadingProps`
4. Create `Heading/Heading.stories.tsx` — CSF3, stories cover: Default, Sizes, SemanticVsVisual, WeightOverride, ColorOverride, Truncate, Playground
5. Add Heading export to `src/index.ts`

**Test approach:**

- Component tests (RTL): assert `tagName` for element, pass Text's `size` prop by checking rendered output (e.g. render `size="xl"` and assert `<h2>` with the correct heading visible in the DOM — not CSS class names). Ref test uses `React.createRef`. Axe audit covers representative size/element combinations.
- No `userEvent` — Heading has no interactions.
- Coverage: 100% enforced by vitest thresholds.

**Risk areas:**

- Text must accept `h1`–`h6` as valid `as` values — confirmed from `Text.tsx` (`TextElement` includes all six). No change to Text needed.
- Text's `defaultElementForSize` maps heading sizes to h1–h4 automatically — Heading overrides this by always passing `as` explicitly (defaulting to `'h2'` when not provided).
- No CSS module means no new token usage risk.

## Backend Plan

N/A — component library.

## Rejected Approaches

| Approach                                            | Why rejected                                                                                                      |
| --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `variant="heading-1"` through `variant="heading-6"` | Couples semantic element to visual size — ticket AC explicitly requires them to be independent                    |
| Separate CSS module for Heading                     | Text already has all heading-\* size classes; duplicating CSS violates DRY with no benefit                        |
| Full `PolymorphicComponent<'h2', HeadingOwnProps>`  | Overkill — `as` is a fixed union to h1–h6, not an arbitrary element type; ref type is always `HTMLHeadingElement` |

## ADRs and Diagrams

None.

## Sign-off

- Approved by: Lucas
- Date: 2026-03-21
- Ready for: Implementation
