import { FadeIn } from "@/components/ui/FadeIn";
import {
  tkBody,
  tkBodyStrong,
  tkH2,
  tkSection,
  tkStat,
} from "@/components/tokenomics/tokenomicsRhythm";

const allocations = [
  { label: "Pre-Seed", pct: 2.5, tokens: "2.5M", color: "#7c3aed" },
  { label: "Seed", pct: 6, tokens: "6M", color: "#8b5cf6" },
  { label: "Private", pct: 14, tokens: "14M", color: "#a78bfa" },
  { label: "Public", pct: 20, tokens: "20M", color: "#38bdf8" },
  { label: "Community & Airdrops", pct: 15, tokens: "15M", color: "#fb923c" },
  { label: "Team", pct: 15, tokens: "15M", color: "#fbbf24" },
  { label: "Treasury (36-month lock)", pct: 10, tokens: "10M", color: "#34d399" },
  { label: "DEX Liquidity", pct: 10, tokens: "10M", color: "#22d3ee" },
  { label: "CEX Listings", pct: 5, tokens: "5M", color: "#f87171" },
  { label: "Advisors", pct: 2.5, tokens: "2.5M", color: "#e879f9" },
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

        <FadeIn className="mt-10">
          <div className="grid items-center gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-10">
            <div className="flex justify-center">
              <div className="relative h-44 w-44 sm:h-52 sm:w-52">
                <div
                  className="absolute inset-0"
                  style={{
                    background: `conic-gradient(${conic})`,
                    clipPath: "circle(50% at 50% 50%)",
                  }}
                  aria-hidden
                />
                <div className="absolute inset-[28%] flex flex-col items-center justify-center rounded-full bg-void text-center ring-1 ring-white/[0.08]">
                  <p className="display text-[1.35rem] text-ink sm:text-[1.5rem]">
                    100M
                  </p>
                  <p className="text-[0.7rem] text-muted">$DEXLA</p>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-white/[0.1] bg-void/45">
              <div className="hidden grid-cols-[1fr_5.5rem_7.5rem] gap-3 border-b border-white/[0.08] bg-deep/60 px-5 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-muted-dim sm:grid sm:px-6">
                <span>Allocation</span>
                <span className="text-right">Share</span>
                <span className="text-right">$DEXLA</span>
              </div>
              <ul>
                {allocations.map((row) => (
                  <li
                    key={row.label}
                    className="grid grid-cols-[auto_1fr] items-center gap-x-3 gap-y-1 border-b border-white/[0.05] px-5 py-3.5 last:border-0 sm:grid-cols-[auto_1fr_5.5rem_7.5rem] sm:px-6 sm:py-3.5"
                  >
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-sm"
                      style={{ background: row.color }}
                      aria-hidden
                    />
                    <span className="text-[0.95rem] font-medium text-ink">
                      {row.label}
                    </span>
                    <div className="col-span-2 flex items-baseline justify-between gap-4 pl-5 sm:col-span-1 sm:contents sm:pl-0">
                      <span className="display text-[1.12rem] tabular-nums text-electric sm:w-auto sm:text-right">
                        {row.pct}%
                      </span>
                      <span className="display text-[1.05rem] tabular-nums text-ink sm:text-right">
                        {row.tokens}{" "}
                        <span className="text-[0.72rem] font-medium text-muted-dim">
                          $DEXLA
                        </span>
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between border-t border-white/[0.1] bg-deep/50 px-5 py-3.5 sm:px-6">
                <span className="text-[0.95rem] font-semibold text-ink">
                  Total
                </span>
                <div className="flex items-baseline gap-6 sm:gap-10">
                  <span className="display text-[1.12rem] text-ink">100%</span>
                  <span className="display text-[1.12rem] text-ink">
                    100M{" "}
                    <span className="text-[0.72rem] font-medium text-muted-dim">
                      $DEXLA
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn className="mx-auto mt-10 max-w-3xl">
          <div className="rounded-xl border border-electric/25 bg-electric/[0.05] px-5 py-6 text-center sm:px-7 sm:py-7">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-electric">
              Treasury Funding
            </p>
            <p className={`mt-4 ${tkBody} text-pretty`}>
              The Treasury receives 20% of the total $DEXLA supply, plus 15% of
              Private Round proceeds and 10% of Public Round proceeds allocated
              to Treasury to support long-term protocol sustainability and
              strategic growth.
            </p>
            <p className={`mt-3 ${tkBodyStrong} text-pretty`}>
              These Treasury allocations are funded from protocol fundraising
              proceeds, not user assets.
            </p>
          </div>
        </FadeIn>

        <FadeIn className="mx-auto mt-8 max-w-2xl text-center">
          <p className={`${tkBody} text-balance`}>
            There is no additional minting, inflation, or supply expansion beyond
            this cap.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
