# Task CBP-002: Add Example CLAUDE.md to Getting Started Section

**Status:** Complete
**File:** `fsad-playbook - v6.html`
**Source content:** `example_claude.md`

## Objective

Add a real-world example CLAUDE.md as a collapsible block in the "Getting Started" section of the Best Practices page, so engineers can see and copy a production-ready CLAUDE.md configuration.

## Plan

### Step 1 — Identify insert point
- **After:** The "Best Practice" callout at line ~1869 (end of the 6-step getting started guide)
- **Before:** The `<hr class="divider">` at line ~1872
- This keeps the example as a natural follow-up to the steps without breaking the existing flow

### Step 2 — Add collapsible block with example content
Insert a collapsible section using the existing `.collapsible` pattern:

```html
<div class="collapsible">
  <div class="collapsible-header">
    <h3>Example: A Production CLAUDE.md</h3>
    <span class="collapsible-chevron">&#9660;</span>
  </div>
  <div class="collapsible-body">
    <div class="collapsible-content">
      <p>A real-world CLAUDE.md covering workflow orchestration, task management, and core principles. Copy and adapt for your team.</p>
      <div class="code-block">
        <pre><code class="language-markdown">
        ... (full example_claude.md content)
        </code></pre>
      </div>
    </div>
  </div>
</div>
```

### Step 3 — Verify
- Open `fsad-playbook - v6.html` in browser
- Navigate to Best Practices → Getting Started
- Confirm collapsible opens/closes correctly
- Confirm syntax highlighting renders on the markdown code block
- Confirm Copy button works on the code block

## No CSS changes needed
The existing `.collapsible`, `.collapsible-header`, `.collapsible-body`, `.collapsible-content`, and `.code-block` styles already handle everything.

## Acceptance Criteria
- [x] Collapsible block appears below Pillar 1 (CLAUDE.md = Repo Memory) in Project Anatomy section
- [x] Full example_claude.md content is rendered as a syntax-highlighted markdown code block
- [x] Collapsible opens/closes with animation (existing CSS grid transition)
- [x] Copy button works on the code block (initCopyButtons() auto-attaches on page switch)
- [x] No regressions in surrounding sections (Pillars 2-4 and all other sections untouched)
