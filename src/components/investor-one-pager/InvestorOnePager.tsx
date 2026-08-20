import type { ReactNode } from "react";
import Image from "next/image";
import "@/components/investor-one-pager/one-pager.css";
import {
  loadInvestorOnePagerContent,
  sectionByTitle,
  splitBodyLines,
  type OnePagerSection,
} from "@/lib/investorOnePagerContent";
import { LOGO_TRANSPARENT } from "@/lib/site";

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

function SectionCard({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`min-w-0 ${className}`}>
      <h2 className="op-section-title">{title}</h2>
      {children}
    </section>
  );
}

function ProductPillars({ body }: { body: string }) {
  const pillars = splitBodyLines(body)
    .map(stripMd)
    .filter((l) => /^(DISCOVER|BUILD|AUTOMATE|OWN)\b/i.test(l))
    .map((l) => {
      const m = l.match(/^(DISCOVER|BUILD|AUTOMATE|OWN)\s*[—–]\s*(.+)$/i);
      if (m) return { label: m[1].toUpperCase(), detail: m[2].trim() };
      const idx = l.search(/\s+[—–]\s+/);
      if (idx > 0) {
        return {
          label: l.slice(0, idx).trim(),
          detail: l.slice(idx).replace(/^\s+[—–]\s+/, "").trim(),
        };
      }
      return { label: l, detail: "" };
    });

  return (
    <div className="mt-1.5 grid grid-cols-4 gap-1.5">
      {pillars.map((p) => (
        <div key={p.label} className="border-t-2 border-[#0284c7] pt-1">
          <p className="font-[family-name:var(--font-display)] text-[8.5pt] font-bold uppercase tracking-[0.06em] text-[#0284c7]">
            {p.label}
          </p>
          <p className="op-body-sm mt-0.5 text-[#111]">{p.detail}</p>
        </div>
      ))}
    </div>
  );
}

function PathRows({ body }: { body: string }) {
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
      <div className="space-y-1">
        {stages.map((s) => (
          <div
            key={s.name}
            className="flex gap-2 border-l-2 border-[#0284c7]/30 pl-2"
          >
            <p className="w-[4.6rem] shrink-0 font-[family-name:var(--font-display)] text-[8pt] font-bold uppercase tracking-[0.04em] text-[#0284c7]">
              {s.name}
            </p>
            <p className="op-body-sm flex-1">{s.detail}</p>
          </div>
        ))}
      </div>
      {heads[0] ? (
        <p className="mt-1.5 font-[family-name:var(--font-display)] text-[8.5pt] font-bold uppercase tracking-[0.04em] text-[#0284c7]">
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

function FundraisingStages({ body }: { body: string }) {
  const raw = splitBodyLines(body).filter((l) => stripMd(l) !== "↓");
  const { heads, rest } = pickSubheads(raw);

  const blocks: string[][] = [];
  let block: string[] = [];
  for (const line of rest) {
    if (/^(PRE-SEED|SEED|PRIVATE|PUBLIC)/i.test(line)) {
      if (block.length) blocks.push(block);
      block = [line];
    } else {
      block.push(line);
    }
  }
  if (block.length) blocks.push(block);

  const stages = blocks.map((b) => {
    const [roundLine, ...others] = b;
    const { round, amount } = splitRoundAmount(roundLine ?? "");
    const raisedLine = others.find((o) => /Raised|Remaining/i.test(o)) ?? "";
    const milestoneLine =
      others.find((o) => o !== raisedLine) ?? others[0] ?? "";
    return {
      round,
      amount,
      meta: raisedLine,
      milestone: milestoneLine,
    };
  });

  return (
    <div>
      <div className="grid grid-cols-4 gap-1.5">
        {stages.map((s, idx) => (
          <div
            key={s.round}
            className="relative border border-[#0284c7]/25 bg-white px-1.5 py-1.5"
          >
            {idx < stages.length - 1 ? (
              <span
                className="absolute -right-1.5 top-1/2 z-10 -translate-y-1/2 text-[8pt] font-bold text-[#0284c7]"
                aria-hidden
              >
                →
              </span>
            ) : null}
            <p className="font-[family-name:var(--font-display)] text-[7.5pt] font-bold uppercase tracking-[0.08em] text-[#0284c7]">
              {s.round}
            </p>
            <p className="mt-0.5 font-[family-name:var(--font-display)] text-[9pt] font-bold leading-tight text-[#111]">
              {s.amount}
            </p>
            {s.meta ? (
              <p className="mt-0.5 text-[7.8pt] font-bold leading-snug text-[#0284c7]">
                {s.meta}
              </p>
            ) : null}
            <p className="mt-0.5 text-[7.2pt] leading-snug text-[#5b5b5b]">
              {s.milestone}
            </p>
          </div>
        ))}
      </div>
      {heads[0] ? (
        <p className="mt-1.5 text-center font-[family-name:var(--font-display)] text-[11pt] font-bold tracking-[-0.02em] text-[#0284c7]">
          {heads[0]}
        </p>
      ) : null}
    </div>
  );
}

function MarketMetrics({ body }: { body: string }) {
  const raw = splitBodyLines(body);
  const { heads, rest } = pickSubheads(raw);
  const metrics = rest.filter((l) => /^\$/.test(l));

  return (
    <div>
      <div className="grid grid-cols-3 gap-2">
        {metrics.map((m) => {
          const [num, ...labelParts] = m.split(/\s+/);
          return (
            <div key={m} className="text-center">
              <p className="op-metric text-[15pt]">{num}</p>
              <p className="mt-0.5 text-[7pt] font-medium leading-snug text-[#5b5b5b]">
                {labelParts.join(" ")}
              </p>
            </div>
          );
        })}
      </div>
      {heads[0] ? (
        <p className="mt-1.5 text-center font-[family-name:var(--font-display)] text-[7.5pt] font-bold uppercase tracking-[0.04em] text-[#0284c7]">
          {heads[0]}
        </p>
      ) : null}
    </div>
  );
}

function DexlaBlock({ section }: { section: OnePagerSection }) {
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

  const flywheel = rest.find((l) => /Platform Activity/i.test(l));
  const burnLines = rest.filter(
    (l) => (/Burn|Buyback/i.test(l) && l.includes("→")) || /→.*Burn/i.test(l),
  );

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="border-l-2 border-[#0284c7] pl-2">
        <p className="font-[family-name:var(--font-display)] text-[8pt] font-bold uppercase tracking-[0.1em] text-[#0284c7]">
          {heads.find((h) => /UTILIT/i.test(h)) ?? "Utility"}
        </p>
        <p className="mt-1 font-[family-name:var(--font-display)] text-[9pt] font-semibold leading-snug text-[#111]">
          {utility}
        </p>
      </div>
      <div className="border-l-2 border-[#0284c7] pl-2">
        <p className="font-[family-name:var(--font-display)] text-[8pt] font-bold uppercase tracking-[0.1em] text-[#0284c7]">
          Value Capture
        </p>
        <p className="mt-1 font-[family-name:var(--font-display)] text-[9pt] font-bold text-[#111]">
          Burns + Buybacks
        </p>
        <ul className="mt-1 space-y-0.5">
          {burnLines.map((l) => (
            <li key={l} className="text-[7.2pt] leading-snug text-[#5b5b5b]">
              {l}
            </li>
          ))}
        </ul>
      </div>
      {flywheel ? (
        <p className="col-span-2 text-center font-[family-name:var(--font-display)] text-[8pt] font-bold uppercase tracking-[0.03em] text-[#0284c7]">
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
    content.coverLines.find((l) => /Simple Way|Invest/i.test(l)) ??
    content.coverLines[0] ??
    "";
  const coverTag =
    content.coverLines.find((l) => /Discover\. Build/i.test(l)) ?? "";
  const coverAttrs =
    content.coverLines.find((l) => /Multi-Chain|Cross-Chain/i.test(l)) ?? "";
  const coverStatus =
    content.coverLines.find((l) => /PRE-SEED|MVP/i.test(l)) ?? "";

  const problemBody = pickSubheads(splitBodyLines(problem?.body ?? ""));
  const solutionParsed = pickSubheads(splitBodyLines(solution?.body ?? ""));
  const growParsed = pickSubheads(splitBodyLines(grow?.body ?? ""));
  const bizParsed = pickSubheads(splitBodyLines(business?.body ?? ""));
  const winsParsed = pickSubheads(splitBodyLines(wins?.body ?? ""));

  const thesisLine =
    winsParsed.heads.find((h) => /No single platform/i.test(h)) ??
    winsParsed.rest.find((h) => /No single platform/i.test(h)) ??
    "No single platform combines all five. INDEXLA does.";

  const feeHead = bizParsed.heads[0] ?? "1% EXECUTION FEE";
  const feeNumber = feeHead.match(/[\d.]+%/)?.[0] ?? "1%";

  return (
    <div className="op-root" id="investor-one-pager-root">
      <div className="op-viewport">
        <article className="op-page" data-one-pager="true">
          <div className="op-inner">
            <header className="flex items-start justify-between gap-4">
              <div className="flex min-w-0 flex-1 items-start gap-3">
                <Image
                  src={LOGO_TRANSPARENT}
                  alt="INDEXLA"
                  width={240}
                  height={70}
                  className="h-[44px] w-auto object-contain"
                  priority
                />
                <div className="min-w-0 pt-0.5">
                  <p className="font-[family-name:var(--font-display)] text-[13pt] font-bold tracking-[-0.02em] text-[#0284c7]">
                    {coverTagline}
                  </p>
                  <p className="mt-0.5 font-[family-name:var(--font-display)] text-[11pt] font-semibold tracking-[-0.02em] text-[#111]">
                    {coverTag}
                  </p>
                  <p className="mt-0.5 text-[7.5pt] font-medium tracking-[0.04em] text-[#5b5b5b]">
                    {coverAttrs}
                  </p>
                </div>
              </div>
              <div className="shrink-0 text-right">
                <p className="font-[family-name:var(--font-display)] text-[8pt] font-bold uppercase tracking-[0.14em] text-[#0284c7]">
                  Investor One-Pager
                </p>
                <p className="mt-1 text-[8pt] font-semibold uppercase tracking-[0.08em] text-[#5b5b5b]">
                  {coverStatus}
                </p>
              </div>
            </header>

            <div className="op-rule mt-2 mb-2" />

            <div className="grid min-h-0 flex-1 grid-cols-12 content-start gap-x-3 gap-y-2.5">
              <SectionCard title="THE PROBLEM" className="col-span-4">
                {problemBody.rest.map((l) => (
                  <p key={l} className="op-body mt-1 first:mt-0">
                    {l}
                  </p>
                ))}
                {problemBody.heads[0] ? (
                  <p className="mt-1.5 font-[family-name:var(--font-display)] text-[9pt] font-bold text-[#0284c7]">
                    {problemBody.heads[0]}
                  </p>
                ) : null}
              </SectionCard>

              <SectionCard title="THE SOLUTION" className="col-span-5">
                {solutionParsed.heads[0] ? (
                  <p className="op-subhead text-[#0284c7]">
                    {solutionParsed.heads[0]}
                  </p>
                ) : null}
                <ProductPillars body={solution?.body ?? ""} />
              </SectionCard>

              <SectionCard title="HOW WE GROW" className="col-span-3">
                {growParsed.heads[0] ? (
                  <p className="op-subhead !text-[8.5pt]">{growParsed.heads[0]}</p>
                ) : null}
                {growParsed.rest.map((l) => (
                  <p
                    key={l}
                    className={`mt-1 ${
                      /50%|More Creators/i.test(l)
                        ? "font-[family-name:var(--font-display)] text-[8.5pt] font-bold text-[#0284c7]"
                        : "op-body-sm"
                    }`}
                  >
                    {l}
                  </p>
                ))}
              </SectionCard>

              <SectionCard title="BUSINESS MODEL" className="col-span-3">
                <p className="op-metric text-[22pt]">{feeNumber}</p>
                <p className="font-[family-name:var(--font-display)] text-[8pt] font-bold uppercase tracking-[0.08em] text-[#111]">
                  Execution Fee
                </p>
                {bizParsed.rest.map((l) => (
                  <p
                    key={l}
                    className={`mt-1 ${
                      /Gross Fees|0%/i.test(l)
                        ? "font-[family-name:var(--font-display)] text-[8.5pt] font-semibold text-[#111]"
                        : "op-body-sm text-[#5b5b5b]"
                    }`}
                  >
                    {l}
                  </p>
                ))}
              </SectionCard>

              <SectionCard title="PATH TO SCALE" className="col-span-5">
                {path ? <PathRows body={path.body} /> : null}
              </SectionCard>

              <SectionCard title="WHY INDEXLA WINS" className="col-span-4">
                {winsParsed.heads
                  .filter((h) => !/No single platform/i.test(h))
                  .map((h) => (
                    <p key={h} className="op-subhead !text-[8.5pt]">
                      {h}
                    </p>
                  ))}
                {winsParsed.rest
                  .filter((l) => !/No single platform/i.test(l))
                  .map((l) => (
                    <p
                      key={l}
                      className={`mt-1 ${
                        /×/.test(l)
                          ? "font-[family-name:var(--font-display)] text-[8pt] font-semibold leading-snug text-[#111]"
                          : "op-body-sm"
                      }`}
                    >
                      {l}
                    </p>
                  ))}
                <p className="mt-1.5 border border-[#0284c7]/30 bg-[#0284c7]/[0.06] px-2 py-1.5 font-[family-name:var(--font-display)] text-[9pt] font-bold leading-snug text-[#0284c7]">
                  {thesisLine}
                </p>
              </SectionCard>

              <SectionCard
                title="$DEXLA — THE ECONOMIC BACKBONE"
                className="col-span-5"
              >
                {dexla ? <DexlaBlock section={dexla} /> : null}
              </SectionCard>

              <SectionCard title="MARKET OPPORTUNITY" className="col-span-3">
                {market ? <MarketMetrics body={market.body} /> : null}
              </SectionCard>

              <SectionCard
                title="FUNDRAISING & MILESTONES"
                className="col-span-4"
              >
                {raise ? <FundraisingStages body={raise.body} /> : null}
              </SectionCard>
            </div>

            <div className="op-rule mt-auto mb-1.5 pt-2" />

            <footer className="flex items-center justify-between gap-4">
              <p className="font-[family-name:var(--font-display)] text-[11.5pt] font-bold uppercase tracking-[0.06em] text-[#0284c7]">
                {content.closingLine}
              </p>
              <Image
                src={LOGO_TRANSPARENT}
                alt={content.closingBrand}
                width={160}
                height={48}
                className="h-[28px] w-auto object-contain"
              />
            </footer>
          </div>
        </article>
      </div>
    </div>
  );
}
