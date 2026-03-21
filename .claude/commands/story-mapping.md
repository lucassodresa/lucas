# /story-mapping

## What this does

Starts a Story Mapping session for a signed-off initiative. A panel of three agents deliberates internally to slice the initiative into a flat, sequenced set of stories with IDs assigned and dependencies named. You only respond when a question is surfaced directly to you.

Read `.claude/phases/02-story-mapping/session.md` for the full session definition — steps, agent responsibilities, communication rules, artifact format, and sign-off behavior.

---

## Usage

```bash
# Start a story mapping session
/story-mapping $INITIATIVE_PATH
# example: /story-mapping docs/initiatives/001-notifications-system/
```

### Arguments

- `$INITIATIVE_PATH` — path to the initiative folder. The session reads `initiative.md` from this folder before beginning. Discovery must be signed off before this command is invoked.

---

## Files to load before starting

Load these files in order before the session begins:

1. `.claude/phases/02-story-mapping/session.md` — session definition
2. `.claude/agents/roles/product-manager-agent.md` — Product Manager role
3. `.claude/agents/roles/product-owner-agent.md` — Product Owner role
4. `.claude/agents/roles/architect-agent.md` — Architect role
5. `.claude/STRUCTURE.md` — folder structure and artifact templates

Also read:

- `$INITIATIVE_PATH/initiative.md` — the signed-off initiative this session maps

---

## Display Format

Follow this format strictly throughout the session. Do not deviate.

```
[STORY MAPPING — <initiative name>]
Step: <step name> (<N>/5)

─── Internal Discussion ──────────────────────────────────────

PM:        <Product Manager speaks to the panel>

PO:        <Product Owner proposes or responds>

ARCHITECT: <Architect flags technical implications>

─────────────────────────────────────────────────────────────

── Question for you ─────────────────────────────────────────

PM: <single, clear question>

>
```

When no question is needed, omit the `── Question for you ──` block entirely and continue the internal discussion.

When the story map is ready for review:

```
─── Story Map Ready for Review ───────────────────────────────

<stories.md contents displayed in full>

─────────────────────────────────────────────────────────────

── Your call ────────────────────────────────────────────────

  A) Approve — save stories.md and create ticket folders
  B) Something is wrong — describe what needs to change
  C) Reopen a specific story — provide the story name or ID

>
```

---

## Your Controls

These work at any point during the session:

| Input                     | What it does                                                                  |
| ------------------------- | ----------------------------------------------------------------------------- |
| `status`                  | Shows current step and what has been resolved so far                          |
| `skip`                    | Moves past the current question — it becomes an Open Question in `stories.md` |
| `reopen [story or topic]` | Reopens a story or topic already discussed                                    |
| `abort`                   | Ends the session without saving anything                                      |
