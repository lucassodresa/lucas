# Ticket 001-002: typography

_Initiative: docs/initiatives/001-ui-v1-core-component-library/initiative.md_
_Story: docs/initiatives/001-ui-v1-core-component-library/stories.md#001-002_

## Story

**As a** developer building any page or component
**I need to** import Text and Heading from `@lucas/ui`
**So that** all typographic elements across my projects use the same scale,
weight, and token-driven styles without custom CSS

## Scope

### In scope

- `Text` — implementation exists; WCAG AA audit via existing axe tests only;
  no code changes expected
- `Heading` — new polymorphic heading component: `as` restricted to `h1`–`h6`;
  `size` variants "xl" | "l" | "m" | "s" independent of semantic element;
  `weight`, `color`, `truncate`, `className` props matching Text's API;
  Storybook story; WCAG AA audit
- Export `Heading` from the package barrel file

### Out of scope

- `Label` component (scoped to form system in 001-004)
- `Code` or `Blockquote` typographic variants
- Responsive font sizes

## Acceptance Criteria

### Scenario: Heading renders the default element and size

Given a Heading with no props
When it is rendered
Then it renders as an `<h2>` element
And it applies the `heading-l` size styles from the type scale

### Scenario: Heading size is independent of semantic element

Given a Heading with `as="h2"` and `size="xl"`
When it is rendered
Then it renders as an `<h2>` element
And it applies the `heading-xl` visual size (matching `--text-size-heading-xl`)

### Scenario: Heading renders each size variant

Given a Heading with `size="xl"` | `"l"` | `"m"` | `"s"`
When it is rendered
Then it applies the corresponding type scale token:
`xl` → `--text-size-heading-xl`
`l` → `--text-size-heading-l`
`m` → `--text-size-heading-m`
`s` → `--text-size-heading-s`

### Scenario: Heading renders each semantic element

Given a Heading with `as="h1"` | `"h2"` | `"h3"` | `"h4"` | `"h5"` | `"h6"`
When it is rendered
Then the rendered element tag matches the `as` value

### Scenario: Heading weight override

Given a Heading with `weight="medium"`
When it is rendered
Then the font-weight applied is `--font-weight-medium`
And it overrides the default heading weight

### Scenario: Heading color override

Given a Heading with `color="muted"`
When it is rendered
Then the color applied is `--text-color-muted`

### Scenario: Heading truncate

Given a Heading with `truncate={true}`
When it is rendered
Then the element has `overflow: hidden` and `text-overflow: ellipsis` applied

### Scenario: Heading custom className

Given a Heading with a custom `className`
When it is rendered
Then the className is merged with component classes

### Scenario: Text WCAG AA audit passes

Given the Text Storybook stories
When the a11y addon runs against all stories
Then zero violations are reported

### Scenario: Heading WCAG AA audit passes

Given the Heading Storybook stories
When the a11y addon runs against all stories
Then zero violations are reported

## Test Scenarios

| Scenario                                      | Type       | Expected outcome                               |
| --------------------------------------------- | ---------- | ---------------------------------------------- |
| Heading default render                        | Happy path | Renders `<h2>`, applies heading-l styles       |
| Heading size="xl" renders correct scale       | Happy path | `--text-size-heading-xl` token applied         |
| Heading size="l" renders correct scale        | Happy path | `--text-size-heading-l` token applied          |
| Heading size="m" renders correct scale        | Happy path | `--text-size-heading-m` token applied          |
| Heading size="s" renders correct scale        | Happy path | `--text-size-heading-s` token applied          |
| Heading as="h1" renders correct element       | Happy path | Renders `<h1>` regardless of size              |
| Heading as="h6" renders correct element       | Happy path | Renders `<h6>` regardless of size              |
| Heading size="xl" as="h3" — visual ≠ semantic | Happy path | `<h3>` element with xl visual size             |
| Heading weight="medium" override              | Happy path | font-weight overridden to medium               |
| Heading color="muted"                         | Happy path | color overridden to muted token                |
| Heading truncate={true}                       | Happy path | overflow hidden + text-overflow ellipsis       |
| Heading custom className                      | Happy path | className merged via clsx                      |
| Heading forwards ref                          | Happy path | ref.current set to heading element after mount |
| Text a11y — all stories                       | Happy path | Zero axe violations                            |
| Heading a11y — all size/element combinations  | Happy path | Zero axe violations                            |

## Design Reference

`docs/initiatives/001-ui-v1-core-component-library/design/ux-flow.md` — Step 1
(developer imports layout primitives and typography to scaffold page structure)

## Technical Notes

**Architect:** Heading composes `Text` internally with a restricted prop
surface: `as` narrowed to `h1`–`h6`, `size` mapped from "xl"|"l"|"m"|"s" to
Text's "heading-xl"|"heading-l"|"heading-m"|"heading-s" internally. This
avoids duplicating CSS and keeps both components visually consistent. Default
element: `h2`. Default size: `"l"`.

**FE Dev:** Heading's `size` type is `"xl" | "l" | "m" | "s"`. The `as` type
is restricted to `"h1" | "h2" | "h3" | "h4" | "h5" | "h6"`. Props `weight`,
`color`, `truncate`, `className` match Text's API exactly — no new prop
concepts. Heading does not accept `children` coercion; renders children as-is.

**BE Dev:** N/A — component library.

**UX:** Consistent prop API between Text and Heading is essential — developers
use both side by side. Size is visual, element is semantic: `<Heading as="h3"
size="xl">` is valid and expected.

## Open Questions

None — all questions resolved during Refinement.

## Sign-off

- Approved by: Lucas
- Date: 2026-03-21
- Ready for: Planning
