# CBP-538: Add a "Worktree Sessions" Power Usage collapsible

## Source
Codex CLI rust-v0.154.0 release notes: "Experimental worktree support lets you create isolated checkouts for new/forked sessions using `--worktree` or `/worktree`, and browse/resume them." (#42652, #43069, #43120, #43286)

## Summary
Beyond the Cheat Sheet row (CBP-537), this feature is substantial enough — isolated git-worktree-backed session checkouts, forking into a worktree, and browsing/resuming worktree sessions — to warrant its own explanatory collapsible in the Power Usage section, similar to how "Conversation Forking" is already documented there.

## Assessment
`src/pages/codex.html` `#codex-power-usage` section has a "Conversation Forking" collapsible (~line 1149-1163) documenting `/fork` and `codex exec fork`. Worktree support is conceptually adjacent (isolating a session's working state) but distinct (it isolates the filesystem checkout via a git worktree, not just conversation history). No existing collapsible covers this — **new-section**.

## Plan
1. Open `src/pages/codex.html`, locate the end of the "Conversation Forking" collapsible (closes ~line 1163, right before the `<!-- Vim Editing Mode -->` comment at line 1165).
2. Insert a new collapsible immediately after Conversation Forking and before Vim Editing Mode, following the existing collapsible markup pattern (`<div class="collapsible">` / `collapsible-header` with `<h3>` + chevron span / `collapsible-body` > `collapsible-content`):
   ```html
   <!-- Worktree Sessions -->
   <div class="collapsible">
     <div class="collapsible-header">
       <h3>Worktree Sessions</h3>
       <span class="collapsible-chevron">&#9660;</span>
     </div>
     <div class="collapsible-body"><div class="collapsible-content">
       <p>As of rust-v0.154.0, Codex supports <strong>experimental worktree sessions</strong> — starting a new or forked session with <code>--worktree</code> or <code>/worktree</code> creates an isolated git worktree checkout for that session, so it can make changes without touching your main working directory. Use <code>/worktree</code> to browse and resume existing worktree sessions from the TUI.</p>
       <div class="code-block" style="margin-top:1rem;">
         <pre><code><span class="cm"># Start a new session in an isolated worktree</span>
   codex --worktree

   <span class="cm"># Or from within a session:</span>
   /worktree</code></pre>
       </div>
       <p style="margin-top:0.75rem; font-size:0.88rem; color:var(--text-secondary);">Pairs well with <code>/fork</code> — fork a conversation into a new thread, then run it in its own worktree so parallel explorations don't collide on the same files.</p>
     </div></div>
   </div>
   ```
3. Verify the collapsible markup matches the exact class names used by neighboring collapsibles (double-check `collapsible-header`, `collapsible-chevron`, `collapsible-body`, `collapsible-content` against the live file before pasting, since the injected block must render/toggle identically).

## Acceptance Criteria
- [ ] A new "Worktree Sessions" collapsible exists in `#codex-power-usage`, positioned between "Conversation Forking" and "Vim Editing Mode".
- [ ] It cites `rust-v0.154.0` and explains `--worktree` / `/worktree`.
- [ ] Collapsible markup/classes match existing collapsibles exactly (so open/close JS behavior is unaffected).
- [ ] `python3 scripts/build-source.py` completes without error after the edit.
