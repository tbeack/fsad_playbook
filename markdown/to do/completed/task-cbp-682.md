# CBP-682 — Add idle compaction to context management

**Source:** Claude Code v2.1.299  
**Date:** 2026-10-14

## Summary

Claude Code v2.1.299 added idle compaction: a conversation with 200K+ tokens that sits idle for ~54 minutes is automatically compacted before its 1-hour prompt cache expires. This preserves prompt cache warmth and prevents runaway context growth in long-lived sessions. Two new knobs control it:
- `CLAUDE_CODE_IDLE_COMPACT_MIN_TOKENS` — lower or raise the 200K token threshold
- `"idleCompaction": false` in settings.json — disable idle compaction entirely
Both require Claude Code v2.1.290 or later.

## Assessment

The playbook's context management collapsible (in `src/pages/practices.html`) has a bullet list at ~line 2644 covering `/compact`, `/context`, auto-compact, and model-specific compaction thresholds. **Idle compaction is not mentioned.** It also needs an entry in the settings.json notable settings list (~line 665).

## Plan

### Edit 1 — Context management bullet list (line ~2650)

File: `src/pages/practices.html`

After the line:
```
          <li>Opus and Fable sessions on the 1M window now auto-compact shortly before the 1M-token limit, and recovery compaction on very large contexts no longer times out at 10 minutes (v2.1.260)</li>
```
Add:
```html
          <li><strong>Idle compaction</strong> (v2.1.299): a session with 200K+ tokens left idle for ~54 minutes is auto-compacted before its 1-hour prompt cache expires — your next message finds a warm cache instead of re-paying full input cost. Change the threshold: <code>CLAUDE_CODE_IDLE_COMPACT_MIN_TOKENS=&lt;tokens&gt;</code>. Disable it: <code>"idleCompaction": false</code> in settings.json. Both require v2.1.290+.</li>
```

### Edit 2 — Settings.json notable settings list (line ~665)

After the `allowedProviders` entry (last item in the list), before the closing `</ul>`, add:
```html
        <li style="margin-bottom:0;"><code>idleCompaction</code> — Set to <code>false</code> to turn off idle compaction. By default, a session with 200K+ tokens left idle for ~54 minutes is auto-compacted before its 1-hour prompt cache expires. Raise or lower the token threshold with <code>CLAUDE_CODE_IDLE_COMPACT_MIN_TOKENS</code>. Requires v2.1.290+ (v2.1.299).</li>
```

## Acceptance Criteria

- The context management section mentions idle compaction with the threshold, env var, and settings.json key.
- The settings.json list contains `idleCompaction`.
- No HTML syntax errors around the insertions.
- Build scripts run without error.
