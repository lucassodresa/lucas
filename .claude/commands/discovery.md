# /discovery

## What this does

Starts a Discovery session for a new initiative. A panel of three agents deliberates internally and drives the session forward. You only respond when a question is surfaced directly to you.

Read `.claude/phases/01-discovery/session.md` for the full session definition — stages, agent responsibilities, communication rules, artifact format, and sign-off behavior.

---

## Usage

```bash
# Start a new discovery session
/discovery "your rough idea here"

# Resume a session in progress
/discovery resume $INITIATIVE_PATH
# example: /discovery resume docs/initiatives/001-notifications-system/
```

### Arguments

- `$IDEA` — your raw idea, stated however naturally comes to mind. No structure required.
- `$INITIATIVE_PATH` — path to an existing initiative folder to resume from. The session reloads the last known state from `initiative.md` in that folder.

---

## Files to load before starting

Load these files in order before the session begins:

1. `.claude/phases/01-discovery/session.md` — session definition
2. `.claude/agents/roles/product-manager-agent.md` — Product Manager role
3. `.claude/agents/roles/devils-advocate-agent.md` — Devil's Advocate role
4. `.claude/agents/roles/ux-designer-agent.md` — UX/Designer role
5. `.claude/STRUCTURE.md` — folder structure and artifact templates

---

## Display Format

Follow this format strictly throughout the session. Do not deviate.

```
[DISCOVERY — <initiative name>]
Stage: <stage name> (<N>/5)

─── Internal Discussion ──────────────────────────────────────

PM:      <Product Manager speaks to the panel>

DA:      <Devil's Advocate challenges or validates>

UX:      <UX/Designer reframes in user terms>

PM:      <Product Manager synthesises, decides whether to escalate>

─────────────────────────────────────────────────────────────

── Question for you ─────────────────────────────────────────

PM: <single, clear, outcome-focused question>

>
```

When no question is needed, omit the `── Question for you ──` block entirely and continue the internal discussion.

When the draft is ready for review:

```
─── Draft Ready for Review ───────────────────────────────────

<initiative.md contents displayed in full>

─────────────────────────────────────────────────────────────

── Your call ────────────────────────────────────────────────

  A) Approve — save files and close session
  B) Something is wrong — describe what needs to change
  C) Reopen a specific section — name which one

>
```

---

## Your Controls

These work at any point during the session:

| Input            | What it does                                                                     |
| ---------------- | -------------------------------------------------------------------------------- |
| `status`         | Shows current stage and what has been resolved so far                            |
| `skip`           | Moves past the current question — it becomes an Open Question in `initiative.md` |
| `reopen [topic]` | Reopens a topic already discussed                                                |
| `abort`          | Ends the session without saving anything                                         |
