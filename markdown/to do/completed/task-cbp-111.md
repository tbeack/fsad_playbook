# CBP-111 — Add `CLAUDE_CODE_FORCE_SYNC_OUTPUT=1` env var to Subprocess Sandboxing (v2.1.129)

## Summary
v2.1.129 added `CLAUDE_CODE_FORCE_SYNC_OUTPUT=1` — an env var that forces synchronized output mode on terminals where auto-detection fails (e.g. Emacs `eat` terminal). This is a useful debugging/compatibility tool for teams using non-standard terminals. The playbook's Subprocess Sandboxing env vars table does not include this.

## Assessment
- **File:** `fsad-playbook.html`
- The Hardening env vars table is at lines 6910–6922.
- Current vars: `CLAUDE_CODE_SUBPROCESS_ENV_SCRUB`, `CLAUDE_CODE_SCRIPT_CAPS`, `CLAUDE_CODE_HIDE_CWD`, `DISABLE_UPDATES`, `ANTHROPIC_BEDROCK_SERVICE_TIER`.
- `CLAUDE_CODE_FORCE_SYNC_OUTPUT` is a terminal compatibility var, not strictly a hardening var — it fits better as a new general env vars note. However, to keep edits minimal, it can be added to the existing table as a row.

## Plan
Add a new row to the Hardening env vars table (line 6919, before `</tbody>`), appended after `ANTHROPIC_BEDROCK_SERVICE_TIER`:

### Insert after line 6919:
```html
              <tr><td><code>CLAUDE_CODE_FORCE_SYNC_OUTPUT=1</code></td><td>Force-enables synchronized output mode for terminals where auto-detection fails (e.g. Emacs <code>eat</code>). Fixes garbled or interleaved output in unsupported terminal emulators.</td></tr>
```

## Acceptance Criteria
- `CLAUDE_CODE_FORCE_SYNC_OUTPUT=1` row appears in the env vars table in the Subprocess Sandboxing section.
- Description explains the use case (auto-detection miss, Emacs eat example).
- No other content changes.
