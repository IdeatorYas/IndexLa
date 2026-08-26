"use client";

import { EarlyAccessCta } from "@/components/early-access/EarlyAccessCta";
import { FadeIn } from "@/components/ui/FadeIn";
import {
  homeBody,
  homeCta,
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
        <FadeIn className="mx-auto max-w-4xl text-center">
          <h2 className="display text-[clamp(2rem,5.2vw,3.35rem)] font-semibold tracking-[-0.035em] leading-[1.08]">
            <span className="block text-ink sm:inline sm:whitespace-nowrap">
              Your Thesis.
            </span>{" "}
            <span className="mt-1 block text-ink sm:mt-0 sm:inline sm:whitespace-nowrap">
              Your Product.
            </span>{" "}
            <span className="mt-1 block gradient-text sm:mt-0 sm:inline sm:whitespace-nowrap">
              Your Revenue.
            </span>
          </h2>
          <p className={`mx-auto mt-6 max-w-3xl ${homeBody}`}>
            Build, publish and distribute investable portfolios while investors
            retain ownership of the underlying assets.
          </p>
        </FadeIn>

        <FadeIn className="mt-12 text-center">
          <div className="mx-auto max-w-5xl rounded-[1.75rem] border border-electric/30 bg-gradient-to-b from-electric/[0.1] via-purple/[0.06] to-transparent px-4 py-8 sm:px-8 sm:py-10">
            <h3 className={`${homeH3} text-electric`}>Four Ways to Earn</h3>
            <div className="mx-auto mt-8 grid max-w-4xl gap-3.5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
              {EARN_WAYS.map((way) => (
                <div
                  key={way}
                  className="flex min-h-[7.5rem] items-center justify-center rounded-2xl border border-electric/40 bg-void/70 px-4 py-6 shadow-[0_12px_40px_-24px_rgba(56,189,248,0.55),inset_0_1px_0_rgba(56,189,248,0.18)] sm:min-h-[8.25rem]"
                >
                  <p className="display text-[1.15rem] font-semibold tracking-[-0.02em] text-ink text-balance sm:text-[1.25rem]">
                    {way}
                  </p>
                </div>
              ))}
            </div>
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
