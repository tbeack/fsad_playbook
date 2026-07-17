# CBP-289 — [Claude] Document stacked slash-skill invocations in Building Skills section (v2.1.199)

## Summary
Claude Code v2.1.199 changed stacked slash-skill invocations so that `/skill-a /skill-b do XYZ` now loads ALL leading skills (up to 5), not just the first one. Previously, only the first skill in a chain was loaded.

## Assessment
The Building Skills section (page-practices) currently has these relevant notes near lines 9235 and 9254:
- A frontmatter key casing note (v2.1.186) at line ~9235
- A nested skill directories note at line ~9254
- Invocation section at line ~9265: "Claude matches your task to skill descriptions and auto-loads the relevant skill. Control with `disable-model-invocation`."

Stacked skill invocations are NOT documented anywhere in the playbook. This is a useful power-user feature — especially for workflows that chain multiple skills.

## Plan
Add a small note paragraph after the "Nested skill directories" note at line ~9254 and before the "Auto-Invocation" paragraph at ~9265:

```html
<p style="font-size:0.85rem; color:var(--text-secondary); margin-top:0.4rem;"><strong>Stacked skill invocations (v2.1.199):</strong> Prefix a prompt with multiple slash commands to load all of them — <code>/skill-a /skill-b do XYZ</code> loads both <code>skill-a</code> and <code>skill-b</code> before handing off to Claude. Up to 5 leading skills are loaded in order. Useful for chaining context (e.g., <code>/fsd:plan /fsd:code-review-team audit the diff</code>).</p>
```

Target: after the "Nested skill directories" note paragraph and before the "Auto-Invocation" heading.

## Acceptance Criteria
- Stacked skill invocation behavior is documented in the Building Skills section
- The up-to-5 limit is noted
- An example usage pattern is shown
- Version tag (v2.1.199) is included
