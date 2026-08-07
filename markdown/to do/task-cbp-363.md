# CBP-363 — [Codex] Add explicit project trust + managed auth restriction note to Guidelines

## Source
Codex CLI rust-v0.147.0

## Summary
rust-v0.147.0: "Require explicit trust for unfamiliar local projects and enforce managed authentication restrictions before credentials are used."

## Assessment
`fsad-playbook.html`, Codex Guidelines section. The Anti-Patterns card grid (lines 13570–13589) covers sandbox permissiveness, bloated AGENTS.md, session resume, and `/compact`, but nothing about project trust or credential/auth gating. Two passing "trusted projects" mentions exist elsewhere in the file (Project Anatomy line ~13259, Hooks line ~13633) but neither explains what trust means or how it's granted — this is a genuine documentation gap, not just a stale claim.

## Plan

### Step 1 — Add a new callout after the Anti-Patterns card grid, before the Security Review cross-reference callout (after line 13589, before line 13591)
```html
<!-- Project Trust -->
<div class="callout callout-tip" style="margin-top:2rem;">
  <div class="callout-title">Project Trust &amp; Managed Auth</div>
  <p>As of rust-v0.147.0, Codex requires <strong>explicit trust</strong> before running in an unfamiliar local project — you'll be prompted to confirm the first time Codex operates in a new directory, similar to how project-scoped MCP servers and hooks already only load in trusted projects. Managed authentication restrictions are also enforced <em>before</em> credentials are used, not after, closing a window where an untrusted project could exercise credentials prior to the trust check completing.</p>
</div>
```

## Acceptance Criteria
- New Guidelines callout documents the explicit project-trust prompt (rust-v0.147.0)
- Callout documents that managed auth restrictions are enforced before credential use
- HTML is valid
