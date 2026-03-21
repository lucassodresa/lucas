# Phase 2b — UX Design Session

## Purpose

Produce a component spec for stories that need one before Refinement can proceed. The session ends with a written, approved spec in `design/wireframes/` that Refinement uses as a reference input.

Runs in two modes:

| Mode                | Trigger                                         | Scope                                                                  |
| ------------------- | ----------------------------------------------- | ---------------------------------------------------------------------- |
| **Story-scoped**    | Automatically at Step 0 of a Refinement session | One story — produces one wireframe file                                |
| **Initiative-wide** | Manually after Story Mapping                    | All stories — triages each and produces specs for those that need them |

In story-scoped mode the session is brief: the designer assesses the story, produces the spec if needed, gets approval, writes the file, and hands control back to Refinement.

---

## Prerequisites

- `docs/initiatives/<NNN>-<initiative-name>/stories.md` exists and is signed off
- `docs/initiatives/<NNN>-<initiative-name>/initiative.md` exists and is signed off
- Story Mapping is signed off before this session begins

---

## Participant

| Agent           | Role file                                   | Focus in this session                                                                      |
| --------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------ |
| **UX/Designer** | `.claude/agents/roles/ux-designer-agent.md` | Reviews every story. Determines design need. Produces wireframe files for complex stories. |

---

## Communication Rules

**UX/Designer addresses the stakeholder directly.**
This is a single-agent session. The designer works through stories independently and surfaces questions when a story's visual direction requires a stakeholder decision.

**Escalate to the stakeholder only when:**

- A story's visual direction has multiple valid options with different UX tradeoffs
- A story requires information about brand, visual style, or tone that only the stakeholder can provide
- A scope question arises that was not resolved in Story Mapping

**One question at a time.**
The designer resolves as much as possible independently. When they escalate, it is one focused question — never a list.

---

## Input

Before beginning, the UX/Designer reads:

- `docs/initiatives/<NNN>-<initiative-name>/initiative.md` — initiative context, scope, and UX flow
- `docs/initiatives/<NNN>-<initiative-name>/stories.md` — all stories with their scope and refinement notes

---

## Session Flow

### Step 1 — Story Triage

The designer reads every story in `stories.md` and assigns a design status to each:

| Status                    | Meaning                                                                                 |
| ------------------------- | --------------------------------------------------------------------------------------- |
| **Needs design**          | The story has visual states, layouts, or interactions that are ambiguous without a spec |
| **Tokens sufficient**     | The visual output is fully determined by the existing token system — no spec needed     |
| **Implementation exists** | The component already exists in the codebase — audit only, no new design required       |

The designer presents the triage table to the stakeholder before producing any wireframes. If the stakeholder disagrees with a status, it is corrected before work begins.

---

### Step 2 — Wireframe Production

For each story with status **Needs design**, the designer produces a wireframe file.

Each wireframe file covers:

| Section                | What it contains                                                                                    |
| ---------------------- | --------------------------------------------------------------------------------------------------- |
| **Component anatomy**  | The slots, regions, and content areas of the component — labelled, described in plain text          |
| **Default state**      | What the component looks like with no special conditions                                            |
| **Interactive states** | Hover, focus, active, pressed — any state triggered by user interaction                             |
| **Validation states**  | Error, warning, success — where applicable                                                          |
| **Disabled state**     | What the component looks like when non-interactive                                                  |
| **Empty state**        | What the component shows when there is no data — where applicable                                   |
| **Loading state**      | What the component shows while data is being fetched — where applicable                             |
| **Responsive notes**   | Any behaviour that differs across screen sizes — only if relevant                                   |
| **Annotations**        | Anything that cannot be inferred from the token system and needs explicit callout for the developer |

The designer does not produce wireframes for states already fully defined by existing token values — they annotate those as "see `tokens.css`" instead.

---

### Step 3 — Design Review

The designer presents each wireframe to the stakeholder before writing any files.

The stakeholder reviews and either:

- **Approves** — wireframe is written to disk, story is cleared for Refinement
- **Requests a change** — designer revises and re-presents
- **Skips a state** — that state is noted as explicitly out of scope in the wireframe file

---

## On Approval

For each approved wireframe, the designer writes:

```
docs/initiatives/<NNN>-<initiative-name>/design/wireframes/<story-name>.md
```

Where `<story-name>` matches the story name from `stories.md` (lowercase, hyphenated).

The designer then updates `stories.md` with a `Design` column noting the status of each story:

```
| ID      | Story          | Depends on | Design              |
|---------|----------------|------------|---------------------|
| 001-001 | layout-primitives | —       | Tokens sufficient   |
| 001-006 | overlays       | —          | design/wireframes/overlays.md |
```

---

## Wireframe File Format

```markdown
# Wireframe: <story name>

_Initiative: docs/initiatives/<NNN>-<initiative-name>/initiative.md_
_Story: docs/initiatives/<NNN>-<initiative-name>/stories.md#<ID>_
_Produced: <date>_

## Components covered

- <component name>

---

## <Component Name>

### Anatomy

<Describe the visual regions and content slots. Use indented text or ASCII
layout to show spatial relationships where helpful.>

### Default state

<What the developer sees when the component renders with no special conditions.>

### Interactive states

**Hover:** <description>
**Focus:** <description — include focus ring details>
**Active / Pressed:** <description>

### Validation states

**Error:** <description — include error colour token, icon if any>
**Success:** <description>
**Warning:** <description>

### Disabled state

<description — include opacity or colour change>

### Empty state

<description — only if applicable>

### Loading state

<description — only if applicable>

### Annotations

- <any explicit callout for the developer that cannot be inferred from tokens>

---

[repeat for each component in the story]
```

---

## What This Session Does Not Cover

- Implementation approach — that is Planning
- Acceptance criteria — that is Refinement
- Token definitions — tokens are an input to this session, not an output
- High-fidelity mockups — wireframes are structural and behavioural, not pixel-perfect

If a token gap is discovered (a visual property needed by a component that has no token), the designer flags it as an annotation in the wireframe. The token is added during Implementation, not here.
