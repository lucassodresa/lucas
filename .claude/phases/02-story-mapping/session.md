# Phase 2 — Story Mapping Session

## Purpose

Translate the signed-off `initiative.md` into a flat, sequenced set of stories the delivery team can execute against. The session ends with a signed-off `stories.md` — stories with IDs assigned, dependencies named, and a delivery sequence agreed. This is the last phase before the delivery team takes over.

---

## Prerequisites

- `docs/initiatives/<NNN>-<initiative-name>/initiative.md` exists and is signed off
- Stakeholder has approved Discovery before this session begins
- No story mapping begins without a completed `initiative.md`

---

## Participants

| Agent               | Role file                                       | Focus in this session                                                                                            |
| ------------------- | ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **Product Manager** | `.claude/agents/roles/product-manager-agent.md` | Brings initiative context. Ensures stories stay anchored to user outcomes. Co-drives the session.                |
| **Product Owner**   | `.claude/agents/roles/product-owner-agent.md`   | Translates the initiative into executable stories. Owns `stories.md`. Defines story structure and sequencing.    |
| **Architect**       | `.claude/agents/roles/architect-agent.md`       | Surfaces technical dependencies between stories. Flags sequencing risks. Identifies shared infrastructure needs. |

Each agent reads their role file before the session begins. The role file defines who they are. This file defines what they are here to do in this session specifically.

---

## Communication Rules

**Only the Product Manager addresses the stakeholder directly.**
Product Owner and Architect speak to the Product Manager during internal discussion. The Product Manager decides what reaches the stakeholder and how it is framed.

**Product Manager and Product Owner co-drive the internal session.**
Product Manager holds the initiative intent — pulls the discussion back to user outcomes when it drifts into delivery detail. Product Owner holds the delivery structure — pushes the discussion toward executable, testable stories when it stays too abstract.

**Architect speaks when technical implications affect story shape or sequencing.**
The Architect does not drive the session. They intervene when a story boundary creates a hidden dependency, a sequencing decision has technical consequences the panel has not considered, or a story as written would require shared infrastructure that should be its own story.

**Escalate to the stakeholder only when:**

- A story boundary requires a product decision that cannot be resolved from `initiative.md`
- A scope question is genuinely ambiguous
- Two agents are deadlocked on sequencing or story structure

---

## Input

All three agents read `docs/initiatives/<NNN>-<initiative-name>/initiative.md` in full before the session begins. Every story produced must trace directly back to the initiative's problem statement, proposed solution, and scope boundaries. Stories that cannot be traced back do not belong in this initiative.

---

## Session Flow

### Step 1 — Initiative Read-Through

Each agent reads `initiative.md` independently and forms their initial reading before any discussion:

| Agent               | What they form                                                                                                                             |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **Product Manager** | Maps the initiative to user journeys — what does the user need to do, in what order, to achieve the outcome?                               |
| **Product Owner**   | Identifies natural story boundaries — what are the smallest independently deliverable slices of value?                                     |
| **Architect**       | Traces the technical shape — what are the shared components, data model changes, or infrastructure pieces multiple stories will depend on? |

The panel shares readings. Product Owner drafts an initial story list. The other agents react.

Advance when: all three agents have shared their initial readings and the panel has reached a shared understanding of the initiative's intent, the natural story boundaries, and the technical shape.

---

### Step 2 — Story Slicing

The panel slices the initiative into stories. No epics — stories sequence flat directly under the initiative.

Each story must be:

| Quality                 | What it means                                                                                             |
| ----------------------- | --------------------------------------------------------------------------------------------------------- |
| **Independent**         | Deliverable without requiring another story to be complete first, unless a dependency is explicitly named |
| **Valuable**            | Delivers something meaningful to the user — not just a technical piece with no user-visible outcome       |
| **Testable**            | Has a clear enough scope that acceptance criteria can be written for it in Refinement                     |
| **Appropriately sized** | Can be refined, planned, and implemented within a reasonable cycle                                        |

Product Owner owns the slicing decisions.
Product Manager challenges any story that does not deliver clear user value.
Architect challenges any story whose scope is technically unclear or whose boundary creates hidden coupling.

Advance when: every story is independently deliverable, clearly valuable to the user, testable, and appropriately sized — and PM has no unresolved concerns about user value and Architect has no unresolved concerns about technical clarity or hidden coupling.

---

### Step 3 — ID Assignment

Once the story list is stable, the Product Owner assigns ticket IDs sequentially following the format defined in `.claude/STRUCTURE.md`:

```
<initiative-NNN>-<ticket-NNN>
```

IDs are assigned in the intended delivery order. They never change once assigned — even if stories are later reordered or renamed.

Example for initiative 001:

```
001-001   user receives notification
001-002   admin configures channels
001-003   notification preferences
```

Advance when: every story has an assigned ID in the intended delivery order.

---

### Step 4 — Dependency Mapping

The Architect leads this step. For each story, the panel identifies:

- **Predecessor stories** — stories that must be complete before this one can begin, referenced by ticket ID
- **Shared infrastructure** — data model changes, APIs, or services that multiple stories depend on — these may need to become their own story
- **External dependencies** — things outside this initiative that stories depend on

Dependencies not named here become blockers discovered mid-implementation. Name them now.

---

### Step 5 — Sequencing

The Product Owner sequences the stories into final delivery order based on:

| Priority                         | Rationale                                                                                                                     |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **User value first**             | Stories that unlock the most user value soonest come first                                                                    |
| **Technical dependencies**       | A story's predecessors are always sequenced before it                                                                         |
| **Risk early**                   | Stories with the most uncertainty are sequenced early so findings can be absorbed before the initiative is deep into delivery |
| **Foundation before dependents** | Shared infrastructure stories come before stories that depend on them                                                         |

Product Manager challenges sequencing that defers all user value to the end.
Architect challenges sequencing that ignores technical dependencies.

---

## Artifact Ownership

| Artifact               | Owner                           | When produced                              |
| ---------------------- | ------------------------------- | ------------------------------------------ |
| `stories.md`           | Product Owner                   | End of session, after stakeholder sign-off |
| Story list and slicing | Product Manager + Product Owner | Steps 2–3                                  |
| Dependency map         | Architect                       | Step 4                                     |
| Delivery sequence      | Product Owner                   | Step 5                                     |

---

## Sign-off

Before writing `stories.md`, Product Owner presents the full story map to the stakeholder:

- The full story list with assigned IDs and delivery sequence
- Named dependencies and their implications for delivery order
- Technical notes from the Architect
- Any open questions that Refinement must resolve

The stakeholder reviews and either:

- **Approves** — `stories.md` is written, session closes, initiative is ready for Refinement
- **Requests a change** — panel re-enters the affected step and resolves the concern
- **Identifies a missing story** — panel assesses whether it belongs in this initiative or a future one

---

## On Approval

The session writes `stories.md` to:

```
docs/initiatives/<NNN>-<initiative-name>/stories.md
```

And creates one empty ticket folder per story:

```
docs/initiatives/<NNN>-<initiative-name>/tickets/
  <initiative-NNN>-<ticket-NNN>-<story-name>/
```

Folder names use the assigned ticket ID plus the story name, lowercased and hyphenated. No files inside yet — folders are populated in Refinement.

---

## Output — `stories.md`

Follows the `stories.md` template defined in `.claude/STRUCTURE.MD`.

---

## What This Session Does Not Cover

- Acceptance criteria — that is Refinement
- Technical implementation approach — that is Planning
- Test scenarios — that is Refinement
- UI design detail — `design/ux-flow.md` is the reference, no further design happens here

If these topics arise, the panel acknowledges them and parks them against the relevant story as a Refinement note. They do not get resolved here.
