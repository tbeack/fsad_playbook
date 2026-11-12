# CBP-737: Document Opus 4.8 fast mode deprecation (v2.1.316)

## Summary
Claude Code v2.1.316 deprecated fast mode for Opus 4.8 as of October 30, 2026; it will be removed on November 30, 2026. After removal, fast-mode requests on Opus 4.8 return an error and do not fall back to standard Opus 4.8. The release notes say to migrate to Opus 5.5 to keep the speedup.

## Assessment
`src/pages/practices.html` has a "Key Dates" callout (~line 1704-1717) that tracks exactly this kind of dated model-lifecycle event (releases, retirements, defaults), newest entry first. It also documents fast mode via the `/fast` cheat-sheet row (~line 1823) and the `Option+O` / `Alt+O` keybinding row (~line 1776). This is a real, dated deprecation with a hard removal date one month out — worth flagging in the Key Dates callout and on the `/fast` row so teams relying on Opus 4.8 fast mode see the migration path before it breaks.

## Plan
1. Open `src/pages/practices.html`.
2. In the "Key Dates" callout, insert a new `<li>` as the first item (before the September 29, 2026 Sonnet 5.5 entry):
   ```html
   <li><strong>October 30, 2026</strong> — <strong>Fast mode deprecated for Opus 4.8</strong>; scheduled for removal November 30, 2026. After removal, fast-mode requests on Opus 4.8 return an error instead of falling back to standard Opus 4.8 — migrate to Opus 5.5 to keep the speedup.</li>
   ```
3. Update the `/fast` cheat-sheet row (currently: `Toggle fast mode (same model, faster output). On Bedrock, Vertex, Foundry, or with telemetry disabled, /fast now applies immediately instead of queueing until the turn ends (v2.1.243).`) by appending:
   ```html
    Fast mode on Opus 4.8 is deprecated as of v2.1.316 and will be removed November 30, 2026, with no fallback to standard Opus 4.8 — migrate to Opus 5.5.
   ```
4. No other files require changes for this task.

## Acceptance Criteria
- The Key Dates callout's first (newest) bullet documents the Opus 4.8 fast-mode deprecation and its November 30, 2026 removal date.
- The `/fast` cheat-sheet row mentions the deprecation and the Opus 5.5 migration path.
- HTML is valid (no unclosed tags).
