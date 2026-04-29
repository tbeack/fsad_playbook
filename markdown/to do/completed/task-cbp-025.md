# CBP-025 — Update Guidance on Disabling Adaptive Thinking

## Problem Statement

The playbook currently has minimal coverage of extended/adaptive thinking. Users need to understand:

1. **What adaptive thinking is** — Claude dynamically decides when and how much to think based on task complexity
2. **Why you might want to disable it** — latency, cost, or simple tasks that don't benefit from reasoning
3. **How the landscape has changed** — `budget_tokens` is deprecated on Opus 4.6 and Sonnet 4.6; adaptive thinking with `effort` is the recommended replacement

## Research Summary (from Anthropic Docs)

### Adaptive Thinking (New Default for 4.6 Models)

- **What:** Instead of manually setting a thinking token budget, Claude dynamically determines when and how much to use extended thinking based on request complexity
- **Config:** `thinking: {type: "adaptive"}` — recommended for Opus 4.6 and Sonnet 4.6
- **Interaction with effort:**
  | Effort | Thinking behavior |
  |--------|-------------------|
  | `max` | Always thinks, no constraints on depth |
  | `high` (API default) | Almost always thinks, deep reasoning |
  | `medium` | Moderate thinking, may skip for simple queries |
  | `low` | Minimizes thinking, skips for simple tasks |
- **Interleaved thinking** is automatically enabled in adaptive mode — Claude can think between tool calls (critical for agentic workflows)

### Disabling Thinking

- **Config:** Omit the `thinking` parameter entirely, or pass `{type: "disabled"}`
- **NOT supported on Claude Mythos Preview** — thinking cannot be disabled on that model
- **When to disable:**
  - Simple tasks that don't require complex reasoning
  - Latency-sensitive applications where speed matters most
  - Cost optimization (no thinking token overhead)
  - Real-time applications with strict response time requirements

### Deprecation Notice

- `thinking: {type: "enabled", budget_tokens: N}` is **deprecated** on Opus 4.6 and Sonnet 4.6
- Will be removed in a future model release
- Migration path: use `thinking: {type: "adaptive"}` with `effort` parameter instead
- Older models (Sonnet 4.5, Opus 4.5) still require the manual `budget_tokens` approach

### Key Nuances for Claude Code Users

- The `effort` parameter is the primary lever for controlling thinking depth in Claude Code (not `budget_tokens`)
- `/effort low` effectively minimizes thinking; `/effort max` maximizes it
- The `Alt+T` / `Option+T` keyboard shortcut toggles extended thinking mode
- Skill frontmatter supports an `effort` field to control per-skill thinking depth
- Adding "ultrathink" to skill content enables deep reasoning (already documented)

### Prompt-Based Tuning

Anthropic docs note that adaptive thinking behavior is promptable. You can add system prompt guidance like:
> "Extended thinking adds latency and should only be used when it will meaningfully improve answer quality — typically for problems that require multi-step reasoning. When in doubt, respond directly."

**Warning:** Steering Claude to think less may reduce quality on reasoning-heavy tasks. Anthropic recommends testing with lower effort levels first before prompt-based tuning.

## What to Add to the Playbook

### Option A: Expand the existing "Model & Effort Control" collapsible (Power Usage section)
Add a paragraph or sub-block explaining:
- Adaptive thinking is now the default on 4.6 models
- Effort controls thinking depth (low = minimal thinking, max = deepest reasoning)
- `budget_tokens` is deprecated — use effort instead
- When disabling thinking makes sense (simple lookups, speed-critical paths)

### Option B: Create a dedicated collapsible in Power Usage
A standalone "Extended Thinking & Adaptive Mode" collapsible covering:
- What adaptive thinking is
- How effort controls it
- When/how to disable it
- The `Option+T` toggle
- Deprecation of `budget_tokens`

### Recommendation: Option A (expand existing section)
This is a natural extension of the effort/model control topic. A separate section would fragment related content. Keep it concise — 2-3 paragraphs + a small effort/thinking behavior table.

## Locations to Update

1. **Model & Effort Control collapsible** (~line 4177) — Add adaptive thinking guidance after the effort code block
2. **Cheat Sheet keyboard shortcuts** (~line 3735) — `Option+T` is already listed, verify description is accurate
3. **Skill frontmatter table** (~line 3264) — `effort` field already documented, no change needed

## Verification

- [x] Open `fsad-playbook.html` in browser
- [x] Navigate to Power Usage → Model & Effort Control
- [x] Verify new adaptive thinking content renders correctly
- [x] Check that keyboard shortcut description for `Option+T` is accurate
- [x] Confirm no broken HTML or styling
