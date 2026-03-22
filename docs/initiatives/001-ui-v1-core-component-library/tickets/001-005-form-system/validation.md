# Validation: 001-005 form-system

_Ticket: ./ticket.md_
_Session date: 2026-03-22_

## Testing Plan

| Scenario | Decision | Reasoning |
|---|---|---|
| Valid form submission | None (existing) | Fully covered by `Form.test.tsx` and `Field.test.tsx: 'passes field values to onSubmit'` |
| Required field empty on submit | None (existing) | Fully covered by `Field.test.tsx`: error message + aria wiring tests |
| Optional field empty on submit | Component | No existing test submitted with an empty no-rules field and asserted onSubmit fires without error |
| Blur required empty field before submit | None (existing) | Fully covered by `Field.test.tsx: 'focuses and blurs before submitting'` |
| Blur required empty field after failed submit | None (existing) | Fully covered by `Field.test.tsx: 'keeps error when user blurs without entering value after submit'` |
| Enter valid value and blur after failed submit | None (existing) | Fully covered by `Field.test.tsx: 'clears error when user enters valid value and blurs'` |
| Multiple required fields fail on submit | None (existing) | Fully covered by `Field.test.tsx: 'shows independent errors for multiple required fields'` |
| Multiple rules fail on one field | None (existing) | Fully covered by `Field.test.tsx: 'shows the first failing rule message'` |
| Field with no validation rules | Component | Initial-render no-error was tested; post-submit state (no error element, no aria-describedby) was not |
| Field generates stable ids | None (existing) | Fully covered — field-${name} pattern verified in `Field.test.tsx` |
| Label htmlFor matches control id | None (existing) | Fully covered by `Field.test.tsx: 'renders label with htmlFor matching control id'` |
| Field used outside Form in dev mode | None (existing) | Fully covered by `Field.test.tsx: 'calls console.error when used without a parent Form'` |
| Server error shown via Alert above Form | None | Framework guarantee — RHF FormProvider scope ends at the form boundary; Alert is a DOM sibling outside it |
| Form composed with all five control types | Component | All existing tests used a stub Input; ticket requires verified composition with real 001-004 controls |

## Results

| Scenario | Result | Test file |
|---|---|---|
| Valid form submission | ✓ Pass | existing — `Form.test.tsx`, `Field.test.tsx` |
| Required field empty on submit | ✓ Pass | existing — `Field.test.tsx` |
| Optional field empty on submit | ✓ Pass | `packages/ui/src/components/Field/Field.test.tsx` |
| Blur required empty field before submit | ✓ Pass | existing — `Field.test.tsx` |
| Blur required empty field after failed submit | ✓ Pass | existing — `Field.test.tsx` |
| Enter valid value and blur after failed submit | ✓ Pass | existing — `Field.test.tsx` |
| Multiple required fields fail on submit | ✓ Pass | existing — `Field.test.tsx` |
| Multiple rules fail on one field | ✓ Pass | existing — `Field.test.tsx` |
| Field with no validation rules | ✓ Pass | `packages/ui/src/components/Field/Field.test.tsx` |
| Field generates stable ids | ✓ Pass | existing — `Field.test.tsx` |
| Label htmlFor matches control id | ✓ Pass | existing — `Field.test.tsx` |
| Field used outside Form in dev mode | ✓ Pass | existing — `Field.test.tsx` |
| Server error shown via Alert above Form | ✓ Pass | n/a — framework guarantee |
| Form composed with all five control types | ✓ Pass | `packages/ui/src/components/Field/Field.test.tsx` |

## Tests Written

| File | Type | Scenarios covered |
|---|---|---|
| `packages/ui/src/components/Field/Field.test.tsx` | Component | Optional field empty on submit, Field with no validation rules (post-submit), Form composed with all five control types |

## Bugs Found

None.

## Exploratory Findings

None. The five-control composition test exercised the most surface area beyond the defined scenarios — cloneElement prop injection through Password's internal ref merging, Checkbox's indeterminate ref hook, and Switch's internal label wrapper all behaved correctly with Field's injection.

## Sign-off

- Validated by: QA Engineer
- Approved by:
- Date: 2026-03-22
- Status: Complete
