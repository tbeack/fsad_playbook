# CBP-683: Document idle compaction (v2.1.299)

## Summary
Claude Code v2.1.299 added idle compaction. A session with 200K+ tokens left idle for about 54 minutes compacts automatically before its one-hour prompt cache expires. This prevents the next message from reprocessing the full history. Two controls exist:
- `CLAUDE_CODE_IDLE_COMPACT_MIN_TOKENS` — set to an integer to change the 200K-token minimum.
- `"idleCompaction": false` in settings.json — disables idle compaction entirely.
Both require v2.1.290 or later.

## Assessment
The playbook covers auto-compact at lines 2649-2650 (auto-compact window bullet list) and has a `CLAUDE_CODE_DISABLE_1M_CONTEXT` row in the env vars table. Neither mentions idle compaction. The settings.json key list (ending around line 665) does not include `idleCompaction`.

**Placement 1:** Add `CLAUDE_CODE_IDLE_COMPACT_MIN_TOKENS` env var row after `CLAUDE_CODE_WORKFLOW_SUBAGENT_MODEL` (after CBP-682's new row at ~line 2748).

**Placement 2:** Add `"idleCompaction": false` settings key as a list item in the settings.json key list, after line 665 (`allowedProviders` item, currently the last `<li>`).

**Placement 3:** Add a bullet in the auto-compact notes near line 2649-2650.

## Plan

### Step 1: Add env var row
In `src/pages/practices.html`, after the `CLAUDE_CODE_DISABLE_FILE_MENTIONS` row added by CBP-682, insert:

```html
<tr><td><code>CLAUDE_CODE_IDLE_COMPACT_MIN_TOKENS</code></td><td>Changes the minimum token count that triggers idle compaction (default 200,000). A session above this threshold that sits idle for about 54 minutes compacts before its one-hour prompt cache expires. Set to a higher integer to raise the threshold, or set <code>"idleCompaction": false</code> in settings.json to disable the feature. Requires v2.1.290 or later. (v2.1.299)</td></tr>
```

### Step 2: Add settings.json key
In `src/pages/practices.html`, change the last `<li>` in the settings key list (the `allowedProviders` item at line 665) from ending with `</li>` and then `</ul>` to add a new list item after it:

Replace the closing `</ul>` after `allowedProviders` with:
```html
        <li style="margin-bottom:0;"><code>idleCompaction</code> — Set to <code>false</code> to disable idle compaction. By default, sessions with over 200K tokens that sit idle for about 54 minutes compact before their one-hour prompt cache expires. Pairs with <code>CLAUDE_CODE_IDLE_COMPACT_MIN_TOKENS</code>. Requires v2.1.290 or later. (v2.1.299)</li>
      </ul>
```

### Step 3: Add auto-compact bullet
In `src/pages/practices.html`, after line 2650 (Opus and Fable auto-compact bullet), add:

```html
          <li>Sessions with over 200K tokens that sit idle for about 54 minutes now compact automatically before their one-hour prompt cache expires — keeping the next message from reprocessing the full history (v2.1.299). Set <code>CLAUDE_CODE_IDLE_COMPACT_MIN_TOKENS</code> to change the threshold, or set <code>"idleCompaction": false</code> in settings.json to opt out.</li>
```

## Acceptance Criteria
- The env vars table has a row for `CLAUDE_CODE_IDLE_COMPACT_MIN_TOKENS`.
- The settings.json list has an `idleCompaction` entry.
- The auto-compact bullet list mentions idle compaction.
- Version tags are present.
