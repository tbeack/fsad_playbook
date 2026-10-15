# CBP-689 — Add `virtualText` prompt decoration to mods section (v2.1.300)

## Summary
Claude Code v2.1.300 added `virtualText` to a mod's prompt decorations: text drawn in the prompt box that never enters the draft or the submitted prompt. This is useful for mods that want to show hints or context inside the input area without affecting what Claude receives.

## Assessment
The mods section (src/pages/practices.html) documents mod capabilities including drawing panes and bands, but does not mention prompt decorations or `virtualText`. This is a "New content needed" task.

## Plan
1. Read src/pages/practices.html around line 3660 (the "What a Mod Is" collapsible).
2. The collapsible lists capabilities: draw an interface, redraw built-in UI, step into a tool call, add instant commands, share state.
3. Add a new bullet point to that list: "<li><strong>Decorate the prompt box</strong>: use <code>virtualText</code> in a prompt decoration to draw hint text inside the input area; the text is visible but never enters the draft or the submitted prompt (v2.1.300).</li>"

## Acceptance Criteria
- The mods capabilities list mentions prompt box decoration via `virtualText`.
- The new bullet is placed in the existing capabilities list inside the "What a Mod Is" collapsible.
- No existing bullets are removed or altered.
