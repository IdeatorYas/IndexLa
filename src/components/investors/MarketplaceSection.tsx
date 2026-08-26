"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { EarlyAccessCta } from "@/components/early-access/EarlyAccessCta";
import {
  invBody,
  invGreenBox,
  invGreenText,
  invH2,
  invPremiumSurface,
  invSection,
} from "@/components/investors/investorRhythm";
import { homeCta } from "@/components/home/homeRhythm";

const STEPS = [
  {
    n: "01",
    title: "Browse",
    body: "Explore portfolios published by INDEXLA creators.",
  },
  {
    n: "02",
    title: "Compare",
    body: "Review assets, allocations, strategies and performance.",
  },
  {
    n: "03",
    title: "Customize",
    body: "Choose a portfolio and adjust it around your conviction.",
  },
] as const;

export function MarketplaceSection() {
  return (
    <section className={`${invSection} bg-void`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={`${invH2} uppercase`}>
            Discover Creator{" "}
            <span className="gradient-text">Portfolios.</span>
          </h2>
          <p className={`mt-5 ${invBody}`}>
            Browse portfolios created around different markets, assets and
            investment strategies.
          </p>
        </FadeIn>

        <FadeIn className="mt-10" delay={0.04}>
          <div className="flex flex-col gap-3 xl:flex-row xl:items-stretch xl:gap-3">
            {STEPS.map((step, i) => (
              <div
                key={step.n}
                className="flex flex-col gap-3 xl:min-w-0 xl:flex-1 xl:flex-row xl:items-stretch"
              >
                <article
                  className={`${invPremiumSurface} flex h-full min-h-[12.5rem] flex-1 flex-col items-center px-5 py-7 text-center sm:px-6 sm:py-8`}
                >
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-electric">
                    {step.n} · {step.title}
                  </p>
                  <h3 className="mt-4 display text-[1.35rem] font-semibold tracking-[-0.025em] text-ink sm:text-[1.45rem]">
                    {step.title}
                  </h3>
                  <p className={`mt-4 flex-1 ${invBody}`}>{step.body}</p>
                </article>
                {i < STEPS.length - 1 ? (
                  <div
                    className="flex shrink-0 items-center justify-center text-electric/70 xl:w-5"
                    aria-hidden
                  >
                    <span className="text-[1.25rem] font-semibold xl:hidden">
                      ↓
                    </span>
                    <span className="hidden text-[1.2rem] font-semibold xl:inline">
                      →
                    </span>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn className="mx-auto mt-10 max-w-3xl text-center" delay={0.08}>
          <div className={invGreenBox}>
            <p className={invGreenText}>
              Discover the Idea. Make It Yours.
            </p>
          </div>
          <div className="mt-7 flex justify-center">
            <EarlyAccessCta className={`${homeCta} inline-flex`}>
              Reserve Early Access
            </EarlyAccessCta>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
