# Ticket 001-005: form-system

_Initiative: docs/initiatives/001-ui-v1-core-component-library/initiative.md_
_Story: docs/initiatives/001-ui-v1-core-component-library/stories.md#001-005_

## Story

**As a** developer wiring up any form
**I need to** import Form and Field from `@lucas/ui`
**So that** validation, error messages, submission handling, and field layout are handled once and consistently across all my projects

## Scope

### In scope

- `Form` — wraps `react-hook-form`'s `useForm` internally; renders a `<form>` element; provides full RHF `FormProvider` context to children; validation mode: `onSubmit` initially, re-validates on blur after first submit attempt (`reValidateMode: "onBlur"`)
- `Field` — compound component rendering label (above control) + control (via `cloneElement`) + inline error message
- Field generates stable ids: control id = `field-${name}`, error element id = `field-${name}-error`; injects `id` and `aria-describedby` into the child via `cloneElement`
- Field reads the error for its `name` from RHF form context
- Field accepts `name`, `label`, and `rules` props
- Field must compose correctly with all five controls from 001-004: Input, Password, Checkbox, Select, Switch
- Storybook stories: basic form, validation errors, server error via Alert above the form, full login form example
- WCAG AA: label–input association via `htmlFor`; error linked to control via `aria-describedby`

### Out of scope

- Schema validation integration (Zod, Yup) — native RHF `rules` only
- Multi-step form
- Field array / dynamic fields
- Configurable label position (inline) — label-above is fixed for v1
- Exposing `setError` / `reset` / `isSubmitting` from Form — consumers use `useFormContext()` directly for programmatic form control
- Field-level server errors via `setError` — server errors are shown via Alert placed above Form by the consumer

## Acceptance Criteria

### Scenario: valid form submission

Given a Form with Fields all filled with valid values
When the user submits the form
Then `onSubmit` fires with the complete field values object

### Scenario: required field empty on submit

Given a Form with a required Field that is empty
When the user submits the form
Then an error message is rendered below the Field's control
And the label's `htmlFor` equals `field-${name}`
And the control's `id` equals `field-${name}`
And the control's `aria-describedby` equals `field-${name}-error`
And the error element's `id` equals `field-${name}-error`

### Scenario: no error before first submit attempt

Given a Form with a required Field
When the user focuses and then blurs the field without filling it in before any submit attempt
Then no error message is rendered for that Field

### Scenario: error clears on valid blur after submit

Given a form where an invalid submission was attempted and a required Field shows an error
When the user enters a valid value and blurs the field
Then the error message is removed from the DOM

### Scenario: error persists on invalid blur after submit

Given a form where an invalid submission was attempted and a required Field shows an error
When the user blurs the field again without entering a value
Then the error message remains

### Scenario: error element absent when field is valid

Given a Form with a Field that has no validation error
When the form renders
Then no error element is present in the DOM for that Field
And `aria-describedby` is not set on the control

### Scenario: label rendered above control

Given a Form with a Field
When the form renders
Then the label element appears immediately before the control in the DOM

### Scenario: Field used outside Form in development

Given a Field rendered without a parent Form
When the component mounts in development mode
Then `console.error` is called with a message indicating Field must be used within a Form

## Test Scenarios

| Scenario                                       | Type       | Expected outcome                                                |
| ---------------------------------------------- | ---------- | --------------------------------------------------------------- |
| Valid form submission                          | Happy path | onSubmit fires with correct values                              |
| Required field empty on submit                 | Error      | Error message rendered; aria-describedby set on control         |
| Optional field empty on submit                 | Happy path | No error; form submits                                          |
| Blur required empty field before submit        | Edge case  | No error shown                                                  |
| Blur required empty field after failed submit  | Edge case  | Error remains                                                   |
| Enter valid value and blur after failed submit | Edge case  | Error clears                                                    |
| Multiple required fields fail on submit        | Error      | Each Field shows its own error independently                    |
| Multiple rules fail on one field               | Boundary   | First failing rule's message is displayed                       |
| Field with no validation rules                 | Edge case  | No error element in DOM; aria-describedby absent                |
| Field generates stable ids                     | Edge case  | id and aria-describedby follow field-${name} pattern            |
| Label htmlFor matches control id               | Happy path | Label and control are associated                                |
| Field used outside Form in dev mode            | Error      | console.error is called                                         |
| Server error shown via Alert above Form        | Happy path | Alert renders independently; Field errors unaffected            |
| Form composed with all five control types      | Happy path | All five controls register, validate, and show errors correctly |

## Design Reference

docs/initiatives/001-ui-v1-core-component-library/design/ux-flow.md — Step 3 (Form usage) and Error state section

## Technical Notes

**Architect:** Form calls `useForm` internally with `mode: "onSubmit"` and `reValidateMode: "onBlur"`, then spreads the methods into `FormProvider`. Field must be a descendant of Form — dev-mode `console.error` + no-op validation in production on violation. Field name uniqueness within a Form is enforced by RHF, not by Field.

**FE Dev:** Field uses `React.cloneElement` to inject `id` and `aria-describedby` into the single child element. `aria-describedby` is only injected when an error is present. Error element is only rendered when an error exists — no empty placeholder. Consumers needing `isSubmitting` or other form state call `useFormContext()` directly.

**BE Dev:** No server-side concerns. Field-level server errors via `setError` are out of scope for v1 — consumer renders an `<Alert>` above the `<Form>` for submission-level errors.

**UX:** Label-above is fixed for v1. Error trigger is blur-after-first-submit — most forgiving pattern, matches user expectation for progressive disclosure.

## Open Questions

| Question                                            | Raised by | Resolution                                                                         |
| --------------------------------------------------- | --------- | ---------------------------------------------------------------------------------- |
| Error trigger: submit only or blur?                 | PO        | Resolved: blur after first submit attempt (mode: onSubmit, reValidateMode: onBlur) |
| Label position: above or inline? Configurable?      | PO        | Resolved: label-above, fixed for v1                                                |
| id injection strategy: cloneElement vs render prop? | FE Dev    | Resolved: cloneElement with deterministic id (field-${name})                       |
| Field used outside Form: throw or warn?             | Arch      | Resolved: console.error in dev, no-op in production                                |
| Form state exposure (isSubmitting etc.)?            | BE Dev    | Resolved: consumers use useFormContext() directly; not a Field concern             |
| Field-level server errors via setError?             | QA        | Resolved: out of scope for v1; server errors via Alert above Form                  |
| Multiple rules failing: which message?              | QA        | Resolved: first failing rule (RHF default)                                         |

## Sign-off

- Approved by: Lucas
- Date: 2026-03-22
- Ready for: Planning
