"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import {
  tkBody,
  tkBodyStrong,
  tkH2,
  tkSection,
  tkStat,
} from "@/components/tokenomics/tokenomicsRhythm";

const allocations = [
  { label: "Pre-Seed Round", short: "Pre-Seed", pct: 1.5, color: "#7c3aed" },
  { label: "Seed Round", short: "Seed", pct: 6, color: "#8b5cf6" },
  { label: "Private Sale", short: "Private", pct: 10, color: "#a78bfa" },
  { label: "Public Sale", short: "Public", pct: 20, color: "#38bdf8" },
  { label: "DEX Liquidity", short: "DEX", pct: 10, color: "#22d3ee" },
  { label: "Treasury", short: "Treasury", pct: 20, color: "#34d399" },
  { label: "Team", short: "Team", pct: 15, color: "#fbbf24" },
  { label: "Community Airdrops", short: "Community", pct: 10, color: "#fb923c" },
  { label: "CEX Listings & Market Making", short: "CEX / MM", pct: 5, color: "#f87171" },
  { label: "Advisors", short: "Advisors", pct: 2.5, color: "#e879f9" },
] as const;

const conic = (() => {
  let start = 0;
  return allocations
    .map((row) => {
      const end = start + row.pct * 3.6;
      const segment = `${row.color} ${start}deg ${end}deg`;
      start = end;
      return segment;
    })
    .join(", ");
})();

export function TokenDistributionSection() {
  return (
    <section className={`${tkSection} bg-deep`}>
      <div className="section-pad container-max mx-auto max-w-6xl">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={`${tkH2} uppercase`}>
            Token{" "}
            <span className="gradient-text">Distribution</span>
          </h2>
          <p className={`mt-5 ${tkStat} gradient-text`}>100,000,000</p>
          <p className="mt-2 text-[0.85rem] font-semibold uppercase tracking-[0.16em] text-muted">
            $DEXLA maximum supply
          </p>
        </FadeIn>

        {/* Protocol-style stacked allocation bar */}
        <FadeIn className="mt-10">
          <div className="overflow-hidden border border-white/[0.1] bg-void/50">
            <div className="flex h-14 w-full sm:h-16">
              {allocations.map((row) => (
                <div
                  key={`bar-${row.label}`}
                  className="relative h-full min-w-[2px] transition-[filter] hover:brightness-110"
                  style={{
                    width: `${row.pct}%`,
                    background: row.color,
                  }}
                  title={`${row.label}: ${row.pct}%`}
                >
                  {row.pct >= 10 && (
                    <span className="absolute inset-x-0 bottom-1 text-center text-[0.62rem] font-semibold uppercase tracking-wide text-void/90 sm:text-[0.7rem]">
                      {row.pct}%
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-2 border-t border-white/[0.08] px-4 py-3 sm:px-5">
              {allocations.map((row) => (
                <div key={`leg-${row.label}`} className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 shrink-0"
                    style={{ background: row.color }}
                    aria-hidden
                  />
                  <span className="text-[0.78rem] text-muted">
                    {row.short}{" "}
                    <span className="font-semibold tabular-nums text-ink">
                      {row.pct}%
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn className="mt-6">
          <div className="grid gap-0 border border-white/[0.08] lg:grid-cols-[0.85fr_1.15fr]">
            <div className="flex flex-col items-center justify-center border-b border-white/[0.07] bg-void/40 p-6 sm:p-8 lg:border-b-0 lg:border-r">
              <div className="relative h-48 w-48 sm:h-56 sm:w-56">
                <div
                  className="absolute inset-0"
                  style={{
                    background: `conic-gradient(${conic})`,
                    clipPath: "circle(50% at 50% 50%)",
                  }}
                  aria-hidden
                />
                <div className="absolute inset-[24%] flex flex-col items-center justify-center border border-white/[0.1] bg-void text-center">
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-muted-dim">
                    Hard Cap
                  </p>
                  <p className="mt-1 display text-[1.45rem] text-ink">100M</p>
                  <p className="text-[0.75rem] text-muted">$DEXLA</p>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-5">
              <div className="mb-2 hidden grid-cols-[1fr_auto] gap-3 px-2 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-muted-dim sm:grid">
                <span>Allocation</span>
                <span>%</span>
              </div>
              <ul>
                {allocations.map((row) => (
                  <li
                    key={row.label}
                    className="grid grid-cols-[auto_1fr_auto] items-center gap-3 border-b border-white/[0.06] px-2 py-2.5 last:border-0"
                  >
                    <span
                      className="h-2 w-2"
                      style={{ background: row.color }}
                      aria-hidden
                    />
                    <span className="text-[0.92rem] font-medium text-ink">
                      {row.label}
                    </span>
                    <span className="display text-[1.05rem] tabular-nums text-electric">
                      {row.pct}%
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-1 flex items-center justify-between border-t border-white/[0.1] px-2 pt-3">
                <span className="text-[0.92rem] font-semibold text-ink">Total</span>
                <span className="display text-[1.15rem] text-ink">100%</span>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn className="mx-auto mt-8 max-w-2xl text-center">
          <p className={`${tkBodyStrong} text-balance`}>
            100,000,000 $DEXLA is the absolute maximum supply.
          </p>
          <p className={`mt-3 ${tkBody} text-balance`}>
            There is no additional minting, inflation, or supply expansion beyond
            this cap.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
