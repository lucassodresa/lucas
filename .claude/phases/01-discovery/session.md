# Phase 1 — Discovery Session

## Purpose

Transform a rough stakeholder idea into a well-defined initiative. The session ends with a signed-off `initiative.md` that gives the team enough clarity to begin Story Mapping without making assumptions about the problem, the user, or the solution direction.

---

## Prerequisites

- A rough idea from the stakeholder — no structure required
- No prior artifacts needed — this is the first phase

---

## Participants

| Agent                | Role file                                       | Focus in this session                                                        |
| -------------------- | ----------------------------------------------- | ---------------------------------------------------------------------------- |
| **Product Manager**  | `.claude/agents/roles/product-manager-agent.md` | Drives the session. Owns `initiative.md`.                                    |
| **Devil's Advocate** | `.claude/agents/roles/devils-advocate-agent.md` | Challenges assumptions. Surfaces tradeoffs. Documents rejected alternatives. |
| **UX/Designer**      | `.claude/agents/roles/ux-designer-agent.md`     | Anchors decisions in user outcomes. Produces the UX flow artifact.           |

Each agent reads their role file before the session begins. The role file defines who they are. This file defines what they are here to do in this session specifically.

---

## Communication Rules

**Only the Product Manager addresses the stakeholder directly.**
Devil's Advocate and UX/Designer speak to the Product Manager during internal discussion. The Product Manager decides what reaches the stakeholder and how it is framed.

**One question at a time to the stakeholder.**
The panel resolves as much as possible internally before escalating. When they do escalate, it is one focused question — never a list.

**Escalate to the stakeholder only when:**

- A decision requires business or product judgment only they can make
- An assumption cannot be validated without their input
- Two agents are genuinely deadlocked after real internal debate
- A strategic direction must be set before the session can continue

**In a deadlock:**
Product Manager presents both sides transparently — the strongest version of each position, the tradeoff, and what it means for the initiative. The stakeholder decides. The panel accepts the decision and moves forward.

---

## Session Flow

### Opening

The panel reads the stakeholder's raw idea independently. Each agent forms their own initial reading before any internal discussion begins:

- **Product Manager** — frames the problem: what is being asked for, what the real problem might be, what is unclear
- **Devil's Advocate** — identifies the top assumptions the idea rests on and which carry the highest risk if wrong
- **UX/Designer** — translates the idea into a jobs-to-be-done frame: who is the user, what are they trying to do, what outcome do they need

The panel shares these readings with each other. Product Manager synthesises and opens to the stakeholder with the single most important question — the one that, if answered wrong, would most change the direction of the initiative.

### Stage Progression

The session moves through five stages in order. Product Manager decides when a stage is resolved and drives progression to the next. A stage is resolved when the panel agrees there is nothing remaining in it that would meaningfully change the initiative if left unanswered.

---

### Stage 1 — Problem Validation

**Goal:** Confirm we are solving the real problem, not the stated one.

| Agent                | Focus                                                                                                                      |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **Product Manager**  | Seeks the root problem behind the stated idea. Redirects if the stakeholder described a solution rather than a problem.    |
| **Devil's Advocate** | Identifies the highest-risk assumption in the problem framing. Challenges it with an alternative or a validating question. |
| **UX/Designer**      | Translates the problem into a user situation — who is failing, in what moment, with what consequence.                      |

Advance when: the panel agrees on what the real problem is and why it matters now.

---

### Stage 2 — User & Context

**Goal:** Know exactly who experiences this problem and when.

| Agent                | Focus                                                                                                                           |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **Product Manager**  | Ensures the user definition is specific enough to be actionable. Pushes back on "all users" or role-only definitions.           |
| **Devil's Advocate** | Challenges whether the identified user is the right user to design for. Are there other users whose needs conflict?             |
| **UX/Designer**      | Leads this stage internally. Identifies the primary user and at least one edge case user with enough specificity to design for. |

Advance when: the panel has identified at least one primary user and one edge case user with enough specificity to design for.

---

### Stage 3 — Solution Alignment

**Goal:** Shape what is being built and explicitly name what is not.

| Agent                | Focus                                                                                                                   |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **Product Manager**  | Synthesises panel positions into a solution direction. Documents rejected alternatives with reasoning.                  |
| **Devil's Advocate** | Most active stage. Every solution proposal must be challenged with at least one alternative before the panel commits.   |
| **UX/Designer**      | Validates that the proposed solution is UX-feasible and does not create new friction. Brings an alternative if it does. |

Advance when: one solution direction is agreed, at least one alternative is documented with rejection reasoning, and UX/Designer has confirmed the solution is UX-feasible.

---

### Stage 4 — Scope Boundaries

**Goal:** Make the edges of this initiative explicit and unambiguous.

| Agent                | Focus                                                                                                          |
| -------------------- | -------------------------------------------------------------------------------------------------------------- |
| **Product Manager**  | Drives this stage. Defines what is explicitly in and explicitly out of scope. Names known dependencies.        |
| **Devil's Advocate** | Challenges scope decisions for hidden blast radius — things that sound contained but touch more than expected. |
| **UX/Designer**      | Flags when a scope cut removes a state or flow that would leave the user in a broken or confusing experience.  |

Advance when: in-scope and out-of-scope are both stated explicitly and known dependencies are named.

---

### Stage 5 — Assumption Surfacing

**Goal:** Name everything the panel is taking as true without validation.

| Agent                | Focus                                                                                              |
| -------------------- | -------------------------------------------------------------------------------------------------- |
| **Product Manager**  | Ensures every assumption is documented with its risk level — High, Medium, or Low.                 |
| **Devil's Advocate** | Leads this stage internally. Names every significant assumption the panel has been operating with. |
| **UX/Designer**      | Surfaces user behaviour assumptions — things the solution assumes users will do or understand.     |

Advance when: all significant assumptions are named and risk-assessed.

---

## UX Flow Artifact

Before `initiative.md` is drafted, UX/Designer must produce the UX flow. This is a required artifact — the session does not move to sign-off without it.

The flow describes the screens and states the user moves through — in structured text, not visual design. It must cover:

- The trigger that brings the user to this feature
- The steps and decisions the user moves through
- The end state and how it feels to the user
- Empty state — what the user sees when there is no data
- Error state — what the user sees when something goes wrong
- Loading state — what the user sees while waiting

Product Manager confirms the flow is complete before drafting `initiative.md`.

---

## Artifact Ownership

| Artifact                      | Owner            | When produced                                           |
| ----------------------------- | ---------------- | ------------------------------------------------------- |
| `initiative.md`               | Product Manager  | After all five stages complete and UX flow is ready     |
| `design/ux-flow.md`           | UX/Designer      | Copied from `initiative.md` UX Flow section on sign-off |
| Rejected alternatives section | Devil's Advocate | Documented throughout, finalised at draft time          |

---

## Sign-off

Product Manager presents the full `initiative.md` draft to the stakeholder before writing any files. The stakeholder reviews and either:

- **Approves** — files are written, folder structure is created, session closes
- **Requests a change** — Product Manager identifies which stage is affected and reopens it
- **Reopens a specific section** — panel re-enters that stage, resolves the concern, re-presents the draft

---

## On Approval

The session writes the following files and creates the folder structure per `.claude/STRUCTURE.md`:

```
docs/initiatives/<NNN>-<initiative-name>/
  initiative.md                  ← written now
  design/
    ux-flow.md                   ← copied from initiative.md UX Flow section
  tickets/                       ← created empty, populated in Refinement
  architecture/                  ← created empty, populated if needed
```

The initiative number `<NNN>` is the next available sequence number across all initiatives in `docs/initiatives/`.

---

## Output — `initiative.md`

Follows the `initiative.md` template defined in `.claude/STRUCTURE.MD`.

---

## What This Session Does Not Cover

- Technical feasibility — no developers or architect are present
- Story breakdown — that is Story Mapping
- Acceptance criteria — that is Refinement
- Implementation approach — that is Planning

If any of these topics arise, the panel acknowledges them and parks them for the appropriate phase. They do not get resolved here.
