# CBP-124 — [Codex] Update Goals section: discoverable experimental goals, paused-across-resume behavior, multi-day duration (v0.129.0)

## Summary
Codex v0.129.0 improved experimental goals:
- Goals are now **discoverable** (shown in a browsable list).
- Goals stay **paused across resume** unless the user explicitly opts back in.
- Goals show clearer validation errors and **multi-day duration** output.

## Assessment
- The Codex Power Usage `/goal Workflows` collapsible (line ~9204) describes basic goal creation and TUI controls. It does not mention discoverability, the paused-across-resume behavior, or multi-day duration.
- The Codex Cheat Sheet `/goal` row (line ~8919) says "Create a persisted goal; pause, resume, or clear with TUI controls" — should mention paused-across-resume default.

## Plan

### Step 1 — Update `/goal` row in Codex Cheat Sheet
Find:
```html
<tr><td><code>/goal</code></td><td>Create a persisted goal; pause, resume, or clear with TUI controls</td></tr>
```
Replace with:
```html
<tr><td><code>/goal</code></td><td>Create a persisted goal; browse discoverable goals in TUI. Goals pause across session resume by default — opt back in from the TUI picker. Supports multi-day duration tracking.</td></tr>
```

### Step 2 — Update the `/goal Workflows` collapsible body
Find the existing description:
```
<p>Persisted goals let you define a long-running objective that survives context compaction and session resume. Use the TUI controls or <code>/goal</code> command to manage them.</p>
```
Replace with:
```html
<p>Persisted goals let you define a long-running objective that survives context compaction. Goals are now <strong>discoverable</strong> — browse all active goals from the TUI picker. When you resume a session, goals are <strong>paused by default</strong> so they don't carry over unintended work; opt back in from the picker. Goals show clear validation feedback and support multi-day duration tracking.</p>
```

Also update the code block comment:
Find:
```
<span class="cm"># TUI controls appear: Create / Pause / Resume / Clear</span>
<span class="cm"># Goal state persists across /compact and codex resume</span>
```
Replace with:
```
<span class="cm"># TUI picker: Create / Pause / Resume / Clear / Browse all goals</span>
<span class="cm"># Goal persists across /compact; pauses on resume (opt back in from picker)</span>
<span class="cm"># Multi-day duration shown in goal status output</span>
```

### Step 3 — Update trailing description
Find:
```
<p style="margin-top:0.75rem; font-size:0.88rem; color:var(--text-secondary);">Goals are ideal for large refactors or multi-day feature work where you want the agent to stay oriented across many turns and sessions.</p>
```
Replace with:
```html
<p style="margin-top:0.75rem; font-size:0.88rem; color:var(--text-secondary);">Goals are ideal for large refactors or multi-day feature work. The paused-across-resume default prevents stale goals from leaking into new sessions — always check the picker when resuming long-running work.</p>
```

## Acceptance Criteria
- `/goal` row in Codex Cheat Sheet mentions discoverability and paused-across-resume default.
- The `/goal Workflows` collapsible body mentions discoverability, paused default, and multi-day duration.
- No HTML broken.
