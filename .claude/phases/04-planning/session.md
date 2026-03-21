# Phase 4 — Planning Session

## Purpose

Translate a refined `ticket.md` into a precise `plan.md` that the developers can execute without ambiguity. The session ends when the API contract is agreed, the implementation approach is defined for both FE and BE, the risk areas are named, and the implementation sequence is ordered.

No code is written until this plan is approved. The plan is the contract between the team and the implementation.

---

## Prerequisites

- `tickets/<initiative-NNN>-<ticket-NNN>-<story-name>/ticket.md` exists and is signed off
- Refinement is signed off before Planning begins
- The codebase is accessible — agents explore actual code, not assumptions

---

## Participants

| Agent                  | Role file                                    | Focus in this session                                                                                                                                                              |
| ---------------------- | -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Architect**          | `.claude/agents/roles/architect-agent.md`    | Sets architectural boundaries. Reviews all proposed approaches for system consistency. Owns the API contract as the seam between FE and BE. Creates ADRs and diagrams when needed. |
| **Frontend Developer** | `.claude/agents/roles/frontend-dev-agent.md` | Explores the codebase. Proposes the FE implementation approach. Negotiates the API contract from the client perspective. Owns the FE section of `plan.md`.                         |
| **Backend Developer**  | `.claude/agents/roles/backend-dev-agent.md`  | Explores the codebase and schema. Proposes the BE implementation approach. Negotiates the API contract from the server perspective. Owns the BE section of `plan.md`.              |

Each agent reads their role file before the session begins. The role file defines who they are. This file defines what they are here to do in this session specifically.

---

## Communication Rules

**Architect sets the boundaries — developers plan within them.**
The Architect defines the architectural constraints the implementation must respect. FE and BE Dev propose their approaches within those constraints. If a developer's approach conflicts with an architectural boundary, they raise it explicitly and the Architect decides — not the developer.

**The API contract negotiation is the critical moment.**
FE and BE negotiate what the contract looks like. Both bring specific needs — FE needs a response shape that serves the UI cleanly, BE needs a contract that maps efficiently to the data model. The Architect has final authority if they cannot align. The contract must be agreed before either developer plans their implementation sequence.

**Agents explore the actual codebase before proposing anything.**
No agent plans from memory or assumption. Every proposed approach is grounded in what actually exists in the codebase. If the codebase is not what an agent expected, that is a finding — raise it before planning around it.

**Escalate to the stakeholder only when:**

- A technical decision has product implications — changes what is delivered or how it behaves for the user
- A significant scope change is discovered during codebase exploration
- An architectural constraint requires a product tradeoff the stakeholder must decide

---

## Input

Before proposing anything, all agents read:

- `docs/initiatives/<NNN>-<initiative-name>/tickets/<initiative-NNN>-<ticket-NNN>-<story-name>/ticket.md` — the full refined ticket
- `docs/initiatives/<NNN>-<initiative-name>/initiative.md` — initiative context and scope boundaries
- `docs/initiatives/<NNN>-<initiative-name>/design/ux-flow.md` — UX flow reference

Then explore the codebase directly — relevant files, existing patterns, data models, service boundaries, shared components. Do not plan from memory.

---

## Session Flow

### Step 1 — Ticket Read and Codebase Exploration

All three agents read `ticket.md` independently. Each then explores the parts of the codebase relevant to their domain before any discussion begins.

| Agent                  | What they explore                                                                                                                                                                         |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Architect**          | System boundaries relevant to this ticket. Existing patterns the implementation should follow. Data model and schema. Any prior ADRs that affect this ticket. Areas of high blast radius. |
| **Frontend Developer** | Existing components that could be reused or extended. Current routing and state management patterns. Similar flows already implemented. The design reference in `ux-flow.md`.             |
| **Backend Developer**  | Existing schema and data model. Relevant service and repository layers. Similar endpoints already implemented. Current validation and error handling patterns.                            |

After exploration each agent shares what they found — particularly anything that differs from what the ticket assumed. Findings that break a ticket assumption are raised immediately before planning begins.

---

### Step 2 — API Contract Negotiation

The Architect facilitates. FE Dev and BE Dev negotiate the contract — the seam between their two domains.

**FE Dev brings:**

- What data the UI needs and in what shape to avoid overfetching or underfetching
- What error codes and shapes the client needs to handle different failure scenarios meaningfully
- What response timing the UI can tolerate before loading states become necessary
- What pagination, filtering, or sorting the client needs

**BE Dev brings:**

- What response shapes are natural and efficient to produce given the data model
- What consistency guarantees they can and cannot make
- What the backend can support efficiently vs what would be expensive per request
- What error distinctions are meaningful from the server perspective

**The Architect:**

- Ensures the contract follows existing API patterns in the codebase
- Resolves disagreements between FE and BE with a final decision and reasoning
- Flags if the contract implies an ADR — a non-obvious decision with real tradeoffs

The contract is not final until the Architect signs off on it. Once agreed, it is locked — neither developer deviates from it during implementation without renegotiating.

If a diagram is needed to communicate the contract or system interaction clearly, the Architect produces it and it is referenced in `plan.md`.

---

### Step 3 — Frontend Implementation Plan

FE Dev defines their implementation approach based on the agreed contract and codebase exploration.

Covers:

- **Components to create** — name, responsibility, props interface, why new rather than extending existing
- **Components to modify** — which file, what changes, blast radius of changing it
- **State design** — what state exists, where it lives, what triggers re-renders
- **Client-side routing** — any route changes, state preservation on navigation
- **Error and loading handling** — how each state is handled at the component level
- **Implementation sequence** — ordered steps, typically shell first then data then edge cases
- **Test approach** — unit, component, and integration test boundaries
- **Risk areas** — widely used components, complex state interactions, performance concerns

The Architect reviews the FE plan for consistency with existing frontend patterns. If a proposed approach introduces a new pattern, the Architect either accepts it with reasoning or redirects to an existing pattern.

---

### Step 4 — Backend Implementation Plan

BE Dev defines their implementation approach based on the agreed contract and codebase exploration.

Covers:

- **Data model changes** — schema changes, migration strategy, reversibility, impact on existing queries
- **API endpoints** — new or modified endpoints, request validation, response shape per contract, error codes
- **Business logic** — rules being implemented, where they live, edge cases in the logic
- **Persistence approach** — query design, index usage, transaction boundaries, caching if applicable
- **Side effects** — events, notifications, queue messages — what is triggered, when, sync vs async, failure strategy
- **Implementation sequence** — ordered steps, typically data model first then logic then API then side effects
- **Test approach** — unit, integration, and contract test boundaries
- **Risk areas** — migrations on live data, queries with scale concerns, operations that are not idempotent

The Architect reviews the BE plan for consistency with existing backend patterns, service boundaries, and data model conventions.

---

### Step 5 — Risk Review and Plan Finalisation

The Architect leads a final review of the complete plan — FE plan, BE plan, and API contract together.

The Architect assesses:

- Are there risks in the combined plan that are not visible when looking at FE or BE in isolation?
- Does anything in the plan require an ADR — a decision non-obvious enough to record?
- Is the implementation sequence correct — does BE produce what FE needs before FE needs it?
- Are there any blast radius concerns that were not caught in individual reviews?

After the Architect's review, each developer finalises their implementation sequence. The sequences are cross-checked — if BE needs to ship something before FE can integrate it, the sequences must reflect that.

---

## ADRs and Diagrams

The Architect creates an ADR when a decision made in this session is:

- Non-obvious — not the natural default approach
- Has real tradeoffs — other reasonable options exist
- May need revisiting — future work might want to understand why this was decided

ADRs are written to:

```
docs/initiatives/<NNN>-<initiative-name>/architecture/adr/<NNN>-<decision-name>.md
```

The Architect creates a diagram when the technical design cannot be communicated clearly in prose — system component relationships, sequence of operations across services, data flow. Diagrams are written to:

```
docs/initiatives/<NNN>-<initiative-name>/architecture/diagrams/<diagram-name>.md
```

Both are referenced in `plan.md` if created.

---

## Artifact Ownership

| Artifact             | Owner               | When produced                              |
| -------------------- | ------------------- | ------------------------------------------ |
| `plan.md`            | Architect (overall) | End of session, after stakeholder sign-off |
| API contract section | Architect           | Step 2                                     |
| FE plan section      | Frontend Developer  | Step 3                                     |
| BE plan section      | Backend Developer   | Step 4                                     |
| ADRs                 | Architect           | When needed, Steps 2–5                     |
| Diagrams             | Architect           | When needed, Steps 2–5                     |

---

## Sign-off

Before writing `plan.md`, the Architect presents the full plan to the stakeholder:

- The agreed API contract
- The FE and BE implementation approaches
- The combined implementation sequence
- Risk areas identified
- Any ADRs or diagrams produced
- Rejected approaches and their reasoning

The stakeholder reviews and either:

- **Approves** — `plan.md` is written, session closes, ticket is ready for Implementation
- **Requests a change** — panel re-enters the affected step and resolves the concern
- **Raises a product concern** — if the plan implies something different from what the stakeholder expected, the relevant ticket section is reopened

---

## Return from Implementation

If Implementation returns to Planning with a `findings.md`, the session re-opens as follows:

1. All three agents read `findings.md` in full
2. Architect assesses which sections of `plan.md` are broken by the findings
3. FE Dev and BE Dev propose adjustments to their respective plans
4. API contract is renegotiated if findings affect it
5. Plan is updated, re-presented, and re-approved before Implementation resumes

The updated `plan.md` must note the replan — what changed, what triggered it, and a reference to `findings.md`.

---

## On Approval

The session writes `plan.md` to:

```
docs/initiatives/<NNN>-<initiative-name>/tickets/<initiative-NNN>-<ticket-NNN>-<story-name>/plan.md
```

Any ADRs and diagrams produced are written to their respective folders under `architecture/`.

---

## Output — `plan.md`

Follows the template defined in `.claude/STRUCTURE.md` exactly:

```markdown
# Plan <ID>: <story name>

_Ticket: ./ticket.md_
_Replanned from: ./findings.md_ ← only if this is a replan

## API Contract

<agreed between FE and BE, signed off by Architect>
<leave empty if no API changes>

### Endpoints

**Method and path:** <e.g. POST /api/notifications>
**Request:**
<request shape>

**Response (success):**
<response shape>

**Error codes:**
| Code | Meaning |
|---|---|
| <code> | <meaning> |

## Frontend Plan

**Components to create:**
| Component | Responsibility | Why new |
|---|---|---|

**Components to modify:**
| Component | Change | Blast radius |
|---|---|---|

**State design:**
<what state exists, where it lives, what triggers re-renders>

**Implementation sequence:**

1. <step>
2. <step>

**Test approach:**
<unit, component, integration test boundaries>

**Risk areas:**
<things to watch — blast radius, performance, complex state>

## Backend Plan

**Data model changes:**
<schema changes, migration strategy, reversibility>

**Endpoints:**
<implementation notes per endpoint>

**Business logic:**
<rules, validations, state transitions>

**Side effects:**
<events, notifications, queue messages — what, when, sync/async, failure strategy>

**Implementation sequence:**

1. <step>
2. <step>

**Test approach:**
<unit, integration, contract test boundaries>

**Risk areas:**
<migrations, scale concerns, non-idempotent operations>

## Rejected Approaches

| Approach   | Why rejected |
| ---------- | ------------ |
| <approach> | <reasoning>  |

## ADRs and Diagrams

<links to architecture/adr/ or architecture/diagrams/ if created>
<none if not applicable>

## Sign-off

- Approved by:
- Date:
- Ready for: Implementation
```

---

## What This Session Does Not Cover

- Writing code — that is Implementation
- Test implementation — that is Implementation
- Acceptance criteria — already defined in `ticket.md`, not redefined here
- Product scope decisions — already defined in `ticket.md`, not reopened here unless a finding forces it

If implementation details arise that go beyond the plan boundary, the relevant developer flags them as a risk area. They do not get resolved here — they get resolved when Implementation starts and raises a finding if needed.
