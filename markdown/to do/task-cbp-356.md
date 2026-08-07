# CBP-356 — [Codex] Fix `--full-auto` row — flag fully removed, correct replacement is `--sandbox workspace-write`

## Source
Codex CLI rust-v0.147.0

## Summary
rust-v0.147.0: "Remove the deprecated `codex exec --full-auto` flag; use `--sandbox workspace-write` instead." The flag is now fully removed (not just deprecated), and the changelog's stated replacement is `--sandbox workspace-write` — not `--approval-mode`, which is what the playbook currently claims.

## Assessment
Two stale locations in `fsad-playbook.html`:
1. Line 13842, Codex Cheat Sheet → CLI Flags table:
   ```html
   <tr><td><code>--full-auto</code></td><td><em>Deprecated</em> — use <code>--approval-mode</code> with a named permission profile instead</td></tr>
   ```
2. Lines 14045–14046, Power Usage → CI/CD Integration collapsible code block:
   ```
   # Autonomous execution via permission profile (replaces deprecated --full-auto)
   codex exec --approval-mode never "update dependencies and fix breaking changes"
   ```
   This example reinforces the same incorrect replacement mapping.

## Plan

### Step 1 — Update the CLI Flags table row (line 13842)
```html
<tr><td><code>--full-auto</code></td><td><em>Removed in rust-v0.147.0</em> — use <code>--sandbox workspace-write</code> instead</td></tr>
```

### Step 2 — Update the CI/CD Integration code block (lines 14045–14046)
```
# Autonomous execution (replaces removed --full-auto, rust-v0.147.0)
codex exec --sandbox workspace-write "update dependencies and fix breaking changes"
```

## Acceptance Criteria
- `--full-auto` row says "Removed" (not "Deprecated") and points to `--sandbox workspace-write`
- CI/CD Integration example uses `--sandbox workspace-write`, not `--approval-mode`, as the `--full-auto` replacement
- HTML is valid
