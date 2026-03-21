# Phase 6 — Validation Session

## Purpose

Validate that the completed implementation satisfies the acceptance criteria defined in `ticket.md`. The session has two distinct phases — a testing plan presented for stakeholder approval, then execution. Nothing is run or written until the plan is approved.

The QA Engineer works from `ticket.md` — not from `plan.md`. The question being answered is not "does the code match the plan" but "does the behavior match what was agreed in Refinement."

---

## Prerequisites

- `tickets/<initiative-NNN>-<ticket-NNN>-<story-name>/ticket.md` exists and is signed off
- `tickets/<initiative-NNN>-<ticket-NNN>-<story-name>/plan.md` exists and is approved
- Implementation is complete — all implementation tests passing
- No validation begins without a completed implementation

---

## Participants

| Agent           | Role file                          | Focus in this session                                                                                                         |
| --------------- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **QA Engineer** | `.claude/agents/roles/qa-agent.md` | Analyses coverage, produces testing plan, executes validation, writes tests where needed, reports bugs. Owns `validation.md`. |

This is a single-agent session. QA works alone — they do not need the development team present. If a bug is found that requires technical context, QA describes it precisely enough that the developer can reproduce and fix it without a session.

---

## Input

Before producing the testing plan, QA reads:

- `tickets/<initiative-NNN>-<ticket-NNN>-<story-name>/ticket.md` — acceptance criteria and test scenarios — this is the primary reference
- `tickets/<initiative-NNN>-<ticket-NNN>-<story-name>/plan.md` — implementation context
- `initiative.md` — initiative scope and user outcome

QA also explores the existing test suite to understand what coverage already exists before deciding what needs to be written.

---

## Session Flow

### Phase 1 — Testing Plan

QA analyses every acceptance criterion and test scenario in `ticket.md` and produces a testing plan before touching any code or tool.

**For each scenario, QA determines:**

1. **Existing coverage** — does a test already exist that covers this scenario? Is it passing?
2. **Test level decision** — what is the appropriate test level for this scenario?
3. **Reasoning** — why this level and not another?

**Test level decision criteria:**

| Decision               | When to choose it                                                                                                                                                                         |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **No new test needed** | Existing test already covers this scenario precisely. Do not duplicate.                                                                                                                   |
| **Unit test**          | Scenario validates pure logic, a calculation, or a business rule isolated from UI and persistence.                                                                                        |
| **Integration test**   | Scenario validates the full operation through the real persistence layer, or validates an API contract end to end.                                                                        |
| **Component test**     | Scenario validates UI behavior of a custom component in isolation — rendering in a given state, responding to an interaction. Never for component library components.                     |
| **E2E test**           | Scenario requires a full user journey — real navigation, real API calls, multiple steps, cross-role interaction. Only when the behavior cannot be meaningfully verified at a lower level. |

**QA never chooses E2E by default.** E2E tests are expensive to write and maintain. The default is the lowest level that gives genuine confidence. E2E is reserved for journeys — sequences of steps a real user follows through the running application.

**QA never tests:**

- Component library components — those are tested by the library
- Framework behavior — routing, ORM internals, library internals
- Implementation details — method names, internal state, class names

**Testing plan format:**

```markdown
## Testing Plan: <ticket ID> <story name>

| Scenario        | Existing coverage     | Decision                                    | Reasoning        |
| --------------- | --------------------- | ------------------------------------------- | ---------------- |
| <scenario name> | None / Partial / Full | Unit / Integration / Component / E2E / None | <why this level> |
```

---

### Stakeholder Approval Gate

The testing plan is presented to the stakeholder before any execution begins.

The stakeholder reviews:

- The test level chosen for each scenario
- The reasoning for each decision
- Any scenarios proposed to skip (existing coverage)
- Any E2E tests proposed — these require explicit justification

The stakeholder either:

- **Approves** — QA proceeds to execution
- **Adjusts** — changes the level for specific scenarios, adds or removes scenarios
- **Aborts** — ends the session

No test is run or written before this approval.

---

### Phase 2 — Execution

QA works through the approved testing plan scenario by scenario.

**For each scenario:**

1. If existing coverage — run the existing test, confirm it passes, record result
2. If new test needed — write the test first (it should fail if the implementation is wrong), run it, confirm it passes, record result
3. If the test fails — this is a bug, record it and surface it to the stakeholder
4. Move to the next scenario

**For E2E scenarios (if any approved):**
QA uses Playwright MCP to execute the user journey against the running application. The scenario's Given/When/Then maps directly to Playwright actions:

```typescript
// Scenario: user sees empty state when no notifications exist
// Given a logged-in user with no notifications
// When they visit the notifications page
// Then they see the empty state

test('empty state — no notifications', async ({ page }) => {
  await loginAs(page, userWithNoNotifications);
  await page.goto('/notifications');
  await expect(page.getByTestId('empty-state')).toBeVisible();
});
```

E2E tests are written to:

```
e2e/<initiative-NNN>-<ticket-NNN>-<story-name>/<scenario-name>.spec.ts
```

**For all other new tests:**
Tests are written in their natural location in the codebase — alongside the code they test. Not inside the initiative folder.

---

### Bug Protocol

When a scenario fails — the implementation does not produce the expected behavior:

**QA records the bug as:**

```markdown
## Bug: <scenario name>

**Scenario:**
Given <starting state>
When <action>
Then <expected outcome>

**Actual behavior:**
<what actually happened>

**Severity:** Critical / High / Medium / Low
**Reproduction steps:** <precise steps to reproduce>
```

**Bug is surfaced to the stakeholder with three options:**

- **Return to Implementation** — fix is required before sign-off. The bug report is passed to the developer.
- **Accept and document** — ship with the known limitation, documented in `validation.md`
- **Defer** — create a new ticket for this bug, current ticket proceeds to sign-off

The stakeholder decides. QA does not make this call alone.

**Severity guide:**

| Severity     | Meaning                                                              |
| ------------ | -------------------------------------------------------------------- |
| **Critical** | Blocks core functionality — the ticket's primary scenario fails      |
| **High**     | A significant scenario fails — major edge case or error state broken |
| **Medium**   | A secondary scenario fails — edge case, minor error state            |
| **Low**      | A cosmetic or minor behavioral difference from expected              |

Critical and High bugs always return to Implementation. Medium and Low are stakeholder judgment calls.

---

## Exploratory Testing

After all defined scenarios pass, QA conducts a brief exploratory pass — testing things not in the scenarios but that a real user might do.

Exploratory testing is time-boxed and focused. QA is looking for:

- Interactions adjacent to the implemented flow that were not explicitly tested
- Combinations of actions that the scenarios did not cover
- Anything that feels wrong from a user experience perspective

Findings from exploratory testing are documented in `validation.md`. If a finding is significant enough to block sign-off, it follows the same bug protocol as scenario failures.

---

## Artifact Ownership

| Artifact                                 | Owner       | When produced                               |
| ---------------------------------------- | ----------- | ------------------------------------------- |
| Testing plan                             | QA Engineer | Phase 1, before stakeholder approval        |
| `validation.md`                          | QA Engineer | End of session, after all scenarios pass    |
| New unit / integration / component tests | QA Engineer | During execution, alongside the scenario    |
| E2E test files                           | QA Engineer | During execution, if E2E scenarios approved |

---

## Sign-off

When all scenarios pass and exploratory testing is complete, QA presents `validation.md` to the stakeholder for sign-off.

The stakeholder reviews:

- All scenarios and their results
- Tests written and where they live
- Any bugs found and their resolution
- Exploratory findings

The stakeholder either:

- **Signs off** — `validation.md` is written, ticket is fully complete
- **Requests a fix** — specific scenario or bug must be addressed before sign-off

---

## On Approval

The session writes `validation.md` to:

```
docs/initiatives/<NNN>-<initiative-name>/tickets/<initiative-NNN>-<ticket-NNN>-<story-name>/validation.md
```

Any E2E tests are written to:

```
e2e/<initiative-NNN>-<ticket-NNN>-<story-name>/
```

---

## Output — `validation.md`

```markdown
# Validation: <ID> <story name>

_Ticket: ./ticket.md_
_Session date: <date>_

## Testing Plan

| Scenario   | Decision | Reasoning   |
| ---------- | -------- | ----------- |
| <scenario> | <level>  | <reasoning> |

## Results

| Scenario   | Result          | Test file                    |
| ---------- | --------------- | ---------------------------- |
| <scenario> | ✓ Pass / ✗ Fail | <path to test or "existing"> |

## Tests Written

| File   | Type                                 | Scenarios covered |
| ------ | ------------------------------------ | ----------------- |
| <path> | Unit / Integration / Component / E2E | <scenario names>  |

## Bugs Found

<none if clean>

| Bug        | Severity                       | Resolution                                 |
| ---------- | ------------------------------ | ------------------------------------------ |
| <bug name> | Critical / High / Medium / Low | Fixed / Accepted / Deferred to <ticket ID> |

## Exploratory Findings

<none if nothing found>
<description of anything found outside defined scenarios>

## Sign-off

- Validated by: QA Engineer
- Approved by:
- Date:
- Status: Complete
```

---

## What This Session Does Not Cover

- Fixing bugs — that is Implementation
- Changing acceptance criteria — those were defined in Refinement and are not reopened here
- Performance testing — out of scope unless a performance AC was defined in `ticket.md`
- Security testing — out of scope unless a security AC was defined in `ticket.md`

If a bug fix is needed, the developer addresses it and re-runs only the failing scenario — not the full validation suite.
