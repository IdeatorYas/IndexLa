"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { renderBold } from "@/components/stable-club/StableShared";
import { scBody, scH2, scSectionAlt } from "@/components/stable-club/stableRhythm";
import type { StableSection } from "@/lib/stable-club";

const CRITERIA = [
  { label: "Net yield after costs", score: 82, tone: "blue" as const },
  { label: "Liquidity depth & volume", score: 76, tone: "teal" as const },
  { label: "Protocol & stablecoin risk", score: 68, tone: "blue" as const },
  { label: "Fee consistency & incentives", score: 71, tone: "green" as const },
  { label: "Range efficiency & conditions", score: 64, tone: "teal" as const },
];

const TONE_BAR = {
  blue: "bg-[var(--sc-blue)]",
  teal: "bg-[var(--sc-teal)]",
  green: "bg-[var(--sc-green)]",
};

function PoolAnalysisVisual({ items }: { items: string[] }) {
  return (
    <div className="sc-card-elevated p-5 sm:p-6 lg:p-7">
      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[var(--sc-muted)]">
        Pool analysis framework
      </p>
      <p className="mt-1 text-[0.82rem] text-[var(--sc-muted-dim)]">
        Illustrative scoring — not live protocol data
      </p>

      <ul className="mt-6 space-y-4">
        {items.map((item, i) => {
          const criterion = CRITERIA[i] ?? CRITERIA[0];
          return (
            <li key={item}>
              <div className="mb-1.5 flex items-center justify-between gap-3">
                <span className="text-[0.92rem] font-semibold text-[var(--sc-navy)]">
                  {item}
                </span>
                <span className="text-[0.78rem] font-medium tabular-nums text-[var(--sc-muted)]">
                  Score
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-[var(--sc-bg-alt)]">
                <div
                  className={`h-full rounded-full ${TONE_BAR[criterion.tone]}`}
                  style={{ width: `${criterion.score}%`, opacity: 0.85 }}
                />
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-6 grid grid-cols-3 gap-2 border-t border-[var(--sc-line)] pt-5">
        {["Protocol", "Chain", "Pool"].map((field) => (
          <div
            key={field}
            className="rounded-lg border border-dashed border-[var(--sc-line)] bg-[var(--sc-bg-alt)] px-2 py-2.5 text-center"
          >
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-[var(--sc-muted-dim)]">
              {field}
            </p>
            <p className="mt-1 text-[0.78rem] font-medium text-[var(--sc-muted)]">
              Disclosed before entry
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function StablePoolSelectionSection({ section }: { section: StableSection }) {
  const ul = section.blocks.find((b) => b.type === "ul");
  const paragraphs = section.blocks.filter((b) => b.type === "p");
  const intro = paragraphs[0];
  const closing = paragraphs[1];

  return (
    <section className={scSectionAlt}>
      <div className="section-pad container-max">
        <FadeIn className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12">
          <div>
            <h2 className={scH2}>{section.title}</h2>
            {intro ? (
              <p className={`mt-4 ${scBody}`}>{renderBold(intro.text)}</p>
            ) : null}
            {ul ? (
              <ul className="mt-5 space-y-2.5">
                {ul.items.map((item) => (
                  <li key={item} className={`flex items-start gap-2.5 ${scBody}`}>
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--sc-blue)]"
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : null}
            {closing ? (
              <p className={`mt-6 ${scBody}`}>{renderBold(closing.text)}</p>
            ) : null}
          </div>

          {ul ? <PoolAnalysisVisual items={ul.items} /> : null}
        </FadeIn>
      </div>
    </section>
  );
}
