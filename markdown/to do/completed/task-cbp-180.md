# CBP-180 — Add `/code-review` slash command to Cheat Sheet (v2.1.146)

## Summary

In v2.1.146, the `/simplify` slash command was renamed to `/code-review`. The new command also accepts an optional effort level argument (e.g., `/code-review high`). A search of the playbook confirms `/simplify` was never mentioned in the current content, so this is a net-new addition.

## Assessment

- The playbook already has `/ultrareview` documented in the Cheat Sheet near line 6324.
- The "Code Review Agent" section documents the `code-reviewer` agent concept — a different thing.
- There is no row for `/code-review` (the interactive slash command version) in the Cheat Sheet.
- **Action required:** Add a new `<tr>` row for `/code-review` to the Cheat Sheet commands table, placed near `/ultrareview`.

## Plan

1. Locate the `/ultrareview` row in the Cheat Sheet (search for "ultrareview").
2. Insert a new row immediately after the `/ultrareview` row:
   ```html
   <tr><td><code>/code-review</code> <code>[effort]</code></td><td>Run an in-session interactive code review on the current branch. Optionally pass an effort level (e.g., <code>/code-review high</code>) to override the default. Renamed from <code>/simplify</code> in v2.1.146.</td></tr>
   ```

## Acceptance Criteria

- `/code-review` row appears in the Cheat Sheet near `/ultrareview`.
- Row documents the optional effort argument and the rename from `/simplify`.
- No duplicate entries, no broken HTML.
