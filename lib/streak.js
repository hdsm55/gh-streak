'use strict';

/**
 * Core streak logic — pure functions separated for testability.
 */

const DAY = 24 * 60 * 60 * 1000;

function dateKey(d) {
  return d.toISOString().slice(0, 10); // YYYY-MM-DD (UTC)
}

function startOfUTCDay(d) {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
}

/**
 * Fetch public user data: profile + recent public events.
 * Events expose contributions (pushes, PRs, issues, comments).
 */
async function fetchPublicData(base, ua, username, lookbackDays) {
  const headers = { ...ua, Accept: 'application/vnd.github+json' };
  const userRes = await fetch(`${base}/users/${encodeURIComponent(username)}`, { headers });
  if (userRes.status === 404) throw new Error(`User '${username}' not found`);
  if (userRes.status === 403) throw new Error('Rate limited by GitHub (public API). Try again later.');
  if (!userRes.ok) throw new Error(`GitHub error ${userRes.status}`);
  const user = await userRes.json();

  // Public events only (last 30 items typically). Good enough for streaks.
  const evRes = await fetch(
    `${base}/users/${encodeURIComponent(username)}/events/public?per_page=100`,
    { headers }
  );
  if (!evRes.ok) throw new Error(`Could not load events (${evRes.status})`);
  const events = await evRes.json();

  const contributionTypes = new Set([
    'PushEvent', 'PullRequestEvent', 'IssuesEvent',
    'IssueCommentEvent', 'PullRequestReviewCommentEvent',
    'CreateEvent', 'DeleteEvent', 'CommitCommentEvent'
  ]);

  const dates = [];
  for (const ev of events) {
    if (contributionTypes.has(ev.type)) dates.push(ev.created_at);
  }

  return {
    username,
    login: user.login,
    name: user.name || user.login,
    avatar: user.avatar_url,
    bio: user.bio || '',
    followers: user.followers || 0,
    public_repos: user.public_repos || 0,
    events: dates
  };
}

/**
 * Compute current and longest streaks from ISO date strings.
 * A day counts when ≥1 contribution event happened that day.
 */
function computeStreak(dateStrings) {
  const set = new Set(dateStrings.map((s) => dateKey(new Date(s))));
  let currentStreak = 0;
  let longestStreak = 0;

  // Walk back from "yesterday" to now for current streak.
  const today = startOfUTCDay(new Date());
  let cursor = startOfUTCDay(new Date(today.getTime() - DAY)); // yesterday
  let walked = 0;
  while (walked < 3650) {
    const key = dateKey(cursor);
    if (set.has(key)) { currentStreak++; cursor = new Date(cursor.getTime() - DAY); walked++; }
    else break;
  }

  // Longest streak over the whole observed window.
  const keys = [...set].sort();
  let run = 0;
  let prev = null;
  for (const k of keys) {
    if (prev && (new Date(k) - new Date(prev)) === DAY) run++;
    else run = 1;
    if (run > longestStreak) longestStreak = run;
    prev = k;
  }

  return { currentStreak, longestStreak, contributionDays: keys.length };
}

function renderSummary(data, color) {
  const C = color ? {
    reset: '\x1b[0m', bold: '\x1b[1m', green: '\x1b[32m', yellow: '\x1b[33m', red: '\x1b[31m', dim: '\x1b[2m'
  } : { reset: '', bold: '', green: '', yellow: '', red: '', dim: '' };

  const streak = computeStreak(data.events);
  const present = streak.currentStreak > 0;
  let status;
  if (present) status = `${C.green}🔥 Connected — keep it going!${C.reset}`;
  else if (streak.currentStreak === 0) status = `${C.yellow}⚠️ Streak broken or none yet — today's the day to start.${C.reset}`;
  else status = `${C.red}Disconnected.${C.reset}`;

  return [
    `${C.bold}🔒 ${data.login}${C.reset} (${data.name})${data.bio ? ' — ' + data.bio : ''}`,
    `${C.dim}followers ${C.green}${data.followers}${C.reset}${C.dim} · public repos ${data.public_repos}${C.reset}`,
    '',
    `${C.bold}Current streak : ${C.green}${streak.currentStreak} day(s)${C.reset}`,
    `${C.bold}Longest streak : ${streak.longestStreak} day(s)${C.reset}`,
    `${C.bold}Contribution days observed: ${streak.contributionDays}${C.reset}`,
    '',
    status
  ].join('\n');
}

function renderCalendar(dateStrings, windowDays, color) {
  const C = color ? { green: '\x1b[32m', dim: '\x1b[2m', reset: '\x1b[0m' } : { green: '', dim: '', reset: '' };
  const set = new Set(dateStrings.map((s) => dateKey(new Date(s))));
  const today = startOfUTCDay(new Date());
  const cols = Math.max(1, Math.floor(windowDays / 7));
  const lines = [];
  lines.push(`${C.dim}Last ${windowDays} days (██ = contributed):${C.reset}`);
  for (let r = 0; r < 7; r++) {
    let row = '';
    for (let c = 0; c < cols; c++) {
      const daysBack = (cols - 1 - c) * 7 + (6 - r);
      if (daysBack > windowDays - 1) { row += ' '; continue; }
      const d = new Date(today.getTime() - daysBack * DAY);
      row += set.has(dateKey(d)) ? `${C.green}█${C.reset}` : '░';
    }
    lines.push(row);
  }
  return lines.join('\n');
}

module.exports = { computeStreak, renderSummary, renderCalendar, fetchPublicData, dateKey };
