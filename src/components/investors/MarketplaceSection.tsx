"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import { AssetLogo } from "@/components/ui/AssetLogo";
import { PORTFOLIOS } from "@/lib/site";

const actions = [
  {
    n: "01",
    title: "DISCOVER",
    body: "Find portfolios built around different assets and investment theses.",
  },
  {
    n: "02",
    title: "FOLLOW",
    body: "Choose a strategy that matches your conviction.",
  },
  {
    n: "03",
    title: "CUSTOMIZE",
    body: "Adjust the assets, allocations, and rules to fit your strategy.",
  },
  {
    n: "04",
    title: "BUILD",
    body: "Create your own portfolio from scratch.",
  },
];

export function MarketplaceSection() {
  const previews = PORTFOLIOS.slice(0, 3);

  return (
    <section className="relative border-t border-line bg-void py-16 md:py-24">
      <div className="section-pad container-max">
        <FadeIn className="max-w-3xl">
          <h2 className="display text-[clamp(2rem,4.5vw,3.35rem)] uppercase tracking-[-0.02em] text-balance">
            Discover. Follow. Customize.{" "}
            <span className="gradient-text">Or Build.</span>
          </h2>
          <p className="mt-6 text-[1.08rem] leading-relaxed text-muted">
            Explore portfolios created by investors and creators across different
            markets and strategies.
          </p>
        </FadeIn>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {actions.map((action, i) => (
            <FadeIn key={action.title} delay={i * 0.05}>
              <article className="h-full rounded-[1.25rem] glass-soft p-5">
                <span className="text-[0.7rem] font-semibold text-electric">
                  {action.n}
                </span>
                <h3 className="mt-3 display text-[1.2rem]">{action.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
                  {action.body}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-8">
          <div className="rounded-[1.5rem] glass p-5 sm:p-6">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-dim">
              Marketplace
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {previews.map((portfolio) => (
                <article
                  key={portfolio.id}
                  className="rounded-2xl border border-line bg-void/45 p-4"
                >
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-electric">
                    {portfolio.type}
                  </p>
                  <h3 className="display mt-2 text-[1.1rem]">{portfolio.name}</h3>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {portfolio.assets.slice(0, 5).map((key) => (
                      <span
                        key={key}
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-line bg-panel"
                      >
                        <AssetLogo asset={key} size={14} />
                      </span>
                    ))}
                  </div>
                  <p className="mt-3 text-sm text-muted">
                    Strategy · {portfolio.strategy}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn className="mt-10 space-y-5">
          <p className="display text-[clamp(1.15rem,2.3vw,1.5rem)] text-ink">
            Your capital. Your strategy. Your choice.
          </p>
          <Button href="/strategies" className="min-w-[13.5rem]">
            Explore Marketplace
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
