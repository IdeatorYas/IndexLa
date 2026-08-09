"use client";

import { FadeIn } from "@/components/ui/FadeIn";

const burnFlow = [
  {
    title: "Creators Publish",
    result: "1,000 $DEXLA Burn",
    detail:
      "Every published public portfolio or index permanently removes 1,000 $DEXLA from circulation.",
    example: "1,000 creators publishing = 1% of total supply permanently burned.",
  },
  {
    title: "Protocol Fees",
    result: "10% Buyback & Burn",
    detail:
      "10% of execution fee revenue is used to buy $DEXLA from the market and permanently burn it.",
    example:
      "At a 1% execution fee: $1M in execution volume → $10,000 allocated to protocol buyback & burn.",
  },
  {
    title: "Treasury Profits",
    result: "25% Buyback & Burn",
    detail:
      "25% of realized Treasury profits are allocated to purchasing and permanently burning $DEXLA.",
    example:
      "Treasury profits refer to realized returns from Treasury-managed assets.",
  },
] as const;

export function TokenBurnMechanismSection() {
  return (
    <section className="relative border-t border-line bg-void py-14 md:py-20">
      <div className="section-pad container-max">
        <FadeIn className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="display text-[clamp(1.9rem,4.2vw,3rem)] uppercase tracking-[-0.02em]">
              Token Burn Mechanism
            </h2>
            <span className="rounded-full border border-success/35 bg-success/10 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-success">
              Permanent &amp; On-Chain
            </span>
          </div>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-muted">
            $DEXLA follows an activity-driven deflationary model.
          </p>
          <p className="mt-2 text-[1rem] leading-relaxed text-muted">
            All burns are permanent and on-chain.
          </p>
        </FadeIn>

        <div className="mt-8 space-y-3">
          {burnFlow.map((step, i) => (
            <FadeIn key={step.title} delay={i * 0.04}>
              <div className="rounded-[1.25rem] border border-line bg-deep/55 p-4 sm:p-5">
                <div className="grid gap-3 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
                  <div className="rounded-xl border border-line bg-void/50 px-4 py-3">
                    <p className="text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-muted-dim">
                      Source
                    </p>
                    <p className="display mt-1.5 text-[1.15rem] text-ink">
                      {step.title}
                    </p>
                  </div>
                  <div className="hidden text-center text-electric lg:block" aria-hidden>
                    →
                  </div>
                  <div className="rounded-xl border border-electric/30 bg-electric/10 px-4 py-3">
                    <p className="text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-electric">
                      Outcome
                    </p>
                    <p className="display mt-1.5 text-[1.15rem] text-electric">
                      {step.result}
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-[0.98rem] leading-relaxed text-muted">
                  {step.detail}
                </p>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-muted-dim">
                  {step.example}
                </p>
              </div>
              {i < burnFlow.length - 1 && (
                <div className="flex justify-center py-1" aria-hidden>
                  <span className="text-electric/45">↓</span>
                </div>
              )}
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
