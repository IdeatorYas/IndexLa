"use client";

import { FadeIn } from "@/components/ui/FadeIn";

const utilityCards: {
  title: string;
  metric: string;
  body: string;
  note?: string;
  tiers?: { hold: string; discount: string }[];
  accent: string;
  metricClass: string;
}[] = [
  {
    title: "Creator Burns",
    metric: "1,000 $DEXLA",
    body: "Creating a public portfolio or index on the INDEXLA Marketplace requires a permanent burn of 1,000 $DEXLA.",
    note: "Private portfolios do not require the $DEXLA publishing burn.",
    accent: "border-electric/35 bg-electric/8",
    metricClass: "text-electric",
  },
  {
    title: "Trading Fee Discounts",
    metric: "15% / 25% / 35%",
    body: "Investors holding $DEXLA receive reduced execution fees:",
    tiers: [
      { hold: "2,500 $DEXLA", discount: "15%" },
      { hold: "5,000 $DEXLA", discount: "25%" },
      { hold: "10,000 $DEXLA", discount: "35%" },
    ],
    note: "Discounts remain active while the required token balance is maintained.",
    accent: "border-purple-bright/30 bg-purple/10",
    metricClass: "text-purple-bright",
  },
  {
    title: "Protocol Buybacks",
    metric: "10%",
    body: "10% of execution fee revenue is used to buy $DEXLA from the market and permanently burn the acquired tokens.",
    accent: "border-cyan/30 bg-cyan/8",
    metricClass: "text-cyan",
  },
  {
    title: "Treasury Buybacks",
    metric: "25%",
    body: "25% of realized Treasury profits are allocated to purchasing and permanently burning $DEXLA.",
    accent: "border-success/30 bg-success/8",
    metricClass: "text-success",
  },
];

export function TokenUtilitySection() {
  return (
    <section className="relative border-t border-line bg-deep py-14 md:py-20">
      <div className="section-pad container-max">
        <FadeIn className="max-w-3xl">
          <h2 className="display text-[clamp(1.9rem,4.2vw,3rem)] uppercase tracking-[-0.02em]">
            Token Utility
          </h2>
          <p className="mt-3 display text-[clamp(1.15rem,2.2vw,1.4rem)] text-ink">
            Publish to Earn
          </p>
          <p className="mt-4 max-w-2xl text-[1.02rem] leading-relaxed text-muted">
            This connects creator activity directly to token utility while helping
            maintain a high-quality marketplace.
          </p>
        </FadeIn>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {utilityCards.map((card, i) => (
            <FadeIn key={card.title} delay={i * 0.04} className="h-full">
              <article
                className={`flex h-full flex-col rounded-[1.25rem] border p-5 sm:p-6 ${card.accent}`}
              >
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted-dim">
                  {card.title}
                </p>
                <p
                  className={`display mt-3 text-[clamp(1.45rem,2.8vw,1.85rem)] tracking-[-0.03em] ${card.metricClass}`}
                >
                  {card.metric}
                </p>
                <p className="mt-4 text-[0.98rem] leading-relaxed text-muted">
                  {card.body}
                </p>
                {"tiers" in card && card.tiers ? (
                  <ul className="mt-4 space-y-1.5">
                    {card.tiers.map((tier) => (
                      <li
                        key={tier.hold}
                        className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-lg border border-line bg-void/45 px-3 py-2"
                      >
                        <span className="text-[0.85rem] font-semibold tabular-nums text-ink">
                          {tier.hold}
                        </span>
                        <span className="text-[0.85rem] font-semibold tabular-nums text-electric">
                          → {tier.discount} fee discount
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : null}
                {card.note ? (
                  <p className="mt-auto pt-4 text-[0.88rem] leading-relaxed text-muted-dim">
                    {card.note}
                  </p>
                ) : null}
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-8">
          <div className="rounded-2xl border border-line bg-void/40 px-5 py-4 sm:px-6">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted-dim">
              Token Burn Mechanism
            </p>
            <p className="mt-2 text-[1.02rem] leading-relaxed text-muted">
              $DEXLA follows an activity-driven deflationary model.
            </p>
            <p className="mt-2 text-[0.98rem] leading-relaxed text-muted">
              More creators publishing strategies means more tokens permanently
              removed from circulation.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
