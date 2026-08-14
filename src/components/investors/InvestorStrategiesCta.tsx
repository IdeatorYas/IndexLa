"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import {
  invBody,
  invH2,
  invSection,
} from "@/components/investors/investorRhythm";
import { homeCta } from "@/components/home/homeRhythm";

export function InvestorStrategiesCta() {
  return (
    <section className={`${invSection} bg-deep`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <div className="overflow-hidden rounded-[1.35rem] border border-electric/25 bg-gradient-to-br from-electric/[0.08] via-void/50 to-purple/[0.06] px-6 py-10 sm:px-10 sm:py-12">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-electric">
              Strategies
            </p>
            <h2 className={`mt-4 ${invH2} uppercase`}>
              Explore The Full{" "}
              <span className="gradient-text">Strategies Library.</span>
            </h2>
            <p className={`mx-auto mt-5 max-w-xl ${invBody} text-balance`}>
              Dive deeper into INDEXLA&apos;s rule-based strategies and how they
              work together inside your portfolio.
            </p>
            <div className="mt-8 flex justify-center">
              <Button href="/strategies" className={`${homeCta} min-w-[15rem]`}>
                Explore Strategies
              </Button>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
