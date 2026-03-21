# /ux-design

## What this does

Starts a UX Design session that produces a component spec for one or more stories. The UX/Designer determines whether a spec is needed, produces it if so, and the output becomes a reference input for Refinement.

Can be run in two modes: **story-scoped** (triggered automatically at the start of a Refinement session for a specific story) or **initiative-wide** (run manually after Story Mapping to triage and produce specs for all stories upfront).

Read `.claude/phases/02b-ux-design/session.md` for the full session definition.

---

## Usage

```bash
# Story-scoped — triggered at the start of a Refinement session
/ux-design $TICKET_ID $INITIATIVE_PATH
# example: /ux-design 001-006 docs/initiatives/001-ui-v1-core-component-library/

# Initiative-wide — triage all stories and produce specs upfront
/ux-design $INITIATIVE_PATH
# example: /ux-design docs/initiatives/001-ui-v1-core-component-library/
```

### Arguments

- `$TICKET_ID` — story-scoped mode only. The ticket ID to design for. The session focuses on this story only and writes one wireframe file on approval.
- `$INITIATIVE_PATH` — path to the initiative folder. Always required.

---

## When to run this

**Automatically** — triggered by `/refinement` at Step 0 when the UX/Designer determines the story needs a design spec. The Refinement session pauses, `/ux-design` runs for that story, and Refinement resumes once the spec is approved.

**Manually** — run after `/story-mapping` to triage all stories and produce specs upfront before any Refinement sessions begin.

```
# Automatic (per story)
/refinement 001-006 → UX/Designer flags need → /ux-design 001-006 → Refinement resumes

# Manual (all stories upfront)
/story-mapping → /ux-design $INITIATIVE_PATH → /refinement (per story)
```

---

## Files to load before starting

Static files (load once at session start):

1. `.claude/phases/02b-ux-design/session.md` — session definition
2. `.claude/agents/roles/ux-designer-agent.md` — UX/Designer role
3. `.claude/STRUCTURE.md` — folder structure and artifact templates

Initiative files (paths depend on `$INITIATIVE_PATH` argument):

- `$INITIATIVE_PATH/initiative.md` — initiative context, scope, and UX flow
- `$INITIATIVE_PATH/stories.md` — all stories with scope and refinement notes

---

## Display Format

Follow this format strictly throughout the session. Do not deviate.

```
[UX DESIGN — <initiative name>]
Step: <step name> (<N>/3)

─── Designer's Reading ───────────────────────────────────────

UX: <UX/Designer works through stories or presents wireframe>

─────────────────────────────────────────────────────────────
```

When presenting the triage table for review:

```
─── Story Triage ─────────────────────────────────────────────

| ID      | Story | Design status | Reason |
|---------|-------|---------------|--------|
| <id>    | <name> | Needs design / Tokens sufficient / Implementation exists | <why> |

─────────────────────────────────────────────────────────────

── Your call ────────────────────────────────────────────────

  A) Approve triage — proceed to wireframe production
  B) Change a status — specify which story and the correct status

>
```

When a wireframe is ready for review:

```
─── Wireframe Ready: <story name> ────────────────────────────

<wireframe file contents displayed in full>

─────────────────────────────────────────────────────────────

── Your call ────────────────────────────────────────────────

  A) Approve — save wireframe and mark story as design-complete
  B) Something is wrong — describe what needs to change
  C) Skip a state — name which one to mark out of scope

>
```

When a question is needed:

```
── Question for you ─────────────────────────────────────────

UX: <single, clear question about visual direction or tone>

>
```

---

## Your Controls

These work at any point during the session:

| Input            | What it does                                                                     |
| ---------------- | -------------------------------------------------------------------------------- |
| `status`         | Shows which stories are done, in progress, and pending                           |
| `skip [story]`   | Marks a story as needing design but defers it — Refinement is blocked until done |
| `reopen [story]` | Reopens a story's wireframe already approved                                     |
| `abort`          | Ends the session without saving anything                                         |
