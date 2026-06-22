# CBP-242 — Add `disableBundledSkills` + `CLAUDE_CODE_DISABLE_BUNDLED_SKILLS` to Notable settings.json Keys

## Summary
Claude Code v2.1.169 added a `disableBundledSkills` setting and `CLAUDE_CODE_DISABLE_BUNDLED_SKILLS` environment variable that hides bundled skills, workflows, and built-in slash commands from the model. This is useful for teams that want to control the exact set of available commands, or for troubleshooting conflicts with custom skills.

## Assessment
- **`disableBundledSkills`:** Not mentioned anywhere in the playbook.
- **`CLAUDE_CODE_DISABLE_BUNDLED_SKILLS`:** Not mentioned anywhere in the playbook.
- Best fit: Add a bullet to the Notable settings.json Keys callout (lines 8573–8588 in fsad-playbook.html). The callout already documents `skillOverrides` for per-skill control — `disableBundledSkills` is the global kill switch equivalent.

## Plan

### Step 1 — Find the Notable settings.json Keys callout
Location: around line 8573–8588 in fsad-playbook.html.
The last bullet currently ends with the deny rule glob patterns item.

### Step 2 — Add new bullet for `disableBundledSkills`
Append a new `<li>` after the last existing item in the `<ul>`:
Change the last item's `margin-bottom:0` to `margin-bottom:0.4rem`, then add:
```html
<li style="margin-bottom:0;"><code>disableBundledSkills</code> — Set <code>true</code> to hide all bundled skills, workflows, and built-in slash commands from the model. Env var equivalent: <code>CLAUDE_CODE_DISABLE_BUNDLED_SKILLS=1</code>. Pairs with <code>skillOverrides</code> for per-skill granularity.</li>
```

## Acceptance Criteria
- `disableBundledSkills` appears in the Notable settings.json Keys callout
- Description mentions bundled skills, workflows, built-in slash commands
- `CLAUDE_CODE_DISABLE_BUNDLED_SKILLS` env var is noted
- Cross-reference to `skillOverrides` for per-skill control
- HTML formatting consistent with existing bullets in the callout
