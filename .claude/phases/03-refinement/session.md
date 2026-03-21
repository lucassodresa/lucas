# Phase 3 — Refinement Session

## Purpose

Transform a story from `stories.md` into a fully refined `ticket.md` that the team can plan and implement without ambiguity. The session ends when every requirement is specific, every acceptance criterion is testable, every edge case is named, and every open question has an owner.

The Product Owner presents. The team interrogates. Nothing leaves the session vague.

---

## Prerequisites

- `docs/initiatives/<NNN>-<initiative-name>/stories.md` exists and is signed off
- The ticket folder `tickets/<initiative-NNN>-<ticket-NNN>-<story-name>/` exists and is empty
- Story Mapping is signed off before Refinement begins
- Stories are refined one at a time — do not begin the next ticket until the current one is signed off

---

## Participants

| Agent                  | Role file                                     | Focus in this session                                                                                                                                                                    |
| ---------------------- | --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Product Owner**      | `.claude/agents/roles/product-owner-agent.md` | Presents the story. Owns `ticket.md`. Resolves ambiguity. Protects scope. Ensures every requirement is testable before sign-off.                                                         |
| **UX/Designer**        | `.claude/agents/roles/ux-designer-agent.md`   | Validates flow completeness — empty, error, and loading states. Flags when requirements are technically sound but experientially broken. Ensures the user's job is reflected in the ACs. |
| **Frontend Developer** | `.claude/agents/roles/frontend-dev-agent.md`  | Raises UI and interaction questions — states, data needs, feedback, edge cases from the client perspective.                                                                              |
| **Backend Developer**  | `.claude/agents/roles/backend-dev-agent.md`   | Raises data, API, consistency, and failure mode questions from the server perspective.                                                                                                   |
| **Architect**          | `.claude/agents/roles/architect-agent.md`     | Flags technical implications — data model impact, cross-cutting concerns, blast radius, consistency requirements.                                                                        |
| **QA Engineer**        | `.claude/agents/roles/qa-agent.md`            | Defines test scenarios. Probes edge cases, error states, boundary conditions. Ensures every AC is verifiable.                                                                            |

Each agent reads their role file before the session begins. The role file defines who they are. This file defines what they are here to do in this session specifically.

---

## Communication Rules

**Product Owner drives and owns the session.**
They present the story, answer questions from the team, make scope decisions, and are responsible for the final `ticket.md`. Every question the team raises is directed at the PO. The PO resolves what they can, escalates to the stakeholder what they cannot, and documents what cannot be resolved as an open question.

**The team interrogates — they do not design.**
FE Dev, BE Dev, Architect, and QA raise questions and surface gaps. They do not decide what gets built — the PO does. Their job is to make the requirement specific enough that they can build it without guessing.

**Each agent interrogates from their own lens.**
No agent speaks outside their domain. FE Dev asks about UI states and client-side behavior. BE Dev asks about data ownership and failure modes. Architect asks about system implications. QA asks about scenarios and verifiability. They do not duplicate each other.

**Escalate to the stakeholder only when:**

- A requirement gap requires a product decision only the stakeholder can make
- A scope question cannot be resolved from `initiative.md` or `stories.md`
- Two agents are deadlocked and the resolution requires business judgment

---

## Input

Before the session begins, all agents read:

- `docs/initiatives/<NNN>-<initiative-name>/initiative.md` — initiative context and scope boundaries
- `docs/initiatives/<NNN>-<initiative-name>/stories.md` — the full story definition for `$TICKET_ID`
- `docs/initiatives/<NNN>-<initiative-name>/design/ux-flow.md` — the UX flow reference
- `docs/initiatives/<NNN>-<initiative-name>/design/wireframes/<story-name>.md` — component spec, if produced by `/ux-design` in Step 0

No agent raises a question that is already answered in these documents.

---

## Session Flow

### Step 0 — Design Check

Before the story is presented, the UX/Designer reads the story from `stories.md` and makes a single determination: **does this story need a component design spec before Refinement can proceed?**

A story needs a design spec when:

- It introduces interactive states (hover, focus, error, loading, disabled) that are not fully defined by the token system alone
- It has multiple visual variants whose layout or structure is ambiguous without a reference
- It contains overlays, animations, or positioning behaviour that the team cannot build against without a visual description

A story does **not** need a design spec when:

- It is a layout primitive or container whose appearance is entirely token-driven
- It is an existing component requiring only an a11y audit
- The component's states are fully described in the `stories.md` refinement notes and UX flow

**If a design spec is needed:**
The UX/Designer signals this before the PO presents. The session pauses. `/ux-design` runs for this specific story — the designer produces the component spec and it is approved by the stakeholder. Once the spec is written and saved to `design/wireframes/<story-name>.md`, the session resumes from Step 1 with the spec as an additional input.

**If no design spec is needed:**
The session proceeds directly to Step 1.

---

### Step 1 — Story Presentation

The Product Owner presents the story to the team following the structure from their role file:

1. **Context** — why does this story exist? What initiative does it serve? What user problem does it solve?
2. **The story** — who is the user, what do they need to do, and why? In plain language.
3. **Scope** — what is explicitly in scope and explicitly out of scope for this ticket
4. **Design reference** — walks the team through the relevant section of `design/ux-flow.md`
5. **Known open questions** — anything flagged in `stories.md` under Refinement notes

After the presentation, each agent forms their questions independently before the panel discussion begins.

---

### Step 2 — Team Interrogation

Each agent raises their questions in turn. The Product Owner responds, makes decisions, and updates their mental model of the ticket in real time.

**UX/Designer interrogates around:**

| Question area            | What they are probing                                                                                        |
| ------------------------ | ------------------------------------------------------------------------------------------------------------ |
| **Flow completeness**    | Are all states defined — loading, empty, error, success? Is any state left unspecified?                      |
| **User job**             | Does the requirement reflect what the user is actually trying to accomplish, or just what the system does?   |
| **Interaction feedback** | Will the user know what is happening at each step? Is every action confirmed or acknowledged?                |
| **Friction**             | Are there unnecessary steps, ambiguous labels, or moments where the user could get lost or confused?         |
| **Consistency**          | Does this match interaction patterns the user already knows from other parts of the product?                 |
| **Edge case users**      | Are there user types — first-time, returning, under pressure — whose experience will differ and need design? |

**Frontend Developer interrogates around:**

| Question area         | What they are probing                                                                          |
| --------------------- | ---------------------------------------------------------------------------------------------- |
| **UI states**         | What does the user see in every state — loading, loaded, empty, error? Are all states defined? |
| **Data needs**        | What data does the UI need? In what shape? From where?                                         |
| **Interactions**      | What can the user do? What happens immediately vs after a round trip?                          |
| **Feedback**          | How does the user know their action was received, succeeded, or failed?                        |
| **Edge cases**        | What happens with no data, max data, slow responses, failed responses?                         |
| **Existing patterns** | Does a similar pattern already exist? Should this follow it?                                   |

**Backend Developer interrogates around:**

| Question area         | What they are probing                                                                     |
| --------------------- | ----------------------------------------------------------------------------------------- |
| **Data ownership**    | Where does this data live? Who owns it? Does it need to be added to the model?            |
| **Data model impact** | Does this require schema changes? Are those changes reversible?                           |
| **Consistency**       | Does this operation need to be atomic? What are the consequences of partial failure?      |
| **Authorisation**     | Who is allowed to perform this operation? On whose data?                                  |
| **Validation**        | What are the valid inputs? What should be rejected and with what error?                   |
| **Side effects**      | What else happens when this operation succeeds? Events, notifications, cascading updates? |
| **Failure modes**     | What happens if a dependency is unavailable? Is this operation idempotent?                |

**Architect interrogates around:**

| Question area              | What they are probing                                                                      |
| -------------------------- | ------------------------------------------------------------------------------------------ |
| **Blast radius**           | What does this change touch beyond what is immediately obvious?                            |
| **Data model**             | Does this require irreversible schema changes? What are the migration implications?        |
| **Cross-cutting concerns** | Does this touch auth, logging, observability, or performance in ways needing coordination? |
| **Consistency guarantees** | What consistency does the frontend assume the backend can provide? Can it?                 |
| **Existing patterns**      | Does this follow established patterns or introduce something new? If new, why?             |

**QA Engineer interrogates around:**

| Question area           | What they are probing                                                                  |
| ----------------------- | -------------------------------------------------------------------------------------- |
| **Happy path**          | Is the primary success scenario fully defined and testable?                            |
| **Error states**        | What does the user see when something fails? Is it actionable?                         |
| **Empty states**        | What does the user see when there is no data?                                          |
| **Boundary conditions** | What happens at minimum and maximum valid values? One step outside?                    |
| **Concurrent actions**  | What happens if the same action is triggered twice before the first completes?         |
| **Invalid input**       | What happens with malformed, unexpected, or semantically wrong input?                  |
| **Recovery**            | If something fails partway through, what state is the system in? Can the user recover? |

When a question reveals a gap in the requirement, the Product Owner resolves it immediately or flags it as an open question with an owner. No gap is left unnamed.

---

### Step 3 — Acceptance Criteria and Test Scenarios

QA Engineer leads this step in collaboration with the Product Owner.

**QA Engineer writes the acceptance criteria** in Given/When/Then format based on the interrogation. The Product Owner reviews each criterion and confirms it matches the intent. The team validates that each criterion is implementable.

Every ticket must include acceptance criteria for at minimum:

- The primary success path
- At least one failure or error path
- The empty or zero-data state where relevant
- At least one boundary condition where relevant

**QA Engineer then writes test scenarios** — a broader set of cases that cover what needs to be verified beyond the ACs:

```
| Scenario | Type | Expected outcome |
|---|---|---|
| <name> | Happy path / Error / Edge case / Empty state / Boundary | <outcome> |
```

A ticket with only happy path scenarios is not complete.

---

### Step 4 — Open Questions Resolution

The Product Owner reviews every open question raised during interrogation.

For each open question:

- **Resolve it** — if enough information exists to make a decision, make it now and update the relevant section
- **Assign it** — if it requires stakeholder input, assign it to the stakeholder with a clear question
- **Park it** — if it is genuinely out of scope for this ticket, document it as a Refinement note for a future ticket

No open question leaves the session without an owner and a resolution path.

---

## Artifact Ownership

| Artifact            | Owner                       | When produced                              |
| ------------------- | --------------------------- | ------------------------------------------ |
| `ticket.md`         | Product Owner               | End of session, after team sign-off        |
| Acceptance criteria | QA Engineer + Product Owner | Step 3                                     |
| Test scenarios      | QA Engineer                 | Step 3                                     |
| Technical notes     | Architect, FE Dev, BE Dev   | Throughout Step 2, finalised at draft time |
| UX notes            | UX/Designer                 | Throughout Step 2, finalised at draft time |
| Open questions      | Product Owner               | Step 4                                     |

---

## Sign-off

Before writing `ticket.md`, the Product Owner presents the full draft to the team:

- Story statement and scope
- All acceptance criteria
- All test scenarios
- Technical notes from each agent
- Resolved and unresolved open questions

The team reviews and either:

- **Approves** — `ticket.md` is written, session closes, ticket is ready for Planning
- **Raises a remaining gap** — panel resolves it and re-presents the relevant section
- **Flags an unresolvable open question** — documented with owner and escalated if needed

The Product Owner has the final say on scope decisions. Technical concerns that affect feasibility are escalated to the Architect.

---

## On Approval

The session writes `ticket.md` to:

```
docs/initiatives/<NNN>-<initiative-name>/tickets/<initiative-NNN>-<ticket-NNN>-<story-name>/ticket.md
```

If any wireframes were produced or updated during the session, they are written to:

```
docs/initiatives/<NNN>-<initiative-name>/design/wireframes/<screen-name>.png
```

---

## Output — `ticket.md`

Follows the template defined in `.claude/STRUCTURE.md` exactly:

```markdown
# Ticket <ID>: <story name>

_Initiative: docs/initiatives/<NNN>-<initiative-name>/initiative.md_
_Story: docs/initiatives/<NNN>-<initiative-name>/stories.md#<ID>_

## Story

**As a** <specific user>
**I need to** <job or action>
**So that** <outcome or value>

## Scope

### In scope

- <item>

### Out of scope

- <item>

## Acceptance Criteria

### Scenario: <name>

Given <starting state>
When <action>
Then <expected outcome>

[repeat for each scenario]

## Test Scenarios

| Scenario | Type                                                    | Expected outcome |
| -------- | ------------------------------------------------------- | ---------------- |
| <name>   | Happy path / Error / Edge case / Empty state / Boundary | <outcome>        |

## Design Reference

<link to design/ux-flow.md or specific wireframe>

## Technical Notes

**Architect:** <notes or none>
**FE Dev:** <notes or none>
**BE Dev:** <notes or none>
**UX:** <notes or none>

## Open Questions

| Question   | Raised by | Resolution                                        |
| ---------- | --------- | ------------------------------------------------- |
| <question> | <agent>   | <resolved: answer> or <owner: stakeholder / team> |

## Sign-off

- Approved by:
- Date:
- Ready for: Planning
```

---

## What This Session Does Not Cover

- Implementation approach — that is Planning
- API contract design — that is Planning
- Data model decisions — flagged here as technical notes, decided in Planning
- Test implementation — that is Implementation

If these topics arise, the relevant agent flags them as a technical note in the ticket. They do not get decided here.
