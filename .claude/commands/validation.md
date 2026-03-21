# /validation

## What this does

Starts a Validation session for a completed ticket. The QA Engineer analyses the acceptance criteria from `ticket.md`, produces a testing plan with the appropriate test level for each scenario, and presents it for your approval before executing anything. After approval, QA executes the plan — running existing tests, writing new ones where needed, and validating the implementation against the acceptance criteria.

Read `.claude/phases/06-validation/session.md` for the full session definition — testing plan format, decision criteria, execution approach, and sign-off behavior.

---

## Usage

```bash
# Validate a completed ticket
/validation $TICKET_ID $INITIATIVE_PATH
# example: /validation 001-001 docs/initiatives/001-notifications-system/
```

### Arguments

- `$TICKET_ID` — the ticket ID to validate, e.g. `001-001`. Must have a completed implementation — all tests passing.
- `$INITIATIVE_PATH` — path to the initiative folder.

---

## Files to load before starting

Load these files in order before the session begins:

1. `.claude/phases/06-validation/session.md` — session definition
2. `.claude/agents/roles/qa-agent.md` — QA Engineer role
3. `.claude/STRUCTURE.md` — folder structure and artifact templates

Also read:

- `$INITIATIVE_PATH/tickets/$TICKET_ID-*/ticket.md` — acceptance criteria and test scenarios
- `$INITIATIVE_PATH/tickets/$TICKET_ID-*/plan.md` — implementation plan for context
- `$INITIATIVE_PATH/initiative.md` — initiative context

---

## Display Format

### Phase 1 — Testing Plan

```
[VALIDATION — <ticket ID> <story name>]
Phase: Testing Plan

─── Analysis ─────────────────────────────────────────────────

QA: <QA reasoning about each scenario — what exists, what is needed, why>

─────────────────────────────────────────────────────────────

─── Testing Plan ─────────────────────────────────────────────

| Scenario | Existing coverage | Decision | Reasoning |
|---|---|---|---|
| <scenario> | <none / partial / full> | <Unit / Integration / Component / E2E / None> | <why> |

─────────────────────────────────────────────────────────────

── Your call ────────────────────────────────────────────────

  A) Approve — proceed with execution
  B) Adjust — describe what to change
  C) Abort — end session without executing

>
```

### Phase 2 — Execution

```
[VALIDATION — <ticket ID> <story name>]
Phase: Execution

─── Progress ─────────────────────────────────────────────────

✓  happy path — notification received          unit test — existing, passing
✓  empty state — no notifications              component test — written, passing
✓  error state — fetch failed                  component test — written, passing
→  concurrent submission                       integration test — running...

─────────────────────────────────────────────────────────────
```

When a bug is found:

```
─── Bug Found ────────────────────────────────────────────────

Scenario: concurrent notification submission

Given a user with an active session
When they submit a notification action twice in rapid succession
Then only one notification should be created

Actual behavior:
  Two notifications are created — the deduplication logic
  does not fire when requests arrive within 50ms of each other.

Severity: Medium
Reproduction: <steps>

─────────────────────────────────────────────────────────────

── Your call ────────────────────────────────────────────────

  A) Return to Implementation with this bug report
  B) Accept and document — ship with known limitation
  C) Defer — create a new ticket for this bug

>
```

When validation is complete:

```
─── Validation Complete ──────────────────────────────────────

Scenarios validated: 8
  ✓ Passed: 8
  ✗ Failed: 0

Tests written: 3
  component: 2
  integration: 1

Ready for: sign-off

─────────────────────────────────────────────────────────────
```

---

## Your Controls

| Input    | What it does                                                |
| -------- | ----------------------------------------------------------- |
| `status` | Shows current scenario being validated and overall progress |
| `abort`  | Ends the session without saving anything                    |
