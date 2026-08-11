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
          <div className="mx-auto max-w-3xl overflow-hidden rounded-[1.35rem] border border-line bg-void/45">
            <ol className="divide-y divide-line">
              {steps.map((step, i) => (
                <li
                  key={step.title}
                  className="flex items-start gap-4 px-5 py-5 sm:gap-5 sm:px-7"
                >
                  <span className="display shrink-0 text-[1.35rem] gradient-text">
                    {step.n}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="display text-[1.15rem] text-ink">
                        {step.title}
                      </h3>
                      {i < steps.length - 1 && (
                        <span className="text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-muted-dim">
                          → {steps[i + 1].title}
                        </span>
                      )}
                    </div>
                    <p className="mt-1.5 text-[0.95rem] leading-relaxed text-muted">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
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
