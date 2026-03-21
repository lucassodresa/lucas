# /refinement

## What this does

Starts a Refinement session for a single story. A panel of six agents — Product Owner, UX/Designer, Frontend Dev, Backend Dev, Architect, and QA — deliberates to produce a fully refined `ticket.md`. The Product Owner presents the story, the team raises questions, and the session ends when every requirement is unambiguous and every acceptance criterion is testable.

Read `.claude/phases/03-refinement/session.md` for the full session definition — steps, agent responsibilities, communication rules, artifact format, and sign-off behavior.

---

## Usage

```bash
# Refine a specific story
/refinement $TICKET_ID $INITIATIVE_PATH
# example: /refinement 001-001 docs/initiatives/001-notifications-system/
```

### Arguments

- `$TICKET_ID` — the ticket ID to refine, e.g. `001-001`. Must exist as a folder under `tickets/` in the initiative.
- `$INITIATIVE_PATH` — path to the initiative folder. The session reads `initiative.md`, `stories.md`, and `design/ux-flow.md` from this folder before beginning.

---

## Files to load before starting

Load these files in order before the session begins:

Static files (load once at session start):

1. `.claude/phases/03-refinement/session.md` — session definition
2. `.claude/agents/roles/product-owner-agent.md` — Product Owner role
3. `.claude/agents/roles/ux-designer-agent.md` — UX/Designer role
4. `.claude/agents/roles/frontend-dev-agent.md` — Frontend Developer role
5. `.claude/agents/roles/backend-dev-agent.md` — Backend Developer role
6. `.claude/agents/roles/architect-agent.md` — Architect role
7. `.claude/agents/roles/qa-agent.md` — QA Engineer role
8. `.claude/STRUCTURE.md` — folder structure and artifact templates

Initiative files (paths depend on `$INITIATIVE_PATH` and `$TICKET_ID` arguments):

- `$INITIATIVE_PATH/initiative.md` — initiative context and scope boundaries
- `$INITIATIVE_PATH/stories.md` — the story definition for `$TICKET_ID`
- `$INITIATIVE_PATH/design/ux-flow.md` — UX flow reference

---

## Display Format

Follow this format strictly throughout the session. Do not deviate.

```
[REFINEMENT — <ticket ID> <story name>]
Step: <step name> (<N>/4)

─── Internal Discussion ──────────────────────────────────────

PO:        <Product Owner presents or responds>

UX:        <UX/Designer validates flow and user experience>

FE:        <Frontend Dev raises question or concern>

BE:        <Backend Dev raises question or concern>

ARCH:      <Architect flags technical implication>

QA:        <QA Engineer raises scenario or gap>

─────────────────────────────────────────────────────────────

── Question for you ─────────────────────────────────────────

PO: <single, clear question requiring stakeholder judgment>

>
```

When no question is needed, omit the `── Question for you ──` block entirely and continue the internal discussion.

When the ticket is ready for review:

```
─── Ticket Ready for Review ──────────────────────────────────

<ticket.md contents displayed in full>

─────────────────────────────────────────────────────────────

── Your call ────────────────────────────────────────────────

  A) Approve — save ticket.md and close session
  B) Something is wrong — describe what needs to change
  C) Reopen a specific section — name which one

>
```

---

## Your Controls

These work at any point during the session:

| Input            | What it does                                                                               |
| ---------------- | ------------------------------------------------------------------------------------------ |
| `status`         | Shows current step and what has been resolved so far                                       |
| `skip`           | Defers the current question — it becomes an Open Question in `ticket.md` with you as owner |
| `reopen [topic]` | Reopens a topic already discussed                                                          |
| `abort`          | Ends the session without saving anything                                                   |
