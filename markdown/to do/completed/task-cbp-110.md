# CBP-110 — Add `--plugin-url` CLI flag to Cheat Sheet (v2.1.129)

## Summary
v2.1.129 added a new `--plugin-url <url>` CLI flag that fetches a plugin `.zip` archive from a URL and loads it for the current session only. This complements the existing `--plugin-dir` flag (which loads from a local directory or archive). The playbook has no mention of `--plugin-url`.

## Assessment
- **File:** `fsad-playbook.html`
- The CLI flags table in the Cheat Sheet (around line 6352) currently ends at `--debug`. The closest related flag is `--channels` at line 6352.
- The Plugins collapsible (around line 6779–6781) shows the `--plugin-dir` usage example.
- `--plugin-url` should appear in the CLI flags Cheat Sheet table, and can optionally be noted in the Plugins power-usage collapsible.

## Plan
1. Add `--plugin-url <url>` row to the CLI flags table in the Cheat Sheet, after the `--channels` row (line 6352).
2. Add a code comment line in the Plugins power-usage collapsible showing `--plugin-url` usage.

### Step 1 — Cheat Sheet CLI flags table (after line 6352):
```html
          <tr><td><code>--plugin-url &lt;url&gt;</code></td><td>Fetch a plugin <code>.zip</code> archive from a URL and load it for the current session only</td></tr>
```

### Step 2 — Plugins power-usage collapsible (after the `--plugin-dir` line ~6781):
Add after the existing line:
```html
<span class="kw">claude</span> <span class="val">--plugin-dir</span> ./my-plugin.zip  <span class="cm"># .zip archives also accepted</span>
```
Add:
```html
<span class="kw">claude</span> <span class="val">--plugin-url</span> https://example.com/my-plugin.zip  <span class="cm"># fetch plugin from URL (current session only)</span>
```

## Acceptance Criteria
- `--plugin-url <url>` appears in the CLI flags table.
- The Plugins collapsible shows a usage example of `--plugin-url`.
- No other content changes.
