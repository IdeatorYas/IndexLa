"use client";

import { EarlyAccessCta } from "@/components/early-access/EarlyAccessCta";
import { FadeIn } from "@/components/ui/FadeIn";
import {
  homeBody,
  homeCta,
  homeH2,
  homeH3,
  homeSection,
} from "@/components/home/homeRhythm";

const EARN_WAYS = [
  "50% Execution Fees",
  "Strategy Access",
  "Monthly Rewards",
  "$DEXLA Tips",
] as const;

export function CreatorRevenueSection() {
  return (
    <section className={`${homeSection} bg-void`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={homeH2}>
            Your Thesis. Your Product.{" "}
            <span className="gradient-text">Your Revenue.</span>
          </h2>
          <p className={`mt-6 ${homeBody}`}>
            Build, publish and distribute investable portfolios while investors
            retain ownership of the underlying assets.
          </p>
        </FadeIn>

        <FadeIn className="mt-10 text-center">
          <h3 className={homeH3}>Four Ways to Earn</h3>
          <div className="mx-auto mt-6 grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {EARN_WAYS.map((way) => (
              <div
                key={way}
                className="flex min-h-[5.5rem] items-center justify-center rounded-2xl border border-electric/35 bg-electric/[0.08] px-4 py-5 shadow-[inset_0_1px_0_rgba(56,189,248,0.14)]"
              >
                <p className="display text-[1.05rem] font-semibold tracking-[-0.02em] text-electric text-balance sm:text-[1.15rem]">
                  {way}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <EarlyAccessCta mode="creator" className={homeCta}>
              Become a Creator
            </EarlyAccessCta>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
