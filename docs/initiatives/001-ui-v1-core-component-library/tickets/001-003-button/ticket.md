# Ticket 001-003: button

_Initiative: docs/initiatives/001-ui-v1-core-component-library/initiative.md_
_Story: docs/initiatives/001-ui-v1-core-component-library/stories.md#001-003_

## Story

**As a** developer adding any interactive action to a page
**I need to** import Button from `@lucas/ui`
**So that** every action in my projects has a consistent visual style and
keyboard/focus behaviour that conforms to WCAG AA

## Scope

### In scope

- WCAG AA audit of the existing Button implementation
- Fix: Space key activation on anchor-button (`href` prop path)
- Fix: focus ring contrast token updated to meet WCAG 1.4.11 (≥ 3:1) on light background
- Fix: secondary variant border updated to `--color-border-strong` for WCAG 1.4.11 boundary contrast
- Storybook story coverage confirmed: variants, sizes, disabled state, loading state
- All existing axe tests pass after fixes

### Out of scope

- `IconButton` variant
- `ButtonGroup`
- Live region announcement when loading state activates (belongs in 001-007)
- Changes to any design token beyond the focus ring light-mode value

## Acceptance Criteria

### Scenario: Space key activates anchor-button

Given a Button rendered with an href prop
When a keyboard user focuses the button and presses Space
Then the onClick handler is called
And the page does not scroll

### Scenario: Focus ring visible on light background

Given any Button variant rendered on a light background
When the button receives keyboard focus
Then a focus ring is visible with at least 3:1 contrast ratio
against the adjacent background colour (WCAG 1.4.11)

### Scenario: Focus ring visible on dark background

Given any Button variant rendered on a dark background (data-theme="dark")
When the button receives keyboard focus
Then a focus ring is visible with at least 3:1 contrast ratio
against the adjacent background colour

### Scenario: Secondary button boundary contrast

Given a secondary Button on a standard page background (--color-bg-base)
When examined for contrast
Then the button border has at least 3:1 contrast ratio
against the surrounding background colour (WCAG 1.4.11)

### Scenario: aria-busy present when loading

Given a Button with isLoading={true}
When rendered
Then aria-busy="true" is present on the element
And the button is not interactive
And the accessible name matches the label text or explicit aria-label

### Scenario: aria-disabled present when disabled

Given a Button with disabled={true}
When rendered as either button or anchor
Then aria-disabled="true" is present on the element

### Scenario: Disabled anchor not keyboard reachable

Given a Button rendered with href and disabled={true}
When a keyboard user navigates with Tab
Then the element is not in the tab order
And the href attribute is absent

### Scenario: All variants pass automated axe audit

Given any Button variant in any meaningful state (default, disabled, loading)
When rendered in isolation
Then axe reports zero violations

## Test Scenarios

| Scenario                                             | Type       | Expected outcome                             |
| ---------------------------------------------------- | ---------- | -------------------------------------------- |
| Space key on anchor-button activates onClick         | Happy path | onClick fires; page does not scroll          |
| Enter key on anchor-button activates onClick         | Happy path | onClick fires (regression check)             |
| Focus ring contrast ≥ 3:1 on light background        | Manual     | All 5 variants pass WCAG 1.4.11              |
| Focus ring contrast ≥ 3:1 on dark background         | Manual     | All 5 variants pass WCAG 1.4.11              |
| Secondary button border contrast ≥ 3:1 on page bg    | Manual     | Border resolves to ≥ 3:1 against #ffffff     |
| All variants — default state — pass axe              | Happy path | Zero axe violations                          |
| All variants — disabled state — pass axe             | Happy path | Zero axe violations                          |
| Primary — loading state — passes axe                 | Happy path | Zero axe violations                          |
| aria-busy=true when isLoading                        | Happy path | Attribute present                            |
| aria-disabled=true when disabled (button and anchor) | Happy path | Attribute present on both paths              |
| Disabled anchor: href absent                         | Edge case  | Not keyboard reachable, href removed         |
| Loading: accessible name preserved from label text   | Edge case  | aria-label resolves to visible children text |
| Loading: explicit aria-label overrides children      | Edge case  | Explicit aria-label wins                     |
| sm size button meets 24×24 px minimum touch target   | Boundary   | Height ~37px satisfies WCAG 2.2 SC 2.5.8     |

## Design Reference

docs/initiatives/001-ui-v1-core-component-library/design/ux-flow.md — Button loading state edge case

## Technical Notes

**Architect:** Secondary variant border fix must be scoped to Button.module.css
only — do not change --color-border-default token, as blast radius would affect
all other components. Space key handler on anchor path must call
`e.preventDefault()` before invoking onClick to suppress default scroll.

**FE Dev:** Three targeted changes: (1) Add `onKeyDown` to the `<a>` render path
checking `e.key === ' '` — preventDefault + call handleClick. (2) Update
`--focus-ring-color` light token to a blue value with ≥ 3:1 contrast on #ffffff
(current #60a5fa ≈ 2.5:1 fails; target #2563eb ≈ 5.9:1 passes). (3) Change
secondary variant `.button--secondary` border-color from
`var(--color-border-default)` to `var(--color-border-strong)`. Disabled anchor
not being keyboard-reachable is intentional — `<a>` without `href` is not in
the tab order by default; this is the desired behaviour and should not be changed.

**BE Dev:** None.

**UX:** Disabled state using opacity: 0.45 as the non-colour indicator is
acceptable. Loading state preserving accessible name via aria-label/aria-busy
is correct — no UX changes needed. Disabled anchor not being keyboard-reachable
is intentional for this library's use case (short-lived disabled states).

## Open Questions

| Question                                                                                | Raised by | Resolution                                                                                                                                                |
| --------------------------------------------------------------------------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Is audit-only or audit+fix the correct scope?                                           | PO        | Resolved: audit + fix. WCAG failures found during audit are in scope for remediation in this ticket.                                                      |
| Should disabled buttons be keyboard-reachable (aria-disabled only, no native disabled)? | UX        | Resolved: intentional behaviour. Native disabled on button + aria-disabled is belt-and-suspenders. Disabled anchor not in tab order by default — correct. |
| Darken --color-border-default token vs scoped fix?                                      | ARCH      | Resolved: scoped fix in Button.module.css only. Token unchanged to avoid blast radius.                                                                    |
| Live region for loading state transition?                                               | QA        | Resolved: out of scope. Belongs in Notification (001-007).                                                                                                |

## Sign-off

- Approved by: Lucas
- Date: 2026-03-22
- Ready for: Planning
