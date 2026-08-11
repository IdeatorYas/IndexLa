"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import {
  tkBody,
  tkH2,
  tkSection,
  tkStat,
  tkUtilityGlow,
  tkUtilityPanel,
} from "@/components/tokenomics/tokenomicsRhythm";

const utilities = [
  {
    n: "01",
    title: "Publish",
    body: "Creators use $DEXLA to publish public portfolios and indexes on the INDEXLA Marketplace.",
    note: "Private portfolios remain free, allowing creators to build and test before going public.",
    kind: "publish" as const,
  },
  {
    n: "02",
    title: "Feature",
    body: "Creators can burn 2,500 $DEXLA to feature a published portfolio for 7 days.",
    note: "Featured portfolios receive premium marketplace placement, a Featured designation, and increased discovery. Featured placement rotates to keep marketplace discovery competitive.",
    kind: "feature" as const,
    value: "2,500",
    unit: "$DEXLA",
    result: "7 Days Featured",
  },
  {
    n: "03",
    title: "Save",
    body: "Holding $DEXLA gives investors lower execution fees.",
    note: "Discounts remain active while the required balance is maintained.",
    kind: "save" as const,
    tiers: [
      { hold: "2,500 $DEXLA", discount: "10%" },
      { hold: "5,000 $DEXLA", discount: "25%" },
      { hold: "10,000 $DEXLA", discount: "40%" },
    ],
  },
  {
    n: "04",
    title: "Tip Creators",
    body: "Investors and followers can tip creators directly in $DEXLA.",
    note: "Creators can earn from the value they bring to the ecosystem through research, portfolio construction, market views, and community contribution.",
    kind: "tip" as const,
    flow: ["Discover", "Follow", "Invest", "Tip"],
  },
] as const;

export function TokenUtilitySection() {
  return (
    <section className={`${tkSection} relative overflow-hidden bg-deep`}>
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{ background: tkUtilityGlow }}
        aria-hidden
      />

      <div className="section-pad container-max relative">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-success">
            Value layer
          </p>
          <h2 className={`mt-3 ${tkH2} uppercase`}>
            Four Core{" "}
            <span className="text-success">Utilities</span>
          </h2>
        </FadeIn>

        <div className="mt-10 space-y-0 border-y border-success/25">
          {utilities.map((item, i) => (
            <FadeIn key={item.n} delay={i * 0.03}>
              <article className="grid gap-6 border-b border-success/15 py-8 last:border-b-0 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center lg:gap-10 lg:py-9">
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="display text-[1.05rem] tabular-nums text-success">
                      {item.n}
                    </span>
                    <h3 className="display text-[clamp(1.4rem,2.6vw,1.85rem)] tracking-[-0.02em] text-ink uppercase">
                      {item.title}
                    </h3>
                  </div>
                  <p className={`mt-4 ${tkBody}`}>{item.body}</p>
                  <p className={`mt-3 ${tkBody}`}>{item.note}</p>
                </div>

                <div className="min-w-0">
                  {item.kind === "publish" && (
                    <div className={`${tkUtilityPanel} px-5 py-6 text-center`}>
                      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-success/80">
                        Access
                      </p>
                      <p className="mt-3 display text-[1.35rem] tracking-[-0.02em] text-ink">
                        $DEXLA
                      </p>
                      <div className="my-2.5 text-success/55" aria-hidden>
                        →
                      </div>
                      <p className="display text-[1.2rem] tracking-[-0.02em] text-ink text-balance">
                        Public Portfolio
                      </p>
                      <p className="mt-3 text-[0.85rem] text-muted">
                        Private remains free
                      </p>
                    </div>
                  )}

                  {item.kind === "feature" && (
                    <div className={`${tkUtilityPanel} px-5 py-6 text-center`}>
                      <p className={`${tkStat} text-success`}>{item.value}</p>
                      <p className="mt-1 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-muted">
                        {item.unit}
                      </p>
                      <div className="my-2.5 text-success/55" aria-hidden>
                        →
                      </div>
                      <p className="display text-[1.2rem] tracking-[-0.02em] text-ink">
                        {item.result}
                      </p>
                    </div>
                  )}

                  {item.kind === "save" && (
                    <div className={`${tkUtilityPanel} space-y-0 p-4`}>
                      {item.tiers.map((tier) => (
                        <div
                          key={tier.hold}
                          className="flex items-center justify-between gap-3 border-b border-success/15 px-1 py-2.5 last:border-0"
                        >
                          <span className="text-[0.92rem] font-medium text-ink">
                            {tier.hold}
                          </span>
                          <span className="display text-[clamp(1.35rem,3vw,1.75rem)] leading-none text-success">
                            {tier.discount}
                          </span>
                        </div>
                      ))}
                      <p className="pt-2 text-center text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-success/70">
                        Fee discount
                      </p>
                    </div>
                  )}

                  {item.kind === "tip" && (
                    <div className={`${tkUtilityPanel} px-5 py-6`}>
                      <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2">
                        {item.flow.map((step, idx) => (
                          <div key={step} className="flex items-center gap-2">
                            <span className="border-b border-success/45 pb-0.5 text-[0.95rem] font-semibold text-ink">
                              {step}
                            </span>
                            {idx < item.flow.length - 1 && (
                              <span className="text-success/50" aria-hidden>
                                →
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
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
