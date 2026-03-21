# @lucas/ui v1 — Core Component Library

24 core components covering every UI pattern needed on day one of any new project.
Documented in Storybook, conforming to WCAG AA accessibility, built on the existing
design token system.

## Status

| Phase         | Approved by | Date       |
| ------------- | ----------- | ---------- |
| Discovery     | Lucas       | 2026-03-21 |
| Story Mapping | Lucas       | 2026-03-21 |

## Problem Statement

When starting a new personal project, Lucas has no shared component library to draw
from — meaning common UI patterns (forms, modals, feedback states, layout) are rebuilt
from scratch each time. This produces visual and behavioural inconsistency across
projects and wastes time on solved problems.

The goal is a v1 component library that covers every UI pattern needed on day one of
any new project, so the first `import` from `@lucas/ui` is immediately productive.

## Proposed Solution

Deliver 24 core components under `@lucas/ui`, documented in Storybook and conforming
to WCAG AA accessibility. A full Form system — built on `react-hook-form` — includes
a `Field` compound component that composes any form control with its label and inline
validation error. Notification supports auto-dismiss with a configurable timeout.
Pagination is router-integrated (generates real href links, works with browser history)
with an optional `onChange` callback for non-URL contexts.

### Component Inventory

| Category    | Components                                             |
| ----------- | ------------------------------------------------------ |
| Layout      | Box, Flex, Separator                                   |
| Typography  | Text, Heading                                          |
| Form system | Form, Field, Input, Password, Checkbox, Select, Switch |
| Overlays    | Modal, Drawer, Tooltip                                 |
| Feedback    | Alert, Notification, Skeleton                          |
| Navigation  | Breadcrumb, Pagination                                 |
| Content     | Card, Avatar, Empty State                              |
| Action      | Button                                                 |

## UX Flow (rough)

Developer-consumer flow — the "user" is Lucas building a new project.

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

Edge states:

- Empty state: `<EmptyState>` covers list/table views with no data —
  accepts icon, heading, description, and optional action slot
- Error state: Form fields display inline validation messages via Field;
  server errors surface through Alert placed above the form
- Loading state: Skeleton covers content-loading states for any surface;
  Button accepts a `loading` prop that disables interaction and shows a spinner;
  Notification auto-dismiss can be cancelled if the user hovers

## Rejected Alternatives

| Alternative                         | Why rejected                                                                         |
| ----------------------------------- | ------------------------------------------------------------------------------------ |
| Headless/unstyled components only   | Defeats the consistency goal — each project would still apply its own styles         |
| Form as layout wrapper only         | Would require rebuilding validation wiring per project; Field solves it once         |
| Defer Storybook to a later phase    | Undocumented components get used inconsistently — docs are part of the contract      |
| Callback-only Pagination            | Forces every project to wire up the router manually; router integration does it once |
| Include date picker in v1           | High complexity, low immediate need — added when a project requires it               |
| Include data table with sort/filter | Too large for v1; Pagination is included to support tables built later               |

## Success Metrics

| Metric                                             | How measured                                                     |
| -------------------------------------------------- | ---------------------------------------------------------------- |
| All 24 components pass WCAG AA audit               | Storybook a11y addon reports zero violations per component       |
| 100% test coverage on all components               | Vitest coverage thresholds enforced in vitest.config.ts          |
| Every component has a Storybook story              | Storybook builds without errors; all components visible in UI    |
| First new project uses @lucas/ui without additions | Next project ships with zero new UI primitives added outside lib |

## Scope Boundaries

### In scope

- Box, Flex, Separator (layout)
- Text, Heading (typography)
- Button (action)
- Form, Field, Input, Password, Checkbox, Select, Switch (form system, react-hook-form)
- Modal, Drawer, Tooltip (overlays)
- Alert, Notification with auto-dismiss (feedback)
- Breadcrumb, Pagination with router integration (navigation)
- Card, Avatar, Empty State (content)
- Storybook documentation for all 24 components
- WCAG AA accessibility for all 24 components

### Out of scope

- Dark mode / theming system (single token-driven theme only for v1)
- Date / time picker
- Rich text editor
- Data table with sorting and filtering
- Combobox / autocomplete
- File upload
- Color picker
- Any component not in the 24-item list above

## Assumptions

| Assumption                                             | Risk if wrong                                                          |
| ------------------------------------------------------ | ---------------------------------------------------------------------- |
| react-hook-form is the form management library         | Medium — different library would require Field API redesign            |
| WCAG AA is the target accessibility level              | Medium — AAA would require rework on some interactive components       |
| Components are consumed in React 18+ projects only     | Low — React 18 is already in use in this repo                          |
| Single visual theme is sufficient for v1               | Low — CSS custom property architecture already supports future theming |
| Existing tokens.css covers all 24 components           | Low — gaps filled as components are built                              |
| Pagination router is determined at implementation time | Low — component will be designed to accept a router adapter            |

## Open Questions

None — all questions resolved during Discovery.

## Stakeholder Sign-off

- Approved by: Lucas
- Date: 2026-03-21
- Ready for: Story Mapping
