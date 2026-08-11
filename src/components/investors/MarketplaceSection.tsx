"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import { PortfolioCard } from "@/components/home/PortfolioCard";
import { PORTFOLIOS } from "@/lib/site";
import {
  invBody,
  invGreenBox,
  invGreenText,
  invH2,
  invSection,
} from "@/components/investors/investorRhythm";

const actions = [
  {
    n: "01",
    title: "DISCOVER",
    body: "Find portfolios built around different markets and strategies.",
  },
  {
    n: "02",
    title: "FOLLOW",
    body: "Choose a portfolio that matches your conviction.",
  },
  {
    n: "03",
    title: "CUSTOMIZE",
    body: "Adjust assets, allocations, and rules to fit your strategy.",
  },
  {
    n: "04",
    title: "BUILD",
    body: "Create your own portfolio from the ground up.",
  },
];

export function MarketplaceSection() {
  const previews = PORTFOLIOS.slice(0, 3);

  return (
    <section className={`${invSection} bg-deep`}>
      <div className="section-pad container-max">
        <FadeIn className="max-w-3xl">
          <h2 className={`${invH2} uppercase`}>
            Discover. Follow. Customize.{" "}
            <span className="gradient-text">Build.</span>
          </h2>
          <p className={`mt-5 ${invBody}`}>
            You don&apos;t always need to start from scratch. Explore portfolios
            built around different investment theses and strategies.
          </p>
        </FadeIn>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {actions.map((action, i) => (
            <FadeIn key={action.title} delay={i * 0.04}>
              <article className="h-full rounded-[1.2rem] border border-line bg-void/40 p-5">
                <span className="text-[0.7rem] font-semibold text-electric">
                  {action.n}
                </span>
                <h3 className="mt-2 display text-[1.1rem]">{action.title}</h3>
                <p className="mt-3 text-[0.92rem] leading-relaxed text-muted">
                  {action.body}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-8">
          <div className="grid gap-4 md:grid-cols-3">
            {previews.map((portfolio) => (
              <PortfolioCard key={portfolio.id} portfolio={portfolio} />
            ))}
          </div>
        </FadeIn>

        <FadeIn className="mt-8 space-y-5">
          <div className={invGreenBox}>
            <p className={invGreenText}>
              Don&apos;t blindly copy someone else&apos;s conviction. Make it
              yours.
            </p>
          </div>
          <Button href="/strategies" className="min-w-[13.5rem]">
            Explore Marketplace
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
