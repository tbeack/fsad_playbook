# CBP-260 — Add `CLAUDE_CLIENT_PRESENCE_FILE` to hardening env vars table (v2.1.181)

## Summary
Claude Code v2.1.181 added `CLAUDE_CLIENT_PRESENCE_FILE` — an environment variable that points at a marker file. When the file exists, Claude Code suppresses mobile push notifications (the logic being: if the marker file is present, you're at the machine and don't need mobile notifications). Useful for desktop users who want to suppress push notifications during active sessions.

## Assessment
The hardening env vars table exists at lines 10607–10628 in `fsad-playbook.html`. It currently has 16 env vars. `CLAUDE_CLIENT_PRESENCE_FILE` is not present. While it's not strictly a "hardening" env var, it's a user-experience env var that fits most naturally in this reference table since the playbook doesn't have a separate general env vars table. The section heading "Hardening env vars (shared environments & CI/CD)" is somewhat informal; adding this var here is the best available home, similar to how `CLAUDE_CODE_ENABLE_AUTO_MODE` and `API_FORCE_IDLE_TIMEOUT` were added here (CBP-025, backfill tasks).

## Plan
1. Edit `fsad-playbook.html` after line 10626 (the `API_FORCE_IDLE_TIMEOUT=0` row)
2. Add a new `<tr>` for `CLAUDE_CLIENT_PRESENCE_FILE` just before `</tbody>` at line 10627

**New row to insert:**
```html
<tr><td><code>CLAUDE_CLIENT_PRESENCE_FILE</code></td><td>Path to a marker file that signals you're at the machine — when this file exists, Claude Code suppresses mobile push notifications. Create the file at session start and delete it when you step away (v2.1.181)</td></tr>
```

## Acceptance Criteria
- `CLAUDE_CLIENT_PRESENCE_FILE` row appears in the env vars table
- Description explains it is a path to a marker file and that its presence suppresses mobile push notifications
- Version tag (v2.1.181) included
