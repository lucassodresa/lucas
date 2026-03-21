# Stories: @lucas/ui v1 — Core Component Library

_Initiative: docs/initiatives/001-ui-v1-core-component-library/initiative.md_
_Session date: 2026-03-21_

## Stories

| ID      | Story             | Depends on |
| ------- | ----------------- | ---------- |
| 001-001 | layout-primitives | —          |
| 001-002 | typography        | —          |
| 001-003 | button            | —          |
| 001-004 | form-controls     | —          |
| 001-005 | form-system       | 001-004    |
| 001-006 | overlays          | —          |
| 001-007 | feedback          | —          |
| 001-008 | navigation        | —          |
| 001-009 | content           | —          |

---

## Story Detail

### 001-001 — layout-primitives

**As a** developer starting a new project
**I need to** import Box, Flex, and Separator from `@lucas/ui`
**So that** I can scaffold page structure and divide content regions without writing any custom layout CSS

**In scope**

- `Box` — polymorphic block-level container; Storybook story exists; WCAG AA audit only
- `Flex` — already implemented with Storybook story; WCAG AA audit only
- `Separator` — horizontal or vertical visual divider; new implementation + story; `role="separator"`, `aria-orientation`
- WCAG AA audit for all three

**Out of scope**

- Grid component
- Any layout prop that cannot be mapped to an existing token

**Dependencies**
Requires: —
Required by: —

**Technical notes**
Box and Flex are already implemented. Separator requires `role="separator"` and `aria-orientation` for accessibility. No new token categories expected.

**Refinement notes**
Confirm the prop API for Box before the session. Flex and Box already exist — scope is a11y audit only for those two.

---

### 001-002 — typography

**As a** developer building any page or component
**I need to** import Text and Heading from `@lucas/ui`
**So that** all typographic elements across my projects use the same scale, weight, and token-driven styles without custom CSS

**In scope**

- `Text` — already implemented with Storybook story; WCAG AA audit only
- `Heading` — polymorphic heading component (`h1`–`h6`) with size variants mapped to the type scale in `tokens.css`; new implementation + story
- WCAG AA audit for both

**Out of scope**

- `Label` component (scoped to the form system in 001-004)
- `Code` or `Blockquote` typographic variants

**Dependencies**
Requires: —
Required by: —

**Technical notes**
Heading follows the same polymorphic pattern as Text — the `as` prop must accept `h1`–`h6` and the visual size must be independent of the semantic level (e.g. `<Heading as="h2" size="xl">`).

**Refinement notes**
Text already exists — scope is a11y audit only. Confirm whether Heading needs a `weight` prop or if the type scale tokens cover weight implicitly.

---

### 001-003 — button

**As a** developer adding any interactive action to a page
**I need to** import Button from `@lucas/ui`
**So that** every action in my projects has a consistent visual style and keyboard/focus behaviour

**In scope**

- `Button` — already implemented with Storybook story; WCAG AA audit only
- Story must cover: variants, sizes, disabled state, loading state
- WCAG AA audit: focus ring, `aria-disabled`, `aria-busy` on loading state

**Out of scope**

- `IconButton` variant
- `ButtonGroup`

**Dependencies**
Requires: —
Required by: —

**Technical notes**
Button is already implemented. A11y audit is the only deliverable.

**Refinement notes**
Confirm existing variants and whether loading state is already supported before the session begins.

---

### 001-004 — form-controls

**As a** developer building any form
**I need to** import Input, Password, Checkbox, Select, and Switch from `@lucas/ui`
**So that** all form controls have a consistent visual style and work with `react-hook-form` without any custom wiring

**In scope**

- `Input` — text input with `error` prop for validation state styling
- `Password` — Input variant with show/hide toggle; toggle must be keyboard accessible
- `Checkbox` — controlled checkbox with `checked`, `onChange`, `ref`
- `Select` — native `<select>` wrapper with consistent styling and `error` prop
- `Switch` — toggle with `checked`, `onChange`, `ref`; must have visible label association
- All five must forward `ref` and accept controlled props compatible with `react-hook-form`'s `register` return
- Storybook stories and WCAG AA audit for all five

**Out of scope**

- `Label` as a standalone component (composed by Field in 001-005)
- Custom dropdown / combobox
- Multi-select

**Dependencies**
Requires: —
Required by: 001-005

**Technical notes**
All five components must expose a consistent ref-forwarding API. `react-hook-form`'s `register` returns `{ name, ref, onChange, onBlur }` — every control must accept these as props. The `error` prop drives visual error state; the error message is rendered by Field (001-005), not by the control.

**Refinement notes**
Define the shared prop interface for all five controls before implementation. Confirm Select uses native `<select>` — native is strongly preferred for v1 accessibility.

---

### 001-005 — form-system

**As a** developer wiring up any form
**I need to** import Form and Field from `@lucas/ui`
**So that** validation, error messages, submission handling, and field layout are handled once and consistently across all my projects

**In scope**

- `Form` — wraps `react-hook-form`'s `useForm`, exposes `onSubmit` handler, provides form context to children
- `Field` — compound component composing: a form control (passed as children), a `<label>` linked via `htmlFor`, and an inline error message driven by the form context
- Field must work with all five controls from 001-004
- Storybook stories: basic form, validation errors, server error via Alert, full login form example
- WCAG AA audit: label–input association, error message linked via `aria-describedby`

**Out of scope**

- Schema validation integration (Zod, Yup) — native RHF rules only for v1
- Multi-step form
- Field array / dynamic fields

**Dependencies**
Requires: 001-004
Required by: —

**Technical notes**
Form establishes `react-hook-form` context. Field reads from that context to display validation errors. The `aria-describedby` link between the error message and the control is the critical a11y requirement — coordination lives in Field, not in the individual controls.

**Refinement notes**
Decide whether Field renders its label above or inline, and whether this is configurable. Confirm the error display trigger — on submit only, or on blur as well.

---

### 001-006 — overlays

**As a** developer showing contextual content above the page
**I need to** import Modal, Drawer, and Tooltip from `@lucas/ui`
**So that** overlays across my projects have consistent behaviour, focus management, and keyboard accessibility without custom implementation

**In scope**

- `Modal` — dialog with backdrop, focus trap, `Escape` to close, `aria-modal`, `aria-labelledby`
- `Drawer` — slide-in panel (left or right) with same focus trap and keyboard requirements as Modal
- `Tooltip` — hover and focus-triggered label, positioned relative to trigger, `role="tooltip"`
- Storybook stories: open/close, form content inside Modal, keyboard navigation
- WCAG AA audit for all three

**Out of scope**

- `Popover`
- `BottomSheet` mobile variant
- Nested modals

**Dependencies**
Requires: —
Required by: —

**Technical notes**
Modal and Drawer both require focus trap — use an established library (`focus-trap-react` or equivalent). Body scroll lock when open. Tooltip must trigger on focus as well as hover. Tooltip positioning via Floating UI is recommended.

**Refinement notes**
Confirm whether Modal and Drawer share a common overlay primitive internally. Confirm Tooltip positioning strategy before implementation.

---

### 001-007 — feedback

**As a** developer communicating status to the user
**I need to** import Alert, Notification, and Skeleton from `@lucas/ui`
**So that** inline messages, transient notifications, and loading states look and behave consistently across all my projects

**In scope**

- `Alert` — inline status message with variants (info, success, warning, error); `role="alert"` for error/warning
- `Notification` — transient toast-style message with auto-dismiss after configurable timeout; dismiss pauses on hover
- `Skeleton` — placeholder mirroring content shape during loading; animated shimmer via CSS
- Storybook stories: all variants, auto-dismiss behaviour, shimmer animation
- WCAG AA audit: live region announcements for Alert and Notification

**Out of scope**

- Notification queue management / provider (future story)
- Standalone progress bar / spinner

**Dependencies**
Requires: —
Required by: —

**Technical notes**
Notification auto-dismiss requires a timer. Tests must use `vi.useFakeTimers({ shouldAdvanceTime: true })` with `userEvent.setup({ advanceTimers: vi.advanceTimersByTime })` per CLAUDE.md. Error alerts use `role="alert"` (assertive); informational messages use `aria-live="polite"`.

**Refinement notes**
Confirm default auto-dismiss timeout value. Confirm whether Notification positioning is the component's responsibility or the consumer's for v1.

---

### 001-008 — navigation

**As a** developer building multi-page or paginated content
**I need to** import Breadcrumb and Pagination from `@lucas/ui`
**So that** users can always understand where they are and move between pages with consistent, accessible, router-integrated controls

**In scope**

- `Breadcrumb` — ordered list of page hierarchy links; `nav aria-label="Breadcrumb"`; current page marked with `aria-current="page"`
- `Pagination` — router-integrated href links; browser back button works; optional `onChange` callback for non-URL contexts; current page via `aria-current="page"`
- Storybook stories: active states, first/last page edge cases, single-item Breadcrumb
- WCAG AA audit for both

**Out of scope**

- Infinite scroll
- Cursor-based pagination
- Mobile-specific pagination

**Dependencies**
Requires: —
Required by: —

**Technical notes**
Pagination must generate real `<a href>` links. A router adapter pattern (e.g. `renderLink` prop) keeps the component router-agnostic while still producing real links.

**Refinement notes**
Decide the router adapter pattern in Refinement — `renderLink` render prop, `LinkComponent` prop, or a hook. This affects how Next.js and React Router projects consume the component.

---

### 001-009 — content

**As a** developer building content surfaces
**I need to** import Card, Avatar, and Empty State from `@lucas/ui`
**So that** content containers, user representations, and zero-data states look and behave consistently across all my projects

**In scope**

- `Card` — surface container with consistent padding, border, and shadow from tokens; accepts any children
- `Avatar` — user image with fallback to initials or generic icon; sizes from token scale; `alt` text required
- `EmptyState` — composed layout of icon slot, heading, description, and optional action slot
- Storybook stories: Card with/without sections, Avatar with image and fallback, EmptyState with/without action
- WCAG AA audit: Avatar `alt` text, EmptyState heading hierarchy

**Out of scope**

- `CardGroup`
- `AvatarGroup`
- Animated empty states

**Dependencies**
Requires: —
Required by: —

**Technical notes**
EmptyState should compose Text and Heading from 001-002 — soft dependency, but typography will ship before content in practice. These are the lowest-risk stories in the initiative.

**Refinement notes**
Confirm whether Card needs explicit `header` and `footer` slot props or if composition via children is sufficient.

---

## Open Questions

None — all questions resolved during Story Mapping.

## Sign-off

- Approved by: Lucas
- Date: 2026-03-21
- Ready for: Refinement
