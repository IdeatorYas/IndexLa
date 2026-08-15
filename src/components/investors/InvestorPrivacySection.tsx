"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import {
  invBody,
  invEyebrow,
  invH2,
  invSection,
} from "@/components/investors/investorRhythm";

export function InvestorPrivacySection() {
  return (
    <section className={`${invSection} bg-deep`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <p className={invEyebrow}>PRIVACY &amp; MEV PROTECTION</p>
          <h2 className={`mt-3 ${invH2} uppercase`}>
            Protect Your Transactions.{" "}
            <span className="gradient-text">Reduce MEV Exposure.</span>
          </h2>
          <p className={`mx-auto mt-6 max-w-2xl ${invBody} text-balance`}>
            INDEXLA is designed to minimize unnecessary exposure of transaction
            and trade details where supported. MEV-aware execution helps reduce
            exposure to front-running and sandwich attacks.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
