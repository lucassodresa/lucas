# Ticket 001-004: form-controls

_Initiative: docs/initiatives/001-ui-v1-core-component-library/initiative.md_
_Story: docs/initiatives/001-ui-v1-core-component-library/stories.md#001-004_

## Story

**As a** developer building any form
**I need to** import Input, Password, Checkbox, Select, and Switch from `@lucas/ui`
**So that** all form controls have consistent visual style, work with
`react-hook-form` without custom wiring, and are accessible out of the box

## Scope

### In scope

- `Input` — text input; error prop (boolean) for error state styling; disabled prop for disabled state
- `Password` — Input variant with show/hide toggle; toggle must be keyboard accessible; showLabel and hideLabel are required props (no default — caller owns translation)
- `Checkbox` — controlled checkbox with checked, onChange, ref, disabled; indeterminate prop supported
- `Select` — native `<select>` wrapper; error prop for error state styling; disabled prop; children-only (no placeholder prop — consumer passes options)
- `Switch` — toggle built on hidden `<input type="checkbox">`; checked, onChange, ref, disabled; no label prop (label is always external)
- All five must forward ref and accept controlled props compatible with RHF's register return: `{ name, ref, onChange, onBlur }`
- Token-driven visual states: default, focus, error, disabled for all five
- Storybook stories and WCAG AA audit for all five

### Out of scope

- Label as a standalone component (Field's responsibility in 001-005)
- Custom dropdown / combobox
- Multi-select
- Radix UI or any headless component library — native HTML elements only
- Placeholder prop on Select

## Acceptance Criteria

### Scenario: Input renders and accepts controlled value

Given Input is rendered with a value prop and an onChange handler
When the user types in the input
Then onChange fires with the new value and the input reflects it

### Scenario: Input shows error state

Given Input is rendered with `error={true}`
When the component mounts
Then the input has error styling (border and focus ring from error tokens)

### Scenario: Input clears error state

Given Input is rendered with `error={true}`
When error prop changes to false
Then error styling is removed and default styling is restored

### Scenario: Input disabled state

Given Input is rendered with `disabled={true}`
When the component mounts
Then the input is non-interactive, visually disabled via tokens, and the native disabled attribute is present

### Scenario: Password toggles visibility

Given Password is rendered with type="password" (default)
When the user clicks the show/hide toggle button
Then the input type changes to "text" and the password text is visible

### Scenario: Password toggle preserves focus

Given Password is rendered and the input has focus
When the user clicks the show/hide toggle
Then focus returns to the input after the toggle completes

### Scenario: Password toggle is screen-reader accessible

Given Password is rendered with `showLabel="Show password"` and `hideLabel="Hide password"`
When the input type is "password"
Then the toggle button has aria-label matching showLabel
When the user toggles visibility
Then the toggle button aria-label updates to hideLabel

### Scenario: Checkbox renders controlled state

Given Checkbox is rendered with `checked={true}`
When the component mounts
Then the checkbox is checked and the checked attribute reflects the prop

### Scenario: Checkbox indeterminate state

Given Checkbox is rendered with `indeterminate={true}` and `checked={false}`
When the component mounts
Then the checkbox displays the indeterminate visual state
And clicking the checkbox does not change indeterminate — only the onChange handler fires

### Scenario: Select renders with children and accepts value

Given Select is rendered with a value, onChange, and option children
When the user selects an option
Then onChange fires with the selected value

### Scenario: Select error state

Given Select is rendered with `error={true}`
When the component mounts
Then the select element has error styling from tokens

### Scenario: Switch toggles on click

Given Switch is rendered with `checked={false}` and an onChange handler
When the user clicks anywhere within the component's label area
Then onChange fires with true

### Scenario: Switch toggles on Space key

Given Switch is rendered with `checked={false}` and focus is on the control
When the user presses Space
Then onChange fires with true

### Scenario: All controls forward ref to the underlying input element

Given any of the five controls is rendered with a ref
When the component mounts
Then the ref points to the underlying HTMLInputElement or HTMLSelectElement

### Scenario: All controls are compatible with RHF register

Given any control is rendered with props spread from RHF's `register()`
When the form field is interacted with
Then RHF receives onChange, onBlur, and name correctly and the field validates as expected

## Test Scenarios

| Scenario                                                            | Type       | Expected outcome                               |
| ------------------------------------------------------------------- | ---------- | ---------------------------------------------- |
| Input renders with value and fires onChange                         | Happy path | value prop reflected; onChange called on input |
| Input error=true applies error styling                              | Happy path | error token styles applied                     |
| Input error transitions true → false                                | Happy path | error styles removed, default styles restored  |
| Input disabled is non-interactive                                   | Happy path | native disabled present; no interaction        |
| Password show/hide toggles input type                               | Happy path | type cycles password → text → password         |
| Password focus stays on input after toggle                          | Edge case  | focus on input, not toggle button              |
| Password toggle aria-label matches visibility state                 | Happy path | showLabel/hideLabel match aria-label           |
| Password missing showLabel/hideLabel                                | Boundary   | TypeScript error at compile time               |
| Checkbox indeterminate renders correctly                            | Happy path | indeterminate visual state shown               |
| Checkbox indeterminate click fires onChange not toggle              | Edge case  | onChange fires; indeterminate unchanged        |
| Select value change fires onChange                                  | Happy path | onChange called with selected value            |
| Select error state applies to select element                        | Happy path | error token styles on select                   |
| Switch click on label area fires onChange                           | Happy path | onChange fires with toggled value              |
| Switch Space key fires onChange                                     | Happy path | onChange fires                                 |
| Switch outside Field — label is consumer's responsibility           | Edge case  | no label rendered by component                 |
| Ref forwarded to HTMLInputElement on Input/Password/Checkbox/Switch | Happy path | ref.current is HTMLInputElement                |
| Ref forwarded to HTMLSelectElement on Select                        | Happy path | ref.current is HTMLSelectElement               |
| All controls work with RHF register spread                          | Happy path | RHF tracks value, validates correctly          |
| Disabled state on all five controls                                 | Happy path | non-interactive; disabled attribute present    |
| Error recovery on all five controls                                 | Edge case  | error styles removed when error=false          |

## Design Reference

docs/initiatives/001-ui-v1-core-component-library/design/ux-flow.md — Step 3 (Form)

## Technical Notes

**Architect:** Two base TypeScript interfaces cover all five controls:
`StringControlProps` (Input, Password, Select) with `value: string` and
`ref: Ref<HTMLInputElement | HTMLSelectElement>`; `BooleanControlProps`
(Checkbox, Switch) with `checked: boolean` and `ref: Ref<HTMLInputElement>`.
Password's root element is a div, not an input — ref forwards to the inner
input; tests should query by role, not element type.
Switch is implemented as hidden `<input type="checkbox">` + styled `<span>`
(track+thumb) inside a `<label>` — CSS :checked drives visual state, no JS
animation needed.

**FE Dev:** Password internally composes Input — the wrapper div is
transparent to the consumer's ref. Checkbox indeterminate cannot be set
via HTML attribute; it must be applied imperatively via ref
(`el.indeterminate = true`) in a useEffect watching the indeterminate prop.

**BE Dev:** No backend concerns — pure UI components.

**UX:** Password show/hide focus behaviour (focus returns to input after
toggle) is a required AC, not a nice-to-have. Switch's full label area
as click target gives the largest accessible touch target — do not
restrict to the track only.

## Open Questions

| Question                                     | Raised by   | Resolution                                                  |
| -------------------------------------------- | ----------- | ----------------------------------------------------------- |
| error prop type: boolean or boolean\|string? | FE Dev      | Resolved: boolean only. Message always rendered by Field.   |
| disabled state in scope?                     | PO          | Resolved: in scope for all five controls.                   |
| Checkbox indeterminate in scope?             | PO          | Resolved: in scope.                                         |
| Password aria-label ownership                | UX          | Resolved: showLabel + hideLabel required props, no default. |
| Switch standalone label prop?                | UX          | Resolved: no label prop. Label always external.             |
| Select placeholder prop?                     | PO          | Resolved: consumer's responsibility via children.           |
| Radix UI as base?                            | Stakeholder | Resolved: native HTML only for v1.                          |

## Sign-off

- Approved by: Lucas
- Date: 2026-03-22
- Ready for: Planning
