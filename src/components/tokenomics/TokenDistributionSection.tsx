"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import {
  tkBody,
  tkBodyStrong,
  tkH2,
  tkSection,
  tkStat,
  tkSurface,
} from "@/components/tokenomics/tokenomicsRhythm";

const allocations = [
  { label: "Pre-Seed Round", pct: 1.5, color: "#7c3aed" },
  { label: "Seed Round", pct: 6, color: "#8b5cf6" },
  { label: "Private Sale", pct: 10, color: "#a78bfa" },
  { label: "Public Sale", pct: 20, color: "#38bdf8" },
  { label: "DEX Liquidity", pct: 10, color: "#22d3ee" },
  { label: "Treasury", pct: 20, color: "#34d399" },
  { label: "Team", pct: 15, color: "#fbbf24" },
  { label: "Community Airdrops", pct: 10, color: "#fb923c" },
  { label: "CEX Listings & Market Making", pct: 5, color: "#f87171" },
  { label: "Advisors", pct: 2.5, color: "#e879f9" },
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
      <div className="section-pad container-max">
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

        <FadeIn className="mt-10">
          <div className={`${tkSurface} grid gap-0 lg:grid-cols-[0.9fr_1.1fr]`}>
            <div className="flex flex-col items-center justify-center border-b border-white/[0.07] p-6 sm:p-8 lg:border-b-0 lg:border-r">
              <div className="relative h-52 w-52 sm:h-60 sm:w-60">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{ background: `conic-gradient(${conic})` }}
                  aria-hidden
                />
                <div className="absolute inset-[22%] flex flex-col items-center justify-center rounded-full border border-white/[0.08] bg-void text-center">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-muted-dim">
                    Total
                  </p>
                  <p className="mt-1 display text-[1.35rem] text-ink">100M</p>
                  <p className="text-[0.75rem] text-muted">$DEXLA</p>
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-6">
              <div className="mb-3 hidden grid-cols-[1fr_auto] gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted-dim sm:grid">
                <span>Allocation</span>
                <span>Percentage</span>
              </div>
              <ul className="space-y-1.5">
                {allocations.map((row) => (
                  <li
                    key={row.label}
                    className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-xl border border-white/[0.06] bg-void/35 px-3 py-2.5"
                  >
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: row.color }}
                      aria-hidden
                    />
                    <span className="text-[0.9rem] font-medium text-ink">
                      {row.label}
                    </span>
                    <span className="display text-[1.05rem] tabular-nums text-electric">
                      {row.pct}%
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex items-center justify-between border-t border-white/[0.07] pt-3">
                <span className="text-[0.9rem] font-semibold text-ink">Total</span>
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
