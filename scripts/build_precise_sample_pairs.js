#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const SAMPLE_ROOT = '/Users/vickyjian/Desktop/sample';
const ORGANISED_ROOT = '/Users/vickyjian/Desktop/orgnised samples';
const RAW_ROOT = '/Users/vickyjian/EGS-certification/samples_raw';
const OUT_PATH = '/Users/vickyjian/Desktop/precise-sample-pairs.json';

function normalize(value) {
  return value
    .toLowerCase()
    .replace(/\.(pdf|jpg|jpeg|png)$/g, '')
    .replace(/[()（）]/g, ' ')
    .replace(/[+_\-]/g, ' ')
    .replace(/sample|模板|样板|打码|真实副本|调取|海牙|认证|公证|直接|原件|复印件|扫描/g, ' ')
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokens(value) {
  return normalize(value).split(' ').filter(Boolean);
}

function tokenOverlap(a, b) {
  const at = tokens(a);
  const bt = tokens(b);
  return at.filter((token) => bt.includes(token)).length;
}

function walkFiles(root, maxDepth = 2) {
  const out = [];
  function walk(current, depth) {
    if (depth > maxDepth) return;
    for (const entry of fs.readdirSync(current)) {
      if (entry.startsWith('.')) continue;
      const full = path.join(current, entry);
      const stat = fs.statSync(full);
      if (stat.isDirectory()) {
        walk(full, depth + 1);
      } else if (/\.(pdf|jpg|jpeg|png)$/i.test(entry)) {
        out.push(full);
      }
    }
  }
  walk(root, 0);
  return out;
}

function loadRawEntries() {
  const entries = [];
  for (const country of fs.readdirSync(RAW_ROOT)) {
    const countryPath = path.join(RAW_ROOT, country);
    if (!fs.statSync(countryPath).isDirectory()) continue;
    for (const slug of fs.readdirSync(countryPath)) {
      const dir = path.join(countryPath, slug);
      const metaPath = path.join(dir, 'metadata.json');
      const sourcePath = path.join(dir, 'source.pdf');
      if (!fs.existsSync(metaPath) || !fs.existsSync(sourcePath)) continue;
      const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
      entries.push({
        country,
        slug,
        title: meta.title || slug,
        sourcePath,
      });
    }
  }
  return entries;
}

const sampleFiles = walkFiles(SAMPLE_ROOT, 1)
  .filter((file) => file.toLowerCase().endsWith('.pdf'))
  .map((file) => ({
    name: path.basename(file),
    path: file,
    size: fs.statSync(file).size,
  }));

const organisedFiles = walkFiles(ORGANISED_ROOT, 2)
  .filter((file) => file.toLowerCase().endsWith('.pdf'))
  .map((file) => ({
    name: path.basename(file),
    path: file,
    country: path.basename(path.dirname(file)),
  }));

const rawEntries = loadRawEntries();

function bestRawMatches(sample) {
  return rawEntries
    .map((entry) => {
      let score = tokenOverlap(sample.name, entry.title) + tokenOverlap(sample.name, entry.slug);
      if (normalize(sample.name) === normalize(entry.title)) score += 6;
      if (normalize(sample.name) === normalize(entry.slug)) score += 8;
      return { entry, score };
    })
    .filter((item) => item.score >= 4)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

function bestOrganisedMatches(sample, rawMatch) {
  return organisedFiles
    .map((file) => {
      let score = tokenOverlap(file.name, sample.name);
      score += tokenOverlap(file.name, rawMatch.entry.title);
      if (file.country.toLowerCase() === rawMatch.entry.country.toLowerCase()) score += 2;
      if (normalize(file.name).includes(normalize(rawMatch.entry.title))) score += 4;
      return { file, score };
    })
    .filter((item) => item.score >= 5)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

const rows = sampleFiles.map((sample) => {
  const rawMatches = bestRawMatches(sample).map((rawMatch) => ({
    rawTitle: rawMatch.entry.title,
    rawSlug: rawMatch.entry.slug,
    rawCountry: rawMatch.entry.country,
    rawSourcePath: rawMatch.entry.sourcePath,
    rawScore: rawMatch.score,
    organisedCandidates: bestOrganisedMatches(sample, rawMatch).map((candidate) => ({
      country: candidate.file.country,
      name: candidate.file.name,
      path: candidate.file.path,
      score: candidate.score,
    })),
  }));

  return {
    sampleName: sample.name,
    samplePath: sample.path,
    sampleSize: sample.size,
    bridges: rawMatches,
  };
});

fs.writeFileSync(OUT_PATH, JSON.stringify(rows, null, 2));
console.log(`Wrote ${rows.length} rows to ${OUT_PATH}`);
