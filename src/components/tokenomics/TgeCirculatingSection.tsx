"use client";

import { FadeIn } from "@/components/ui/FadeIn";

const tgeParts = [
  {
    label: "Public Sale unlock",
    pct: "3%",
    bar: "w-[20.34%]",
    color: "bg-cyan",
  },
  {
    label: "DEX Liquidity",
    pct: "10%",
    bar: "w-[67.8%]",
    color: "bg-success",
  },
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

export function TgeCirculatingSection() {
  return (
    <section className="relative border-t border-line bg-deep py-14 md:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 hero-glow opacity-25" aria-hidden />
      <div className="section-pad container-max relative">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className="display text-[clamp(1.9rem,4.2vw,3rem)] uppercase tracking-[-0.02em] text-balance">
            Initial Circulating Supply At TGE
          </h2>
          <p className="mt-6 display text-[clamp(1.35rem,3vw,1.85rem)] tracking-[-0.02em] text-muted">
            14.75% TGE FLOAT
          </p>
          <p className="mt-3 display text-[clamp(2.6rem,6vw,4rem)] tracking-[-0.04em] gradient-text tabular-nums">
            14.75M $DEXLA
          </p>
        </FadeIn>

        <FadeIn className="mx-auto mt-10 max-w-3xl">
          <div className="rounded-[1.4rem] border border-electric/35 bg-gradient-to-br from-electric/12 via-void/80 to-purple/10 p-5 sm:p-7">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted-dim">
              Initial circulating supply includes
            </p>

            <div className="mt-5 flex h-3.5 overflow-hidden rounded-full bg-void/70">
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
                  className="flex items-center justify-between gap-3 rounded-xl border border-line bg-void/55 px-4 py-3.5"
                >
                  <span className="flex min-w-0 items-center gap-2.5 text-[0.95rem] font-medium text-ink">
                    <span
                      className={`h-2.5 w-2.5 shrink-0 rounded-full ${part.color}`}
                      aria-hidden
                    />
                    <span className="truncate">{part.label}</span>
                  </span>
                  <span className="shrink-0 text-[1.05rem] font-semibold tabular-nums text-electric">
                    {part.pct}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
