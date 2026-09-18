# CBP-570 — Update `/code-review` Cheat Sheet row: leaner inline review prompts for untuned models (v2.1.274)

**Source:** Claude Code v2.1.274
**Tag:** [Claude]

## Summary
v2.1.274 changes `/code-review` to use leaner inline review prompts — for every model that has no tuned review settings of its own — instead of spawning many review subagents. This affects the review's internal execution strategy for such models, not the command's invocation surface.

## Assessment
The `/code-review` row in the Cheat Sheet table (`src/pages/practices.html`, line 1984) already tracks execution-model changes by version (background subagent in v2.1.218, autonomy restriction in v2.1.215, restriction lifted for gateway platforms in v2.1.246). Append the v2.1.274 change in the same style.

## Plan
1. Open `src/pages/practices.html`
2. Find the `/code-review` row (line 1984)
3. Insert before the closing `</td></tr>`, after the "Invoking with no effort level..." sentence:
   ```html
    As of v2.1.274, for any model without its own tuned review settings, <code>/code-review</code> runs leaner inline review prompts instead of spawning many review subagents.
   ```
4. Mark CBP-570 complete in `markdown/to do/todo.md`

## Acceptance Criteria
- The `/code-review` row notes the v2.1.274 execution change
- Build passes without errors
