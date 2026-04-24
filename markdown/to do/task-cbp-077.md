# CBP-077: Add `prUrlTemplate` setting to Config Cascade section

## Summary
In v2.1.119, a new `prUrlTemplate` setting was added to `settings.json`. It points the footer PR badge to a custom code-review URL instead of github.com — useful for teams on GitLab, Bitbucket, or GitHub Enterprise.

## Assessment
The Config Cascade section (around line 3580) documents `settings.json` keys but does not mention `prUrlTemplate`. This is a new, team-relevant setting worth documenting in the Config Cascade section's settings.json examples/recommendations. No row in the Cheat Sheet CLI flags references this setting either.

The best place is within the Config Cascade section — either as a new row in any settings table or as a note in the "Recommendations" area. Check lines ~3596–3760 for the right insertion point.

## Plan
1. Read fsad-playbook.html around line 3596–3760 (config cascade section)
2. Find where specific `settings.json` keys are documented
3. Add `prUrlTemplate` as a new entry with description: points the footer PR badge to a custom review URL (GitLab, Bitbucket, GHE)

## Acceptance Criteria
- `prUrlTemplate` appears in the Config Cascade section
- Description explains it redirects the footer PR badge to a custom URL
- Mention GitLab/Bitbucket/GHE as use cases
