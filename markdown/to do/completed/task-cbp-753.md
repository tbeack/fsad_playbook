# CBP-753: Add `permissions.denyInsteadOfPrompting` setting (v2.1.319)

## Summary
Claude Code v2.1.319 added the `permissions.denyInsteadOfPrompting` setting: a tool call that would otherwise wait on a permission prompt is denied outright and the turn continues, instead of blocking on a prompt. Applies in terminal sessions, subagents, and teammates.

## Assessment
`src/pages/practices.html` has a "Notable `settings.json` Keys" callout (~line 613-635) that catalogs individual permission-related keys like `permissions.blockReadsOutsideWorkingDirectories` and `permissions.blockWritesOutsideWorkingDirectories`. This is a direct fit.

## Plan
1. Open `src/pages/practices.html`.
2. In the "Notable `settings.json` Keys" list, after the `permissions.blockWritesOutsideWorkingDirectories` row (~line 628), insert:
   ```html
   <li style="margin-bottom:0.4rem;"><code>permissions.denyInsteadOfPrompting</code> — When set, a tool call that would otherwise wait on a permission prompt is denied outright and the turn continues, instead of blocking the session on a prompt. Applies in terminal sessions, subagents, and teammates. Use for unattended or fleet-managed sessions where no one is available to answer a prompt (v2.1.319).</li>
   ```
3. No other files require changes for this task.

## Acceptance Criteria
- A new bullet documents `permissions.denyInsteadOfPrompting` in the settings.json keys callout.
- HTML is valid (no unclosed tags).
