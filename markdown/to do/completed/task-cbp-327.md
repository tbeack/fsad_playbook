# CBP-327: Update `context: fork` frontmatter row + add `background` key (v2.1.218)

## Summary
Claude Code v2.1.218 changed skills with `context: fork` to **run in the background by default**. Authors can opt out per skill with `background: false`. This is a meaningful behavior change for anyone writing fork-context skills.

## Assessment
The frontmatter reference table in the Building Skills section (~line 9404) has:
- `context` row: "Set to `fork` to run in isolated subagent context with fresh context window."
- No `background` key is listed.

Both need to be updated:
1. The `context` row should note that `fork` skills now run in the background by default.
2. A new `background` row should be added after `context` to document the opt-out.

## Plan
1. Open `fsad-playbook.html`, locate the frontmatter reference table.
2. Update the `context` row (~line 9404) to append the new behavior.
3. Insert a new `background` row after `context` (between `context` and `agent` rows).

## Exact changes

**Current `context` row (line ~9404):**
```html
<tr><td><code>context</code></td><td>string</td><td>Set to <code>fork</code> to run in isolated subagent context with fresh context window.</td></tr>
```

**Target `context` row:**
```html
<tr><td><code>context</code></td><td>string</td><td>Set to <code>fork</code> to run in isolated subagent context with fresh context window. As of v2.1.218, fork-context skills run in the background by default.</td></tr>
```

**New `background` row to insert after `context` (before `agent` row):**
```html
<tr><td><code>background</code></td><td>boolean</td><td>Controls whether a <code>context: fork</code> skill runs in the background. Defaults to <code>true</code> for fork skills (v2.1.218). Set to <code>false</code> to opt out and keep the skill in the foreground.</td></tr>
```

## Acceptance Criteria
- The `context` row notes background-by-default behavior for fork skills.
- A new `background` row appears after `context` and before `agent` in the frontmatter table.
- No HTML formatting is broken.
