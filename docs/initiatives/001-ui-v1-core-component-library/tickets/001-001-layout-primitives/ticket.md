# Ticket 001-001: layout-primitives

_Initiative: docs/initiatives/001-ui-v1-core-component-library/initiative.md_
_Story: docs/initiatives/001-ui-v1-core-component-library/stories.md#001-001_

## Story

**As a** developer starting a new project
**I need to** import Box, Flex, and Separator from `@lucas/ui`
**So that** I can scaffold page structure and divide content regions without
writing any custom layout CSS

## Scope

### In scope

- `Box` — implementation exists; WCAG AA audit via Storybook a11y addon only
- `Flex` — implementation exists; WCAG AA audit via Storybook a11y addon only
- `Separator` — new implementation: horizontal/vertical visual divider with
  `decorative` and `orientation` props; Storybook story; WCAG AA audit
- Export `Separator` from the package barrel file

### Out of scope

- Grid component
- Any layout prop that cannot be mapped to an existing token in `tokens.css`
- `Separator` height/width control via props — length is determined by the
  consumer's container; the component fills it

## Acceptance Criteria

### Scenario: Separator renders horizontally by default

Given a Separator with no props
When it is rendered
Then it renders an `<hr>` element
And it fills the full width of its container
And `aria-orientation` is not set (horizontal is the `<hr>` default)

### Scenario: Separator renders vertically when orientation is set

Given a Separator with `orientation="vertical"`
When it is rendered
Then `aria-orientation="vertical"` is present on the element
And it fills the full height of its container

### Scenario: Decorative Separator is hidden from the accessibility tree

Given a Separator with `decorative={true}` (the default)
When it is rendered
Then `aria-hidden="true"` is present on the element

### Scenario: Non-decorative Separator is visible to screen readers

Given a Separator with `decorative={false}`
When it is rendered
Then `aria-hidden` is not set
And the element retains its native `role="separator"`

### Scenario: Separator is polymorphic

Given a Separator with `as="div"`
When it is rendered
Then it renders as a `<div>` element instead of `<hr>`

### Scenario: Box renders as the correct element

Given a Box with `as="main"`
When it is rendered
Then it renders as a `<main>` landmark element
And all spacing props are reflected as token-mapped CSS classes

### Scenario: Box WCAG AA audit passes

Given the Box Storybook stories
When the a11y addon runs against all stories
Then zero violations are reported

### Scenario: Flex WCAG AA audit passes

Given the Flex Storybook stories
When the a11y addon runs against all stories
Then zero violations are reported

### Scenario: Separator WCAG AA audit passes

Given the Separator Storybook stories
When the a11y addon runs against all stories
Then zero violations are reported

## Test Scenarios

| Scenario                                       | Type       | Expected outcome                                                     |
| ---------------------------------------------- | ---------- | -------------------------------------------------------------------- |
| Separator default render                       | Happy path | Renders `<hr>`, full width, no aria-orientation                      |
| Separator orientation="vertical"               | Happy path | aria-orientation="vertical", full height of container                |
| Separator decorative=true (default)            | Happy path | aria-hidden="true" present                                           |
| Separator decorative=false                     | Happy path | aria-hidden absent, role="separator" retained                        |
| Separator as="div"                             | Happy path | Renders as `<div>`                                                   |
| Separator custom className                     | Happy path | className merged with component classes via clsx                     |
| Box as="main" renders correct landmark         | Happy path | Renders `<main>` element                                             |
| Box with all spacing props                     | Happy path | All token-mapped spacing classes applied correctly                   |
| Box as="button" — interactive semantics intact | Edge case  | Button role and keyboard behaviour not broken by Box class injection |
| Box a11y addon — all stories                   | Happy path | Zero violations                                                      |
| Flex a11y addon — all stories                  | Happy path | Zero violations                                                      |
| Separator a11y addon — all stories             | Happy path | Zero violations                                                      |

## Design Reference

`docs/initiatives/001-ui-v1-core-component-library/design/ux-flow.md` — Step 1
(layout primitives are the scaffolding every page starts with)

## Technical Notes

**Architect:** Separator must follow the polymorphic pattern already established
in Box, Flex, and Text. Default element is `<hr>` for native `role="separator"`
semantics. No new token categories needed — use existing border color and
thickness tokens from `tokens.css`. No state, no event handling.

**FE Dev:** Separator prop surface: `orientation` ("horizontal" | "vertical",
default "horizontal"), `decorative` (boolean, default `true`), `as`, `className`.
Vertical Separator defaults to `height: 100%` — container must have a defined
height. Horizontal defaults to `width: 100%`. Box prop surface confirmed as
SpacingProps only. Flex prop surface confirmed as flexbox props + SpacingProps.

**BE Dev:** N/A — component library, no backend.

**UX:** Default `decorative={true}` is the correct safe default — developers
must explicitly opt in to the semantic separator variant. This prevents
accidental duplication of visual structure in the accessibility tree.

## Open Questions

None — all questions resolved during Refinement.

## Sign-off

- Approved by: Lucas
- Date: 2026-03-21
- Ready for: Planning
