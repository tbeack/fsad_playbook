# CBP-703 — Update section 10.5 Code Review Agent with review levels and org-wide enrollment

## Summary
Claude Code v2.1.304 added two new features to the GitHub Code Review Agent:
1. Review levels: organization owners choose Quick, Standard (the default), or Deep. Individual repositories can also have their own level.
2. Org-wide enrollment: a new admin setting enrolls every repository in a GitHub organization, including ones added later, without selecting them one by one.

## Assessment
Section 10.5 in `src/pages/practices.html` exists (starting around line 938). Step 2 of the Setup Guide says "Select which repositories to enable — start with 1-2 repos to test." This sentence needs to note the new org-wide enrollment option. The Setup Guide also needs a note about review levels. No review level information currently exists in the section.

## Plan
1. Open `src/pages/practices.html`.
2. Find the step-card for "Install the Claude GitHub App":
   ```
   <h3>Install the Claude GitHub App</h3>
   <p>Grant <strong>Contents</strong>, <strong>Issues</strong>, and <strong>Pull Requests</strong> read/write permissions. Select which repositories to enable — start with 1–2 repos to test.</p>
   ```
3. Update the paragraph to add the org-wide option:
   ```html
   <p>Grant <strong>Contents</strong>, <strong>Issues</strong>, and <strong>Pull Requests</strong> read/write permissions. Select which repositories to enable, or choose the new <strong>Review all repositories</strong> option to cover every current and future repo in the organization (v2.1.304).</p>
   ```
4. Find the step-card for "Choose Your Review Trigger" (step 3). After that step-card, add a new step-card for review levels:
   ```html
   <div class="step-card">
     <div class="step-number">3a</div>
     <h3>Set a Review Level (optional)</h3>
     <p>In Code Review admin settings, owners choose <strong>Quick</strong>, <strong>Standard</strong> (the default), or <strong>Deep</strong> for the organization. Individual repositories can have their own level. Quick returns findings faster; Deep runs a more thorough analysis (v2.1.304).</p>
   </div>
   ```

## Acceptance Criteria
- Step 2 of the Setup Guide mentions the org-wide review enrollment option.
- A new callout or step-card explains the Quick/Standard/Deep review levels.
- No broken HTML or styling issues.
