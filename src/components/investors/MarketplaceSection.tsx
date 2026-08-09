"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import { AssetLogo } from "@/components/ui/AssetLogo";
import { PORTFOLIOS } from "@/lib/site";

const actions = [
  {
    n: "01",
    title: "DISCOVER",
    body: "Find portfolios built by creators and investors across different markets.",
  },
  {
    n: "02",
    title: "FOLLOW",
    body: "Follow a strategy that matches your conviction.",
  },
  {
    n: "03",
    title: "CUSTOMIZE",
    body: "Adjust the assets, allocations, and rules to fit your own thesis.",
  },
  {
    n: "04",
    title: "BUILD",
    body: "Create your portfolio from scratch and define exactly how it should respond to the market.",
  },
];

export function MarketplaceSection() {
  const previews = PORTFOLIOS.slice(0, 3);

  return (
    <section className="relative border-t border-line bg-deep py-20 md:py-28 lg:py-32">
      <div className="section-pad container-max">
        <FadeIn className="max-w-3xl">
          <h2 className="display text-[clamp(2rem,4.5vw,3.35rem)] uppercase tracking-[-0.02em] text-balance">
            Discover. Follow. Customize.{" "}
            <span className="gradient-text">Or Build Your Own.</span>
          </h2>
          <div className="mt-6 space-y-4 text-[1.08rem] leading-relaxed text-muted">
            <p>Not every investor has the same thesis.</p>
            <p>
              Explore portfolios created around different assets, markets, and
              strategies.
            </p>
          </div>
        </FadeIn>

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {actions.map((action, i) => (
            <FadeIn key={action.title} delay={i * 0.06}>
              <article className="relative h-full rounded-[1.35rem] glass-soft p-5">
                <span className="text-[0.7rem] font-semibold text-electric">
                  {action.n}
                </span>
                <h3 className="mt-3 display text-[1.25rem]">{action.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
                  {action.body}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-10">
          <div className="rounded-[1.75rem] glass p-5 sm:p-6">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-dim">
                  Marketplace · product preview
                </p>
                <p className="display mt-2 text-[1.35rem]">Strategy discovery</p>
              </div>
              <p className="text-xs text-muted-dim">
                Illustrative portfolios — no performance claims
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {previews.map((portfolio) => (
                <article
                  key={portfolio.id}
                  className="rounded-2xl border border-line bg-void/45 p-4"
                >
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-electric">
                    {portfolio.type}
                  </p>
                  <h3 className="display mt-2 text-[1.15rem]">{portfolio.name}</h3>
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

        <FadeIn className="mt-10 space-y-6">
          <p className="display text-[clamp(1.2rem,2.4vw,1.6rem)] text-ink">
            Your capital. Your strategy. Your control.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/strategies" className="min-w-[12.5rem]">
              Explore Marketplace
            </Button>
            <Button href="/creators" variant="secondary" className="min-w-[12.5rem]">
              Create Your Portfolio
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
