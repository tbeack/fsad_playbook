# CBP-771: Add `sandbox.autoAllowBashIfSandboxed` setting — sandboxed Bash now asks permission by default (v2.1.325)

## Summary
Claude Code v2.1.325 changed sandboxed Bash commands to follow the normal permission flow by default instead of running without prompts. Set `sandbox.autoAllowBashIfSandboxed: true` to keep the previous no-prompt behavior — including in your highest-ranking managed settings source, for managed settings that turn the sandbox on.

## Assessment
`src/pages/practices.html` has a "Subprocess Sandboxing" collapsible (~line 2739-2856). Its intro paragraph (~line 2746) already chains a running list of "As of vX.X.X, ..." behavior-change sentences, and its "Key `settings.json` keys" table (~line 2759-2780) lists individual `sandbox.*` keys including `sandbox.enabled`. This is a direct fit for both a new settings-table row and an appended sentence in the intro paragraph.

## Plan
1. Open `src/pages/practices.html`.
2. In the intro paragraph of the Subprocess Sandboxing collapsible (ends "...unless run with `CLAUDE_CODE_DISABLE_SUBSTITUTION_RM_PROMPT=1`.</p>", ~line 2746), append a new sentence before the closing `</p>`:
   ```
    As of v2.1.325, sandboxed Bash commands follow the normal permission flow by default instead of running automatically; set <code>sandbox.autoAllowBashIfSandboxed: true</code> to keep the previous no-prompt behavior — including in your highest-ranking managed settings source, for managed settings that turn the sandbox on.
   ```
3. In the "Key `settings.json` keys" table, immediately after the `sandbox.enabled` row (~line 2764), insert a new row:
   ```html
   <tr><td><code>sandbox.autoAllowBashIfSandboxed</code></td><td>Set to <code>true</code> to let sandboxed Bash commands run without approval prompts, matching the previous default. As of v2.1.325, sandboxed Bash commands ask for permission by default unless this is set.</td></tr>
   ```
4. No other files require changes for this task.

## Acceptance Criteria
- The Subprocess Sandboxing intro paragraph documents the v2.1.325 default-behavior change.
- A new `sandbox.autoAllowBashIfSandboxed` row appears in the settings table, right after `sandbox.enabled`.
- HTML is valid (no unclosed tags).
