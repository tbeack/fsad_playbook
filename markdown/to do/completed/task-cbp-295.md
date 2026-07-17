# CBP-295 — Add `writes` app-approval mode to Codex Permission Profiles section (rust-v0.144.0)

## Summary
Codex rust-v0.144.0 added a `writes` app-approval mode that allows declared read-only actions while prompting only for write operations. This is a new named approval mode alongside the existing `auto`, `read-only`, and `full-access`.

## Assessment
The Codex CLI Flags table at line 12736 currently lists `--approval-mode / -a` with options `auto`, `read-only`, `full-access`. The `writes` mode is not documented. The Permission Profiles collapsible at line 13001–13039 documents built-in profiles (`:read-only`, `:workspace`, `:danger-no-sandbox`) but is about filesystem/network policies, not approval modes.

The right place to add `writes` is in the CLI Flags table description for `--approval-mode / -a` at line 12736.

Current cell:
```
<td>Set approval level (<code>auto</code>, <code>read-only</code>, <code>full-access</code>)</td>
```

**Update existing** — add `writes` to the list of approval levels with a brief description.

## Plan
1. Read line 12736 in `fsad-playbook.html`
2. Update the `--approval-mode / -a` row to include `writes` in the level list

**Updated description:**
```
Set approval level (<code>auto</code>, <code>read-only</code>, <code>writes</code>, <code>full-access</code>). The <code>writes</code> mode allows declared read-only actions automatically while prompting only for write operations (rust-v0.144.0).
```

## Acceptance Criteria
- [ ] `--approval-mode` row now lists `writes` alongside the existing approval levels
- [ ] Brief explanation of `writes` mode behavior is included
- [ ] rust-v0.144.0 attribution is present
