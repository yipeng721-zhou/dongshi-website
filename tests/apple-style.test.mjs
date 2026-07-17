import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';

const jsHash = '22caf4288aeb505702e41efc702969092a42735552fb7feded9498f222bdd2e8';

test('style sheet includes Apple accessibility fallbacks', async () => {
  const css = await readFile('css/style.css', 'utf8');
  assert.match(css, /prefers-reduced-transparency/);
  assert.match(css, /prefers-contrast:\s*more/);
  assert.match(css, /:focus-visible/);
});

test('interactive JavaScript is unchanged', async () => {
  const js = await readFile('js/main.js');
  const hash = createHash('sha256').update(js).digest('hex');
  assert.equal(hash, jsHash);
});

test('style sheet confines glass material to structural feature surfaces', async () => {
  const css = await readFile('css/style.css', 'utf8');
  assert.match(css, /\.header\{[^}]*backdrop-filter/s);
  assert.match(css, /\.page-hero\{[^}]*backdrop-filter/s);
  assert.doesNotMatch(css, /\.card\{[^}]*backdrop-filter/s);
});
