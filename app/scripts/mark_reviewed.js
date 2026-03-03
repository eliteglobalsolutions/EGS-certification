#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const INDEX_PATH = path.join(ROOT, 'public', 'samples', 'index.json');

function parseArgs(argv) {
  const out = {};
  for (const arg of argv) {
    if (!arg.startsWith('--')) continue;
    const [k, ...v] = arg.slice(2).split('=');
    out[k] = v.join('=');
  }
  return out;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const slug = (args.slug || '').trim().toLowerCase();
  const by = (args.by || '').trim();
  const notes = (args.notes || '').trim();

  if (!slug || !by) {
    console.error('Usage: node scripts/mark_reviewed.js --slug=<slug> --by="<name>" --notes="..."');
    process.exit(1);
  }

  if (!fs.existsSync(INDEX_PATH)) {
    console.error(`index.json not found: ${INDEX_PATH}`);
    process.exit(1);
  }

  const rows = JSON.parse(fs.readFileSync(INDEX_PATH, 'utf-8'));
  const idx = rows.findIndex((r) => String(r.slug || '').toLowerCase() === slug);
  if (idx === -1) {
    console.error(`Slug not found: ${slug}`);
    process.exit(1);
  }

  rows[idx].reviewed = true;
  rows[idx].reviewed_by = by;
  rows[idx].reviewed_at = new Date().toISOString();
  rows[idx].notes = notes || null;

  fs.writeFileSync(INDEX_PATH, JSON.stringify(rows, null, 2), 'utf-8');
  console.log(`Marked reviewed: ${rows[idx].country}/${rows[idx].slug}`);
}

main();
