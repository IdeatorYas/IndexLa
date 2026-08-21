import type { ReactNode } from "react";
import Image from "next/image";
import "@/components/investor-one-pager/one-pager.css";
import {
  loadInvestorOnePagerContent,
  sectionByTitle,
  splitBodyLines,
  type OnePagerSection,
} from "@/lib/investorOnePagerContent";

/** True RGBA logo — sharpest transparent-capable mark for white one-pager print. */
const LOGO = "/logo/indexla-logo-email.png";
const LOGO_W = 480;
const LOGO_H = 439;

function stripMd(line: string): string {
  return line
    .replace(/^###\s+/, "")
    .replace(/\*\*/g, "")
    .replace(/\u00a0/g, " ")
    .trim();
}

function pickSubheads(lines: string[]): { heads: string[]; rest: string[] } {
  const heads: string[] = [];
  const rest: string[] = [];
  for (const line of lines) {
    if (line.startsWith("###")) heads.push(stripMd(line));
    else rest.push(stripMd(line));
  }
  return { heads, rest };
}

function Card({
  title,
  children,
  className = "",
  accent = false,
}: {
  title: string;
  children: ReactNode;
  className?: string;
  accent?: boolean;
}) {
  return (
    <section className={`${accent ? "op-card-accent" : "op-card"} min-w-0 p-2 ${className}`}>
      <h2 className="op-section-title">{title}</h2>
      {children}
    </section>
  );
}

function ProductFlow({ body }: { body: string }) {
  const pillars = splitBodyLines(body)
    .map(stripMd)
    .filter((l) => /^(DISCOVER|BUILD|AUTOMATE|OWN)\b/i.test(l))
    .map((l) => {
      const m = l.match(/^(DISCOVER|BUILD|AUTOMATE|OWN)\s*[—–]\s*(.+)$/i);
      if (m) return { label: m[1].toUpperCase(), detail: m[2].trim() };
      return { label: l, detail: "" };
    });

  return (
    <div className="mt-1 flex items-stretch gap-0.5">
      {pillars.map((p, i) => (
        <div key={p.label} className="contents">
          <div className="op-step rounded-lg border border-[#0284c7]/15 bg-[#0284c7]/[0.04] px-1.5 py-1.5">
            <span className="op-step-num">{String(i + 1)}</span>
            <p className="font-[family-name:var(--font-display)] text-[8pt] font-bold uppercase tracking-[0.06em] text-[#0284c7]">
              {p.label}
            </p>
            <p className="op-body-sm mt-0.5">{p.detail}</p>
          </div>
          {i < pillars.length - 1 ? <span className="op-arrow">→</span> : null}
        </div>
      ))}
    </div>
  );
}

function GrowthLoop({ body }: { body: string }) {
  const raw = splitBodyLines(body);
  const { heads, rest } = pickSubheads(raw);
  const loop =
    rest.find((l) => /More Creators/i.test(l)) ??
    "More Creators → More Users → More AUM → More Volume → More Revenue";
  const steps = loop.split(/\s*→\s*/).map((s) => s.trim()).filter(Boolean);
  const feeLine = rest.find((l) => /50%/i.test(l));
  const degen = rest.find((l) => /DEGEN CLUB/i.test(l));

  return (
    <div>
      {heads[0] ? (
        <p className="mb-1.5 font-[family-name:var(--font-display)] text-[8.5pt] font-bold uppercase tracking-[0.03em] text-[#0f172a]">
          {heads[0]}
        </p>
      ) : null}
      {feeLine ? <p className="op-body mb-1.5">{feeLine}</p> : null}
      <div className="flex flex-wrap items-center gap-1">
        {steps.map((s, i) => (
          <div key={s} className="contents">
            <span className="op-chip">{s.replace(/^More\s+/i, "")}</span>
            {i < steps.length - 1 ? (
              <span className="text-[9pt] font-bold text-[#0284c7]">→</span>
            ) : null}
          </div>
        ))}
      </div>
      {degen ? <p className="op-body-sm mt-1.5">{degen}</p> : null}
    </div>
  );
}

function PathTimeline({ body }: { body: string }) {
  const raw = splitBodyLines(body);
  const { heads, rest } = pickSubheads(raw);
  const stages: { name: string; detail: string }[] = [];
  let current: { name: string; detail: string } | null = null;

  for (const line of rest) {
    if (
      /^(SEED|PRIVATE|PUBLIC)/i.test(line) &&
      !line.includes("→") &&
      line.length < 40
    ) {
      if (current) stages.push(current);
      current = { name: line, detail: "" };
    } else if (current) {
      current.detail = current.detail ? `${current.detail} ${line}` : line;
    }
  }
  if (current) stages.push(current);

  return (
    <div>
      <div className="relative grid grid-cols-3 gap-1.5">
        <div
          className="absolute left-[8%] right-[8%] top-[0.7rem] h-[2px] bg-gradient-to-r from-[#0284c7]/30 via-[#0284c7] to-[#0284c7]/30"
          aria-hidden
        />
        {stages.map((s, i) => {
          const parts = s.detail.split(/\s*→\s*/).map((p) => p.trim()).filter(Boolean);
          return (
            <div key={s.name} className="relative z-[1] text-center">
              <div className="mx-auto mb-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#0284c7] bg-white font-[family-name:var(--font-display)] text-[7pt] font-bold text-[#0284c7]">
                {i + 1}
              </div>
              <p className="font-[family-name:var(--font-display)] text-[7.5pt] font-bold uppercase tracking-[0.06em] text-[#0284c7]">
                {s.name}
              </p>
              <div className="mt-1 space-y-0.5 rounded-md border border-[#0284c7]/12 bg-[#0284c7]/[0.04] px-1 py-1">
                {parts.map((p) => (
                  <p
                    key={p}
                    className="font-[family-name:var(--font-display)] text-[7.2pt] font-semibold leading-snug text-[#0f172a]"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      {heads[0] ? (
        <p className="mt-1.5 text-center font-[family-name:var(--font-display)] text-[8pt] font-bold uppercase tracking-[0.06em] text-[#0284c7]">
          {heads[0]}
        </p>
      ) : null}
    </div>
  );
}

function splitRoundAmount(line: string): { round: string; amount: string } {
  const m = line.match(/^(.*?)\s+[—–]\s+(\$.+)$/);
  if (m) return { round: m[1].trim(), amount: m[2].trim() };
  return { round: line.trim(), amount: "" };
}

function FundraisingRoadmap({ body }: { body: string }) {
  const raw = splitBodyLines(body).filter((l) => stripMd(l) !== "↓");
  const { heads, rest } = pickSubheads(raw);

  const blocks: string[][] = [];
  let block: string[] = [];
  for (const line of rest) {
    if (/^(PRE-SEED|SEED|PRIVATE|PUBLIC)/i.test(line)) {
      if (block.length) blocks.push(block);
      block = [line];
    } else block.push(line);
  }
  if (block.length) blocks.push(block);

  const stages = blocks.map((b) => {
    const [roundLine, ...others] = b;
    const { round, amount } = splitRoundAmount(roundLine ?? "");
    const raisedLine = others.find((o) => /Raised|Remaining/i.test(o)) ?? "";
    const milestoneLine =
      others.find((o) => o !== raisedLine) ?? others[0] ?? "";
    return { round, amount, meta: raisedLine, milestone: milestoneLine };
  });

  return (
    <div>
      <div className="grid grid-cols-4 gap-1.5">
        {stages.map((s, idx) => (
          <div
            key={s.round}
            className="relative rounded-lg border border-[#0284c7]/20 bg-white px-1.5 py-1.5"
          >
            {idx < stages.length - 1 ? (
              <span
                className="absolute -right-1.5 top-[42%] z-10 -translate-y-1/2 text-[9pt] font-bold text-[#0284c7]"
                aria-hidden
              >
                →
              </span>
            ) : null}
            <div className="mb-1 h-1 rounded-full bg-gradient-to-r from-[#0284c7] to-[#38bdf8]" />
            <p className="font-[family-name:var(--font-display)] text-[7pt] font-bold uppercase tracking-[0.1em] text-[#0284c7]">
              {s.round}
            </p>
            <p className="mt-0.5 font-[family-name:var(--font-display)] text-[9pt] font-bold leading-tight text-[#0f172a]">
              {s.amount}
            </p>
            {s.meta ? (
              <p className="mt-0.5 rounded bg-[#0284c7]/10 px-1 py-0.5 text-[7.4pt] font-bold leading-snug text-[#0284c7]">
                {s.meta}
              </p>
            ) : null}
            <p className="mt-0.5 text-[7pt] leading-snug text-[#64748b]">
              {s.milestone}
            </p>
          </div>
        ))}
      </div>
      {heads[0] ? (
        <p className="mt-1.5 rounded-lg bg-[#0284c7] px-2 py-1 text-center font-[family-name:var(--font-display)] text-[10pt] font-bold tracking-[-0.01em] text-white">
          {heads[0]}
        </p>
      ) : null}
    </div>
  );
}

function MarketCards({ body }: { body: string }) {
  const raw = splitBodyLines(body);
  const { heads, rest } = pickSubheads(raw);
  const metrics = rest.filter((l) => /^\$/.test(l));

  return (
    <div>
      <div className="grid grid-cols-3 gap-1.5">
        {metrics.map((m) => {
          const [num, ...labelParts] = m.split(/\s+/);
          return (
            <div
              key={m}
              className="rounded-lg border border-[#0284c7]/18 bg-[#0284c7]/[0.05] px-1.5 py-2 text-center"
            >
              <p className="op-metric text-[17pt]">{num}</p>
              <p className="mt-1 text-[6.8pt] font-semibold leading-snug text-[#64748b]">
                {labelParts.join(" ")}
              </p>
            </div>
          );
        })}
      </div>
      {heads[0] ? (
        <p className="mt-1.5 text-center font-[family-name:var(--font-display)] text-[7.4pt] font-bold uppercase tracking-[0.04em] text-[#0284c7]">
          {heads[0]}
        </p>
      ) : null}
    </div>
  );
}

function MoatVisual({ body }: { body: string }) {
  const raw = splitBodyLines(body);
  const { heads, rest } = pickSubheads(raw);
  const combo = rest.find((l) => /×/.test(l)) ?? "";
  const parts = combo.split(/\s*×\s*/).map((s) => s.trim()).filter(Boolean);
  const note = rest.find((l) => /Most platforms/i.test(l));
  const thesis =
    heads.find((h) => /No single platform/i.test(h)) ??
    rest.find((h) => /No single platform/i.test(h)) ??
    "No single platform combines all five. INDEXLA does.";

  return (
    <div>
      {heads
        .filter((h) => !/No single platform/i.test(h))
        .map((h) => (
          <p
            key={h}
            className="mb-1.5 font-[family-name:var(--font-display)] text-[8.5pt] font-bold uppercase tracking-[0.03em] text-[#0f172a]"
          >
            {h}
          </p>
        ))}
      <div className="flex flex-wrap items-center justify-center gap-1">
        {parts.map((p, i) => (
          <div key={p} className="contents">
            <span className="rounded-md border border-[#0284c7]/25 bg-white px-1.5 py-1 font-[family-name:var(--font-display)] text-[7.2pt] font-bold uppercase tracking-[0.03em] text-[#0284c7]">
              {p}
            </span>
            {i < parts.length - 1 ? (
              <span className="text-[9pt] font-bold text-[#94a3b8]">×</span>
            ) : null}
          </div>
        ))}
      </div>
      {note ? <p className="op-body-sm mt-1.5 text-center">{note}</p> : null}
      <p className="mt-1.5 rounded-lg border border-[#0284c7]/30 bg-[#0284c7] px-2 py-1.5 text-center font-[family-name:var(--font-display)] text-[8.5pt] font-bold leading-snug text-white">
        {thesis}
      </p>
    </div>
  );
}

function DexlaVisual({ section }: { section: OnePagerSection }) {
  const raw = splitBodyLines(section.body);
  const { heads, rest } = pickSubheads(raw);
  const utility =
    rest.find(
      (l) =>
        /Publish/i.test(l) &&
        /Feature/i.test(l) &&
        !l.includes("→") &&
        !/Platform Activity/i.test(l),
    ) ?? "Publish · Feature · Discount · Tip · Access";
  const utilities = utility.split(/\s*·\s*/).map((s) => s.trim()).filter(Boolean);
  const flywheel = rest.find((l) => /Platform Activity/i.test(l));
  const burnLines = rest.filter(
    (l) => (/Burn|Buyback/i.test(l) && l.includes("→")) || /→.*Burn/i.test(l),
  );

  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="rounded-lg border border-[#0284c7]/15 bg-[#0284c7]/[0.04] p-2">
        <p className="font-[family-name:var(--font-display)] text-[7.5pt] font-bold uppercase tracking-[0.12em] text-[#0284c7]">
          {heads.find((h) => /UTILIT/i.test(h)) ?? "Utility"}
        </p>
        <div className="mt-1.5 flex flex-wrap gap-1">
          {utilities.map((u) => (
            <span key={u} className="op-chip">
              {u}
            </span>
          ))}
        </div>
      </div>
      <div className="rounded-lg border border-[#0284c7]/15 bg-white p-2">
        <p className="font-[family-name:var(--font-display)] text-[7.5pt] font-bold uppercase tracking-[0.12em] text-[#0284c7]">
          Value Capture
        </p>
        <p className="mt-1 font-[family-name:var(--font-display)] text-[9pt] font-bold text-[#0f172a]">
          Burns + Buybacks
        </p>
        <ul className="mt-1 space-y-0.5">
          {burnLines.map((l) => (
            <li
              key={l}
              className="flex items-start gap-1 text-[6.9pt] leading-snug text-[#475569]"
            >
              <span className="mt-[0.2rem] h-1 w-1 shrink-0 rounded-full bg-[#0284c7]" />
              {l}
            </li>
          ))}
        </ul>
      </div>
      {flywheel ? (
        <p className="col-span-2 rounded-md bg-[#0284c7]/10 px-2 py-1 text-center font-[family-name:var(--font-display)] text-[7.5pt] font-bold uppercase tracking-[0.04em] text-[#0284c7]">
          {flywheel}
        </p>
      ) : null}
    </div>
  );
}

export function InvestorOnePager() {
  const content = loadInvestorOnePagerContent();
  const problem = sectionByTitle(content, "THE PROBLEM");
  const solution = sectionByTitle(content, "THE SOLUTION");
  const grow = sectionByTitle(content, "HOW WE GROW");
  const business = sectionByTitle(content, "BUSINESS MODEL");
  const path = sectionByTitle(content, "PATH TO SCALE");
  const wins = sectionByTitle(content, "WHY INDEXLA WINS");
  const dexla = sectionByTitle(content, "$DEXLA — THE ECONOMIC BACKBONE");
  const market = sectionByTitle(content, "MARKET OPPORTUNITY");
  const raise = sectionByTitle(content, "FUNDRAISING & MILESTONES");

  const coverTagline =
    content.coverLines.find((l) => /Simple Way|Invest/i.test(l)) ?? "";
  const coverTag =
    content.coverLines.find((l) => /Discover\. Build/i.test(l)) ?? "";
  const coverAttrs =
    content.coverLines.find((l) => /Multi-Chain|Cross-Chain/i.test(l)) ?? "";
  const coverStatus =
    content.coverLines.find((l) => /PRE-SEED|MVP/i.test(l)) ?? "";

  const problemBody = pickSubheads(splitBodyLines(problem?.body ?? ""));
  const solutionParsed = pickSubheads(splitBodyLines(solution?.body ?? ""));
  const bizParsed = pickSubheads(splitBodyLines(business?.body ?? ""));
  const feeHead = bizParsed.heads[0] ?? "1% EXECUTION FEE";
  const feeNumber = feeHead.match(/[\d.]+%/)?.[0] ?? "1%";

  return (
    <div className="op-root" id="investor-one-pager-root">
      <div className="op-viewport">
        <article className="op-page" data-one-pager="true">
          <div className="op-inner">
            {/* Header */}
            <header className="op-card flex items-center justify-between gap-3 px-2.5 py-2">
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <Image
                  src={LOGO}
                  alt="INDEXLA"
                  width={LOGO_W}
                  height={LOGO_H}
                  className="h-[56px] w-auto object-contain object-left"
                  priority
                  unoptimized
                />
                <div className="min-w-0 border-l border-[#0284c7]/20 pl-3">
                  <p className="font-[family-name:var(--font-display)] text-[13pt] font-bold leading-tight tracking-[-0.03em] text-[#0284c7]">
                    {coverTagline}
                  </p>
                  <p className="mt-0.5 font-[family-name:var(--font-display)] text-[10.5pt] font-semibold tracking-[-0.02em] text-[#0f172a]">
                    {coverTag}
                  </p>
                  <p className="mt-0.5 text-[7.2pt] font-medium tracking-[0.04em] text-[#64748b]">
                    {coverAttrs}
                  </p>
                </div>
              </div>
              <div className="shrink-0 rounded-lg border border-[#0284c7]/20 bg-[#0284c7]/[0.06] px-2.5 py-2 text-right">
                <p className="font-[family-name:var(--font-display)] text-[7.5pt] font-bold uppercase tracking-[0.14em] text-[#0284c7]">
                  Investor One-Pager
                </p>
                <p className="mt-1 text-[8pt] font-bold uppercase tracking-[0.06em] text-[#0f172a]">
                  {coverStatus}
                </p>
              </div>
            </header>

            {/* Row 1 */}
            <div className="grid grid-cols-12 gap-2">
              <Card title="THE PROBLEM" className="col-span-3">
                {problemBody.rest.map((l) => (
                  <p key={l} className="op-body mt-1 first:mt-0">
                    {l}
                  </p>
                ))}
                {problemBody.heads[0] ? (
                  <p className="mt-2 rounded-md bg-[#0284c7]/10 px-2 py-1.5 font-[family-name:var(--font-display)] text-[8.5pt] font-bold leading-snug text-[#0284c7]">
                    {problemBody.heads[0]}
                  </p>
                ) : null}
              </Card>

              <Card title="THE SOLUTION" className="col-span-6" accent>
                {solutionParsed.heads[0] ? (
                  <p className="mb-1 font-[family-name:var(--font-display)] text-[9.5pt] font-bold uppercase tracking-[0.04em] text-[#0284c7]">
                    {solutionParsed.heads[0]}
                  </p>
                ) : null}
                <ProductFlow body={solution?.body ?? ""} />
              </Card>

              <Card title="HOW WE GROW" className="col-span-3">
                {grow ? <GrowthLoop body={grow.body} /> : null}
              </Card>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-12 gap-2">
              <Card title="BUSINESS MODEL" className="col-span-3" accent>
                <div className="flex items-end gap-2">
                  <p className="op-metric text-[30pt]">{feeNumber}</p>
                  <p className="mb-1.5 font-[family-name:var(--font-display)] text-[8.5pt] font-bold uppercase tracking-[0.08em] text-[#0f172a]">
                    Execution Fee
                  </p>
                </div>
                {bizParsed.rest.map((l) => (
                  <p
                    key={l}
                    className={`mt-1 ${
                      /Gross Fees|0%/i.test(l)
                        ? "font-[family-name:var(--font-display)] text-[8.2pt] font-bold text-[#0f172a]"
                        : "op-body-sm"
                    }`}
                  >
                    {l}
                  </p>
                ))}
              </Card>

              <Card title="PATH TO SCALE" className="col-span-5">
                {path ? <PathTimeline body={path.body} /> : null}
              </Card>

              <Card title="WHY INDEXLA WINS" className="col-span-4">
                {wins ? <MoatVisual body={wins.body} /> : null}
              </Card>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-12 gap-2">
              <Card
                title="$DEXLA — THE ECONOMIC BACKBONE"
                className="col-span-5"
              >
                {dexla ? <DexlaVisual section={dexla} /> : null}
              </Card>

              <Card title="MARKET OPPORTUNITY" className="col-span-3">
                {market ? <MarketCards body={market.body} /> : null}
              </Card>

              <Card title="FUNDRAISING & MILESTONES" className="col-span-4">
                {raise ? <FundraisingRoadmap body={raise.body} /> : null}
              </Card>
            </div>

            {/* Closing */}
            <footer className="mt-auto flex items-center justify-between gap-3 rounded-xl bg-[#0284c7] px-3 py-2">
              <p className="font-[family-name:var(--font-display)] text-[10.5pt] font-bold uppercase tracking-[0.08em] text-white">
                {content.closingLine}
              </p>
              <div className="shrink-0 rounded-md bg-white px-2 py-1">
                <Image
                  src={LOGO}
                  alt={content.closingBrand}
                  width={LOGO_W}
                  height={LOGO_H}
                  className="h-[30px] w-auto object-contain"
                  unoptimized
                />
              </div>
            </footer>
          </div>
        </article>
      </div>
    </div>
  );
}
