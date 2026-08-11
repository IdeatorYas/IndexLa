"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import {
  invBody,
  invGreenBox,
  invGreenText,
  invH2,
  invSection,
} from "@/components/investors/investorRhythm";

const steps = [
  {
    n: "01",
    title: "Discover",
    body: "Find portfolios built around different markets and strategies.",
  },
  {
    n: "02",
    title: "Follow",
    body: "Choose a portfolio that matches your conviction.",
  },
  {
    n: "03",
    title: "Customize",
    body: "Adjust assets, allocations, and rules to fit your strategy.",
  },
  {
    n: "04",
    title: "Build",
    body: "Create your own portfolio from the ground up.",
  },
];

export function MarketplaceSection() {
  return (
    <section className={`${invSection} bg-deep`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={`${invH2} uppercase`}>
            Discover. Follow. Customize.{" "}
            <span className="gradient-text">Build.</span>
          </h2>
          <p className={`mt-5 ${invBody}`}>
            You don&apos;t always need to start from scratch.
          </p>
          <p className={`mt-2 ${invBody}`}>
            Explore portfolios built around different investment theses and
            strategies.
          </p>
        </FadeIn>

        <FadeIn className="mt-10">
          <ol className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <li
                key={step.title}
                className="rounded-[1.15rem] border border-line bg-void/45 px-4 py-5 text-center"
              >
                <p className="text-[0.7rem] font-semibold text-electric">
                  {step.n}
                </p>
                <h3 className="mt-1 display text-[1.1rem] text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-[0.88rem] leading-relaxed text-muted">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-center text-[0.85rem] font-semibold uppercase tracking-[0.12em] text-muted-dim">
            Discover → Follow → Customize → Build
          </p>
        </FadeIn>

        <FadeIn className="mt-8 space-y-5 text-center">
          <div className="inline-flex justify-center">
            <div className={invGreenBox}>
              <p className={invGreenText}>
                Don&apos;t blindly copy someone else&apos;s conviction. Make it
                yours.
              </p>
            </div>
          </div>
          <div>
            <Button href="/strategies" className="min-w-[13.5rem]">
              Explore Marketplace
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
