# CBP-302: Add `--ax-screen-reader` CLI flag + `axScreenReader` settings key (v2.1.208)

## Summary

Claude Code v2.1.208 added a new accessibility screen reader mode. Users can enable it three ways:
1. CLI flag: `claude --ax-screen-reader` — opt-in plain-text rendering for screen reader users
2. Env var: `CLAUDE_AX_SCREEN_READER=1`
3. Settings key: `"axScreenReader": true` in settings.json

## Assessment

**CLI flag** (`--ax-screen-reader`): Not documented anywhere in the playbook. Should go in the "System prompt & config" CLI flags table in the Cheat Sheet section (around line 10057–10070).

**Settings key** (`axScreenReader`): Not documented in the Notable settings.json Keys callout. Should be added as a new bullet before the closing `</ul>` tag at line 8689. The last bullet currently (`disableAutoMode`) has `margin-bottom:0;` — we need to add the new `axScreenReader` bullet as the last item and change the `disableAutoMode` margin back to `0.4rem`.

## Plan

### Step 1: Add CLI flag to "System prompt & config" table

Location: in the "System prompt & config" CLI flags table (around line 10068), add a new row after `--verbose`.

Add:
```html
<tr><td><code>--ax-screen-reader</code></td><td>Enable screen reader mode — opt-in plain-text rendering optimized for screen readers. Env var equivalent: <code>CLAUDE_AX_SCREEN_READER=1</code>. Also configurable via <code>"axScreenReader": true</code> in settings.json (v2.1.208).</td></tr>
```

### Step 2: Add `axScreenReader` to Notable settings.json Keys callout

Change the last bullet (`disableAutoMode`) margin from `0` to `0.4rem`, then append a new last bullet:
```html
<li style="margin-bottom:0;"><code>axScreenReader</code> — Set to <code>true</code> to enable screen reader mode — plain-text rendering optimized for screen readers. Equivalent to the <code>--ax-screen-reader</code> CLI flag or <code>CLAUDE_AX_SCREEN_READER=1</code> env var (v2.1.208).</li>
```

## Acceptance Criteria

- [ ] `--ax-screen-reader` row appears in the "System prompt & config" CLI flags table in the Cheat Sheet
- [ ] `axScreenReader` bullet appears at the end of the Notable settings.json Keys callout
- [ ] `disableAutoMode` bullet has `margin-bottom:0.4rem` (not `0`) after this change
- [ ] HTML renders correctly (no broken tags)
