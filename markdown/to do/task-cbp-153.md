# CBP-153 — Plugin Dependency Enforcement

## Summary
Claude Code v2.1.143 added plugin dependency enforcement:
- `claude plugin disable` now refuses to disable a plugin when another enabled plugin depends on it. The error message includes a copy-pasteable disable-chain command showing what to disable first.
- `claude plugin enable` now force-enables all transitive dependencies automatically.

## Assessment
The Plugins collapsible (lines 6826–6874) documents `claude plugin prune` and `claude plugin uninstall --prune` but has no mention of `disable`/`enable` dependency handling. The code block at lines 6834–6851 shows plugin install/reload/prune commands. The bullet list at lines 6852–6860 covers key features.

This is **new content** — no existing mention of dependency enforcement, disable guards, or transitive enable.

## Plan
1. Add two new lines to the shell code block in the Plugins collapsible (after the `--plugin-url` line):
   ```bash
   # Disable a plugin (fails if another enabled plugin depends on it — shows chain hint)
   claude plugin disable my-plugin
   
   # Enable a plugin (auto-enables transitive dependencies)
   claude plugin enable my-plugin
   ```
2. Add a new bullet point to the bullet list after the existing items, explaining the dependency guard:
   ```html
   <li><strong>Dependency enforcement:</strong> <code>claude plugin disable</code> refuses when another enabled plugin depends on the target — the error shows a copy-pasteable chain command. <code>claude plugin enable</code> auto-enables all transitive dependencies.</li>
   ```

## Acceptance Criteria
- Plugins collapsible code block shows `claude plugin disable` and `claude plugin enable` commands with comments
- Bullet list includes a note about dependency enforcement for both disable and enable
- No duplicate content, no broken HTML
