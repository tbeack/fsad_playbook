# CBP-278 — Update `/install-github-app` Cheat Sheet row to reflect optional workflow setup

## Summary
Claude Code v2.1.187 improved `/install-github-app`: GitHub Actions workflow setup is now optional — you can install just the GitHub App and skip the workflow/secret steps. The current playbook row just says "Setup automated PR reviews" which doesn't reflect this flexibility.

## Assessment
The existing row is at line 9958:
```html
<tr><td><code>/install-github-app</code></td><td>Setup automated PR reviews</td></tr>
```

This needs to be updated to mention that the workflow setup step is now optional, giving teams flexibility to install just the app.

## Plan
1. Read `fsad-playbook.html` around line 9958 to confirm exact current content.
2. Edit the existing row:
   ```html
   <tr><td><code>/install-github-app</code></td><td>Set up automated PR reviews. GitHub Actions workflow/secret setup is optional — you can install just the GitHub App and skip the CI steps (v2.1.187)</td></tr>
   ```
3. Mark this task complete in `todo.md`.

## Acceptance Criteria
- The `/install-github-app` row accurately reflects that workflow setup is now optional.
- No surrounding HTML is broken.
- The row remains in the same table position.
