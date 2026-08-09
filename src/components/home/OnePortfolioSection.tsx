import { FadeIn } from "@/components/ui/FadeIn";

const pillars = [
  {
    title: "MULTI-CHAIN",
    body: "Access supported blockchain ecosystems from one portfolio.",
  },
  {
    title: "MULTI-ASSET",
    body: "Combine crypto, tokenized stocks, RWAs, commodities, and other supported assets.",
  },
  {
    title: "ONE PORTFOLIO",
    body: "One allocation across the assets you want to own.",
  },
  {
    title: "ONE EXPERIENCE",
    body: "Discover, allocate, rebalance, and automate from one place.",
  },
];

export function OnePortfolioSection() {
  return (
    <section className="relative border-t border-line bg-deep py-24 md:py-32">
      <div className="section-pad container-max">
        <FadeIn className="max-w-3xl">
          <h2 className="display text-[clamp(2rem,4.5vw,3.4rem)] uppercase tracking-[-0.02em] text-balance">
            One Portfolio.{" "}
            <span className="gradient-text">Every Market.</span>
          </h2>
          <div className="mt-6 space-y-4 text-[1.08rem] leading-relaxed text-muted">
            <p>
              Your investments are scattered across chains, platforms, wallets,
              and asset classes.
            </p>
            <p>
              INDEXLA brings supported assets into one portfolio, so you can
              define allocations and manage your strategy through one unified
              experience.
            </p>
          </div>
        </FadeIn>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, i) => (
            <FadeIn key={pillar.title} delay={i * 0.06}>
              <article className="h-full rounded-3xl glass-soft p-6">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-electric">
                  {pillar.title}
                </p>
                <p className="mt-4 text-[1rem] leading-relaxed text-muted">
                  {pillar.body}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-10">
          <p className="display text-[clamp(1.25rem,2.5vw,1.75rem)] text-ink">
            Cross-chain. Cross-asset. One portfolio.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
