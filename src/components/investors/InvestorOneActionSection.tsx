"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import {
  invBody,
  invPremiumSurface,
  invSection,
} from "@/components/investors/investorRhythm";

export function InvestorOneActionSection() {
  return (
    <section className={`${invSection} bg-deep`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl">
          <div className={`${invPremiumSurface} px-6 py-9 text-center sm:px-10 sm:py-11`}>
            <p className={`${invBody} text-pretty`}>
              You want one action to buy crypto and tokenized assets across
              different chains. You want to hold the actual assets in your own
              wallet, not a wrapper. You want to automate Buy Fear / Sell Greed
              rules without giving up control.
            </p>
            <p className="mt-6 text-[1.15rem] font-bold leading-snug tracking-[-0.02em] text-ink text-pretty sm:text-[1.28rem]">
              One action. Real assets. Your wallet. Your rules.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
