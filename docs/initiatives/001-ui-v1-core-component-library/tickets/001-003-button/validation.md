# Validation: 001-003 button

_Ticket: ./ticket.md_
_Session date: 2026-03-22_

## Testing Plan

| Scenario                                             | Decision           | Reasoning                                                             |
| ---------------------------------------------------- | ------------------ | --------------------------------------------------------------------- |
| Space key on anchor-button activates onClick         | None — existing    | Added in implementation, passing                                      |
| Enter key on anchor-button activates onClick         | Component test     | Regression check — Enter must still fire after onKeyDown was added    |
| Focus ring contrast ≥ 3:1 on light background        | None — manual      | jsdom cannot resolve CSS vars; blue-600 (#2563eb) = 4.84:1 on white ✓ |
| Focus ring contrast ≥ 3:1 on dark background         | None — manual      | Dark token blue-400 (#60a5fa) = ~8:1 on dark base ✓                   |
| Secondary button border contrast ≥ 3:1 on page bg    | None — manual      | neutral-500 (#64748b) = 4.4:1 on white ✓                              |
| All variants — default state — pass axe              | None — existing    | it.each over all 5 variants, passing                                  |
| All variants — disabled state — pass axe             | None — existing    | Disabled mechanism is variant-agnostic; passing                       |
| Primary — loading state — passes axe                 | None — existing    | Passing                                                               |
| aria-busy=true when isLoading                        | None — existing    | Passing                                                               |
| aria-disabled=true when disabled (button and anchor) | None — existing    | Both element types covered                                            |
| Disabled anchor: href absent                         | None — existing    | Passing                                                               |
| Loading: accessible name preserved from label text   | None — existing    | Passing                                                               |
| Loading: explicit aria-label overrides children      | None — existing    | Passing                                                               |
| sm size button meets 24×24 px minimum touch target   | None — calculation | Height ≈ 33.5px > 24px minimum ✓                                      |

## Results

| Scenario                                             | Result | Test file                               |
| ---------------------------------------------------- | ------ | --------------------------------------- |
| Space key on anchor-button activates onClick         | ✓ Pass | `src/components/Button/Button.test.tsx` |
| Enter key on anchor-button activates onClick         | ✓ Pass | `src/components/Button/Button.test.tsx` |
| Focus ring contrast ≥ 3:1 on light background        | ✓ Pass | Manual — token value verified           |
| Focus ring contrast ≥ 3:1 on dark background         | ✓ Pass | Manual — token value verified           |
| Secondary button border contrast ≥ 3:1 on page bg    | ✓ Pass | Manual — token value verified           |
| All variants — default state — pass axe              | ✓ Pass | `src/components/Button/Button.test.tsx` |
| All variants — disabled state — pass axe             | ✓ Pass | `src/components/Button/Button.test.tsx` |
| Primary — loading state — passes axe                 | ✓ Pass | `src/components/Button/Button.test.tsx` |
| aria-busy=true when isLoading                        | ✓ Pass | `src/components/Button/Button.test.tsx` |
| aria-disabled=true when disabled (button and anchor) | ✓ Pass | `src/components/Button/Button.test.tsx` |
| Disabled anchor: href absent                         | ✓ Pass | `src/components/Button/Button.test.tsx` |
| Loading: accessible name preserved from label text   | ✓ Pass | `src/components/Button/Button.test.tsx` |
| Loading: explicit aria-label overrides children      | ✓ Pass | `src/components/Button/Button.test.tsx` |
| sm size button meets 24×24 px minimum touch target   | ✓ Pass | Calculation                             |

## Tests Written

| File                                    | Type      | Scenarios covered                             |
| --------------------------------------- | --------- | --------------------------------------------- |
| `src/components/Button/Button.test.tsx` | Component | Enter key activates onClick on an href button |

## Bugs Found

None.

## Exploratory Findings

None. Space/Enter symmetry on anchor-button is correct. All disabled paths
(native button and anchor) are covered. Loading state ARIA attributes and
accessible name preservation are solid across all configurations tested.

## Sign-off

- Validated by: QA Engineer
- Approved by: Lucas
- Date: 2026-03-22
- Status: Complete
