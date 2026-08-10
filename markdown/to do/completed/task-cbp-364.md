# CBP-364 — [Codex] Add v0.146.1 safer auto-review defaults note to Permission Profiles

## Source
Codex CLI rust-v0.146.1

## Summary
rust-v0.146.1 (patch release between v0.146.0 and v0.147.0): "Apply safer automatic-review defaults for cyber-capable models and explain permission changes in the terminal interface."

## Assessment
`fsad-playbook.html`, Power Usage → Permission Profiles collapsible, lines 14114–14152. Covers named profiles, custom profile config, and `requirements.toml`, but has no mention of automatic-review behavior, cyber-capable-model handling, or in-terminal permission-change explanations.

## Plan

### Step 1 — Add a sentence to the intro paragraph (line 14121)
```html
<p>Permission profiles replace the old binary sandbox flags with named, reusable policies for filesystem and network access. Define them in <code>~/.codex/config.toml</code> and apply with <code>--approval-mode</code> or <code>default_permissions</code>. As of rust-v0.146.1, cyber-capable models get safer automatic-review defaults out of the box, and the terminal interface explains permission changes as they happen instead of applying them silently.</p>
```

## Acceptance Criteria
- Permission Profiles collapsible documents the v0.146.1 safer auto-review defaults for cyber-capable models
- Collapsible documents the improved in-terminal permission-change explanations
- HTML is valid
