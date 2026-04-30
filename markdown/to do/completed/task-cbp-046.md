# CBP-046 — Add `xhigh` effort level and update `/effort` interactive slider behavior

## Source
Claude Code v2.1.111 release notes.

## Summary
v2.1.111 adds a new `xhigh` effort level for Opus 4.7, sitting between `high` and `max`. It also changes `/effort` (called with no arguments) to open an interactive slider with arrow-key navigation instead of printing usage help. These two changes need to be reflected in (a) the Cheat Sheet `/effort` row, (b) the Cheat Sheet `--effort` CLI flag row, and (c) the Power Usage effort code block and adaptive-thinking table.

## Assessment

### What exists
- **Cheat Sheet line 4761:** `/effort [level]` row — lists `low | medium (default) | high | max`
- **Cheat Sheet line 4870:** `--effort` CLI flag — lists `low | medium [default] | high | max`
- **Power Usage lines 5181–5184:** Code block with `/effort max/high/medium/low` commands
- **Power Usage lines 5204–5207:** Adaptive-thinking table with `max/high/medium/low` rows

### What's missing
- `xhigh` level not listed anywhere (only valid for Opus 4.7, falls back to `high` on other models)
- No mention that `/effort` with no args now opens an interactive slider
- The note in Cheat Sheet and Power Usage should reflect the new level

## Plan

1. **Update Cheat Sheet `/effort` row (line 4761)**
   Change description from `low | medium (default) | high | max` to include `xhigh`:
   ```html
   <tr><td><code>/effort</code> <code>[level]</code></td><td>Set effort level: <code>low</code> | <code>medium</code> (default) | <code>high</code> | <code>xhigh</code> (Opus 4.7) | <code>max</code>. Call with no args for interactive slider.</td></tr>
   ```

2. **Update Cheat Sheet `--effort` CLI flag row (line 4870)**
   Add `xhigh` to the list:
   ```html
   <tr><td><code>--effort</code></td><td>Set effort level (<code>low</code> | <code>medium</code> [default] | <code>high</code> | <code>xhigh</code> | <code>max</code>)</td></tr>
   ```

3. **Update Power Usage code block (lines 5181–5184)**
   Add `xhigh` line between `high` and `medium`:
   ```
   /effort max          # Maximum reasoning — complex agentic tasks
   /effort xhigh        # Opus 4.7 only — between high and max
   /effort high         # Deep thinking — difficult coding problems
   /effort medium       # Balanced (default) — speed + quality
   /effort low          # Quick responses — simple tasks, subagents
   /effort              # Open interactive slider (arrow keys + Enter)
   ```

4. **Update Power Usage adaptive-thinking table (lines 5204–5207)**
   Insert `xhigh` row between `max` and `high`:
   ```html
   <tr><td><code>xhigh</code></td><td>Opus 4.7 only — deeper than high, lighter than max; falls back to <code>high</code> on other models</td></tr>
   ```

## Acceptance Criteria
- [ ] Cheat Sheet `/effort` row lists all 5 levels including `xhigh` and mentions interactive slider
- [ ] Cheat Sheet `--effort` flag row includes `xhigh`
- [ ] Power Usage code block shows `xhigh` and the no-arg interactive slider form
- [ ] Power Usage adaptive-thinking table has a `xhigh` row with Opus 4.7 caveat
- [ ] No broken HTML or styling regressions
