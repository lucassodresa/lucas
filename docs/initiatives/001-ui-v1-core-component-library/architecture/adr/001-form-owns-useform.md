# ADR 001: Form owns useForm internally

**Status:** Accepted
**Date:** 2026-03-22

## Context

The Form component needs to integrate with react-hook-form. There are two primary patterns for doing this in a component library:

1. **Form-owned:** Form calls `useForm()` internally and exposes only `onSubmit` and `defaultValues` as props. Consumers who need programmatic access to form methods (setError, reset, watch) call `useFormContext()` directly.

2. **Consumer-owned:** Consumer calls `const methods = useForm()` and passes the result to Form as a `methods` prop. Form acts as a layout and submission wrapper only. This is the standard react-hook-form `FormProvider` pattern.

## Decision

Form calls `useForm` internally. The component API is:

```tsx
<Form onSubmit={handler} defaultValues={defaults}>
  {children}
</Form>
```

## Alternatives Considered

**Consumer-owned (methods prop):**

```tsx
const methods = useForm();
<Form methods={methods} onSubmit={handler}>
  {children}
</Form>;
```

Advantages: full consumer control over all RHF methods; standard RHF FormProvider pattern; easier to call setError after a failed server request.

Disadvantages: requires two lines to set up a form; exposes RHF as a visible consumer dependency rather than an implementation detail; the "zero-wiring" promise of the component library is partially broken.

## Consequences

**Easier:**

- Consumer API is minimal — one component, one prop
- RHF is an implementation detail the consumer need not know about
- Field registration, validation mode, and error wiring are fully encapsulated

**Harder:**

- Consumers who need `setError`, `reset`, `watch`, or `setValue` must call `useFormContext()` — this is a non-obvious escape hatch
- Field-level server error injection via `setError` requires the consumer to understand and use `useFormContext()` — documented in the ticket as out of scope for v1 and handled via Alert at the form level instead
- If a future story requires a significantly different useForm configuration (e.g. resolver, mode override), Form's props will need to expand rather than the consumer controlling it directly

**If this decision needs revisiting:**
The clearest signal would be a use case where a consuming project needs consumer-owned form state for a pattern that cannot be served by `useFormContext()` — e.g. form state shared across non-descendant components. At that point, adding a `methods` prop as an opt-in override is backwards compatible.
