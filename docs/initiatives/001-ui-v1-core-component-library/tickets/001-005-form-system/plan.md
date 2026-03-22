# Plan 001-005: form-system

_Ticket: ./ticket.md_

## API Contract

This ticket has no HTTP API. The contract is the component public API — the prop interfaces and internal context channel that Form and Field must implement and that must not be deviated from during implementation.

### Component interfaces

**Form**

```tsx
interface FormProps {
  onSubmit: SubmitHandler<FieldValues>;
  defaultValues?: DefaultValues<FieldValues>;
  children: React.ReactNode;
  className?: string;
}
```

Internals: calls `useForm({ mode: 'onSubmit', reValidateMode: 'onBlur', defaultValues })`, spreads result into `<FormProvider>`, renders `<form>` element.

**Field**

```tsx
interface FieldProps {
  name: string;
  label: string;
  rules?: RegisterOptions;
  children: React.ReactElement;
}
```

Internals: reads `useFormContext()` for `register()` and `formState.errors`. Generates `fieldId = 'field-${name}'` and `errorId = 'field-${name}-error'`. Merges registration props into the child via `cloneElement`.

**Props injected into child by Field (via cloneElement)**

Always: `id`, `name`, `ref`, `onChange`, `onBlur`
When error: `aria-describedby`, `error: true`
When no error: `error: false`, `aria-describedby` absent

## Frontend Plan

**Components to create:**

| Component | Responsibility                                                                               | Why new                              |
| --------- | -------------------------------------------------------------------------------------------- | ------------------------------------ |
| `Form`    | Owns `useForm`; renders `<form>`; provides RHF `FormProvider` context                        | Net-new — no existing form primitive |
| `Field`   | Composes label + control + inline error; drives RHF registration and error display per field | Net-new compound component           |

**Components to modify:**

| Component      | Change                     | Blast radius                  |
| -------------- | -------------------------- | ----------------------------- |
| `src/index.ts` | Add Form and Field exports | Barrel only — no logic change |

**State design:**

All form state lives inside react-hook-form, owned by the `useForm` call inside Form. No local React state in Form or Field. Field re-renders only when `formState.errors[name]` changes via RHF's subscription mechanism.

**CSS modules:**

- `Form.module.css` — minimal; layout width and display only
- `Field.module.css` — `.field` (flex-column, gap `var(--spacing-1)`); `.label` (font-size `var(--font-size-sm)`, font-weight `var(--font-weight-medium)`, color `var(--color-text-secondary)`); `.error` (font-size `var(--font-size-xs)`, color `var(--color-danger-text)`)

No token gaps — all required tokens exist in tokens.css.

**Implementation sequence:**

1. `npm install react-hook-form` in `packages/ui`
2. `Form/Form.tsx` + `Form/Form.module.css` + `Form/index.ts`
3. `Form/Form.test.tsx` — Form rendering, onSubmit fires with values, axe pass
4. `Field/Field.tsx` + `Field/Field.module.css` + `Field/index.ts`
5. `Field/Field.test.tsx` — all 8 ACs from ticket, using plain `<input>` stubs as children (identical ref/prop interface to 001-004 controls)
6. `Form/Form.stories.tsx` — 4 stories (BasicForm, ValidationErrors, ServerError, LoginForm); plain `<input>` stubs until 001-004 controls ship, then updated
7. Update `src/index.ts` with Form and Field exports
8. `npm run typecheck && npm test`

**Test approach:**

- `Form.test.tsx`: render Form wrapping a plain `<input>`; submit via `userEvent`; assert `onSubmit` called with values; axe pass
- `Field.test.tsx`: render `<Form><Field><input /></Field></Form>`; cover all 8 ACs; `userEvent` throughout; axe on error state
- No tests on internal state, hook internals, or CSS class names
- `vi.useFakeTimers` not required — no timers in Form or Field

**Risk areas:**

- `cloneElement` prop merging overwrites any `id`, `aria-describedby`, or RHF registration props already on the child — intentional, must be documented in types
- `useFormContext()` behavior outside `FormProvider` must be verified at implementation: if RHF throws rather than returning null/undefined, use a custom null-sentinel context wrapper for the dev-mode warning rather than try/catch control flow
- Storybook stories are placeholder-quality until 001-004 ships — comment in `Form.stories.tsx` marks them for update

## Backend Plan

Not applicable. This ticket has no server-side concerns — no data model, no endpoints, no business logic, no side effects, no migrations.

## Rejected Approaches

| Approach                                          | Why rejected                                                                                                                                                                   |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Consumer-owned `useForm` (pass `methods` to Form) | More flexible but adds boilerplate. Ticket specifies zero-wiring intent: `<Form onSubmit={fn}>`. Consumers needing programmatic control use `useFormContext()`.                |
| Render prop / function-as-children for Field      | More explicit prop passing but more verbose. `cloneElement` matches zero-wiring intent and keeps consumer syntax clean.                                                        |
| Always render error element (empty when valid)    | Simpler `aria-describedby` wiring (always present) but adds DOM weight. Ticket AC explicitly requires no error element when field is valid.                                    |
| `react-hook-form` as `peerDependency`             | Would require consumers to install RHF separately. As a personal library with a single controlled consumer, direct dependency avoids "missing peer" friction with no downside. |

## ADRs and Diagrams

docs/initiatives/001-ui-v1-core-component-library/architecture/adr/001-form-owns-useform.md

## Sign-off

- Approved by: Lucas
- Date: 2026-03-22
- Ready for: Implementation
