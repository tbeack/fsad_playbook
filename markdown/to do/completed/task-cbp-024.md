# CBP-024 — Update `/effort` Guidance with Boris Cherny's Recommendations

## Context

Boris Cherny (Anthropic) announced that the **default effort level has been changed from `high` to `medium`** to better balance intelligence with speed, based on real-world usage data. His key guidance:

- Default is now **medium** (previously high)
- Users can change effort anytime via `/model` selector
- The setting is **sticky** — persists across sessions
- If effort was previously set to `high`, users should:
  1. Verify they're on the latest Claude Code version
  2. Check that CLAUDE.md / `/memory/` don't have conflicting instructions

The official docs (platform.claude.com/docs/en/build-with-claude/effort) confirm:
- **4 effort levels:** `low`, `medium`, `high`, `max`
- `high` is still the API default, but Claude Code now defaults to `medium`
- `max` is available on Opus 4.6, Sonnet 4.6, and Mythos Preview
- Effort affects all tokens: text, tool calls, and extended thinking
- Effort is a behavioral signal, not a strict token budget

## Goal

Update the playbook's effort guidance to reflect Boris's recommendation to use `/effort max` for complex tasks, document the new default of `medium`, and add practical guidance on when to change effort levels.

## Locations to Update

### 1. Model & Effort Control collapsible (Power Usage section, ~line 4177)
**Current:** Generic description of effort levels with equal weight
**Change:**
- Add a callout/tip noting the default changed to `medium`
- Add Boris's recommendation: use `/effort max` for complex agentic work
- Explain the sticky behavior (persists across sessions)
- Add guidance on checking CLAUDE.md for conflicting effort instructions

### 2. Cheat Sheet — `/effort` slash command row (~line 3778)
**Current:** `Set effort level: low | medium | high | max | auto`
**Change:** Update description to note `medium` is default, recommend `max` for complex tasks

### 3. Cheat Sheet — `--effort` CLI flag row (~line 3884)
**Current:** `Set effort level (low | medium | high | max)`
**Change:** Add note that default is `medium`

### 4. Cheat Sheet — Quick Reference table (~line 4102)
**Current:** `Set effort level` → `/effort max` or `claude --effort high`
**Change:** Update example to emphasize `/effort max` as the recommended setting for complex work

### 5. Skill frontmatter table — `effort` field (~line 3264)
**Current:** `Override effort level: low | medium | high | max.`
**Change:** Add note that this overrides the session default (which is now `medium`)

## Implementation Notes

- Match existing HTML patterns (styled-table, callout-tip, code-block classes)
- Keep changes minimal — update descriptions in place, add one callout box
- No structural changes needed, just content updates
- Attribute the guidance to Boris Cherny where appropriate

## Verification

- [x] Open `fsad-playbook.html` in browser
- [x] Navigate to Power Usage → Model & Effort Control — verify updated content
- [x] Navigate to Cheat Sheet — verify updated `/effort` and `--effort` descriptions
- [x] Check Quick Reference table
- [x] Verify no broken HTML or styling issues
