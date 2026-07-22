# CBP-319 — Add `/verify` to cheat sheet (v2.1.215)

## Summary
Claude Code v2.1.215 changed the behavior of the `/verify` and `/code-review` built-in skills: Claude will no longer invoke them automatically. The release note specifically names `/verify` alongside `/code-review`, indicating `/verify` is a recognized slash command that users can call explicitly to verify code changes end-to-end. It is not currently documented in the cheat sheet.

## Assessment
`/verify` does NOT appear anywhere in the cheat sheet. It is a built-in skill that exercises a code change end-to-end and observes behavior (drives the affected flow rather than just running tests). Now that it is explicitly user-invoked, it should be documented in the "Info & account" table alongside `/code-review`, `/ultrareview`, and `/simplify`.

## Plan
1. Read lines 9977–9995 of `fsad-playbook.html` to confirm the exact location for the new row.
2. Insert a new `<tr>` row for `/verify` after the `/code-review` row (line 9987). Place it immediately after `/code-review` since they are related verification commands.
3. Row content: Verify that a code change works as expected by exercising the affected flow end-to-end — observes real behavior rather than relying on tests or typechecks alone. As of v2.1.215, Claude no longer invokes this automatically — call it explicitly to trigger a verification pass (v2.1.215).
4. Mark CBP-319 complete in `todo.md`.

## Target HTML to insert (after the /code-review row)
```html
<tr><td><code>/verify</code></td><td>Verify that a code change works as expected by exercising the affected flow end-to-end — observes real behavior rather than relying on tests or typechecks alone. As of v2.1.215, Claude no longer invokes this automatically — call it explicitly to trigger a verification pass (v2.1.215).</td></tr>
```

## Acceptance Criteria
- [ ] `/verify` appears as a new row in the Info & account cheat sheet table, immediately after `/code-review`.
- [ ] The description explains what it does (end-to-end behavior verification) and notes explicit invocation requirement.
- [ ] HTML is valid (no broken tags, proper `<tr><td>...</td><td>...</td></tr>` structure).
