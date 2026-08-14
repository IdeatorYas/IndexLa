/**
 * Faithful OOXML → whitepaper.md converter.
 * Preserves source wording; only adds markdown structure for presentation.
 */
const fs = require("fs");
const path = require("path");

const DOCXML = process.argv[2];
const OUT = process.argv[3];
const xml = fs.readFileSync(DOCXML, "utf8");

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

function textsIn(block) {
  const out = [];
  const tRe = /<w:t[^>]*>([\s\S]*?)<\/w:t>/g;
  let tm;
  while ((tm = tRe.exec(block))) out.push(tm[1]);
  return decode(out.join(""))
    .replace(/\u0007/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function isListItem(block) {
  return /<w:numPr>/.test(block);
}

const SUBHEADINGS = new Set([
  "Fragmented Investing",
  "Manual Strategy Execution",
  "Creators Lack Portfolio Infrastructure",
  "One Portfolio Layer",
  "Programmable Strategies",
  "Non-Custodial by Design",
  "Cross-Chain Portfolio Management",
  "Creator Portfolios",
  "Tokenization",
  "Creator Distribution",
  "Programmable Finance",
  "Why Existing Models Are Different",
  "01 — Individual Asset Ownership",
  "02 — Scoped Non-Custodial Permissions",
  "03 — Execution-Level Creator Economics",
  "TAM — Global Investable Assets",
  "SAM — Programmable On-Chain Assets",
  "SOM — Initial Market",
  "The Long-Term Opportunity",
  "Build",
  "Configure",
  "Authorize",
  "Monitor",
  "Execute",
  "Manage",
  "1% Execution Fee",
  "Fee Economics",
  "Protocol Created Portfolios",
  "Treasury",
  "Turn Your Thesis Into Recurring Revenue",
  "Build More Than One Portfolio",
  "Earn From Portfolio Activity",
  "Publish",
  "Feature",
  "Monetize Strategies",
  "Receive Tips",
  "Monthly Rewards",
  "Creator Flywheel",
  "The Economic Engine of INDEXLA",
  "Five Core Utilities",
  "01 — Publish",
  "02 — Feature",
  "03 — Monetize",
  "04 — Save",
  "05 — Tip",
  "Five Burn Mechanisms",
  "01 — Publishing Burn",
  "02 — Featured Burn",
  "03 — Execution Fee Burn",
  "04 — Treasury Burn",
  "05 — Strategy Monetization Burn",
  "Pricing Flexibility",
  "Why $DEXLA Exists",
  "Token Distribution",
  "Total Supply",
  "Network",
  "Vesting & Release Schedule",
  "Initial Circulating Supply",
  "Utility-Only Position",
  "Direct User Acquisition",
  "Strategic Partnerships",
  "Phase 1 — Foundation",
  "Phase 2 — Architecture & MVP",
  "Phase 3 — Testing & Full Platform Launch",
  "Phase 4 — Partnerships, Token & Scale",
  "Phase 5 — Mobile & Global Expansion",
  "Smart Contract Risk",
  "Cross-Chain Risk",
  "Liquidity Risk",
  "Market Risk",
  "Oracle & Data Risk",
  "Asset Risk",
  "Regulatory Risk",
  "Operational Risk",
  "Third-Party Dependency Risk",
  "DCA",
  "Buy Fear",
  "Sell Greed",
  "Take Profit",
  "Stop Loss",
  "RSI",
  "Momentum",
  "Rebalancing",
]);

function isMajor(text) {
  return /^\d+\.\s+.+$/.test(text) || /^Comprehensive Disclaimer$/i.test(text);
}

function tableMarkdown(tblXml) {
  const rows = [];
  const trRe = /<w:tr[\s\S]*?<\/w:tr>/g;
  let tr;
  while ((tr = trRe.exec(tblXml))) {
    const cells = [];
    const tcRe = /<w:tc[\s\S]*?<\/w:tc>/g;
    let tc;
    while ((tc = tcRe.exec(tr[0]))) {
      const parts = [];
      const pRe = /<w:p[\s\S]*?<\/w:p>/g;
      let p;
      while ((p = pRe.exec(tc[0]))) {
        const t = textsIn(p[0]);
        if (t) parts.push(t);
      }
      cells.push(parts.join(" "));
    }
    rows.push(cells);
  }
  if (!rows.length) return "";
  const width = Math.max(...rows.map((r) => r.length));
  const norm = rows.map((r) => {
    const c = r.slice();
    while (c.length < width) c.push("");
    return c;
  });
  const esc = (s) => s.replace(/\|/g, "\\|");
  const lines = [];
  lines.push("| " + norm[0].map(esc).join(" | ") + " |");
  lines.push("| " + norm[0].map(() => "---").join(" | ") + " |");
  for (let i = 1; i < norm.length; i++) {
    lines.push("| " + norm[i].map(esc).join(" | ") + " |");
  }
  return lines.join("\n");
}

const body = xml.match(/<w:body[\s\S]*<\/w:body>/)[0];
const children = [];
const childRe = /<(w:p|w:tbl)\b[\s\S]*?<\/\1>/g;
let cm;
while ((cm = childRe.exec(body))) {
  children.push({ tag: cm[1], raw: cm[0] });
}

const md = [];
let listBuf = [];
let sawTitle = false;
let sawTagline = false;

function flushList() {
  if (!listBuf.length) return;
  for (const item of listBuf) md.push(`- ${item}`);
  md.push("");
  listBuf = [];
}

function linkifyCta(text) {
  // Presentation-only: preserve exact visible CTA wording, add hrefs
  if (text === "Investor Guide →") return "[Investor Guide →](/investors)";
  if (text === "Creator Guide →") return "[Creator Guide →](/creators)";
  if (text === "Strategies →") return "[Strategies →](/strategies)";
  return text;
}

for (const child of children) {
  if (child.tag === "w:tbl") {
    flushList();
    const t = tableMarkdown(child.raw);
    if (t) {
      md.push(t);
      md.push("");
    }
    continue;
  }

  const text = textsIn(child.raw);
  if (!text) {
    flushList();
    continue;
  }

  if (!sawTitle && text === "INDEXLA Whitepaper") {
    md.push("# INDEXLA Whitepaper");
    md.push("");
    sawTitle = true;
    continue;
  }

  if (
    sawTitle &&
    !sawTagline &&
    text === "Invest in Everything. Own Everything. Control Everything."
  ) {
    md.push(`## ${text}`);
    md.push("");
    md.push("---");
    md.push("");
    sawTagline = true;
    continue;
  }

  if (isMajor(text)) {
    flushList();
    md.push("---");
    md.push("");
    if (/^Comprehensive Disclaimer$/i.test(text)) {
      // Keep visible title exact; router maps this to disclaimer slug
      md.push("# Comprehensive Disclaimer");
    } else {
      md.push(`# ${text}`);
    }
    md.push("");
    continue;
  }

  if (SUBHEADINGS.has(text)) {
    flushList();
    md.push(`### ${text}`);
    md.push("");
    continue;
  }

  if (isListItem(child.raw)) {
    listBuf.push(text);
    continue;
  }

  flushList();
  md.push(linkifyCta(text));
  md.push("");
}

flushList();

let out = md.join("\n").replace(/\n{3,}/g, "\n\n").trim() + "\n";
fs.writeFileSync(OUT, out, "utf8");

const sections = [...out.matchAll(/^# (.+)$/gm)].map((m) => m[1]);
console.log("sections", sections.length);
sections.forEach((s, i) => console.log(String(i + 1).padStart(2, "0"), s));
console.log("bytes", Buffer.byteLength(out));
