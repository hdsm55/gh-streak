# How to pair on gh-streak (and earn Pair Extraordinaire together)

`gh-streak` is a small codebase on purpose — easy to pair on in a single sitting.

## A 30-minute pairing session that produces a real co-authored commit

1. **Pick one of the open issues** labelled `good first issue`.
2. **Work in the same branch.** One person drives, the other reviews as you go.
3. **Commit with a co-author trailer** so both GitHub accounts are credited:

```bash
git commit -m "feat: add <thing>

Co-authored-by: Name <email@example.com>
Co-authored-by: Name <email@example.com>"
```

The email must be the one attached to the collaborator's GitHub account
(or their `ID+username@users.noreply.github.com` address), otherwise GitHub
will not link the commit to their profile.

4. **Open the PR and merge it.** Co-authorship only counts for a *merged* PR.

## Suggested first pair tasks

| Task | Why it pairs well |
|---|---|
| `--since/--until` edge cases around timezones | design discussion, then a focused test |
| A `--week` flag (Mon–Sun buckets) | small surface, testable |
| Better error message when the user has no public activity | one file, easy to review |
| Windows path/colour handling | needs a second environment to verify |

## Rules of the road

- Tests must pass before a PR: `npm test` (Node >= 18).
- One logical change per PR.
- No new dependencies — the zero-dependency constraint is the point of the tool.

## Why the co-author trailer matters

GitHub attributes co-authored commits to the second person's profile as well,
which is how both people get credit for the work. It is also the only honest
way to end up on each other's contribution graph.
