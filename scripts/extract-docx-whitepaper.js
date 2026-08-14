const fs = require("fs");
const path = require("path");

const root = process.argv[2];
const xmlPath = path.join(root, "unz", "word", "document.xml");
const outPath = path.join(root, "extract.txt");
const xml = fs.readFileSync(xmlPath, "utf8");

function decode(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) =>
      String.fromCharCode(parseInt(h, 16)),
    );
}

const paras = [];
const pRe = /<w:p[\s\S]*?<\/w:p>/g;
let m;
while ((m = pRe.exec(xml))) {
  const block = m[0];
  const texts = [];
  const tRe = /<w:t[^>]*>([\s\S]*?)<\/w:t>/g;
  let tm;
  while ((tm = tRe.exec(block))) texts.push(tm[1]);
  paras.push(decode(texts.join("")).replace(/\s+/g, " ").trim());
}

const tables = [];
const tblRe = /<w:tbl[\s\S]*?<\/w:tbl>/g;
while ((m = tblRe.exec(xml))) {
  const tbl = m[0];
  const rows = [];
  const trRe = /<w:tr[\s\S]*?<\/w:tr>/g;
  let tr;
  while ((tr = trRe.exec(tbl))) {
    const cells = [];
    const tcRe = /<w:tc[\s\S]*?<\/w:tc>/g;
    let tc;
    while ((tc = tcRe.exec(tr[0]))) {
      const texts = [];
      const tRe = /<w:t[^>]*>([\s\S]*?)<\/w:t>/g;
      let tm;
      while ((tm = tRe.exec(tc[0]))) texts.push(tm[1]);
      cells.push(decode(texts.join("")).replace(/\s+/g, " ").trim());
    }
    rows.push(cells);
  }
  tables.push(rows);
}

let body =
  "=== PARAGRAPHS ===\n" +
  paras.map((l, i) => String(i).padStart(4, "0") + "|" + l).join("\n");
body += "\n\n=== TABLES ===\n";
tables.forEach((rows, i) => {
  body += `\n--- TABLE ${i + 1} ---\n`;
  rows.forEach((cells) => {
    body += cells.join(" | ") + "\n";
  });
});

fs.writeFileSync(outPath, body, "utf8");
fs.writeFileSync(
  path.join(root, "tables.json"),
  JSON.stringify(tables, null, 2),
  "utf8",
);
console.log("paras", paras.length, "nonempty", paras.filter(Boolean).length);
console.log("tables", tables.length);
console.log("wrote", outPath);
