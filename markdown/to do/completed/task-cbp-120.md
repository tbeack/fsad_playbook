# CBP-120 — [Codex] Add `/vim` to Cheat Sheet and Vim editing collapsible to Power Usage (v0.129.0)

## Summary
Codex v0.129.0 added modal Vim editing support in the composer. Users can now invoke `/vim` to enter Vim mode, set a default Vim mode in `config.toml`, and use Vim-specific keymap contexts. This is a significant UX feature not yet documented in the playbook.

## Assessment
- No mention of `/vim` anywhere in the Codex Cheat Sheet or Power Usage sections.
- The Codex Cheat Sheet has a Slash Commands table (line ~8916) — add `/vim` there.
- The Codex Power Usage section (line ~9009) has collapsibles for multi-agent, forking, session management, etc. — add a new "Vim Editing Mode" collapsible.
- The Cheat Sheet keyboard section does not mention Vim-style navigation — a note would be appropriate.

## Plan

### Step 1 — Add `/vim` to Codex Cheat Sheet slash commands table
Find the Codex slash commands tbody (around line 8916). Add after the `/keymap` row:
```html
<tr><td><code>/vim</code></td><td>Toggle Vim modal editing in the composer. Set <code>vim_mode = true</code> in <code>config.toml</code> to enable by default.</td></tr>
```

### Step 2 — Add `vim_mode` to Codex Configuration Reference table
Find the config.toml reference table (around line 8972). Add a row after `model_verbosity`:
```html
<tr><td><code>vim_mode</code></td><td>Enable Vim modal editing in composer by default</td><td><code>false</code></td></tr>
```

### Step 3 — Add "Vim Editing Mode" collapsible to Codex Power Usage
Add a new collapsible after the "Conversation Forking" collapsible (around line 9058), before "Session Management":
```html
<!-- Vim Editing Mode -->
<div class="collapsible">
  <div class="collapsible-header">
    <h3>Vim Editing Mode</h3>
    <span class="collapsible-chevron">&#9660;</span>
  </div>
  <div class="collapsible-body"><div class="collapsible-content">
    <p>Codex v0.129.0 adds modal Vim editing in the composer. Toggle it mid-session with <code>/vim</code>, or enable it permanently in config:</p>
    <div class="code-block" style="margin-top:1rem;">
      <pre><code><span class="cm"># ~/.codex/config.toml — enable Vim mode globally</span>
vim_mode = true

<span class="cm"># Or toggle mid-session</span>
/vim</code></pre>
    </div>
    <p style="margin-top:0.75rem;">In Vim mode the composer supports standard Vim motions (<code>hjkl</code>, <code>w/b/e</code>, <code>0/$</code>, <code>dd</code>, <code>yy</code>, <code>p</code>, visual selection) as well as Vim-specific keybindings that are scoped separately from the global TUI keymap — so your <code>/keymap</code> overrides don't collide with Vim operators.</p>
    <p style="margin-top:0.75rem; font-size:0.88rem; color:var(--text-secondary);">Use <code>/keymap debug</code> to inspect what key events your terminal is sending — helpful when certain Vim chords don't register correctly.</p>
  </div></div>
</div>
```

## Acceptance Criteria
- `/vim` appears in the Codex Cheat Sheet slash commands table.
- `vim_mode` appears in the Codex Configuration Reference table.
- A "Vim Editing Mode" collapsible exists in the Codex Power Usage section.
- No HTML broken; existing collapsible open/close behavior preserved.
