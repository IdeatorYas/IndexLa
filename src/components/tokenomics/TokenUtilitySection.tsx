"use client";

import { FadeIn } from "@/components/ui/FadeIn";

const discountTiers = [
  { hold: "2,500 $DEXLA", discount: "15%" },
  { hold: "5,000 $DEXLA", discount: "25%" },
  { hold: "10,000 $DEXLA", discount: "35%" },
] as const;

export function TokenUtilitySection() {
  return (
    <section className="relative border-t border-line bg-deep py-14 md:py-20">
      <div className="section-pad container-max">
        <FadeIn className="max-w-3xl">
          <h2 className="display text-[clamp(1.9rem,4.2vw,3rem)] uppercase tracking-[-0.02em]">
            Token Utility
          </h2>
        </FadeIn>

        <div className="mt-8 grid gap-4 lg:grid-cols-2 lg:items-stretch">
          <FadeIn className="h-full">
            <article className="flex h-full flex-col rounded-[1.35rem] border border-electric/35 bg-electric/8 p-5 sm:p-6">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted-dim">
                Publish To Earn
              </p>
              <p className="display mt-4 text-[clamp(1.35rem,2.6vw,1.75rem)] tracking-[-0.03em] text-ink">
                Publish →{" "}
                <span className="text-electric">1,000 $DEXLA Burn</span>
              </p>
              <p className="mt-4 text-[1rem] leading-relaxed text-muted">
                Creating a public portfolio or index on the INDEXLA Marketplace
                requires a permanent burn of 1,000 $DEXLA.
              </p>

              <div className="mt-5 space-y-2">
                <div className="rounded-xl border border-electric/30 bg-void/50 px-4 py-3">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-electric">
                    Public portfolio
                  </p>
                  <p className="mt-1.5 text-[0.98rem] font-semibold text-ink">
                    Burn 1,000 $DEXLA to publish.
                  </p>
                </div>
                <div className="rounded-xl border border-line bg-void/40 px-4 py-3">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-muted-dim">
                    Private portfolio
                  </p>
                  <p className="mt-1.5 text-[0.98rem] font-semibold text-ink">
                    No $DEXLA burn required.
                  </p>
                </div>
              </div>

              <p className="mt-auto pt-5 text-[0.92rem] leading-relaxed text-muted-dim">
                Creators can build and test private portfolios before making them
                public.
              </p>
            </article>
          </FadeIn>

          <FadeIn delay={0.05} className="h-full">
            <article className="flex h-full flex-col rounded-[1.35rem] border border-purple-bright/30 bg-purple/10 p-5 sm:p-6">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted-dim">
                Trading Fee Discounts
              </p>
              <p className="display mt-4 text-[clamp(1.35rem,2.6vw,1.75rem)] tracking-[-0.03em] text-ink">
                Hold →{" "}
                <span className="text-purple-bright">Trading Fee Discounts</span>
              </p>
              <p className="mt-4 text-[1rem] leading-relaxed text-muted">
                Investors holding $DEXLA receive reduced execution fees:
              </p>

              <ul className="mt-5 space-y-2">
                {discountTiers.map((tier) => (
                  <li
                    key={tier.hold}
                    className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-xl border border-line bg-void/50 px-4 py-3"
                  >
                    <span className="text-[0.95rem] font-semibold tabular-nums text-ink">
                      {tier.hold}
                    </span>
                    <span className="display text-[1.05rem] tabular-nums text-electric">
                      {tier.discount}
                      <span className="ml-1 text-[0.75rem] font-semibold tracking-normal text-muted">
                        fee discount
                      </span>
                    </span>
                  </li>
                ))}
              </ul>

              <p className="mt-auto pt-5 text-[0.92rem] leading-relaxed text-muted-dim">
                Discounts remain active while the required token balance is
                maintained.
              </p>
            </article>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
