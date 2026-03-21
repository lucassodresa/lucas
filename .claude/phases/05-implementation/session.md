# Phase 5 — Implementation Session

## Purpose

Build the ticket following the approved `plan.md`, test-first. The session runs autonomously — FE and BE work through their implementation sequences in parallel, each step preceded by a test. The session ends when all steps are complete, all tests pass, and the Architect has reviewed the implementation.

The plan is the contract. The implementation follows it — or raises a finding if it cannot.

---

## Prerequisites

- `docs/initiatives/<NNN>-<initiative-name>/tickets/<initiative-NNN>-<ticket-NNN>-<story-name>/plan.md` exists and is approved
- `docs/initiatives/<NNN>-<initiative-name>/tickets/<initiative-NNN>-<ticket-NNN>-<story-name>/ticket.md` exists and is signed off
- Planning is approved before Implementation begins
- No implementation begins without an approved plan

---

## Participants

| Agent                  | Role file                                    | Focus in this session                                                                                                                                |
| ---------------------- | -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend Developer** | `.claude/agents/roles/frontend-dev-agent.md` | Implements the FE plan test-first. Follows the implementation sequence in `plan.md`. Raises findings immediately when the plan cannot be followed.   |
| **Backend Developer**  | `.claude/agents/roles/backend-dev-agent.md`  | Implements the BE plan test-first. Follows the implementation sequence in `plan.md`. Raises findings immediately when the plan cannot be followed.   |
| **Architect**          | `.claude/agents/roles/architect-agent.md`    | Reviews the completed implementation for consistency with architectural boundaries. Does not direct implementation steps — reviews after completion. |

Each agent reads their role file before the session begins. The role file defines who they are. This file defines what they are here to do in this session specifically.

---

## Operating Principles

**The plan is followed, not interpreted.**
The implementation sequence in `plan.md` is the authority. Developers do not make judgment calls that change the approach — if the plan cannot be followed as written, a finding is raised. Improvising around a plan blocker silently is a violation of this principle.

**Test first, always.**
Every implementation step begins with a failing test. The test defines the expected behavior. The implementation makes it pass. No step is marked complete until its tests pass. No step is skipped.

**FE and BE work in parallel.**
After the API contract is confirmed available, FE and BE implement their sequences independently. They do not block on each other except at the API contract boundary.

**The session is autonomous.**
The stakeholder is not involved unless a finding breaks the plan. Progress runs without interruption. The only prompt to the stakeholder is a finding that requires a return to Planning or a scope decision.

---

## Input

Before starting, both developers read:

- `docs/initiatives/<NNN>-<initiative-name>/tickets/<initiative-NNN>-<ticket-NNN>-<story-name>/plan.md` — the full approved plan
- `docs/initiatives/<NNN>-<initiative-name>/tickets/<initiative-NNN>-<ticket-NNN>-<story-name>/ticket.md` — the acceptance criteria for reference

They do not re-explore the codebase from scratch. The plan is the result of that exploration. If the codebase has changed since Planning, that is a finding.

---

## Session Flow

### Step 1 — Plan Confirmation

Before any code is written, both developers read `plan.md` in full and confirm:

- The implementation sequence is clear and unambiguous
- The API contract is defined and accessible
- There are no open questions in the plan that would block their first step

If either developer identifies an ambiguity or gap in the plan before starting, they raise it immediately as a pre-implementation finding — rather than discovering it midway through a step.

---

### Step 2 — Backend Implementation

BE Dev works through their implementation sequence from `plan.md` step by step.

**The TDD loop for each step:**

```
1. Read the step from plan.md
2. Write a failing test that defines the expected behavior
3. Write the minimum code to make the test pass
4. Refactor if needed — tests must still pass
5. Mark the step complete
6. Move to the next step
```

**BE testing layers per step type:**

| Step type              | Test layer                                                                          |
| ---------------------- | ----------------------------------------------------------------------------------- |
| Data model / migration | Integration test — verify schema, constraints, reversibility                        |
| Business logic         | Unit test — isolated from DB and services, exhaustive                               |
| API endpoint           | Contract test — response shape, status codes, error codes match the agreed contract |
| Side effects           | Integration test — event fired, queue message sent, notification triggered          |
| Failure modes          | Edge case test — timeout, unavailable dependency, duplicate request                 |

BE Dev never skips a test step. If a test is difficult to write, that is a signal — the design may need to change. Raise a finding rather than writing a test that only verifies implementation details.

**BE sequence order from `plan.md`:**

1. Data model changes and migrations first
2. Business logic and domain rules
3. Repository and persistence layer
4. API endpoints — contract tests run here
5. Side effects — events, notifications, queue messages

---

### Step 3 — Frontend Implementation

FE Dev works through their implementation sequence from `plan.md` step by step, using the same TDD loop.

FE can begin their sequence as soon as the API contract endpoints are available from BE. They do not wait for the full BE implementation — they mock the API at the network layer for their tests.

**FE testing layers per step type:**

| Step type             | Test layer                                                               |
| --------------------- | ------------------------------------------------------------------------ |
| Pure logic / utility  | Unit test — isolated, fast                                               |
| Component rendering   | Component test — all meaningful states: loading, loaded, empty, error    |
| Component interaction | Component test — user actions, state transitions                         |
| Full flow             | Integration test — real routing, real state, API mocked at network layer |

FE Dev never tests component library components. Never tests implementation details — internal state, method names, class names. Tests observable behavior only.

**FE sequence order from `plan.md`:**

1. Component shell — structure without data
2. Loading and empty states
3. Data integration — connected to API contract
4. Interaction handlers
5. Error states and edge cases
6. Integration tests for complete flows

---

### Step 4 — Architect Review

When both FE and BE have completed all steps and all tests pass, the Architect reviews the implementation.

The Architect does not re-examine every line of code. They review for:

| Review area             | What they check                                                                                                    |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **Pattern consistency** | Does the implementation follow existing patterns? Does it introduce anything that will surprise future developers? |
| **Boundary respect**    | Did FE stay on their side of the API contract? Did BE stay on theirs?                                              |
| **Technical debt**      | Were any shortcuts taken that need to be named explicitly?                                                         |
| **Blast radius**        | Did the implementation touch anything beyond what the plan intended?                                               |
| **Contract compliance** | Does the BE implementation match the agreed API contract precisely?                                                |

The Architect does not redesign the implementation at this point. If they find a significant issue, they name it clearly — either as technical debt to be tracked, or as a finding that requires a return to Planning.

Minor concerns are documented as technical debt notes in the implementation record. Significant architectural violations require a finding.

---

## Finding Protocol

A finding is raised when an agent cannot proceed with the current plan as written. It is never raised for preference — only for genuine blockers.

**Triggers for a finding:**

| Trigger                                                                 | Raised by        |
| ----------------------------------------------------------------------- | ---------------- |
| Codebase differs from what the plan assumed                             | FE Dev or BE Dev |
| Writing a test exposes a flaw in the planned interface                  | FE Dev or BE Dev |
| API contract cannot be implemented as specified given actual data model | BE Dev           |
| A planned change has unexpected blast radius                            | FE Dev or BE Dev |
| Architect review reveals a significant architectural violation          | Architect        |

**When a finding is triggered:**

1. The agent stops implementation immediately at the current step
2. They write `findings.md` to the ticket folder before raising it
3. The finding is surfaced to the stakeholder with options and a recommendation
4. The stakeholder decides: return to Planning, override with recommendation, or override with a different approach
5. If returning to Planning — the session closes and `/planning` is re-invoked with `findings.md` as input

The plan is never worked around silently. If a blocker is found, it is raised — even if the workaround seems obvious.

---

## Findings File

Written to:

```
docs/initiatives/<NNN>-<initiative-name>/tickets/<initiative-NNN>-<ticket-NNN>-<story-name>/findings.md
```

Structure:

```markdown
# Findings: <ID> <story name>

_Plan: ./plan.md_
_Step where blocker was found: <step number and name>_

## What was being implemented

<which step, what was being built>

## What was discovered

<what exists in the codebase that breaks the plan's assumption>

## What this breaks in the plan

<which steps are affected and why they cannot proceed as planned>

## Options

| Option     | Tradeoff   |
| ---------- | ---------- |
| <option A> | <tradeoff> |
| <option B> | <tradeoff> |

## Recommendation

<preferred option and reasoning>
```

---

## Completion

Implementation is complete when:

- All FE steps are done and all FE tests pass
- All BE steps are done and all BE tests pass
- Contract tests confirm FE and BE are aligned on the API contract
- Architect review is complete with no unresolved findings

On completion the session reports:

- Steps completed per developer
- Test counts and pass rates
- Any technical debt named during the Architect review
- Ready for Phase 6 — Validation

---

## What This Session Does Not Cover

- Changing the plan without raising a finding — if the plan is wrong, raise a finding
- Acceptance criteria validation — that is Phase 6 Validation
- Writing e2e tests — that is Phase 6 Validation
- Scope decisions — those were made in Refinement and are not reopened here unless a finding forces it
