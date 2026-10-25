# gh-streak — Launch Kit

Everything needed to get the project in front of real developers. Copy, paste, post.
**Rule: post where it is genuinely on-topic.** Spam gets removed and burns the account.

---

## 1. One-liner (use everywhere)

> `gh-streak` — your GitHub contribution streak, in one terminal command. No auth, no keys, zero dependencies.

Longer version:

> I got tired of opening github.com just to check whether my streak was alive. So I built `gh-streak`: a zero-dependency Node CLI that reads only public data and prints your current streak, longest streak, and active days. `npx gh-streak <username>`. MIT.

---

## 2. Reddit — r/github or r/node or r/commandline

**Title:** `I built a zero-dependency CLI that tells you your GitHub contribution streak (no auth, no keys)`

**Body:**

```
I check my streak more often than I'd like to admit, and opening github.com
for it always felt wasteful. So I wrote gh-streak — a small Node CLI that
reads public contribution data and prints:

  - current streak
  - longest streak
  - active days in the window
  - followers / public repos

Usage:

  npx gh-streak <username>
  npx gh-streak <username> --days 90
  npx gh-streak <username> --since 2026-01-01 --until 2026-06-30
  npx gh-streak <username> --json
  npx gh-streak <username> --markdown   # paste-ready table for a README

Notes:
- No authentication, no tokens, no keys. Public endpoints only.
- Zero dependencies — plain Node >= 18.
- Tests: `node --test`. CI runs on 18/20/22.
- MIT.

Repo: https://github.com/hdsm55/gh-streak

Happy to hear what flags would be useful — I'd rather add two good ones than
ten mediocre ones.
```

---

## 3. dev.to / Hashnode article

**Title:** `Building a zero-dependency CLI to track GitHub streaks`

**Structure:**
1. The annoyance: checking a website for a number.
2. The constraint I set: no auth, no keys, no dependencies.
3. Reading public data — what the API actually returns, and what it doesn't.
4. Streak logic: consecutive days, longest run, timezone pitfalls.
5. `--since/--until` and why a date window matters more than "last N days".
6. `--markdown`: generating a README table so the number stays current.
7. Testing with `node --test` before adding CI.
8. What I'd build next.

**Canonical link:** point back to the repo at the end, not the top.

---

## 4. Hacker News — Show HN

**Title:** `Show HN: gh-streak – GitHub contribution streak from public data, zero deps`

**First comment (yours, immediately after posting):**

```
Author here. The design constraint was "no credentials at all" — a streak
checker shouldn't need a token with repo scope. It reads public contribution
data only, so it works for any username, not just your own.

Two things I'd flag as honest limitations:
- Private contributions don't appear, so the number is a lower bound for
  people who work mostly in private repos.
- Timezones: contributions are bucketed by date as returned by the API, not
  by your local midnight. I chose not to "fix" that, because guessing a
  timezone silently seemed worse than documenting it.
```

---

## 5. X / Twitter thread

```
1/ Your GitHub streak shouldn't need a browser tab.

   npx gh-streak <username>

   No auth. No keys. Zero dependencies.

2/ It prints current streak, longest streak, active days, and followers —
   from public data only, so it works for any handle.

3/ Date windows matter more than "last N days":

   gh-streak you --since 2026-01-01 --until 2026-06-30

4/ `--json` for scripting, `--markdown` for a paste-ready README table.

5/ Built with plain Node >= 18, tests with node --test, CI on 18/20/22.
   MIT.

   github.com/hdsm55/gh-streak
```

---

## 6. LinkedIn (Arabic, if posting to an Arabic audience)

```
أغلب من يهتم بسلسلة إسهاماته على GitHub يفتح الموقع لمجرد رؤية رقم.

بنيت gh-streak: أداة طرفية صغيرة تقرأ البيانات العامة فقط وتطبع السلسلة
الحالية، وأطول سلسلة، وعدد الأيام النشطة — بلا تسجيل دخول ولا مفاتيح
ولا أي اعتمادية خارجية.

npx gh-streak <username>

مفتوحة المصدر (MIT)، وتعمل على Node 18+.
```

---

## 7. Reply template (when someone asks "why not just use X?")

> Fair question. If you only need it for your own account once, the website is
> fine. The CLI earns its place when you want it in a script, a status line, or
> a README that updates itself — that's what `--json` and `--markdown` are for.

---

## 8. Posting discipline (this is what actually decides the outcome)

- **One community per day**, not five at once. Simultaneous posting reads as promotion.
- **Answer every comment for the first 2 hours.** Engagement is what moves a post.
- **Post in Arabic communities too** — smaller, but far higher reply rate.
- **Do not ask for stars.** Say what it does and why; the star is the reader's call.
- If a post gets no traction, do not repost it elsewhere the same week.
