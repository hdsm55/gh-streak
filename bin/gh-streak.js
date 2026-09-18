#!/usr/bin/env node
/**
 * gh-streak — GitHub contribution streak tracker (public data only)
 * No auth, no keys, no secrets. Reads only public endpoints.
 */
'use strict';

const { computeStreak, renderSummary, renderCalendar, fetchPublicData } = require('../lib/streak.js');

const BASE = 'https://api.github.com';
const UA = { 'User-Agent': 'gh-streak' };

function parseArgs(argv) {
  const args = { user: null, days: 30, json: false, color: true };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--json') args.json = true;
    else if (a === '--no-color') args.color = false;
    else if (a === '--days') args.days = parseInt(argv[++i], 10) || 30;
    else if (a === '--since') args.since = argv[++i];
    else if (a === '--until') args.until = argv[++i];
    else if (a === '-h' || a === '--help') { printHelp(); process.exit(0); }
    else if (!a.startsWith('-')) args.user = a;
  }
  return args;
}

function printHelp() {
  console.log(`gh-streak — GitHub contribution streak tracker

USAGE
  gh-streak <username> [options]

OPTIONS
  --days N     calendar window (default 30)
  --since ISO  only count events on/after this date (e.g. 2026-01-01)
  --until ISO  only count events on/before this date
  --json       machine-readable JSON output
  --no-color   disable terminal colours
  -h, --help   show this help

DATA
  Public endpoints only. No auth token required.
`);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.user) {
    console.error('✖ Please provide a GitHub username: gh-streak <username>');
    process.exit(1);
  }
  try {
    const data = await fetchPublicData(BASE, UA, args.user, args.days, args.since, args.until);
    if (args.json) {
      console.log(JSON.stringify({
        user: args.user,
        present: data.present,
        currentStreakDays: data.currentStreak,
        longestStreakDays: data.longestStreak,
        events: data.events.length,
        window: args.days
      }, null, 2));
      process.exit(0);
    }
    const summary = renderSummary(data, args.color);
    const calendar = renderCalendar(data.events, args.days, args.color);
    console.log(summary);
    console.log(calendar);
  } catch (e) {
    console.error('✖ ' + (e.message || e));
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
