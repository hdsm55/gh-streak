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
