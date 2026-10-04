# CBP-630 — Note terminal input approval default for elevated-permission commands

## Summary
rust-v0.158.0 changed terminal input approval to be enabled by default for commands running with elevated permissions. Runtime-only grants no longer cause unnecessary reviews. Previously this was opt-in; now it is the default behavior for commands that need elevated permissions.

## Assessment
The Permission Profiles section is in the Power Usage area of `src/pages/codex.html` (around lines 1378–1415). The section has a Fail-closed callout (rust-v0.148.0) around lines 1408–1410. A new callout or inline note about terminal input approval being the default for elevated-permission commands belongs at the end of this section, after the Fail-closed callout and before the Enterprise: requirements.toml callout.

Alternatively, the "Project Trust & Managed Auth" callout at line 771 is another candidate. But the Permission Profiles section is more directly relevant since this is a permission/approval policy change, not a trust-establishment change.

## Plan
1. Read `src/pages/codex.html` around lines 1406–1420 (Fail-closed callout area).
2. Add a new inline note or callout after the "Fail-closed paths" callout:

```html
        <div class="callout callout-tip" style="margin-top:1rem;">
          <div class="callout-title">Terminal input approval by default (rust-v0.158.0)</div>
          <p>Terminal input approval is now enabled by default for commands running with elevated permissions — Codex prompts before sending stdin to a command that has been granted elevated access. Runtime-only permission grants no longer trigger unnecessary approval prompts.</p>
        </div>
```

3. Mark CBP-630 complete in `todo.md`.

## Acceptance Criteria
- The new callout appears after the "Fail-closed paths" callout and before the "Enterprise: requirements.toml" callout.
- It uses `callout-tip` styling matching the adjacent callouts.
- No other content is changed.
