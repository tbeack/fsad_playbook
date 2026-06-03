# CBP-222 — Add "Practical Best Practices" page to left nav

## Source
User request — inspiration from `/Users/theobeack/Desktop/Token_limits.png`, a visual guide titled "How to Never Hit Your Token Limits in Claude Code."

## Summary
Add a new standalone page called "Practical Best Practices" to the left nav, inserted between Workflows and Skills Library. The page translates the visual guide from `Token_limits.png` into playbook-styled content: numbered habit cards, a visual effort-level bar, and "set-once" session pattern cards.

## Assessment

**Existing page order (in nav and in HTML):**

| Order | Nav label | Page ID | Lines (approx) |
|---|---|---|---|
| 1 | FSAD | `fsad` | — |
| 2 | Pod Compositions | `pods` | — |
| 3 | Workflows | `workflows` | 2037–2048 (nav), 2736–3272 (page) |
| **INSERT HERE** | **Practical Best Practices** | **`tips`** | — |
| 4 | Skills Library | `skills` | 2053–2062 (nav), 3279–6343 (page) |
| 5 | Claude Best Practices | `practices` | — |
| 6 | Codex Best Practices | `codex` | — |
| 7 | KPIs | `kpis` | — |

**Source image content** (`Token_limits.png`):
1. **5 Key Habits** — numbered cards (Compact at 50%, Order, Read Files, Plan Before You Build, Commit)
2. **Effort Level guide** — horizontal bar: `low/medium` → `high` → `xhigh/max`
3. **Set Once, Forget** — 3 cards: Write a CLAUDE.md, Problem First, Skip Agent Teams

**Existing CSS to reuse:** `.hero`, `.hero-badge`, `.divider`, `.section-label`, `.section-title`, `.section-subtitle`, `.wf-grid`, `.wf-card`, `.wf-card-label`, `.wf-chips`, `.wf-chip`, `.wf-card-footnote`, `pre` inside `.wf-card`

**New CSS needed:** Numbered habit card layout (`.tips-habit-grid`, `.tips-habit-card`, `.tips-habit-num`) and effort level bar (`.tips-effort-bar`, `.tips-effort-level`, `.tips-effort-level.default`)

**Location:** `fsad-playbook.html` — three edits:
1. Nav group HTML (after line ~2049, before Skills group)
2. Page HTML (after line ~3272, before Skills page)
3. `sectionToPageMap` JS (line ~13235)
4. New CSS block (after `.wf-card-footnote` block, around line ~1343)

## Plan

### 1. Add CSS for numbered habit cards and effort bar

Insert after `.wf-card-footnote` block (after line ~1343):

```css
/* ── Practical Tips — Habit Cards ── */
.tips-habit-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}
.tips-habit-grid.row-2 {
  grid-template-columns: repeat(2, 1fr);
  max-width: 720px;
}
.tips-habit-card {
  background: var(--bg-card); border: 1px solid var(--card-border);
  border-radius: var(--radius); padding: 1.2rem 1.3rem;
  box-shadow: 0 0 12px var(--card-glow);
  display: flex; flex-direction: column; gap: 0.6rem;
}
.tips-habit-num {
  width: 2rem; height: 2rem; border-radius: 50%;
  background: var(--gradient-brand);
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-mono); font-size: 0.8rem; font-weight: 700;
  color: #fff; flex-shrink: 0;
}
.tips-habit-card h4 {
  font-size: 0.95rem; font-weight: 600; color: var(--text-primary);
  line-height: 1.35; margin: 0;
}
.tips-habit-card p {
  font-size: 0.82rem; color: var(--text-secondary); line-height: 1.7; margin: 0;
}
.tips-habit-card code {
  font-family: var(--font-mono); font-size: 0.8em;
  background: var(--bg-surface); padding: 0.1em 0.35em;
  border-radius: 3px; border: 1px solid var(--border);
  color: var(--accent-cyan);
}

/* ── Practical Tips — Effort Bar ── */
.tips-effort-bar {
  display: grid; grid-template-columns: 1fr 1.2fr 1fr;
  gap: 0; border-radius: var(--radius); overflow: hidden;
  border: 1px solid var(--card-border);
  margin-bottom: 1.5rem;
}
.tips-effort-level {
  background: var(--bg-card); padding: 1rem 1.2rem;
  border-right: 1px solid var(--card-border);
  display: flex; flex-direction: column; gap: 0.4rem;
}
.tips-effort-level:last-child { border-right: none; }
.tips-effort-level.default { background: var(--bg-surface); }
.tips-effort-label {
  font-family: var(--font-mono); font-size: 0.7rem; font-weight: 700;
  letter-spacing: 0.08em; color: var(--accent-blue);
}
.tips-effort-level.default .tips-effort-label { color: var(--text-primary); }
.tips-effort-default-badge {
  font-family: var(--font-mono); font-size: 0.6rem; letter-spacing: 0.1em;
  text-transform: uppercase; color: var(--text-muted);
  background: var(--bg-card); border: 1px solid var(--border-accent);
  border-radius: 100px; padding: 0.1rem 0.5rem;
  display: inline-block; width: fit-content;
}
.tips-effort-level p {
  font-size: 0.8rem; color: var(--text-secondary); line-height: 1.6; margin: 0;
}

@media (max-width: 780px) {
  .tips-habit-grid { grid-template-columns: 1fr; }
  .tips-habit-grid.row-2 { grid-template-columns: 1fr; }
  .tips-effort-bar { grid-template-columns: 1fr; }
  .tips-effort-level { border-right: none; border-bottom: 1px solid var(--card-border); }
  .tips-effort-level:last-child { border-bottom: none; }
}
```

### 2. Add nav group HTML

Insert after the closing `</div><!-- end nav group 3 (workflows) -->` (after line ~2049) and before the Skills group comment:

```html
    <!-- GROUP 3.7: Practical Best Practices -->
    <div class="nav-group">
      <button class="nav-group-toggle" onclick="navigateTo('tips', this)" data-page="tips">
        <span class="nav-icon" aria-hidden="true">◆</span>
        Practical Best Practices
        <span class="nav-chevron">›</span>
      </button>
      <div class="nav-sub-items" data-group="tips">
        <a class="nav-sub-item" href="#tips/tips-hero" onclick="scrollToSection('tips-hero')">Overview</a>
        <a class="nav-sub-item" href="#tips/token-limits" onclick="scrollToSection('token-limits')">Token Limits</a>
        <a class="nav-sub-item" href="#tips/effort-levels" onclick="scrollToSection('effort-levels')">Effort Levels</a>
        <a class="nav-sub-item" href="#tips/session-patterns" onclick="scrollToSection('session-patterns')">Session Patterns</a>
      </div>
    </div>
```

### 3. Add page HTML

Insert after `</div><!-- end page-workflows -->` (after line ~3272) and before `<div class="page" id="page-skills">`:

```html
<div class="page" id="page-tips">

<div class="hero" id="tips-hero" style="padding-bottom: 1.2rem;">
  <div class="hero-badge">Practical Reference for Daily Claude Code Use</div>
  <h1>Practical <em>Best Practices</em></h1>
  <p>Concrete habits and mental models that keep sessions efficient, outputs focused, and token budgets healthy — drawn from real usage patterns across FSAD pods.</p>
</div>
<hr class="divider">

<section id="token-limits">
  <span class="section-label">01 — Token Management</span>
  <h2 class="section-title">5 Habits to Limit Hitting Your Token Limits</h2>
  <p class="section-subtitle">Every new Claude Code turn re-sends your full conversation history as input tokens. Context accumulates — so later turns grow more expensive and model accuracy starts to degrade well before you hit the limit. These habits slow that growth.</p>

  <!-- Row 1: habits 1–3 -->
  <div class="tips-habit-grid">
    <div class="tips-habit-card">
      <div class="tips-habit-num">1</div>
      <h4>Compact at 50%</h4>
      <p>Run <code>/compact</code> when your context reaches ~50% full — accuracy and consistency start degrading around the halfway mark, not at the limit. Compacting early eliminates old tool outputs, summarises decisions already made, and reduces the history re-sent on every new turn.</p>
    </div>
    <div class="tips-habit-card">
      <div class="tips-habit-num">2</div>
      <h4>Name the Exact File</h4>
      <p>Reference the specific file, not the directory. A targeted single-file read is orders of magnitude cheaper than recursive folder exploration — and gives the model only what it actually needs, not everything that happens to be nearby.</p>
      <div class="wf-chips">
        <span class="wf-chip">✓ src/auth/handler.ts</span>
        <span class="wf-chip">✗ src/auth/</span>
      </div>
    </div>
    <div class="tips-habit-card">
      <div class="tips-habit-num">3</div>
      <h4>Order Matters</h4>
      <p>After a compact, old messages cost more to carry than new ones. Re-state the file you need immediately after compacting so Claude doesn't have to re-read it from the summarised history. Name the resource first; ask the question second.</p>
    </div>
  </div>

  <!-- Row 2: habits 4–5 -->
  <div class="tips-habit-grid row-2">
    <div class="tips-habit-card">
      <div class="tips-habit-num">4</div>
      <h4>Plan Before You Build</h4>
      <p>Ask for a plan first, review it, then ask for the implementation. A single planning round costs a fraction of a failed multi-step implementation. One focused task per session beats five interleaved ones.</p>
      <div class="wf-chips">
        <span class="wf-chip">research → plan → implement</span>
      </div>
    </div>
    <div class="tips-habit-card">
      <div class="tips-habit-num">5</div>
      <h4>End Each Task with /compact</h4>
      <p>Before switching to a new task in the same session, run <code>/compact</code> to summarise and discard the completed work's context. Carry-over messages from a finished task inflate the window for the next one — even if that context is no longer relevant.</p>
      <div class="wf-chips">
        <span class="wf-chip">compact between tasks</span>
        <span class="wf-chip">one job per context</span>
      </div>
    </div>
  </div>
</section>

<hr class="divider">

<section id="effort-levels">
  <span class="section-label">02 — Effort Calibration</span>
  <h2 class="section-title">Match Effort to the Task</h2>
  <p class="section-subtitle">Claude Code's effort setting controls how deeply it reasons before responding. Over-efforting simple tasks wastes tokens; under-efforting complex ones produces shallow work.</p>

  <div class="tips-effort-bar">
    <div class="tips-effort-level">
      <div class="tips-effort-label">low / medium</div>
      <p>Quick asks, formatting, simple refactors, and boilerplate. Use when the task requires no sustained reasoning chain.</p>
      <div class="wf-chips">
        <span class="wf-chip">rename a variable</span>
        <span class="wf-chip">format JSON</span>
        <span class="wf-chip">add a comment</span>
      </div>
    </div>
    <div class="tips-effort-level default">
      <div class="tips-effort-label">high</div>
      <span class="tips-effort-default-badge">default on Pro/Max</span>
      <p>Real coding, debugging, and refactoring. The right setting for most daily FSAD work — deep enough to reason about dependencies without burning tokens on simpler tasks.</p>
      <div class="wf-chips">
        <span class="wf-chip">feature implementation</span>
        <span class="wf-chip">bug fix</span>
        <span class="wf-chip">refactor</span>
      </div>
    </div>
    <div class="tips-effort-level">
      <div class="tips-effort-label">xhigh / max</div>
      <p>Complex architectures, hard cross-cutting bugs, and novel problems with no clear prior. Reserve for tasks where the cost of a shallow answer is high.</p>
      <div class="wf-chips">
        <span class="wf-chip">system design</span>
        <span class="wf-chip">security audit</span>
        <span class="wf-chip">hard debugging</span>
      </div>
    </div>
  </div>

  <div class="wf-card" style="max-width: 680px;">
    <span class="wf-card-label">Quick reference</span>
    <h4>Effort commands</h4>
    <pre>/effort low       # exploration, quick questions
/effort medium    # default on Sonnet; most lightweight tasks
/effort high      # default on Opus; standard daily FSAD work
/effort xhigh     # deep reasoning, slower output
/effort max       # maximum reasoning budget</pre>
    <p class="wf-card-footnote">Effort persists for the session. Reset it explicitly when switching task types — e.g. drop back to <code>/effort medium</code> after a hard debugging session to avoid over-spending on a simple rename.</p>
  </div>
</section>

<hr class="divider">

<section id="session-patterns">
  <span class="section-label">03 — Session Hygiene</span>
  <h2 class="section-title">Set Once, Forget</h2>
  <p class="section-subtitle">Things you should configure once so you never have to repeat them in a prompt. Every repetition is a token cost and a cognitive tax.</p>

  <div class="wf-grid">
    <div class="wf-card">
      <span class="wf-card-label">Pattern 1</span>
      <h4>Write a CLAUDE.md</h4>
      <p>Any behavior you find yourself re-stating each session belongs in <code>CLAUDE.md</code>. The model reads it on every startup — you never have to say it again.</p>
      <pre>## Constraints
- Never add comments explaining what the code does.
- Always run the build script before committing.
- Use TypeScript strict mode; no `any`.
- Ask before running destructive git commands.</pre>
      <p class="wf-card-footnote">Scope it to the project: repo-level <code>CLAUDE.md</code> for project conventions, <code>~/.claude/CLAUDE.md</code> for personal habits that apply everywhere.</p>
    </div>
    <div class="wf-card">
      <span class="wf-card-label">Pattern 2</span>
      <h4>Problem First, Code Second</h4>
      <p>Always describe the problem before asking for code. "Here's what's broken and why it matters" is cheaper than three rounds of rejected implementations because the model guessed wrong about the goal.</p>
      <div class="wf-chips">
        <span class="wf-chip">✓ explain the problem</span>
        <span class="wf-chip">✓ share the constraint</span>
        <span class="wf-chip">✗ jump straight to "write me..."</span>
      </div>
    </div>
    <div class="wf-card">
      <span class="wf-card-label">Pattern 3</span>
      <h4>Right Tool for the Depth</h4>
      <p>Don't use dynamic workflows (<code>ultracode</code>) for anything a single focused session can do. Spawning 20 agents to rename a variable costs 20× and delivers the same answer. Reserve multi-agent orchestration for genuinely parallelisable work.</p>
      <div class="wf-chips">
        <span class="wf-chip">single-agent default</span>
        <span class="wf-chip">multi-agent for parallel scope</span>
      </div>
    </div>
    <div class="wf-card">
      <span class="wf-card-label">Pattern 4</span>
      <h4>Use Hooks for Repeating Checks</h4>
      <p>If you always want something checked before or after a tool call (e.g. lint after every file write, confirm before destructive git commands), encode it as a hook — not a prompt instruction that silently disappears after <code>/compact</code>.</p>
      <pre>"hooks": {
  "PostToolUse": [{
    "matcher": "Write",
    "hooks": [{"type": "command",
      "command": "npm run lint"}]
  }]
}</pre>
      <p class="wf-card-footnote">Hooks are shell commands wired to lifecycle events — they fire regardless of what's in context. Instruction files (<code>CLAUDE.md</code>, <code>.claude/rules/</code>) are re-injected after <code>/compact</code> automatically. Conversational instructions you gave mid-session are not — they get summarised away.</p>
    </div>
  </div>
</section>

</div><!-- end page-tips -->
```

### 4. Update `sectionToPageMap`

Add to line ~13235, after the `workflows` entry:

```js
'tips-hero': 'tips', 'token-limits': 'tips', 'effort-levels': 'tips', 'session-patterns': 'tips',
```

### 5. Rebuild dist

```bash
python3 scripts/build-dist.py
```

All criteria verified 2026-06-03 before commit.

## Acceptance Criteria
- [x] "Practical Best Practices" nav item appears in the left nav, between Workflows and Skills Library — GROUP 3.7 inserted at line 2122
- [x] Nav sub-items link correctly: Overview → `#tips/tips-hero`, Token Limits → `#tips/token-limits`, Effort Levels → `#tips/effort-levels`, Session Patterns → `#tips/session-patterns` — all 4 confirmed in nav HTML
- [x] Page hero renders with badge "Practical Reference for Daily Claude Code Use" — confirmed at line 3368
- [x] Section 01 shows 5 numbered habit cards (3-column + 2-column layout) — 6 `.tips-habit-num` elements (5 cards + CSS def); awk confirms 4 cards in session section separately
- [x] Habit numbers render as filled gradient circles — `.tips-habit-num { background: var(--gradient-brand) }` confirmed; `--gradient-brand` defined at line 45
- [x] Section 02 shows 3-column effort-level bar with default highlight on "high" — `.tips-effort-bar` at line 3431; `.tips-effort-level default` at line 3441
- [x] Effort quick-reference card shows all 5 `/effort` commands in a pre block — 6 lines matched (5 commands + one in footnote)
- [x] Section 03 shows 4 session-pattern cards in a 2-column wf-grid — awk count = 4
- [x] Pattern cards include code blocks (CLAUDE.md example, hooks example) — 3 `<pre>` blocks confirmed in session-patterns section
- [x] Deep links work: `#tips`, `#tips/token-limits`, `#tips/effort-levels`, `#tips/session-patterns` — all 4 IDs in `sectionToPageMap` at line 13496
- [x] Page transitions work correctly — `<div class="page" id="page-tips">` at line 3365, uses same `.page` class as all other pages
- [x] Mobile layout: habit grids collapse to single-column, effort bar stacks vertically — responsive rules confirmed in `@media (max-width: 780px)` block
- [x] Dist rebuilt at `dist/fsad-playbook.html` — 31.3 MB, written 2026-06-03 14:58
- [x] Version bumped to `v2.88.0` in `<title>` tag (line 6), sidebar brand badge (line 2058), and CHANGELOG entry `v2.88.0 — 2026-06-03`
