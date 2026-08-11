"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import {
  tkBody,
  tkH2,
  tkSection,
  tkStat,
  tkSurface,
  tkSurfaceSoft,
} from "@/components/tokenomics/tokenomicsRhythm";

const utilities = [
  {
    n: "01",
    title: "Publish",
    accent: "border-electric/35 bg-electric/[0.07]",
    body: "Creators burn 1,000 $DEXLA to publish a public portfolio or index on the INDEXLA Marketplace.",
    note: "Private portfolios remain free, allowing creators to build and test before going public.",
    value: "1,000",
    unit: "$DEXLA",
    result: "Public Portfolio",
    extra:
      "The protocol may consider transitioning publishing costs to a fixed USD value, paid in $DEXLA at the time of transaction, to maintain predictable creator costs as market conditions change.",
  },
  {
    n: "02",
    title: "Feature",
    accent: "border-purple/40 bg-purple/[0.08]",
    body: "Creators can burn 2,500 $DEXLA to feature a published portfolio for 7 days.",
    note: "Featured portfolios receive premium marketplace placement, a Featured designation, and increased discovery. Featured placement rotates to keep marketplace discovery competitive.",
    value: "2,500",
    unit: "$DEXLA",
    result: "7 Days Featured",
    extra: null,
  },
  {
    n: "03",
    title: "Save",
    accent: "border-success/35 bg-success/[0.07]",
    body: "Holding $DEXLA gives investors lower execution fees.",
    note: "Discounts remain active while the required balance is maintained.",
    value: null,
    unit: null,
    result: null,
    tiers: [
      { hold: "2,500 $DEXLA", discount: "10%" },
      { hold: "5,000 $DEXLA", discount: "25%" },
      { hold: "10,000 $DEXLA", discount: "40%" },
    ],
    extra: null,
  },
  {
    n: "04",
    title: "Tip Creators",
    accent: "border-white/[0.1] bg-void/50",
    body: "Investors and followers can tip creators directly in $DEXLA.",
    note: "Creators can earn from the value they bring to the ecosystem through research, portfolio construction, market views, and community contribution. No performance fee is required.",
    value: null,
    unit: null,
    result: null,
    flow: ["Discover", "Follow", "Invest", "Tip"],
    extra: null,
  },
] as const;

export function TokenUtilitySection() {
  return (
    <section className={`${tkSection} bg-deep`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={`${tkH2} uppercase`}>
            Four Core{" "}
            <span className="gradient-text">Utilities</span>
          </h2>
        </FadeIn>

        <div className="mt-10 space-y-4">
          {utilities.map((item, i) => (
            <FadeIn key={item.n} delay={i * 0.03}>
              <article className={`${tkSurface} grid gap-0 lg:grid-cols-[1.15fr_0.85fr]`}>
                <div className="border-b border-white/[0.07] p-5 sm:p-6 lg:border-b-0 lg:border-r">
                  <div className="flex items-baseline gap-3">
                    <span className="display text-[1.1rem] text-electric">
                      {item.n}
                    </span>
                    <h3 className="display text-[clamp(1.35rem,2.5vw,1.75rem)] tracking-[-0.02em] text-ink uppercase">
                      {item.title}
                    </h3>
                  </div>
                  <p className={`mt-4 ${tkBody}`}>{item.body}</p>
                  <p className={`mt-3 ${tkBody}`}>{item.note}</p>
                  {item.extra && (
                    <p className="mt-4 text-[0.92rem] leading-relaxed text-muted-dim text-pretty">
                      {item.extra}
                    </p>
                  )}
                </div>

                <div className={`flex flex-col justify-center p-5 sm:p-6 ${item.accent}`}>
                  {item.value && (
                    <div className="text-center">
                      <p className={`${tkStat} gradient-text`}>{item.value}</p>
                      <p className="mt-1 text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-muted">
                        {item.unit}
                      </p>
                      <div className="my-3 flex justify-center text-electric/50" aria-hidden>
                        →
                      </div>
                      <p className="display text-[1.2rem] tracking-[-0.02em] text-ink">
                        {item.result}
                      </p>
                    </div>
                  )}

                  {"tiers" in item && item.tiers && (
                    <div className="space-y-2">
                      {item.tiers.map((tier) => (
                        <div
                          key={tier.hold}
                          className={`${tkSurfaceSoft} flex items-center justify-between gap-3 px-3.5 py-3`}
                        >
                          <span className="text-[0.9rem] font-semibold text-ink">
                            {tier.hold}
                          </span>
                          <span className="display text-[1.25rem] gradient-text">
                            {tier.discount}
                          </span>
                        </div>
                      ))}
                      <p className="pt-1 text-center text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-muted-dim">
                        Fee discount
                      </p>
                    </div>
                  )}

                  {"flow" in item && item.flow && (
                    <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2">
                      {item.flow.map((step, idx) => (
                        <div key={step} className="flex items-center gap-2">
                          <span className="border-b border-electric/40 pb-0.5 text-[0.95rem] font-semibold text-ink">
                            {step}
                          </span>
                          {idx < item.flow!.length - 1 && (
                            <span className="text-electric/45" aria-hidden>
                              →
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
