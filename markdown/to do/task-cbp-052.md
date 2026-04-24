# CBP-052 — Update `/model` Cheat Sheet row: persistence + pin source indicator (v2.1.117)

## Summary
Claude Code v2.1.117 improved `/model` in two ways: (1) model selections now persist across restarts even when the project pins a different model, and (2) the startup header now shows when the active model comes from a project or managed-settings pin. The current Cheat Sheet row is just "Select or change AI model (Sonnet / Opus / Haiku)" — doesn't mention either behavior.

## Assessment
One location:
- **Line ~5003** — Cheat Sheet "Model, mode & usage" table, `/model` row.

The current description: "Select or change AI model (Sonnet / Opus / Haiku)"

## Plan

### Step 1 — Update the `/model` Cheat Sheet row
Expand the description to note persistence and pin-source display:

New description: "Select or change AI model. Your choice persists across restarts, overriding project-pinned models. Startup header shows when model comes from a project or managed-settings pin."

Keep it concise for a table cell.

## Acceptance Criteria
- `/model` row description mentions that selections persist across restarts
- Row notes that startup header indicates pin source when a model is project/managed-settings pinned
- Row fits cleanly within the existing table styling (no overflow)
