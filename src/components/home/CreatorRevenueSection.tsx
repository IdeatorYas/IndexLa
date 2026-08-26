"use client";

import Link from "next/link";
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
      "border-electric/50 bg-gradient-to-b from-electric/20 to-electric/[0.06]",
    text: "text-electric",
    glow: "shadow-[0_10px_28px_-16px_rgba(56,189,248,0.7)]",
  },
  {
    label: "Strategy Access",
    shell: "border-cyan/50 bg-gradient-to-b from-cyan/20 to-cyan/[0.06]",
    text: "text-cyan",
    glow: "shadow-[0_10px_28px_-16px_rgba(34,211,238,0.65)]",
  },
  {
    label: "Monthly Rewards",
    shell:
      "border-purple-bright/50 bg-gradient-to-b from-purple/25 to-purple/[0.08]",
    text: "text-purple-bright",
    glow: "shadow-[0_10px_28px_-16px_rgba(167,139,250,0.65)]",
  },
  {
    label: "$DEXLA Tips",
    shell: "border-blue/50 bg-gradient-to-b from-blue/25 to-blue/[0.08]",
    text: "text-blue",
    glow: "shadow-[0_10px_28px_-16px_rgba(59,130,246,0.65)]",
  },
] as const;

export function CreatorRevenueSection() {
  return (
    <section className={`${homeSection} bg-void`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-4xl text-center">
          <h2 className="display text-[clamp(2rem,5.2vw,3.35rem)] font-semibold tracking-[-0.035em] leading-[1.08]">
            <span className="block text-ink">Your Thesis</span>
            <span className="mt-2 block text-ink sm:mt-2.5">Your Product</span>
            <span className="mt-2 block gradient-text sm:mt-2.5">
              Your Revenue
            </span>
          </h2>
          <p className={`mx-auto mt-6 max-w-3xl ${homeBody}`}>
            Build, publish and distribute investable portfolios while investors
            retain ownership of the underlying assets.
          </p>
        </FadeIn>

        <FadeIn className="mt-12 text-center">
          <div className="mx-auto mb-5 flex max-w-5xl justify-center">
            <div className="rounded-2xl border border-electric/40 bg-electric/[0.1] px-6 py-3.5 shadow-[inset_0_1px_0_rgba(56,189,248,0.18)] sm:px-8">
              <h3 className="display text-[clamp(1.25rem,2.6vw,1.55rem)] font-semibold tracking-[-0.025em] text-ink">
                Four Ways to Earn
              </h3>
            </div>
          </div>

          <div className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3.5">
            {EARN_WAYS.map((way) => (
              <div
                key={way.label}
                className={`flex min-h-[5.25rem] items-center justify-center rounded-xl border px-3 py-4 sm:min-h-[5.75rem] ${way.shell} ${way.glow}`}
              >
                <p
                  className={`display whitespace-nowrap text-[0.92rem] font-semibold tracking-[-0.02em] sm:text-[1rem] ${way.text}`}
                >
                  {way.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="/creators"
              className={`inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple to-blue font-semibold text-white transition-all duration-300 hover:brightness-110 ${homeCta}`}
            >
              Explore Creator Program
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
