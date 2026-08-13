"use client";

import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { invSection } from "@/components/investors/investorRhythm";
import { homeCta } from "@/components/home/homeRhythm";

export function InvestorFinalCta() {
  return (
    <section
      id="early-access"
      className={`${invSection} relative overflow-hidden border-t border-line bg-deep py-14 md:py-16`}
    >
      <div className="pointer-events-none absolute inset-0 hero-glow opacity-40" aria-hidden />
      <div className="section-pad container-max relative text-center">
        <FadeIn>
          <div className="mx-auto max-w-xl rounded-[1.5rem] border border-electric/35 bg-electric/[0.08] px-6 py-10 shadow-[inset_0_1px_0_rgba(56,189,248,0.14),0_20px_60px_rgba(0,0,0,0.28)] sm:px-10 sm:py-12">
            <Button
              href="/investors#early-access"
              className={`${homeCta} w-full max-w-[22rem]`}
            >
              Reserve Early Access
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
