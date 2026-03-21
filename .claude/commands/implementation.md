# /implementation

## What this does

Starts an Implementation session for a single planned ticket. Frontend Developer and Backend Developer work in parallel following the approved `plan.md`, building test-first. The session runs autonomously — you are not involved unless a finding breaks the plan and a return to Planning is required.

Read `.claude/phases/05-implementation/session.md` for the full session definition — TDD loop, agent responsibilities, findings protocol, and completion behavior.

---

## Usage

```bash
# Implement a specific ticket
/implementation $TICKET_ID $INITIATIVE_PATH
# example: /implementation 001-001 docs/initiatives/001-notifications-system/

# Resume an implementation in progress
/implementation resume $TICKET_ID $INITIATIVE_PATH
```

### Arguments

- `$TICKET_ID` — the ticket ID to implement, e.g. `001-001`. Must have a signed-off `plan.md` in its folder.
- `$INITIATIVE_PATH` — path to the initiative folder.

---

## Files to load before starting

Static files (load once at session start):

1. `.claude/phases/05-implementation/session.md` — session definition
2. `.claude/agents/roles/architect-agent.md` — Architect role (reviewer)
3. `.claude/agents/roles/frontend-dev-agent.md` — Frontend Developer role
4. `.claude/agents/roles/backend-dev-agent.md` — Backend Developer role
5. `.claude/STRUCTURE.md` — folder structure and artifact templates
6. `CLAUDE.md` — testing conventions, token invariant, coverage invariant

Initiative files (paths depend on `$INITIATIVE_PATH` and `$TICKET_ID` arguments):

- `$INITIATIVE_PATH/tickets/<folder matching $TICKET_ID>/plan.md` — the approved plan being implemented
- `$INITIATIVE_PATH/tickets/<folder matching $TICKET_ID>/ticket.md` — the refined ticket for AC reference

---

## Display Format

Implementation runs mostly autonomously. Progress is shown as each step completes.

```
[IMPLEMENTATION — <ticket ID> <story name>]

─── Progress ─────────────────────────────────────────────────

BE  ✓  Data model migration created
BE  ✓  Migration tested
BE  ✓  Repository layer implemented
BE  ✓  Repository tests passing
BE  →  Implementing API endpoint...

FE  ✓  Component shell created
FE  ✓  Loading state implemented and tested
FE  →  Implementing data fetch integration...

─────────────────────────────────────────────────────────────
```

When a finding blocks progress:

```
─── Finding ──────────────────────────────────────────────────

BE: Blocker on step 4 — see below.

What was being implemented:
  API endpoint POST /api/notifications

What was discovered:
  The NotificationService is a singleton with no injection point.
  The plan assumed it was injectable for testing — it is not.

What this breaks:
  Steps 4, 5, and 6 depend on mocking NotificationService in tests.

Options:
  A) Wrap in an adapter we control — minimal blast radius
  B) Refactor to injectable — larger scope, cleaner long term
  C) Test at HTTP layer — avoids the problem, less precise

Recommendation: Option A

─────────────────────────────────────────────────────────────

── Your call ────────────────────────────────────────────────

  A) Return to Planning with this finding
  B) Override — proceed with recommendation without replanning
  C) Override — specify a different approach

>
```

When implementation is complete:

```
─── Implementation Complete ──────────────────────────────────

BE  ✓  All steps complete — tests passing
FE  ✓  All steps complete — tests passing

Ready for: Phase 6 — Validation

─────────────────────────────────────────────────────────────
```

---

## Autonomous Operation

This session runs without your input unless a finding occurs. You do not need to monitor it. You will only be prompted when:

- A finding breaks the current plan and a return to Planning is needed
- An unexpected scope change is discovered in the codebase
- A technical constraint requires a product decision

Do not interrupt the session while it is running. If you need to stop it use `abort`.

---

## Your Controls

| Input    | What it does                                                |
| -------- | ----------------------------------------------------------- |
| `status` | Shows current progress per step for FE and BE               |
| `abort`  | Stops implementation immediately — no files are rolled back |
