import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const P = (s) =>
  `<p style='margin-bottom:12px; line-height:1.7;'>${s}</p>`;
const H2 = (s) =>
  `<h2 class="text-2xl font-bold text-gray-900 mt-10 mb-3">${s}</h2>`;
const H3 = (s) =>
  `<h3 class="text-xl font-semibold text-gray-800 mt-6 mb-2">${s}</h3>`;
const UL = (items) =>
  `<ul style='margin-left:20px; margin-bottom:12px; line-height:1.6;'>${items.map((i) => `<li>${i}</li>`).join("")}</ul>`;

function escape(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function inline(s) {
  let t = escape(s);
  t = t.replace(
    /Source:\s*(https?:\/\/\S+)/gi,
    'Source: <a href="$1" target="_blank" rel="noopener noreferrer" style="color: #f97316; text-decoration: underline;">$1</a>',
  );
  t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  return t;
}

function tableHtml(headers, rows) {
  const th = headers
    .map(
      (h) =>
        `<th style="border: 1px solid #d1d5db; padding: 12px; text-align: left;">${escape(h)}</th>`,
    )
    .join("");
  const body = rows
    .map((row, ri) => {
      const bg = ri % 2 === 1 ? ' style="background-color: #f9fafb;"' : "";
      const tds = row
        .map(
          (c) =>
            `<td style="border: 1px solid #d1d5db; padding: 12px;">${inline(c)}</td>`,
        )
        .join("");
      return `<tr${bg}>${tds}</tr>`;
    })
    .join("");
  return `<table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
  <thead><tr style="background-color: #f3f4f6;">${th}</tr></thead>
  <tbody>${body}</tbody>
</table>`;
}

function isSectionTitle(line) {
  return /^\d+\.\s+/.test(line);
}

function isLikelyH3(line, nextLine) {
  if (!line || line.length > 120) return false;
  if (isSectionTitle(line)) return false;
  if (/^Q\./.test(line)) return false;
  if (line.startsWith("Source:")) return false;
  if (/^(Writing|Email)$/i.test(line)) return true;
  if (!nextLine) return line.length < 80 && !line.endsWith(".");
  if (nextLine.endsWith(":")) return true;
  if (line.length < 70 && nextLine.length > line.length + 20) return true;
  return false;
}

function isListIntro(line) {
  return (
    line.endsWith(":") &&
    !line.startsWith("http") &&
    line.length < 120 &&
    !/^Q\./.test(line)
  );
}

function collectList(lines, start) {
  const items = [];
  let i = start;
  while (i < lines.length) {
    const l = lines[i].trim();
    if (!l) break;
    if (isSectionTitle(l)) break;
    if (isLikelyH3(l, lines[i + 1]?.trim())) break;
    if (/^Q\./.test(l)) break;
    if (l.startsWith("Source:")) break;
    if (l.length > 150 && items.length > 0) break;
    items.push(inline(l));
    i++;
  }
  return { items, next: i };
}

function tryParseTable(lines, start) {
  const chunk = [];
  let i = start;
  while (i < lines.length && lines[i].trim()) {
    const l = lines[i].trim();
    if (isSectionTitle(l) || /^Q\./.test(l) || l.startsWith("Source:")) break;
    if (l.length > 200) break;
    chunk.push(l);
    i++;
    if (chunk.length > 20) break;
  }
  if (chunk.length < 3) return null;
  const tabRows = chunk.map((r) => r.split(/\t+/).filter(Boolean));
  if (tabRows.some((r) => r.length >= 2)) {
    return { headers: tabRows[0], rows: tabRows.slice(1), next: start + chunk.length };
  }
  if (chunk.length >= 4 && chunk.length % 2 === 0) {
    const half = chunk.length / 2;
    const headers = chunk.slice(0, 2);
    const rows = [];
    for (let j = 2; j < chunk.length; j += 2) {
      rows.push(chunk.slice(j, j + 2));
    }
    if (headers.length === 2) return { headers, rows, next: start + chunk.length };
  }
  if (chunk.length >= 6 && chunk.length % 3 === 0) {
    const headers = chunk.slice(0, 3);
    const rows = [];
    for (let j = 3; j < chunk.length; j += 3) {
      rows.push(chunk.slice(j, j + 3));
    }
    return { headers, rows, next: start + chunk.length };
  }
  return null;
}

export function convertTextToHtml(text) {
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  const out = [];
  let i = 0;

  while (i < lines.length) {
    let line = lines[i].trim();
    if (!line) {
      i++;
      continue;
    }

    if (isSectionTitle(line)) {
      out.push(H2(inline(line.replace(/^\d+\.\s+/, ""))));
      i++;
      continue;
    }

    if (/^FAQs$/i.test(line)) {
      out.push(H2("FAQs"));
      i++;
      continue;
    }

    if (/^Final Thought$/i.test(line)) {
      out.push(H2("Final Thought"));
      i++;
      continue;
    }

    if (/^Q\./.test(line)) {
      const q = inline(line);
      i++;
      const answers = [];
      while (i < lines.length && lines[i].trim() && !/^Q\./.test(lines[i].trim()) && !isSectionTitle(lines[i].trim()) && !/^Final Thought$/i.test(lines[i].trim())) {
        answers.push(lines[i].trim());
        i++;
      }
      out.push(P(`<strong>${q.replace(/^<strong>|<\/strong>$/g, "")}</strong><br/>${answers.map(inline).join("<br/>")}`));
      continue;
    }

    const table = tryParseTable(lines, i);
    if (table && table.rows.length > 0) {
      out.push(tableHtml(table.headers, table.rows));
      i = table.next;
      continue;
    }

    const next = lines[i + 1]?.trim() || "";
    if (isLikelyH3(line, next)) {
      out.push(H3(inline(line)));
      i++;
      continue;
    }

    if (isListIntro(line)) {
      out.push(P(inline(line)));
      i++;
      const { items, next: ni } = collectList(lines, i);
      if (items.length) out.push(UL(items));
      i = ni;
      continue;
    }

    const { items, next: ni } = collectList(lines, i);
    if (items.length >= 2 && items.every((it) => it.length < 120)) {
      out.push(UL(items));
      i = ni;
      continue;
    }

    if (line.startsWith("Source:")) {
      out.push(P(inline(line)));
      i++;
      continue;
    }

    const paras = [line];
    i++;
    while (i < lines.length && lines[i].trim() && !isSectionTitle(lines[i].trim()) && !isLikelyH3(lines[i].trim(), lines[i + 1]?.trim() || "") && !/^Q\./.test(lines[i].trim()) && !/^FAQs$/i.test(lines[i].trim())) {
      const t = tryParseTable(lines, i);
      if (t && t.rows.length > 0) break;
      const probe = lines[i].trim();
      if (isListIntro(probe)) break;
      const listProbe = collectList(lines, i);
      if (listProbe.items.length >= 2 && listProbe.items.every((it) => it.length < 120)) break;
      paras.push(probe);
      i++;
    }
    out.push(P(inline(paras.join(" "))));
  }

  return out.join("\n");
}

const CTA = `\n<p style='margin-bottom:12px; line-height:1.7;'>However, feel free to explore <a href="https://www.flashfirejobs.com" target="_blank" rel="noopener noreferrer" style="color: #f97316; text-decoration: underline;">flashfirejobs.com</a> for exciting offers on personalized job-relevant resume tailoring and apply to 1000+ jobs in one place. Visit now!</p>`;

const METAS = [
  {
    id: 226,
    slug: "how-to-pass-a-job-interview",
    title: "How to Pass a Job Interview: 15 Proven Tips",
    excerpt:
      "Learn how to pass a job interview with proven tips, common mistakes to avoid, and expert strategies to impress recruiters in 2026.",
    h1: "How to Pass a Job Interview Successfully in 2026",
    readTime: "18 min",
    category: "Interview Tips",
    tags: ["Job Interview", "Interview Tips", "Career Advice", "STAR Method", "2026"],
    image:
      "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/Screenshot%202026-05-21%20at%2010.32.18%E2%80%AFPM.png",
    file: "blog-226.txt",
  },
  {
    id: 227,
    slug: "what-are-resume-keywords",
    title: "What Are Resume Keywords? Best Keywords to Use",
    excerpt:
      "Learn what resume keywords are, why they matter for ATS, and what keywords to use in a resume to improve your chances of getting hired.",
    h1: "What Are Resume Keywords and How to Use Them",
    readTime: "17 min",
    category: "Resume Writing",
    tags: ["Resume Keywords", "ATS", "Resume Optimization", "Job Search"],
    image:
      "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/Screenshot%202026-05-21%20at%2010.34.42%E2%80%AFPM.png",
    file: "blog-227.txt",
  },
  {
    id: 228,
    slug: "best-remote-job-boards",
    title: "Best Remote Job Boards for Remote Work in USA",
    excerpt:
      "Discover the best remote job boards to find work-from-home, freelance, and global remote job opportunities faster in USA.",
    h1: "Best Remote Job Boards to Find Remote Work",
    readTime: "18 min",
    category: "Job Search",
    tags: ["Remote Jobs", "Job Boards", "Work From Home", "USA Jobs"],
    image:
      "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/Screenshot%202026-05-21%20at%2010.36.40%E2%80%AFPM.png",
    file: "blog-228.txt",
  },
  {
    id: 229,
    slug: "how-to-land-a-job",
    title: "How to Land a Job Fast & Get Hired in USA",
    excerpt:
      "Learn how to land a job fast with proven resume, networking, and interview tips, including strategies to land a remote job in USA.",
    h1: "How to Land a Job Fast and Get Hired in 2026",
    readTime: "17 min",
    category: "Job Search",
    tags: ["Land a Job", "Job Search", "Get Hired", "Remote Jobs"],
    image:
      "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/Screenshot%202026-05-21%20at%2010.38.33%E2%80%AFPM.png",
    file: "blog-229.txt",
  },
  {
    id: 230,
    slug: "best-free-ats-resume-scanners",
    title: "Best Free ATS Resume Scanners to Pass ATS in USA",
    excerpt:
      "Discover the best free ATS resume scanners to optimize your resume, improve ATS scores, and increase your chances of getting hired faster.",
    h1: "Best Free ATS Resume Scanners for Job Seekers in 2026",
    readTime: "17 min",
    category: "Resume Writing",
    tags: ["ATS", "Resume Scanner", "Resume Optimization", "Free Tools"],
    image:
      "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/Screenshot%202026-05-21%20at%2010.39.41%E2%80%AFPM.png",
    file: "blog-230.txt",
  },
  {
    id: 231,
    slug: "how-to-explain-gap-in-resume",
    title: "How to Explain a Gap in Your Resume in 2026",
    excerpt:
      "Learn how to explain gaps in a resume professionally with examples, interview tips, and resume strategies to improve hiring chances.",
    h1: "How to Explain a Gap in Your Resume Successfully",
    readTime: "16 min",
    category: "Resume Writing",
    tags: ["Resume Gap", "Employment Gap", "Career Break", "Interview Tips"],
    image:
      "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/Screenshot%202026-05-21%20at%2010.41.09%E2%80%AFPM.png",
    file: "blog-231.txt",
  },
];

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const srcDir = path.join(root, "scripts/blog-sources");

function buildEntry(meta, bodyHtml) {
  const tags = meta.tags.map((t) => `"${t}"`).join(", ");
  return `  {
    id: ${meta.id},
    slug: "${meta.slug}",
    title: "${meta.title}",
    excerpt:
      "${meta.excerpt}",
    date: "May 21, 2026",
    lastUpdated: "May 21, 2026",
    readTime: "${meta.readTime}",
    category: "${meta.category}",
    tags: [${tags}],
    author: {
      name: "Debashri Mandal",
      bio: "Career expert and resume strategist helping job seekers land their dream roles.",
    },
    image: "${meta.image}",
    categoryColor: "bg-orange-100 text-orange-600",
    content: \`
${H2(meta.h1)}
${bodyHtml}${CTA}
    \`
  }`;
}

const entries = METAS.map((meta) => {
  const raw = fs.readFileSync(path.join(srcDir, meta.file), "utf8");
  const html = convertTextToHtml(raw.trim());
  return buildEntry(meta, html);
});

const out = `export const blogsBatchMay2026 = [\n${entries.join(",\n")}\n];\n`;
const batchPath = path.join(root, "src/data/blogsBatchMay2026.ts");
fs.writeFileSync(batchPath, out);
console.log("Wrote blogsBatchMay2026.ts", entries.length, "blogs");

// Also support direct inline into blogsData.ts
if (process.argv.includes("--inline")) {
  const blogsDataPath = path.join(root, "src/data/blogsData.ts");
  let blogsData = fs.readFileSync(blogsDataPath, "utf8");
  blogsData = blogsData.replace(/^import \{ blogsBatchMay2026 \} from "\.\/blogsBatchMay2026";\r?\n\r?\n/, "");
  blogsData = blogsData.replace(/\r?\n  \.\.\.blogsBatchMay2026,\r?\n/, "\n");
  const entriesOnly = entries.join(",\n");
  blogsData = blogsData.replace(/\r?\n\];\s*$/, `,\n${entriesOnly}\n];\n`);
  fs.writeFileSync(blogsDataPath, blogsData);
  if (fs.existsSync(batchPath)) fs.unlinkSync(batchPath);
  console.log("Inlined into blogsData.ts");
}
