# CBP-700 — Update idle compaction docs with /config toggle

## Summary

Claude Code v2.1.302 added an "Idle compaction" row to `/config` for toggling idle compaction off or back on. Notices shown after an idle compaction now also say how to turn it off.

## Assessment

Idle compaction is documented in two places in `src/pages/practices.html`:
- Line ~666: `idleCompaction` setting in the settings.json list (currently says to set to `false` to turn it off)
- Line ~2652: Power Usage bullet in the Context Management collapsible

Both places mention `idleCompaction: false` and `CLAUDE_CODE_IDLE_COMPACT_MIN_TOKENS` but do not mention the `/config` toggle. Update line ~2652 (the visible Power Usage bullet) to add the `/config` row mention. This is the more user-facing location.

## Plan

1. Open `src/pages/practices.html`.
2. Find the idle compaction bullet at line ~2652:
   "Idle compaction (v2.1.299): a session with 200K+ tokens left idle for ~54 minutes is auto-compacted before its 1-hour prompt cache expires..."
3. Append at the end of that bullet, before `</li>`:

```
 As of v2.1.302, <code>/config</code> shows an "Idle compaction" row to toggle it off or on without editing settings.json. Notices after an idle compaction now also say how to turn it off.
```

4. Also update the `idleCompaction` entry at line ~666 in the settings list to note the /config toggle:
   After "Requires v2.1.290+ (v2.1.299)." add: " As of v2.1.302, also toggleable from the Idle compaction row in <code>/config</code>."

5. Save the file.

## Acceptance Criteria

- The Power Usage idle compaction bullet mentions the `/config` toggle.
- The settings.json list `idleCompaction` entry also notes the `/config` row.
- The version annotation v2.1.302 appears in the new text.
