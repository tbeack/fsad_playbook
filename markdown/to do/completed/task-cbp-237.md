# CBP-237 — Revise "What's new this week" to show only auto-updater changes with full detail

## Source

User request — improve the "What's new this week" page to be more focused and more informative.

## Summary

Two changes to `initWhatsNew()` and the HTML changelog modal: (1) filter the widget to only show entries produced by the Auto Updater agent (identified by "auto-update" in the `<strong>` headline), dropping manual development entries; (2) for auto-update entries, generate one card per individual CBP task instead of one card for the whole bundle, sourcing the change detail from the CHANGELOG.md per-task bullets embedded as `<ul>/<li>` in the HTML modal.

## Assessment

**Current behavior:**
- `initWhatsNew()` (line 14454) reads all `#changelogModal .changelog-body section` elements from the past 7 days and generates one card per section.
- This week that includes manual-dev entries (CBP-235 "What's new page", CBP-229 "Security Review moved", CBP-230 "Deeplinks", CBP-228 "Open Source page", etc.) alongside auto-update entries.
- Auto-update sections (v2.93.0, v2.89.1, v2.89.0) use a single `<p>` with semicolon-separated prose — not broken into per-task cards.
- Each card shows one sentence of impact from after the `<strong>` tag, which loses the detail.

**What needs to change:**
1. The HTML changelog modal auto-update sections need `<ul>/<li>` structure (one `<li>` per CBP task with full detail from CHANGELOG.md bullets).
2. `initWhatsNew()` needs to: (a) skip non-auto-update sections and (b) for auto-update sections with `<ul>`, generate one card per `<li>`.

**Location:**
- `fsad-playbook.html` — changelog modal sections around lines 13295–13317
- `fsad-playbook.html` — `initWhatsNew()` function at lines 14454–14531

## Plan

### Step 1 — Update HTML changelog modal entries for auto-update sections

Update the three auto-update sections within the past 7 days to use `<p>` intro + `<ul>/<li>` format.

**v2.93.0 (lines 13295–13297):** Replace single `<p>` prose with intro + 4 `<li>` items:
```html
<section>
  <h3>v2.93.0 <span class="changelog-date">· 2026-06-05</span></h3>
  <p><strong>Claude Code v2.1.165 auto-update (CBP-231–CBP-234).</strong> Four targeted updates from Claude Code v2.1.163:</p>
  <ul>
    <li><strong>CBP-231 — Hooks: additionalContext return.</strong> <code>Stop</code> and <code>SubagentStop</code> hooks can now return <code>hookSpecificOutput.additionalContext</code> in their JSON output to provide Claude with feedback and keep the current turn going without triggering a hook error — enabling hooks to silently inject context rather than just controlling flow.</li>
    <li><strong>CBP-232 — CLI: plugin list filtering.</strong> <code>claude plugin list</code> now accepts <code>--enabled</code> or <code>--disabled</code> filters, so teams can audit which plugins are active or inactive from the terminal without opening settings.</li>
    <li><strong>CBP-233 — Skills: literal $ escape syntax.</strong> Use <code>\$</code> before a digit in a skill command body to include a literal <code>$</code> without triggering argument substitution — essential when a skill generates shell scripts that reference <code>$1</code>, <code>$2</code>, etc.</li>
    <li><strong>CBP-234 — Config: version range enforcement.</strong> <code>requiredMinimumVersion</code> and <code>requiredMaximumVersion</code> are now in the Notable settings.json Keys callout. Set via org managed settings, Claude Code refuses to start outside the allowed range and directs the user to an approved version — designed for enterprise compliance.</li>
  </ul>
</section>
```

**v2.89.1 (lines 13310–13313):** Single-task auto-update — update the `<p>` to include stronger detail (no `<ul>` needed for 1 task; the single-card fallback will apply):
```html
<section>
  <h3>v2.89.1 <span class="changelog-date">· 2026-06-04</span></h3>
  <p><strong>Claude Code v2.1.161 auto-update (CBP-227).</strong> <code>claude agents</code> now shows <code>done/total</code> subagent progress counts on each row when work is fanned out, with the peek view highlighting the longest-running item — making it easy to spot stalled subagents during multi-agent runs (v2.1.161).</p>
</section>
```

**v2.89.0 (lines 13314–13317):** Replace single `<p>` prose with intro + 4 `<li>` items:
```html
<section>
  <h3>v2.89.0 <span class="changelog-date">· 2026-06-04</span></h3>
  <p><strong>Claude Code v2.1.162 auto-update (CBP-223–CBP-226).</strong> Four targeted updates from Claude Code v2.1.162:</p>
  <ul>
    <li><strong>CBP-223 — CLI: agents --json waitingFor field.</strong> <code>claude agents --json</code> now includes a <code>waitingFor</code> field showing what a blocked session is waiting on (e.g. a permission prompt) — useful for automation scripts that need to distinguish blocked vs. actively running sessions.</li>
    <li><strong>CBP-224 — CLI: /effort persistence confirmation.</strong> <code>/effort</code> now confirms when the chosen effort level will persist as the default for new sessions — removing ambiguity about whether a selection affects the current session only or future ones.</li>
    <li><strong>CBP-225 — Remote Control: persistent footer pill.</strong> When Remote Control is enabled, it now appears as a persistent footer pill with a direct session link instead of a startup message that scrolls away — the link stays accessible at any point in the session.</li>
    <li><strong>CBP-226 — Rebranding: Windsurf → Devin Desktop.</strong> Updated <code>/terminal-setup</code> Cheat Sheet row and the IDE extensions comparison table on the Codex page to reflect the editor's rebrand from Windsurf to Devin Desktop.</li>
  </ul>
</section>
```

### Step 2 — Update `initWhatsNew()` to filter and parse per-task cards

Replace the function body with a revised version that:

a. **Filter**: after extracting `headline`, skip sections where `headline.toLowerCase()` does not include `'auto-update'`.

b. **Per-task card generation**: after the auto-update filter, check if the section has `<ul> li` children. If it does, generate one card per `<li>`:
   - Extract `<strong>` from the `<li>` as the card headline
   - Extract remaining text (after the `<strong>`) as the impact — no character limit needed since content is authored
   - Detect category from `<li>` content (same `detectCategory()` logic)
   - Use parent section's `version` + `dateText`

c. **Fallback**: if no `<ul>/<li>` exists (single-task entries like v2.89.1), keep the existing single-card behavior (uses `<p>` text as impact).

d. **Impact extraction for `<li>` items**: extract text after the `<strong>` in the `<li>`, truncate at 220 chars.

### Step 3 — Update the playbook-updater agent format

Update `~/.claude/agents/playbook-updater.md` Phase 6 instructions to write auto-update CHANGELOG HTML entries using `<p>` intro + `<ul>/<li>` structure instead of semicolon prose. Each `<li>` should: bold the CBP task ID + short label, then explain the change and its impact/potential in 1–2 sentences.

### Step 4 — Version bump

Bump version from v2.95.0 → v2.96.0. Update `<title>`, sidebar brand badge, and add CHANGELOG entry.

## Acceptance Criteria

All criteria verified 2026-06-05 before commit.

- [x] The "What's new this week" page shows ONLY auto-update entries (no CBP-229, CBP-230, CBP-235, etc.)
- [x] The v2.93.0 auto-update expands into 4 individual cards (one per CBP-231–234)
- [x] The v2.89.0 auto-update expands into 4 individual cards (one per CBP-223–226)
- [x] The v2.89.1 auto-update shows as a single card (single-task fallback)
- [x] Each per-CBP card shows a clear headline and the full impact sentence (not truncated mid-thought)
- [x] Badge count in the sidebar trigger reflects the correct number of cards (9 from current week)
- [x] Category detection works correctly per `<li>` (Hooks, CLI, Config, Skills cards categorized right)
- [x] Version is bumped to v2.96.0 in `<title>`, sidebar badge, and CHANGELOG
- [ ] `playbook-updater.md` updated to write `<ul>/<li>` format for future auto-update entries — BLOCKED by auto mode permission; user action needed (see handoff)
