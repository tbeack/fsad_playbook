# CBP-191 — Add `disallowed-tools` frontmatter field to Skills frontmatter reference table

## Summary
Claude Code v2.1.152 added `disallowed-tools` as a frontmatter field for skills and slash commands. It removes specific tools from the model while the skill is active (the inverse of `allowed-tools`).

## Assessment
The Skills frontmatter reference table is at lines 5734–5752 in `fsad-playbook.html`. The `allowed-tools` row is at line 5742:
```
<tr><td><code>allowed-tools</code></td><td>string/list</td><td>Tools Claude can use without prompting...</td></tr>
```
Add `disallowed-tools` immediately after `allowed-tools` since they are complementary.

`disallowed-tools` is NOT currently in the playbook (confirmed by grep).

## Plan
1. Edit the frontmatter table — add a new row after the `allowed-tools` row (line 5742):
   ```html
   <tr><td><code>disallowed-tools</code></td><td>string/list</td><td>Tools removed from the model while this skill is active (e.g. <code>Bash WebSearch</code>). The inverse of <code>allowed-tools</code>. Use to restrict dangerous or irrelevant tools for focused workflows.</td></tr>
   ```

## Acceptance Criteria
- `disallowed-tools` row appears in the frontmatter table immediately after `allowed-tools`
- Description explains it removes/restricts tools while skill is active, and notes it's the inverse of `allowed-tools`
- No other rows disturbed
