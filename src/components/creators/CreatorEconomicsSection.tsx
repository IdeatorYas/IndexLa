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
    <section className="relative border-t border-line bg-deep py-14 md:py-20">
      <div className="section-pad container-max">
        <FadeIn className="max-w-3xl">
          <h2 className="display text-[clamp(2rem,4.5vw,3.2rem)] uppercase tracking-[-0.02em] text-balance">
            Turn AUM Into{" "}
            <span className="gradient-text">Creator Earnings.</span>
          </h2>
          <p className="mt-5 text-[1.05rem] leading-relaxed text-muted">
            When investors trade through your portfolio, INDEXLA charges a{" "}
            <span className="font-semibold text-ink">1% execution fee</span>.
          </p>
        </FadeIn>

        <FadeIn className="mt-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.35rem] border border-electric/30 bg-gradient-to-br from-electric/12 via-purple/10 to-transparent p-6 sm:p-8">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-electric">
                Execution fee
              </p>
              <p className="display mt-3 text-[3.2rem] leading-none gradient-text">
                1%
              </p>
              <p className="mt-4 text-sm text-muted">
                Charged when transactions are executed through the platform.
              </p>
            </div>
            <div className="rounded-[1.35rem] glass p-6 sm:p-8">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-muted-dim">
                Creator share
              </p>
              <p className="display mt-3 text-[3.2rem] leading-none gradient-text">
                50%
              </p>
              <p className="mt-4 text-[1.05rem] font-semibold text-ink">
                You receive 50%.
              </p>
              <p className="mt-2 text-sm text-muted">
                Creator earnings accrue daily and are paid daily.
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn className="mt-6">
          <p className="text-[1.02rem] leading-relaxed text-muted">
            The more capital your portfolio attracts and the more active it
            becomes, the greater your potential earnings.
          </p>
        </FadeIn>

        <FadeIn className="mt-8">
          <div className="overflow-hidden rounded-[1.35rem] border border-line">
            <div className="border-b border-line bg-void/50 px-5 py-4">
              <p className="text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-electric">
                Illustrative Creator Economics
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[40rem] text-left text-sm">
                <thead>
                  <tr className="border-b border-line text-[0.7rem] uppercase tracking-[0.12em] text-muted-dim">
                    <th className="px-5 py-3 font-semibold">Portfolio</th>
                    <th className="px-5 py-3 font-semibold">AUM</th>
                    <th className="px-5 py-3 font-semibold">
                      Annual Execution Volume
                    </th>
                    <th className="px-5 py-3 font-semibold">Platform Fees (1%)</th>
                    <th className="px-5 py-3 font-semibold text-electric">
                      Creator Share (50%)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr
                      key={row.portfolio}
                      className="border-b border-line/70 bg-void/25 last:border-b-0"
                    >
                      <td className="px-5 py-4 font-semibold text-ink">
                        {row.portfolio}
                      </td>
                      <td className="px-5 py-4 text-muted">{row.aum}</td>
                      <td className="px-5 py-4 text-muted">{row.volume}</td>
                      <td className="px-5 py-4 text-muted">{row.fees}</td>
                      <td className="px-5 py-4 font-semibold text-electric">
                        {row.share}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-muted-dim">
            Illustrative scenarios only. Actual creator earnings depend on AUM,
            execution volume, and the applicable execution fee.
          </p>
        </FadeIn>

        <FadeIn className="mt-8 space-y-2">
          <p className="display text-[clamp(1.1rem,2.2vw,1.35rem)] text-ink">
            Build the portfolio.
          </p>
          <p className="display text-[clamp(1.1rem,2.2vw,1.35rem)] text-ink">
            Grow the AUM.
          </p>
          <p className="display text-[clamp(1.1rem,2.2vw,1.35rem)] gradient-text">
            Earn from the activity your conviction generates.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
