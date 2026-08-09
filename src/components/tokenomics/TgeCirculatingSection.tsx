"use client";

import { FadeIn } from "@/components/ui/FadeIn";

const tgeParts = [
  { label: "Public Sale", pct: "3%", bar: "w-[20.34%]", color: "bg-cyan" },
  { label: "DEX Liquidity", pct: "10%", bar: "w-[67.8%]", color: "bg-success" },
  {
    label: "CEX Listings",
    pct: "0.75%",
    bar: "w-[5.08%]",
    color: "bg-muted-dim",
  },
  {
    label: "Other unlocked allocations",
    pct: "1%",
    bar: "w-[6.78%]",
    color: "bg-purple-bright",
  },
] as const;
// 3+10+0.75+1 = 14.75; bar widths as share of 14.75

export function TgeCirculatingSection() {
  return (
    <section className="relative border-t border-line bg-void py-14 md:py-20">
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className="display text-[clamp(1.9rem,4.2vw,3rem)] uppercase tracking-[-0.02em] text-balance">
            Initial Circulating Supply at TGE
          </h2>
          <p className="mt-5 display text-[clamp(1.15rem,2.2vw,1.4rem)] text-muted">
            14.75% of Total Supply
          </p>
          <p className="mt-3 display text-[clamp(2.2rem,5vw,3.4rem)] tracking-[-0.03em] gradient-text tabular-nums">
            14.75M $DEXLA
          </p>
        </FadeIn>

        <FadeIn className="mx-auto mt-8 max-w-3xl">
          <div className="rounded-[1.35rem] border border-electric/30 bg-gradient-to-br from-electric/10 via-void/70 to-purple/10 p-5 sm:p-7">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted-dim">
              TGE circulating supply includes
            </p>

            <div className="mt-5 flex h-3 overflow-hidden rounded-full bg-void/60">
              {tgeParts.map((part) => (
                <div
                  key={part.label}
                  className={`${part.bar} ${part.color}`}
                  title={`${part.label}: ${part.pct}`}
                />
              ))}
            </div>

            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {tgeParts.map((part) => (
                <li
                  key={part.label}
                  className="flex items-center justify-between gap-3 rounded-xl border border-line bg-void/50 px-4 py-3"
                >
                  <span className="flex items-center gap-2.5 text-[0.95rem] font-medium text-ink">
                    <span
                      className={`h-2.5 w-2.5 shrink-0 rounded-full ${part.color}`}
                      aria-hidden
                    />
                    {part.label}
                  </span>
                  <span className="text-[1rem] font-semibold tabular-nums text-electric">
                    {part.pct}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-5 text-[0.95rem] leading-relaxed text-muted">
              The remaining allocations are subject to their respective vesting or
              release schedules.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
