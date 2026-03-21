# UX Flow: @lucas/ui v1 — Core Component Library

_Seeded from initiative.md at Discovery sign-off — 2026-03-21_

## Developer-consumer flow

The "user" is Lucas building a new project.

[Trigger] Developer starts a new project and runs `npm install @lucas/ui`
↓
[Step 1] Developer imports layout primitives (Box, Flex) and typography (Text, Heading)
to scaffold the page structure
↓
[Step 2] Developer reaches for Button, Card, Avatar to build content surfaces
↓
[Step 3] Developer adds a Form — wraps fields in <Form onSubmit={handler}>,
uses <Field name="email" label="Email" rules={{ required: true }}>
around <Input /> — field registration, error display, and layout are
handled automatically by the Field + react-hook-form integration
↓
[Decision] User submits form
→ Validation fails: inline errors appear below each Field
→ Validation passes: onSubmit fires, developer handles response
↓
[Step 4] Developer uses Modal or Drawer for contextual overlays; Alert for inline
feedback; Notification for transient messages (auto-dismisses after
configurable timeout); Tooltip for supplemental information
↓
[Step 5] Developer adds Pagination to a list view — links update the URL
automatically, browser back button works, pages are shareable
↓
[Outcome] Developer ships a consistent, accessible UI without rebuilding any
common pattern — visual and behavioural consistency guaranteed by tokens

## Edge states

- **Empty state:** `<EmptyState>` covers list/table views with no data —
  accepts icon, heading, description, and optional action slot
- **Error state:** Form fields display inline validation messages via Field;
  server errors surface through Alert placed above the form
- **Loading state:** Skeleton covers content-loading states for any surface;
  Button accepts a `loading` prop that disables interaction and shows a spinner;
  Notification auto-dismiss can be cancelled if the user hovers
