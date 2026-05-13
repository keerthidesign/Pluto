/**
 * validate-tokens.mjs
 * Validates the built token output from Style Dictionary.
 * Checks that required dist files exist and the JSON token map is well-formed.
 */

import { existsSync, readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const distDir = resolve(root, 'packages/tokens/dist');

const requiredFiles = [
  'css/tokens.css',
  'css/primitives.css',
  'css/themes/dark.css',
  'css/themes/high-contrast.css',
  'json/tokens.json',
  'json/primitives.json',
  'figma/tokens.json',
];

let errors = 0;

console.log('🔍 Validating token build output...\n');

// 1. Check all required files exist
for (const file of requiredFiles) {
  const fullPath = resolve(distDir, file);
  if (!existsSync(fullPath)) {
    console.error(`  ✗ Missing: dist/${file}`);
    errors++;
  } else {
    console.log(`  ✓ dist/${file}`);
  }
}

// 2. Validate JSON token map is parseable and non-empty
const tokensJsonPath = resolve(distDir, 'json/tokens.json');
if (existsSync(tokensJsonPath)) {
  try {
    const tokens = JSON.parse(readFileSync(tokensJsonPath, 'utf8'));
    const count = Object.keys(tokens).length;
    if (count < 50) {
      console.error(`\n  ✗ tokens.json has only ${count} tokens — expected 100+`);
      errors++;
    } else {
      console.log(`\n  ✓ tokens.json: ${count} tokens`);
    }
  } catch (e) {
    console.error(`\n  ✗ tokens.json is not valid JSON: ${e.message}`);
    errors++;
  }
}

// 3. Check dark.css has the right selector
const darkCssPath = resolve(distDir, 'css/themes/dark.css');
if (existsSync(darkCssPath)) {
  const darkCss = readFileSync(darkCssPath, 'utf8');
  if (!darkCss.includes('[data-theme="dark"]')) {
    console.error('  ✗ dark.css missing [data-theme="dark"] selector');
    errors++;
  } else {
    console.log('  ✓ dark.css has correct [data-theme="dark"] selector');
  }
}

// 4. Check HC focus ring has #FFFF00
const hcCssPath = resolve(distDir, 'css/themes/high-contrast.css');
if (existsSync(hcCssPath)) {
  const hcCss = readFileSync(hcCssPath, 'utf8');
  if (!hcCss.includes('#FFFF00')) {
    console.error('  ✗ high-contrast.css missing #FFFF00 focus ring (WCAG 2.4.11)');
    errors++;
  } else {
    console.log('  ✓ high-contrast.css has #FFFF00 focus ring');
  }
}

if (errors > 0) {
  console.error(`\n❌ Validation failed with ${errors} error(s)\n`);
  process.exit(1);
} else {
  console.log('\n✅ Token validation passed\n');
}
