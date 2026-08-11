"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import {
  tkBody,
  tkH2,
  tkSection,
  tkSurfaceSoft,
} from "@/components/tokenomics/tokenomicsRhythm";

export function LaunchTimingSection() {
  return (
    <section className={`${tkSection} bg-void`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <h2 className={`${tkH2} uppercase`}>
            Launch{" "}
            <span className="gradient-text">Timing</span>
          </h2>
          <div className={`mt-8 ${tkSurfaceSoft} px-5 py-7 sm:px-8`}>
            <p className={`${tkBody} text-balance`}>
              INDEXLA can launch and onboard creators before $DEXLA is
              introduced.
            </p>
            <p className={`mt-4 ${tkBody} text-balance`}>
              This allows the platform to establish real users, portfolios, and
              activity before token utility is activated.
            </p>
            <p className={`mt-4 ${tkBody} text-balance`}>
              Once $DEXLA launches, the token economy becomes active across
              publishing, promotion, fee benefits, creator tipping, and the
              protocol&apos;s burn mechanisms.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
