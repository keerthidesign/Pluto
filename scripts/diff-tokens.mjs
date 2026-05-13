/**
 * diff-tokens.mjs
 * Compares the current token build against the base branch (main) and
 * outputs a markdown report of added, removed, and changed tokens.
 * Used in CI to comment on PRs with a token diff summary.
 */

import { existsSync, readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const outputPath = resolve(root, 'packages/tokens/token-diff.md');

function getTokensFromBranch(branch) {
  try {
    const json = execSync(
      `git show ${branch}:packages/tokens/dist/json/tokens.json 2>/dev/null`,
      { cwd: root, encoding: 'utf8' }
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function getCurrentTokens() {
  const jsonPath = resolve(root, 'packages/tokens/dist/json/tokens.json');
  if (!existsSync(jsonPath)) return null;
  try {
    return JSON.parse(readFileSync(jsonPath, 'utf8'));
  } catch {
    return null;
  }
}

console.log('📊 Generating token diff...\n');

const baseBranch = process.env.GITHUB_BASE_REF || 'main';
const baseTokens = getTokensFromBranch(`origin/${baseBranch}`);
const currentTokens = getCurrentTokens();

if (!currentTokens) {
  console.log('⚠ No current token build found. Run pnpm build:tokens first.');
  writeFileSync(outputPath, '_No token build found._');
  process.exit(0);
}

if (!baseTokens) {
  console.log(`⚠ Could not read tokens from ${baseBranch}. Skipping diff.`);
  writeFileSync(outputPath, `_Could not diff against \`${baseBranch}\` — base tokens not available._`);
  process.exit(0);
}

const baseKeys = new Set(Object.keys(baseTokens));
const currentKeys = new Set(Object.keys(currentTokens));

const added = [...currentKeys].filter((k) => !baseKeys.has(k));
const removed = [...baseKeys].filter((k) => !currentKeys.has(k));
const changed = [...currentKeys].filter(
  (k) => baseKeys.has(k) && baseTokens[k] !== currentTokens[k]
);

const lines = [
  `### Token Diff vs \`${baseBranch}\``,
  '',
  `| | Count |`,
  `|---|---|`,
  `| ✅ Added | ${added.length} |`,
  `| ❌ Removed | ${removed.length} |`,
  `| 🔄 Changed | ${changed.length} |`,
  `| Total (current) | ${currentKeys.size} |`,
  '',
];

if (added.length > 0) {
  lines.push('#### ✅ Added tokens');
  lines.push('```');
  added.slice(0, 30).forEach((k) => lines.push(`+ ${k}: ${currentTokens[k]}`));
  if (added.length > 30) lines.push(`... and ${added.length - 30} more`);
  lines.push('```', '');
}

if (removed.length > 0) {
  lines.push('#### ❌ Removed tokens');
  lines.push('```');
  removed.slice(0, 30).forEach((k) => lines.push(`- ${k}: ${baseTokens[k]}`));
  if (removed.length > 30) lines.push(`... and ${removed.length - 30} more`);
  lines.push('```', '');
}

if (changed.length > 0) {
  lines.push('#### 🔄 Changed tokens');
  lines.push('```');
  changed.slice(0, 30).forEach((k) =>
    lines.push(`~ ${k}: ${baseTokens[k]} → ${currentTokens[k]}`)
  );
  if (changed.length > 30) lines.push(`... and ${changed.length - 30} more`);
  lines.push('```', '');
}

const markdown = lines.join('\n');
writeFileSync(outputPath, markdown);

console.log(`  Added:   ${added.length}`);
console.log(`  Removed: ${removed.length}`);
console.log(`  Changed: ${changed.length}`);
console.log(`\n✅ Token diff written to packages/tokens/token-diff.md\n`);
