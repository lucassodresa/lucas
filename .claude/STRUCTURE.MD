# Initiative Folder Structure

This document defines the canonical folder structure for every initiative. Every command, session file, and agent that reads or writes files must follow this structure exactly.

Each initiative folder is a complete, self-contained record — the problem, the decisions, the design, the architecture, and every ticket with its plan and findings. Anyone joining the team should be able to open an initiative folder and understand everything without asking anyone.

---

## Root Location

```
docs/
  initiatives/
    <NNN>-<initiative-name>/
```

`<NNN>` is a zero-padded sequence number across all initiatives.
`<initiative-name>` is short, lowercase, and hyphenated.

Examples:

```
docs/initiatives/001-notifications-system/
docs/initiatives/002-user-onboarding/
docs/initiatives/003-payment-retry-flow/
```

---

## Full Structure

```
docs/initiatives/<NNN>-<initiative-name>/
  initiative.md                  ← output of Discovery session
  stories.md                     ← output of Story Mapping session

  design/                        ← all UX and visual design artifacts
    ux-flow.md                   ← living UX flow, seeded in Discovery
    wireframes/                  ← screen wireframes, created in Refinement if needed
      <screen-name>.png
    mockups/                     ← high-fidelity mockups if needed
      <screen-name>.png

  architecture/                  ← all technical design artifacts
    diagrams/                    ← architecture and sequence diagrams if needed
      <diagram-name>.png
      <diagram-name>.md          ← mermaid/ASCII alternative
    adr/                         ← Architecture Decision Records if needed
      <NNN>-<decision-name>.md

  tickets/                       ← one folder per story
    <initiative-NNN>-<ticket-NNN>-<story-name>/
      ticket.md                  ← output of Refinement session
      plan.md                    ← output of Planning session
      findings.md                ← only if implementation returns to Planning
```

---

## File Reference

### `README.md`

Entry point for the initiative. Written at Discovery sign-off, updated as each phase completes.

Contains:

- Initiative name and one-sentence description
- Problem being solved
- Current phase and status
- Links to `initiative.md`, `stories.md`, `design/`, key tickets
- Sign-off history per phase

---

### `initiative.md`

Output of the Discovery session. Written by the Product Agent on stakeholder sign-off.

Contains:

- Problem statement in user outcome terms
- Proposed solution
- UX flow rough draft (also copied to `design/ux-flow.md`)
- Rejected alternatives with reasoning
- Success metrics
- Scope boundaries — in and out
- Assumptions with risk levels
- Open questions with owners
- Stakeholder sign-off

**Produced by:** `/discovery` command
**Read by:** Story Mapping session
**Gate:** Stakeholder sign-off before Story Mapping begins

**Template:**

```markdown
# Initiative: [Name]

## Status

Current phase: Story Mapping
| Phase | Approved by | Date |
|---|---|---|
| Discovery | | |
| Story Mapping | | |

## Problem Statement

What user/business problem are we solving and why now?
Written in user outcome terms — not system terms.

## Proposed Solution

What are we building at a high level?

## UX Flow (rough)

[Trigger] User is on <screen/context> and <situation occurs>
↓
[Step 1] User sees <what>
↓
[Decision] If <condition> → <path A> / else → <path B>
↓
[Outcome] User arrives at <end state> — feels <outcome>

Edge states:

- Empty state: <what the user sees when there is no data>
- Error state: <what the user sees when something goes wrong>
- Loading state: <what the user sees while waiting>

## Rejected Alternatives

| Alternative | Why rejected |
| ----------- | ------------ |
| <option>    | <reasoning>  |

## Success Metrics

| Metric   | How measured         |
| -------- | -------------------- |
| <metric> | <measurement method> |

## Scope Boundaries

### In scope

- <item>

### Out of scope

- <item>

## Assumptions

| Assumption   | Risk if wrong       |
| ------------ | ------------------- |
| <assumption> | High / Medium / Low |

## Open Questions

| Question   | Owner                         |
| ---------- | ----------------------------- |
| <question> | Stakeholder / Research / Team |

## Stakeholder Sign-off

- Approved by:
- Date:
- Ready for: Story Mapping
```

---

### `stories.md`

Output of the Story Mapping session. Written by the Product Owner on stakeholder sign-off.

Contains:

- Epics with descriptions
- User stories per epic — as a / I need to / so that
- Scope per story — in and out
- Dependencies between stories
- Technical notes from the Architect
- Delivery sequence table
- Open questions for Refinement
- Stakeholder sign-off

**Produced by:** `/story-mapping` command
**Read by:** Refinement session, one story at a time
**Gate:** Stakeholder sign-off before Refinement begins

**Template:**

```markdown
# Stories: [Initiative Name]

_Initiative: docs/initiatives/<NNN>-<initiative-name>/initiative.md_
_Session date: <date>_

## Stories

| ID      | Story        | Depends on |
| ------- | ------------ | ---------- |
| 001-001 | <story name> | —          |
| 001-002 | <story name> | 001-001    |
| 001-003 | <story name> | —          |

---

## Story Detail

### <ID> — <story name>

**As a** <specific user>
**I need to** <job or action>
**So that** <outcome or value>

**In scope**

- <item>

**Out of scope**

- <item>

**Dependencies**
Requires: <ticket ID or none>
Required by: <ticket ID or none>

**Technical notes**
<Architect flags — data model implications, shared dependencies, sequencing risks>
<Leave empty if none>

**Refinement notes**
<Known ambiguities or open questions for Refinement to resolve>
<Leave empty if none>

---

[repeat for each story]

## Open Questions

| Question   | Relevant story | Owner                    |
| ---------- | -------------- | ------------------------ |
| <question> | <ticket ID>    | Refinement / Stakeholder |

## Sign-off

- Approved by:
- Date:
- Ready for: Refinement
```

---

### `design/ux-flow.md`

The living UX flow for the initiative. Seeded from the rough flow in `initiative.md` at Discovery sign-off. Updated during Refinement as stories add detail or the flow changes.

This is the primary design reference for the dev team throughout delivery.

---

### `design/wireframes/` and `design/mockups/`

Only created when the UX flow text is not enough to make a screen unambiguous for the dev team. Not required by default.

Naming: `<screen-name>.png` — lowercase, hyphenated, descriptive.
Examples: `notification-list.png`, `channel-settings-empty-state.png`

---

### `architecture/diagrams/`

Created during Planning when a technical design cannot be communicated clearly in prose. Not required by default.

Two formats:

- `.png` — exported diagram
- `.md` — Mermaid or ASCII diagram embedded in markdown

Examples: `notification-service-overview.png`, `checkout-sequence.md`

---

### `architecture/adr/<NNN>-<decision-name>.md`

One file per significant architectural decision. Created by the Architect during any phase when a decision is non-obvious, has real tradeoffs, or may need revisiting. Not required by default.

Naming: `<NNN>` zero-padded, scoped to this initiative.
Examples: `001-use-websockets.md`, `002-separate-notification-service.md`

Each ADR contains:

- **Status** — proposed / accepted / superseded
- **Context** — what situation required a decision
- **Decision** — what was decided
- **Alternatives considered** — what else was evaluated
- **Consequences** — what this makes easier, harder, or different
- **Date**

---

### `tickets/<initiative-NNN>-<ticket-NNN>-<story-name>/ticket.md`

Output of the Refinement session for one story. Written by the Product Owner with the team on sign-off.

`<initiative-NNN>` matches the initiative number. `<ticket-NNN>` is a zero-padded sequence number scoped to this initiative, matching the delivery sequence from `stories.md`.

Contains:

- Story context — traces back to `stories.md`
- Full story statement — as a / I need to / so that
- Scope — in and out
- Acceptance criteria in Given/When/Then
- Test scenarios — happy path, error paths, edge cases, empty states
- Design reference — link to `design/ux-flow.md` or specific wireframe
- Technical notes from Architect, FE Dev, BE Dev
- Open questions resolved in the session
- Team sign-off

**Produced by:** `/refinement` command
**Read by:** Planning session
**Gate:** PO + team sign-off before Planning begins

---

### `tickets/<initiative-NNN>-<ticket-NNN>-<story-name>/plan.md`

Output of the Planning session for one story. Written by the Architect, FE Dev, and BE Dev on sign-off.

Contains:

- Link to `ticket.md` in the same folder
- API contract — agreed between FE and BE, signed off by Architect
- Frontend implementation plan — components, state, routing, test approach
- Backend implementation plan — data model, endpoints, business logic, migrations
- Implementation sequence — ordered steps for FE and BE
- Risk areas from codebase exploration
- Rejected approaches with reasoning
- Links to any diagrams or ADRs created for this ticket
- Team sign-off

**Produced by:** `/planning` command
**Read by:** Implementation session
**Gate:** Stakeholder sign-off before Implementation begins

---

### `tickets/<initiative-NNN>-<ticket-NNN>-<story-name>/findings.md`

Only created when implementation cannot proceed with the current plan. Written by the developer who hit the blocker.

Contains:

- What was being implemented when the blocker was found
- What was discovered in the codebase
- What the discovery breaks in the current plan
- Options identified with tradeoffs
- Recommendation
- Link to `plan.md` in the same folder

When written, implementation stops and the Planning session is re-entered with this file as input.

**Produced by:** `/implementation` command on blocker
**Read by:** Planning session on replan
**Gate:** None — triggers automatic return to Planning

---

## Fully Populated Example

```
docs/initiatives/001-notifications-system/
  README.md                                     ✓
  initiative.md                                 ✓ signed off
  stories.md                                    ✓ signed off

  design/
    ux-flow.md                                  ✓
    wireframes/
      notification-list.png                     ✓
      channel-settings.png                      ✓

  architecture/
    diagrams/
      notification-service-overview.png         ✓
    adr/
      001-use-websockets.md                     ✓
      002-separate-notification-service.md      ✓

  tickets/
    001-001-user-receives-notification/
      ticket.md                                 ✓ signed off
      plan.md                                   ✓ signed off
      findings.md                               ✓ replanning

    001-002-admin-configures-channels/
      ticket.md                                 ✓ signed off
      plan.md                                   ← in planning

    001-003-notification-preferences/
      ticket.md                                 ← in refinement
```

---

## Naming Conventions

| Thing              | Convention                             | Example                              |
| ------------------ | -------------------------------------- | ------------------------------------ |
| Initiative folder  | `NNN-initiative-name`                  | `001-notifications-system`           |
| Ticket folder      | `initiative-NNN-ticket-NNN-story-name` | `001-001-user-receives-notification` |
| Wireframe / mockup | `screen-name.png`                      | `notification-list.png`              |
| Diagram            | `diagram-name.png` or `.md`            | `notification-service-overview.png`  |
| ADR                | `NNN-decision-name.md`                 | `001-use-websockets.md`              |

---

## Phase Status at a Glance

The presence of files tells you where each ticket is without any labels:

| Files present in ticket folder          | Status                                        |
| --------------------------------------- | --------------------------------------------- |
| —                                       | Story exists in `stories.md`, not yet refined |
| `ticket.md` only                        | In Refinement or awaiting Planning            |
| `ticket.md` + `plan.md`                 | In Planning or Implementation                 |
| `ticket.md` + `plan.md` + `findings.md` | Blocked — returned to Planning                |

---

## Cross-Phase Traceability

```
findings.md
  → plan.md (same folder)
      → ticket.md (same folder)
          → stories.md (initiative root)
              → initiative.md (initiative root)
                  → README.md (initiative root)
```

Every artifact traces back to the original problem statement. No navigation across folders required — ticket, plan, and findings are always in the same place.

---

## Optional Artifacts — When to Create

| Artifact                 | Create when                                                   |
| ------------------------ | ------------------------------------------------------------- |
| `design/wireframes/`     | UX flow text is ambiguous for a specific screen               |
| `design/mockups/`        | Visual fidelity beyond wireframes is needed                   |
| `architecture/diagrams/` | Technical design cannot be explained clearly in prose         |
| `architecture/adr/`      | A decision is non-obvious, has tradeoffs, or may be revisited |
| `findings.md`            | Implementation hits a blocker that breaks the current plan    |

Not every initiative needs all of these. Create them when they add clarity — not by default.
