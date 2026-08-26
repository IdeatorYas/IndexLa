"use client";

import { EarlyAccessCta } from "@/components/early-access/EarlyAccessCta";
import { FadeIn } from "@/components/ui/FadeIn";
import {
  homeBody,
  homeCta,
  homeSection,
} from "@/components/home/homeRhythm";

const EARN_WAYS = [
  {
    label: "50% Execution Fees",
    shell:
      "border-electric/45 bg-electric/[0.1] shadow-[inset_0_1px_0_rgba(56,189,248,0.2)]",
    text: "text-electric",
  },
  {
    label: "Strategy Access",
    shell:
      "border-cyan/45 bg-cyan/[0.1] shadow-[inset_0_1px_0_rgba(34,211,238,0.2)]",
    text: "text-cyan",
  },
  {
    label: "Monthly Rewards",
    shell:
      "border-purple-bright/45 bg-purple/[0.12] shadow-[inset_0_1px_0_rgba(167,139,250,0.2)]",
    text: "text-purple-bright",
  },
  {
    label: "$DEXLA Tips",
    shell:
      "border-blue/45 bg-blue/[0.12] shadow-[inset_0_1px_0_rgba(59,130,246,0.2)]",
    text: "text-blue",
  },
] as const;

export function CreatorRevenueSection() {
  return (
    <section className={`${homeSection} bg-void`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-4xl text-center">
          <h2 className="display text-[clamp(2rem,5.2vw,3.35rem)] font-semibold tracking-[-0.035em] leading-[1.08]">
            <span className="block text-ink">Your Thesis.</span>
            <span className="mt-2 block text-ink sm:mt-2.5">Your Product.</span>
            <span className="mt-2 block gradient-text sm:mt-2.5">
              Your Revenue.
            </span>
          </h2>
          <p className={`mx-auto mt-6 max-w-3xl ${homeBody}`}>
            Build, publish and distribute investable portfolios while investors
            retain ownership of the underlying assets.
          </p>
        </FadeIn>

        <FadeIn className="mt-12 text-center">
          <div className="mx-auto max-w-5xl rounded-[1.75rem] border border-electric/30 bg-gradient-to-b from-electric/[0.1] via-purple/[0.05] to-transparent px-4 py-8 sm:px-8 sm:py-10">
            <h3 className="display text-[clamp(1.45rem,3vw,1.9rem)] font-semibold tracking-[-0.025em] text-electric">
              Four Ways to Earn
            </h3>
            <div className="mx-auto mt-8 grid max-w-4xl gap-3.5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
              {EARN_WAYS.map((way) => (
                <div
                  key={way.label}
                  className={`flex min-h-[7.75rem] items-center justify-center rounded-2xl border px-3 py-6 sm:min-h-[8.5rem] sm:px-4 ${way.shell}`}
                >
                  <p
                    className={`display whitespace-nowrap text-[0.98rem] font-semibold tracking-[-0.02em] sm:text-[1.08rem] ${way.text}`}
                  >
                    {way.label}
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
