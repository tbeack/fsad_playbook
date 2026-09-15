# CBP-300 — Add `/advisor` to Cheat Sheet (v2.1.260)

## Summary

Claude Code v2.1.260 added a text form of the advisor tool as a slash command: `/advisor` (use default stronger model), `/advisor <model>` (pick a model), and `/advisor off` (turn off). It works in interactive, `-p`, Desktop, Remote Control, and Agent SDK sessions. The advisor asks a stronger reviewer model to evaluate the current session.

## Assessment

`/advisor` is absent from the playbook. It fits the "Model, mode & usage" table since it is about selecting a meta-reviewer model. It also fits "Info & account." Best placement: "Model, mode & usage" table, after the `/focus` row (line 9897).

## Plan

1. Read the Model, mode & usage table in `fsad-playbook.html` around line 9897.
2. Insert a new `<tr>` row for `/advisor` after the `/focus` row.

## New row content

```html
<tr><td><code>/advisor</code> <code>[model|off]</code></td><td>Ask a stronger reviewer to evaluate the current session. Pass a model name (<code>/advisor opus</code>) or turn off with <code>/advisor off</code>. Works in interactive, <code>-p</code>, Remote Control, and Agent SDK sessions (v2.1.260).</td></tr>
```

## Acceptance Criteria

- A `/advisor [model|off]` row appears in the Model, mode & usage table, after `/focus`.
- No other rows are changed.
