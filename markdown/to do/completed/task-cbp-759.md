# CBP-759: [Claude] Add `claude remote-control --settings <file>` (v2.1.321)

## Summary
Claude Code v2.1.321 added `--settings <file>` to `claude remote-control`, which applies a settings file to every session it starts; if the file changes, no new session starts until `claude remote-control` is restarted.

## Assessment
`src/pages/practices.html` has a "Cross-device & integrations" cheat-sheet table (~line 1886-1894) with a `claude remote-control --continue` row, and a "Remote Control & Cross-Device" collapsible (~line 2448-2483) with a bullet list of version-specific behavior notes.

## Plan
1. Open `src/pages/practices.html`.
2. In the cheat-sheet table, add a new row after `claude remote-control --continue`:
   ```html
   <tr><td><code>claude remote-control --settings &lt;file&gt;</code></td><td>Apply a settings file to every session <code>claude remote-control</code> starts; if the file changes, no new session starts until you restart <code>claude remote-control</code> (v2.1.321)</td></tr>
   ```
3. In the "Remote Control & Cross-Device" collapsible's bullet list, append a bullet after the v2.1.273 forking bullet:
   ```html
   <li>Pass <code>--settings &lt;file&gt;</code> to <code>claude remote-control</code> to apply that settings file to every session it starts; if the file changes, no new session starts until you restart <code>claude remote-control</code> (v2.1.321)</li>
   ```

## Acceptance Criteria
- The cheat-sheet and the Remote Control collapsible both document the `--settings` flag and its restart-required caveat.
- HTML is valid (no unclosed tags).
