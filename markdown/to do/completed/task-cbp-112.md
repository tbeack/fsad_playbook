# CBP-112 — Add `CLAUDE_CODE_PACKAGE_MANAGER_AUTO_UPDATE` env var (v2.1.129)

## Summary
v2.1.129 added `CLAUDE_CODE_PACKAGE_MANAGER_AUTO_UPDATE` — when set on Homebrew or WinGet installations, Claude Code runs the upgrade command in the background and prompts the user to restart when a new version is available. This is useful for teams that want automatic updates without full unattended upgrades. The playbook does not document this env var.

## Assessment
- **File:** `fsad-playbook.html`
- The Hardening env vars table (lines 6910–6922) is the right location. This is a counterpart to `DISABLE_UPDATES` — one enables auto-update, the other disables it entirely. They should be near each other.

## Plan
Add a new row to the Hardening env vars table after the `DISABLE_UPDATES` row (line 6918), before `ANTHROPIC_BEDROCK_SERVICE_TIER`:

### Insert after line 6918:
```html
              <tr><td><code>CLAUDE_CODE_PACKAGE_MANAGER_AUTO_UPDATE=1</code></td><td>On Homebrew or WinGet installations, runs the package manager upgrade command in the background and prompts to restart when a new version is ready. Complement to <code>DISABLE_UPDATES</code> — use when you want managed automatic updates.</td></tr>
```

## Acceptance Criteria
- `CLAUDE_CODE_PACKAGE_MANAGER_AUTO_UPDATE=1` row appears in the env vars table, positioned after `DISABLE_UPDATES`.
- Description explains the behavior (background upgrade, restart prompt) and Homebrew/WinGet scope.
- No other content changes.
