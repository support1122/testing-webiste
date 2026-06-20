/**
 * Split scripts/blog-sources/user-upload-raw.txt into blog-226..231.txt
 * Raw file: paste full "upload these blogs" user message (blog 1 .. blog 6 markers)
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const rawPath = path.join(root, "scripts/blog-sources/user-upload-raw.txt");
const outDir = path.join(root, "scripts/blog-sources");

const raw = fs.readFileSync(rawPath, "utf8");
const markers = [
  { id: 226, start: /blog\s*1\s*\n/i, end: /blog\s*2\s*\n/i },
  { id: 227, start: /blog\s*2\s*\n/i, end: /blog\s*3\s*\n/i },
  { id: 228, start: /blog\s*3\s*\n/i, end: /blog\s*4\s*\n/i },
  { id: 229, start: /blog\s*4\s*\n/i, end: /blog\s*5\s*\n/i },
  { id: 230, start: /blog\s*5\s*\n/i, end: /blog\s*6\s*\n/i },
  { id: 231, start: /blog\s*6\s*\n/i, end: null },
];

function extract(startRe, endRe) {
  const start = raw.search(startRe);
  if (start < 0) throw new Error(`Start not found: ${startRe}`);
  let bodyStart = start;
  const m = raw.slice(start).match(startRe);
  if (m) bodyStart = start + m[0].length;
  let end = raw.length;
  if (endRe) {
    const e = raw.slice(bodyStart).search(endRe);
    if (e < 0) throw new Error(`End not found: ${endRe}`);
    end = bodyStart + e;
  }
  return raw.slice(bodyStart, end).trim();
}

for (const { id, start, end } of markers) {
  let text = extract(start, end);
  // Drop metadata header lines before first content paragraph
  const lines = text.split("\n");
  const idx = lines.findIndex((l) =>
    /^(Learning |Understanding |Finding |Using )/.test(l.trim()),
  );
  if (idx > 0) text = lines.slice(idx).join("\n");
  fs.writeFileSync(path.join(outDir, `blog-${id}.txt`), text);
  console.log(`blog-${id}.txt`, text.length, "chars");
}
