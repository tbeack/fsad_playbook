# CBP-183 — Add Skills Library section to Workflows page

## Source
Manual request: surface the `fsd:` skills in the playbook's Workflows nav and page, so readers can discover and understand each skill without leaving the playbook.

## Summary
The `skills/` directory was populated by CBP-182 with 11 skills (`fsd:` namespace). This task adds a new "Skills Library" nav item under Workflows and a corresponding `<section id="skills-library">` on the Workflows page, presenting each skill with its invocation, purpose, and key behaviors.

## Assessment
The Workflows page currently has 4 sections (01–04): Project Initialize-Context, Project Create-Spec, Add-Task, Commit-Changes. Each is linked from the left nav's Workflows sub-items. The `skills/` directory contains 12 directories (including `ship`, which is a one-line alias for `ship-it` — present but not a first-class entry in the orientation).

No section currently describes the skills or links to them from the Workflows nav.

**Location:** `fsad-playbook.html`
- Nav: `<div class="nav-sub-items" data-group="workflows">` — around line 1955
- Page: before the closing `<footer>` inside `#page-workflows` — around line 3191

## Plan

### Phase 1 — Add nav item

In the `<div class="nav-sub-items" data-group="workflows">` block, append a new nav item after the "Commit-Changes" `<a>`:

```html
<a class="nav-sub-item" href="#workflows/skills-library" onclick="scrollToSection('skills-library')">Skills Library</a>
```

### Phase 2 — Add `<section id="skills-library">` to the Workflows page

Insert before the closing summary section (the `<section style="text-align: center; ...">` near the end of `#page-workflows`).

Precede the section with a `<hr class="divider">`.

The section contains:
1. Section label `05 — Skills in this Playbook`
2. Title `The fsd: Skill Library` (with monospace styling on the code part)
3. Subtitle paragraph: brief orientation
4. An installation card (single `wf-card` at full width) showing the `claude plugin install` command
5. A **Workflow Management** sub-heading with a 2-column `wf-grid` of 8 skill cards
6. A **Review & Security** sub-heading with a 2-column `wf-grid` of 3 skill cards

Each skill card uses `wf-card` and contains:
- `wf-card-label`: the invocation string (e.g. `/fsd:do-task`)
- `h4`: one-line description
- `p`: 1–2 sentence body
- Optional `wf-chips` row for key modes/behaviors

**Workflow Management cards (8):**
| Invocation | h4 | Key chips |
|---|---|---|
| `/fsd:do-task <ID>` | Plan or execute any task | plan mode, execute mode |
| `/fsd:add-task [title]` | Capture a new task | auto-numbered, one-interview-at-a-time |
| `/fsd:ship-it` | Wrap up a finished batch | version bump, commit, push, PR |
| `/fsd:next` | Pick the next open task | hands off to do-task |
| `/fsd:sync` | Pre-flight sync check | up-to-date, ahead, behind, diverged |
| `/fsd:ac <ID>` | Verify acceptance criteria | progressive marks, evidence-first |
| `/fsd:estimate` | Story point estimation | Fibonacci, complexity + effort + risk |
| `/fsd:init` | Initialize a new project | folder structure, templates, git repo |

**Review & Security cards (3):**
| Invocation | h4 | Key chips |
|---|---|---|
| `/fsd:code-review-team` | Multi-agent code review | 6 specialists, REVIEW-REPORT.md |
| `/fsd:sec-review-team` | Multi-agent security review | 13 specialists, stack-signal detection |
| `/fsd:sec-review-fixes` | Apply security fix PRs | per-finding PRs, regression tests |

### Phase 3 — Run build script

```bash
python3 scripts/build-dist.py
```

### Phase 4 — Verify in browser

1. Open `fsad-playbook.html` and navigate to the Workflows page.
2. Confirm "Skills Library" appears in the left nav under Workflows.
3. Click the nav item — confirm scroll lands on the section.
4. Confirm all 11 skill cards render with correct names and descriptions.
5. Confirm the install card shows the `claude plugin install` command.

All criteria verified 2026-05-21 before commit.

## Acceptance Criteria
- [x] Left nav Workflows group shows "Skills Library" as the fifth sub-item
- [x] Clicking "Skills Library" scrolls to `#skills-library` on the Workflows page
- [x] Section shows section label `05 — Skills in this Playbook`
- [x] All 11 unique skills are represented (not `ship` alias — it duplicates ship-it)
- [x] Each skill card shows the correct `/fsd:<name>` invocation
- [x] Installation command card is present
- [x] Build script runs without error (`dist/fsad-playbook.html` regenerated)
