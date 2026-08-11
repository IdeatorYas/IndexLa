"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import {
  invGreenBox,
  invGreenText,
  invH2,
  invSection,
} from "@/components/investors/investorRhythm";

export function InvestorFeesSection() {
  return (
    <section className={`${invSection} bg-deep`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={`${invH2} uppercase`}>
            Simple, Transparent{" "}
            <span className="gradient-text">Fees.</span>
          </h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              { value: "0%", label: "Management Fees" },
              { value: "0%", label: "Performance Fees" },
              { value: "0%", label: "Exit Fees" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-line bg-void/50 px-5 py-7 text-center"
              >
                <p className="display text-[2.2rem] leading-none text-ink sm:text-[2.5rem]">
                  {item.value}
                </p>
                <p className="mt-3 text-[0.95rem] font-semibold uppercase tracking-[0.08em] text-muted">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 inline-flex justify-center">
            <div className={invGreenBox}>
              <p className={invGreenText}>
                Only 1% execution fee when trades occur.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
