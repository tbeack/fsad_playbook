# CBP-189 — Add `disallowed-tools` to Frontmatter Reference table

## Summary
Claude Code v2.1.152 added support for `disallowed-tools` in skill/slash command frontmatter. This allows a skill to explicitly remove tools from the model while the skill is active — the inverse of `allowed-tools`.

## Assessment
The Frontmatter Reference table (Building Skills page, collapsible at line 5727) currently has an `allowed-tools` row (line 5742) but no `disallowed-tools` row. This is a new field that practitioners should know about.

**Does this content exist?** No — `disallowed-tools` is not mentioned anywhere in the playbook.

**Where to add:** Immediately after the `allowed-tools` row in the Frontmatter Reference table (after line 5742).

## Plan
1. Read lines 5740–5745 of `fsad-playbook.html` to confirm the `allowed-tools` row location
2. Insert a new `<tr>` row after the `allowed-tools` row:
   ```html
   <tr><td><code>disallowed-tools</code></td><td>string/list</td><td>Tools to remove from the model while this skill is active (e.g. <code>WebSearch Bash</code>). Inverse of <code>allowed-tools</code> — use to restrict capabilities for focused or safety-critical skills.</td></tr>
   ```

## Acceptance Criteria
- `disallowed-tools` appears in the Frontmatter Reference table
- Row is positioned directly after `allowed-tools`
- Description explains it is the inverse of `allowed-tools` and gives a use case
