# CBP-545 — Update `/reload-plugins` Cheat Sheet row (v2.1.268)

## Summary

Claude Code v2.1.268 changed `/plugin` behavior: installing, enabling, or disabling a plugin through the `/plugin` menu now takes effect when you close the menu. `/reload-plugins` is no longer needed after these menu actions.

## Assessment

Current `/reload-plugins` Cheat Sheet row (src/pages/practices.html line 1944):
```
<tr><td><code>/reload-plugins</code></td><td>Reload plugins without restart. As of v2.1.260 also available in headless sessions, so it appears in the Claude Code Desktop and SDK command lists.</td></tr>
```

Needs update: append a note that as of v2.1.268, `/plugin` menu changes (install/enable/disable) take effect on menu close; `/reload-plugins` is now mainly for refreshing skill-directory changes outside the menu.

## Plan

Edit src/pages/practices.html line 1944 to append the v2.1.268 note.

Old text:
```
Reload plugins without restart. As of v2.1.260 also available in headless sessions, so it appears in the Claude Code Desktop and SDK command lists.
```

New text:
```
Reload plugins without restart. As of v2.1.260 also available in headless sessions, so it appears in the Claude Code Desktop and SDK command lists. As of v2.1.268, <code>/plugin</code> menu changes (install, enable, disable) take effect automatically when you close the menu — <code>/reload-plugins</code> is no longer needed for those actions.
```

## Acceptance Criteria

- `/reload-plugins` row in Cheat Sheet mentions the v2.1.268 behavior change
- No other Cheat Sheet rows broken
