# CBP-668 — Add `onFailure: "block"` to Hooks Documentation (v2.1.295)

## Summary

Claude Code v2.1.295 added `onFailure: "block"` for command and HTTP hooks. When set, a hook that fails to start, times out, or exits with an unexpected code now blocks the triggering action instead of letting it through silently. This is a significant safety option for enforcement hooks.

## Assessment

The existing hooks section in `src/pages/practices.html` covers exit codes (exit 2 = block, exit 1 = non-blocking), async hooks, and HTTP hooks. The new `onFailure: "block"` option is not mentioned. It belongs near the async hooks description (lines 3602-3603), since it complements the hook reliability story: async hooks run in the background, while `onFailure: "block"` controls what happens when a synchronous hook fails unexpectedly.

Also, the hooks best practices list at line 3304 mentions `async: true` — adding a note about `onFailure: "block"` there would complete the picture.

## Plan

1. Read `src/pages/practices.html` lines 3600-3640 for context.
2. After line 3603 (async hooks paragraph), add a new paragraph describing `onFailure: "block"`:
   - Explain the option: hook fails to start, times out, or exits unexpectedly → action is blocked
   - Note it is set in the hook definition alongside `type` and `command`/`url`
   - Add a minimal JSON code snippet
3. Update the best practices list item at line 3304 (the `async: true` bullet) to also mention `onFailure: "block"` as the complement for enforcement hooks.

## Edit location

- `src/pages/practices.html` line 3603 — after async hooks paragraph, before the code block
- `src/pages/practices.html` line 3304 — best practices list item about `async: true`

## Acceptance Criteria

- `onFailure: "block"` appears in the hooks section of the Claude Best Practices page
- A JSON snippet shows the syntax
- The best practices list mentions `onFailure: "block"` alongside `async: true`
