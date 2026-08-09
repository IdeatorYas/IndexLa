"use client";

import { FadeIn } from "@/components/ui/FadeIn";

const rows = [
  {
    portfolio: "Small",
    aum: "$500K",
    volume: "$1.5M",
    fees: "$15K",
    share: "$7.5K",
  },
  {
    portfolio: "Medium",
    aum: "$5M",
    volume: "$15M",
    fees: "$150K",
    share: "$75K",
  },
  {
    portfolio: "Large",
    aum: "$20M",
    volume: "$40M",
    fees: "$400K",
    share: "$200K",
  },
];

export function CreatorEconomicsSection() {
  return (
    <section className="relative border-t border-line bg-deep py-14 md:py-18">
      <div className="section-pad container-max">
        <FadeIn className="max-w-3xl">
          <h2 className="display text-[clamp(2rem,4.5vw,3.15rem)] uppercase tracking-[-0.02em] text-balance">
            Turn AUM Into <span className="gradient-text">Earnings.</span>
          </h2>
          <p className="mt-5 text-[1.05rem] leading-relaxed text-muted">
            When investors trade through your portfolio, INDEXLA charges a{" "}
            <span className="font-semibold text-ink">1% execution fee</span>.
          </p>
        </FadeIn>

        <FadeIn className="mt-7">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.25rem] border border-electric/30 bg-gradient-to-br from-electric/12 via-purple/10 to-transparent px-6 py-7 text-center sm:text-left">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-electric">
                Execution fee
              </p>
              <p className="display mt-2 text-[3rem] leading-none gradient-text">
                1%
              </p>
            </div>
            <div className="rounded-[1.25rem] glass px-6 py-7 text-center sm:text-left">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-dim">
                Creator share
              </p>
              <p className="display mt-2 text-[3rem] leading-none gradient-text">
                50%
              </p>
              <p className="mt-3 text-[1.02rem] font-semibold text-ink">
                You receive 50%.
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn className="mt-5 space-y-2 text-[1.02rem] leading-relaxed text-muted">
          <p>Creator earnings accrue daily and are paid daily.</p>
          <p>
            The bigger your AUM and the more activity your portfolio generates,
            the more you can earn.
          </p>
        </FadeIn>

        <FadeIn className="mt-8">
          <div className="overflow-hidden rounded-[1.25rem] border border-line">
            <div className="border-b border-line bg-void/55 px-5 py-3.5">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-electric">
                Illustrative Creator Economics
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[42rem] table-fixed text-sm">
                <colgroup>
                  <col className="w-[16%]" />
                  <col className="w-[16%]" />
                  <col className="w-[26%]" />
                  <col className="w-[21%]" />
                  <col className="w-[21%]" />
                </colgroup>
                <thead>
                  <tr className="border-b border-line text-[0.65rem] uppercase tracking-[0.1em] text-muted-dim">
                    <th className="px-5 py-3 text-left font-semibold">Portfolio</th>
                    <th className="px-5 py-3 text-right font-semibold">AUM</th>
                    <th className="px-5 py-3 text-right font-semibold">
                      Annual Execution Volume
                    </th>
                    <th className="px-5 py-3 text-right font-semibold">
                      Platform Fees (1%)
                    </th>
                    <th className="px-5 py-3 text-right font-semibold text-electric">
                      Creator Share (50%)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr
                      key={row.portfolio}
                      className="border-b border-line/60 bg-void/20 last:border-b-0"
                    >
                      <td className="px-5 py-3.5 text-left font-semibold text-ink">
                        {row.portfolio}
                      </td>
                      <td className="px-5 py-3.5 text-right tabular-nums text-muted">
                        {row.aum}
                      </td>
                      <td className="px-5 py-3.5 text-right tabular-nums text-muted">
                        {row.volume}
                      </td>
                      <td className="px-5 py-3.5 text-right tabular-nums text-muted">
                        {row.fees}
                      </td>
                      <td className="px-5 py-3.5 text-right tabular-nums font-semibold text-electric">
                        {row.share}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-muted-dim">
            Illustrative scenarios only. Actual earnings depend on AUM, execution
            volume, and applicable execution fees.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
