# Validation: 001-004 form-controls

_Ticket: ./ticket.md_
_Session date: 2026-03-22_

## Testing Plan

| Scenario | Decision | Reasoning |
|---|---|---|
| Input renders and accepts controlled value | None | Existing: `controlled behaviour` describe block covers onChange on type |
| Input shows error state | None | Existing: `aria-invalid=true` assertion |
| Input clears error state | None | Existing: `aria-invalid` absent when `error=false` |
| Input disabled state | None | Existing: disabled attribute + no-onChange tests |
| Password toggles visibility | None | Existing: cycles password → text → password |
| Password toggle preserves focus | None | Existing: `toHaveFocus()` on input after toggle |
| Password toggle screen-reader accessible | None | Existing: showLabel/hideLabel aria-label assertions |
| Password missing showLabel/hideLabel | None | TypeScript required props — compile-time enforcement only |
| Checkbox renders controlled state | Component test | No test rendered `checked={true}` and asserted `toBeChecked()` |
| Checkbox indeterminate state | None | Existing: DOM `.indeterminate` property + onChange-not-toggle |
| Select renders with children and accepts value | None | Existing: options rendered + onChange on selectOptions |
| Select error state | None | Existing: `aria-invalid=true` on combobox |
| Switch toggles on click | None | Existing: full label area click → onChange |
| Switch toggles on Space key | None | Existing: keyboard Space → onChange |
| Switch no internal label | None | API enforcement — no `label` prop on SwitchProps |
| All controls forward ref | None | Existing: all five files cover object ref; Checkbox/Password also cover callback ref and no-ref |
| All controls compatible with RHF register | Component test | `name` attribute and `onBlur` handler were untested |
| Disabled state on all five | None | Existing: each file has a `disabled state` describe block |
| Error recovery on all five | None | Existing: all five assert `aria-invalid` absent when `error=false` |

## Results

| Scenario | Result | Test file |
|---|---|---|
| Input renders and accepts controlled value | ✓ Pass | existing: `Input.test.tsx` |
| Input shows error state | ✓ Pass | existing: `Input.test.tsx` |
| Input clears error state | ✓ Pass | existing: `Input.test.tsx` |
| Input disabled state | ✓ Pass | existing: `Input.test.tsx` |
| Password toggles visibility | ✓ Pass | existing: `Password.test.tsx` |
| Password toggle preserves focus | ✓ Pass | existing: `Password.test.tsx` |
| Password toggle screen-reader accessible | ✓ Pass | existing: `Password.test.tsx` |
| Password missing showLabel/hideLabel | ✓ Pass | TypeScript compile-time |
| Checkbox renders controlled state | ✓ Pass | written: `Checkbox.test.tsx` |
| Checkbox indeterminate state | ✓ Pass | existing: `Checkbox.test.tsx` |
| Select renders with children and accepts value | ✓ Pass | existing: `Select.test.tsx` |
| Select error state | ✓ Pass | existing: `Select.test.tsx` |
| Switch toggles on click | ✓ Pass | existing: `Switch.test.tsx` |
| Switch toggles on Space key | ✓ Pass | existing: `Switch.test.tsx` |
| Switch no internal label | ✓ Pass | API enforcement |
| All controls forward ref | ✓ Pass | existing: all five test files |
| All controls compatible with RHF register | ✓ Pass | written: `Input.test.tsx` |
| Disabled state on all five | ✓ Pass | existing: all five test files |
| Error recovery on all five | ✓ Pass | existing: all five test files |

## Tests Written

| File | Type | Scenarios covered |
|---|---|---|
| `packages/ui/src/components/Checkbox/Checkbox.test.tsx` | Component | Checkbox renders controlled state |
| `packages/ui/src/components/Input/Input.test.tsx` | Component | All controls compatible with RHF register |

## Bugs Found

None.

## Exploratory Findings

**Switch role semantics:** Switch uses implicit `role="checkbox"` from `type="checkbox"`. The more precise ARIA role for a toggle switch is `role="switch"`. This is not a WCAG AA violation — all axe audits pass — and was not in scope for this ticket. Noted for consideration in Phase 6 (Accessibility hardening).

**box-sizing omission (fixed during session):** Input.module.css was missing `box-sizing: border-box`. With `width: 100%` and `box-sizing: content-box` (browser default for inputs), the input overflowed its container by the sum of its horizontal padding (~52px). This caused the Password toggle button to appear misaligned. Fixed by adding `box-sizing: border-box` to `.input` in `Input.module.css`.

**Password height mismatch (fixed during session):** An earlier attempt to prevent type-switch layout shift set `height: calc(var(--font-size-md) * var(--line-height-normal))` on `.root input` in Password.module.css. After the `box-sizing` fix, this height was interpreted as the total border-box height (24px), squishing the input. Removed — `line-height` being explicit is sufficient to prevent the layout shift under `border-box` sizing.

## Sign-off

- Validated by: QA Engineer
- Approved by: Lucas
- Date: 2026-03-22
- Status: Complete
