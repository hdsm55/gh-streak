'use strict';
const test = require('node:test');
const assert = require('node:assert');
const { computeStreak } = require('../lib/streak.js');

test('empty events => zero streaks', () => {
  const r = computeStreak([]);
  assert.strictEqual(r.currentStreak, 0);
  assert.strictEqual(r.longestStreak, 0);
});

test('contiguous recent days => current streak counts', () => {
  // Yesterday and day-before-yesterday (relative to now).
  const now = new Date();
  const ys = new Date(now.getTime() - 24 * 3600 * 1000).toISOString();
  const dbs = new Date(now.getTime() - 48 * 3600 * 1000).toISOString();
  const r = computeStreak([ys, dbs]);
  assert.ok(r.currentStreak >= 2, `expected >=2 got ${r.currentStreak}`);
});

test('date-window filter drops older contributions (applied upstream)', () => {
  // Simulates --since=2030-01-01: only events at/after that date count.
  const sinceT = Date.parse('2030-01-01');
  const inWindow = ['2030-02-01T10:00:00Z', '2030-02-02T10:00:00Z']
    .filter((s) => Date.parse(s) >= sinceT);
  const r = computeStreak(inWindow);
  assert.strictEqual(r.contributionDays, 2, 'both in-window days counted');
  assert.strictEqual(r.longestStreak, 2);
});

test('longest streak spans window regardless of recency', () => {
  // 5 consecutive days ending 10 days ago.
  const base = new Date();
  const days = [];
  for (let i = 0; i < 5; i++) {
    days.push(new Date(base.getTime() - (10 + i) * 24 * 3600 * 1000).toISOString());
  }
  const r = computeStreak(days);
  assert.strictEqual(r.longestStreak, 5);
  assert.strictEqual(r.currentStreak, 0);
});

test('only contribution events counted (handled upstream, dedupe here)', () => {
  const dup = ['2026-09-01T10:00:00Z', '2026-09-01T11:00:00Z'];
  const r = computeStreak(dup);
  // Both map to the same day => contributionDays distinct 1.
  assert.strictEqual(r.contributionDays, 1);
});
