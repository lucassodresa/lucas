# Plan 001-004: form-controls

_Ticket: ./ticket.md_

## API Contract

None — pure UI components with no server interaction.

## Frontend Plan

**Components to create:**

| Component | Responsibility                                                                                                 | Why new                              |
| --------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| Input     | Text input with error and disabled states; forwards ref to HTMLInputElement                                    | No existing form control in codebase |
| Select    | Native `<select>` wrapper with error and disabled states; forwards ref to HTMLSelectElement                    | No existing form control in codebase |
| Checkbox  | Controlled checkbox with error, disabled, and indeterminate states; forwards ref to HTMLInputElement           | No existing form control in codebase |
| Switch    | Toggle built on hidden `<input type="checkbox">` with CSS-driven track+thumb; forwards ref to HTMLInputElement | No existing form control in codebase |
| Password  | Input variant with show/hide visibility toggle; forwards ref to inner HTMLInputElement                         | No existing form control in codebase |

**Components to modify:**

| Component    | Change                                                         | Blast radius                                          |
| ------------ | -------------------------------------------------------------- | ----------------------------------------------------- |
| src/index.ts | Add export entries for all five new components and their types | Import-only — no existing component behaviour changes |

**Interfaces:**

All five extend native HTML element attribute types so that `...rest` passes
`name`, `onChange`, `onBlur`, `value`, `id`, `placeholder`, `required`,
`autoComplete`, and all other standard props through to the underlying element
without explicit wiring. RHF's `register` spread works automatically.

```ts
// Input
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

// Select
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

// Checkbox
export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  error?: boolean;
  indeterminate?: boolean;
}

// Switch
export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  error?: boolean;
}

// Password
export interface PasswordProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  error?: boolean;
  showLabel: string;
  hideLabel: string;
}
```

**Component structures:**

Input — `<input>` with `forwardRef<HTMLInputElement>`.
Applies `styles['input--error']` when `error` is true via clsx.
CSS states: default, `:focus-visible` (focus ring tokens), error border,
`:disabled` (muted bg, disabled text color, not-allowed cursor).

Select — identical pattern to Input using `<select>` and
`forwardRef<HTMLSelectElement>`. CSS adds `appearance: none` +
background-image SVG arrow for consistent cross-browser styling.

Checkbox — `<input type="checkbox">` with `forwardRef<HTMLInputElement>`.
Ref-merge pattern required for indeterminate:

- Internal `useRef<HTMLInputElement>` holds DOM reference
- Callback ref merges forwardedRef + innerRef simultaneously
- `useEffect` watching `indeterminate` prop sets
  `innerRef.current.indeterminate = indeterminate ?? false`

CSS: `accent-color` token for checked state theming;
border/outline change for error state.

Switch — `<label>` root wrapping hidden `<input type="checkbox">` +
`<span>` track + nested `<span>` thumb. `forwardRef<HTMLInputElement>`
forwards to the hidden input. All visual state driven by CSS:
`:checked` selector toggles track bg and translates thumb.
`:focus-visible` applied to the track via sibling selector from input.
`error` prop applies a class on the root `<label>` which targets the
track with danger border. No JS for visual state.
Click target is the entire `<label>` — satisfies ticket requirement.

Password — `<div>` root (not `<input>`) containing `<input>` + `<button>`.
Internal `useState<boolean>(false)` tracks visibility.
Ref-merge pattern identical to Checkbox (forwardedRef + inputRef).
`handleToggle`: calls `setVisible(v => !v)` then
`inputRef.current?.focus()` — focus returns to input synchronously.
Toggle button: `type="button"`, `aria-label` toggles between
`showLabel` (when hidden) and `hideLabel` (when visible),
`disabled` mirrors the input's disabled prop.
Uses `EyeIcon` / `EyeOffIcon` from `lucide-react`.

**State design:**

Input, Select, Checkbox, Switch — fully controlled; no internal state
beyond what the browser manages natively. Re-renders only when props change.

Password — one piece of internal state: `visible: boolean`.
Toggles on button click. Does not re-render parent — state is local.

**Implementation sequence:**

1. `Input` — establishes the forwardRef pattern and CSS module structure
   for all subsequent controls.
2. `Select` — same pattern with HTMLSelectElement; adds the native
   dropdown arrow CSS treatment.
3. `Checkbox` — adds the ref-merge pattern for indeterminate; no visual
   complexity beyond native checkbox styling.
4. `Switch` — CSS-heaviest component; establishes the hidden-input +
   styled-label pattern with `:checked`-driven visual state.
5. `Password` — builds on Input's CSS; adds visibility state, focus
   management, and toggle button with lucide-react icons.
6. `src/index.ts` — add export entries for all five components and their
   prop types.

**Test approach:**

Structure matches `Button.test.tsx`: `describe` blocks per concern,
`userEvent` throughout, `axe` for accessibility.

Per component:

- `rendering` — renders with accessible role/name; key props reflected
- `controlled behaviour` — onChange fires with correct value
- `error state` — error=true applies error class; error=false removes it
- `disabled state` — disabled attribute present; no interaction fires
- `ref forwarding` — ref.current is the expected element type
- `accessibility` — axe passes for default, error, and disabled states

Additional per component:

- Checkbox: `indeterminate state` — visual state set on mount and on
  change; clicking fires onChange, indeterminate is not toggled by click
- Switch: `interaction` — click on label area fires onChange; Space key
  fires onChange
- Password: `visibility toggle` — type cycles; focus returns to input
  after toggle; aria-label matches visibility state in both directions

Coverage note: every branch must be covered (100% threshold).
Branches to watch: `error && styles['input--error']` (both arms),
`indeterminate ?? false` (both arms), `visible ? hideLabel : showLabel`
(both arms), `typeof forwardedRef === 'function'` (both arms in the
ref-merge callback).

**Risk areas:**

- Password focus-return test: asserting `document.activeElement` after
  a userEvent click on the toggle. Pattern:
  `await user.click(toggleButton)` → `expect(inputEl).toHaveFocus()`.

- Select cross-browser arrow: `appearance: none` + CSS `background-image`
  SVG arrow must be reviewed visually in Storybook. RTL tests cannot
  assert on CSS background-image.

- Switch nested inside Field (001-005): Switch's root is `<label>`.
  Field renders its own `<label>`. HTML forbids nested labels. Field
  must detect a Switch child and use `aria-labelledby` instead of
  rendering a `<label>`. Capture in 001-005 planning.

- Checkbox ref-merge useCallback: the merged ref callback is recreated
  when `forwardedRef` changes identity. Expected React behaviour;
  no functional consequence for v1.

## Backend Plan

No backend concerns. Pure UI components — no data model changes,
no endpoints, no side effects, no migrations.

## Rejected Approaches

| Approach                                                           | Why rejected                                                                                                                                                                                                   |
| ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bespoke TypeScript interfaces instead of extending HTML attributes | Extending InputHTMLAttributes / SelectHTMLAttributes gives all standard props via ...rest; bespoke interfaces would duplicate every HTML prop and break RHF register compatibility unless carefully maintained |
| Radix UI primitives as base                                        | Decided in Refinement — native HTML only for v1; migration cost acceptable                                                                                                                                     |
| Full custom checkbox appearance                                    | Hiding native checkbox and drawing a custom track is disproportionately complex for v1; accent-color gives token-controlled checked state with native reliability                                              |
| tabIndex={-1} on Password toggle button                            | Toggle button must be keyboard accessible per WCAG AA                                                                                                                                                          |
| useImperativeHandle for Checkbox indeterminate                     | Callback ref merge is simpler and keeps the full HTMLInputElement interface exposed rather than a limited imperative handle                                                                                    |

## ADRs and Diagrams

None.

## Sign-off

- Approved by: Lucas
- Date: 2026-03-22
- Ready for: Implementation
