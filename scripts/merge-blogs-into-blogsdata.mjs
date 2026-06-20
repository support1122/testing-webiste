import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const blogsDataPath = path.join(root, "src/data/blogsData.ts");
const batchPath = path.join(root, "src/data/blogsBatchMay2026.ts");

let blogsData = fs.readFileSync(blogsDataPath, "utf8");

blogsData = blogsData.replace(/^import \{ blogsBatchMay2026 \} from "\.\/blogsBatchMay2026";\r?\n\r?\n/, "");
blogsData = blogsData.replace(/\r?\n  \.\.\.blogsBatchMay2026,\r?\n/, "\n");

if (!fs.existsSync(batchPath)) {
  console.error("Missing blogsBatchMay2026.ts — run: node scripts/convert-blog-text.mjs first");
  process.exit(1);
}

const batch = fs.readFileSync(batchPath, "utf8");
const match = batch.match(/export const blogsBatchMay2026 = \[([\s\S]*)\];\s*$/);
if (!match) {
  console.error("Could not parse blogsBatchMay2026.ts");
  process.exit(1);
}

const entries = match[1].trim();
blogsData = blogsData.replace(/\r?\n\];\s*$/, `,\n${entries}\n];\n`);

fs.writeFileSync(blogsDataPath, blogsData);
fs.unlinkSync(batchPath);
console.log("Inlined 6 blogs into blogsData.ts");
