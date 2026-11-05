#!/usr/bin/env node
/**
 * Lists portfolio projects whose entry in src/content/projects.ts may be out of date.
 *
 * An entry is stale when its GitHub repo was pushed to after the entry's `verified` date,
 * and unverified when it has no `verified` date at all. The README in each repo is the
 * source of truth: re-read it, update the entry, then bump `verified`.
 *
 *   npm run projects:check            report only (exit 0)
 *   npm run projects:check -- --strict  exit 1 when anything is stale (for CI or a cron)
 *
 * Set GITHUB_TOKEN to raise the unauthenticated rate limit (60 requests/hour).
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const strict = process.argv.includes('--strict');
const file = fileURLToPath(new URL('../src/content/projects.ts', import.meta.url));
const source = readFileSync(file, 'utf8');

// Each entry is a top-level `{ id: '...', ... }` object; read the three fields we need.
const entries = [...source.matchAll(/^ {2}\{\n {4}id: '([^']+)'([\s\S]*?)^ {2}\},$/gm)].map(
  ([, id, body]) => ({
    id,
    repo: body.match(/githubUrl: 'https:\/\/github\.com\/([^']+)'/)?.[1],
    verified: body.match(/verified: '(\d{4}-\d{2}-\d{2})'/)?.[1],
  }),
);

if (entries.length === 0) {
  console.error('No projects found in src/content/projects.ts; has its format changed?');
  process.exit(2);
}

const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'portfolio-projects-check' };
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

let stale = 0;
for (const { id, repo, verified } of entries) {
  if (!repo) {
    console.log(`?  ${id}: no githubUrl`);
    continue;
  }
  const res = await fetch(`https://api.github.com/repos/${repo}`, { headers });
  if (!res.ok) {
    const hint = [401, 403, 429].includes(res.status)
      ? ' (rate limited or bad GITHUB_TOKEN; set a valid token)'
      : '';
    console.log(`?  ${id}: ${repo} returned HTTP ${res.status}${hint}`);
    stale++;
    continue;
  }
  const { pushed_at: pushedAt, archived } = await res.json();
  const pushed = pushedAt.slice(0, 10);
  if (!verified) {
    console.log(`!  ${id}: never verified (last push ${pushed})`);
    stale++;
  } else if (pushed > verified) {
    console.log(`!  ${id}: pushed ${pushed}, verified ${verified}`);
    stale++;
  } else {
    console.log(`ok ${id}: verified ${verified}, last push ${pushed}${archived ? ' (archived)' : ''}`);
  }
}

console.log(stale === 0 ? '\nAll entries are up to date.' : `\n${stale} of ${entries.length} entries need a look.`);
process.exit(strict && stale > 0 ? 1 : 0);
