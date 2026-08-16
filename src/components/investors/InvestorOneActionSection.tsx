"use client";

import Image from "next/image";
import { FadeIn } from "@/components/ui/FadeIn";
import {
  invPremiumSurface,
  invSection,
} from "@/components/investors/investorRhythm";
import { LOGO_TRANSPARENT } from "@/lib/site";

export function InvestorOneActionSection() {
  return (
    <section className={`${invSection} bg-deep`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-4xl">
          <div
            className={`${invPremiumSurface} relative overflow-hidden px-6 py-14 text-center sm:px-12 sm:py-16 md:px-14 md:py-[4.75rem]`}
          >
            <div
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
              aria-hidden
            >
              <Image
                src={LOGO_TRANSPARENT}
                alt=""
                width={220}
                height={220}
                className="h-[9.5rem] w-[9.5rem] object-contain opacity-[0.07] sm:h-[11.5rem] sm:w-[11.5rem] md:h-[13rem] md:w-[13rem]"
                priority={false}
              />
            </div>

            <div className="relative z-[1] mx-auto flex min-h-[14rem] max-w-3xl flex-col items-center justify-center sm:min-h-[16rem]">
              <p className="text-[1.2rem] font-medium leading-[1.7] tracking-[-0.015em] text-muted text-pretty text-balance sm:text-[1.35rem] sm:leading-[1.75] md:text-[1.45rem]">
                You want one action to buy crypto and tokenized assets across
                different chains. You want to hold the actual assets in your own
                wallet, not a wrapper. You want to automate Buy Fear / Sell Greed
                rules without giving up control.
              </p>
              <p className="mt-8 text-[1.35rem] font-bold leading-snug tracking-[-0.025em] text-ink text-pretty text-balance sm:mt-9 sm:text-[1.55rem] md:text-[1.7rem]">
                One action. Real assets. Your wallet. Your rules.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
