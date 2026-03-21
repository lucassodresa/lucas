# /planning

## What this does

Starts a Planning session for a single refined ticket. A panel of three agents — Frontend Developer, Backend Developer, and Architect — explores the codebase, negotiates the API contract, and produces a `plan.md` that covers exactly how the ticket will be implemented. No code is written until this plan is approved.

Read `.claude/phases/04-planning/session.md` for the full session definition — steps, agent responsibilities, communication rules, artifact format, and sign-off behavior.

---

## Usage

```bash
# Plan a specific ticket
/planning $TICKET_ID $INITIATIVE_PATH
# example: /planning 001-001 docs/initiatives/001-notifications-system/
```

### Arguments

- `$TICKET_ID` — the ticket ID to plan, e.g. `001-001`. Must have a signed-off `ticket.md` in its folder.
- `$INITIATIVE_PATH` — path to the initiative folder. The session reads the ticket, initiative, and codebase before beginning.

---

## Files to load before starting

Static files (load once at session start):

1. `.claude/phases/04-planning/session.md` — session definition
2. `.claude/agents/roles/architect-agent.md` — Architect role
3. `.claude/agents/roles/frontend-dev-agent.md` — Frontend Developer role
4. `.claude/agents/roles/backend-dev-agent.md` — Backend Developer role
5. `.claude/STRUCTURE.md` — folder structure and artifact templates

Initiative files (paths depend on `$INITIATIVE_PATH` and `$TICKET_ID` arguments):

- `$INITIATIVE_PATH/tickets/<folder matching $TICKET_ID>/ticket.md` — the refined ticket being planned
- `$INITIATIVE_PATH/initiative.md` — initiative context
- `$INITIATIVE_PATH/design/ux-flow.md` — UX flow reference

---

## Display Format

Follow this format strictly throughout the session. Do not deviate.

```
[PLANNING — <ticket ID> <story name>]
Step: <step name> (<N>/5)

─── Internal Discussion ──────────────────────────────────────

ARCH:  <Architect sets boundaries or reviews approach>

FE:    <Frontend Dev proposes or responds>

BE:    <Backend Dev proposes or responds>

─────────────────────────────────────────────────────────────

── Question for you ─────────────────────────────────────────

ARCH: <single, clear question requiring stakeholder judgment>

>
```

When no question is needed, omit the `── Question for you ──` block entirely and continue the internal discussion.

When the plan is ready for review:

```
─── Plan Ready for Review ────────────────────────────────────

<plan.md contents displayed in full>

─────────────────────────────────────────────────────────────

── Your call ────────────────────────────────────────────────

  A) Approve — save plan.md and close session
  B) Something is wrong — describe what needs to change
  C) Reopen a specific section — name which one

>
```

---

## Your Controls

These work at any point during the session:

| Input            | What it does                                                          |
| ---------------- | --------------------------------------------------------------------- |
| `status`         | Shows current step and what has been resolved so far                  |
| `skip`           | Defers the current question — documented as an open item in `plan.md` |
| `reopen [topic]` | Reopens a topic already discussed                                     |
| `abort`          | Ends the session without saving anything                              |
