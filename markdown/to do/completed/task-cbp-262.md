# CBP-262 — Config: Auto Mode Built-in Safety Blocks (v2.1.183)

## Summary

Claude Code v2.1.183 added built-in safety guardrails to auto mode. Destructive git commands (`git reset --hard`, `git checkout -- .`, `git clean -fd`, `git stash drop`) are now blocked when the user didn't ask to discard local work. `git commit --amend` is blocked when the commit wasn't made by the agent in the current session. IaC destroy commands (`terraform destroy`, `pulumi destroy`, `cdk destroy`) are blocked unless the user explicitly asked for that specific stack destruction.

These are implicit safety rules built into auto mode itself — separate from the configurable `settings.autoMode.hard_deny` rules already documented.

## Assessment

The playbook documents `settings.autoMode.hard_deny` (line 8585) for user-configurable hard blocks. But the new built-in safety behavior is not documented. The best place is a new bullet in the Notable settings.json Keys callout, adjacent to the `settings.autoMode.hard_deny` entry — or as a note within it. Since this is an implicit behavior (not a configurable key), a standalone callout note is cleaner.

The `settings.autoMode.hard_deny` bullet is at line 8585. We'll add a new adjacent bullet documenting the built-in safety rules.

## Plan

1. Edit the Notable settings.json Keys callout at `/Users/theobeack/Repo/fsad_playbook/fsad-playbook.html`.
2. After the `settings.autoMode.hard_deny` `<li>` (line 8585), add a new `<li>` for built-in auto mode safety blocks.

New `<li>` content (insert after `settings.autoMode.hard_deny` `</li>`):
```
<li style="margin-bottom:0.4rem;"><strong>Auto mode built-in safety blocks</strong> — Auto mode blocks certain destructive commands by default, independent of your deny rules: <code>git reset --hard</code>, <code>git checkout -- .</code>, <code>git clean -fd</code>, and <code>git stash drop</code> are blocked unless you explicitly asked to discard local work; <code>git commit --amend</code> is blocked when the commit wasn't made by the agent this session; <code>terraform destroy</code>, <code>pulumi destroy</code>, and <code>cdk destroy</code> are blocked unless you named the specific stack. Use <code>settings.autoMode.hard_deny</code> above for additional custom blocks (v2.1.183).</li>
```

## Acceptance Criteria

- New bullet appears in Notable settings.json Keys callout, adjacent to (after) `settings.autoMode.hard_deny`
- Bullet clearly lists the blocked commands and the conditions
- Cross-references `settings.autoMode.hard_deny` for custom rules
- HTML is valid and consistent with surrounding entries
