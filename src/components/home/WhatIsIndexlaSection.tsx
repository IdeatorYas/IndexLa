import { FadeIn } from "@/components/ui/FadeIn";
import {
  homeBodyDim,
  homeGreenBox,
  homeGreenBoxText,
  homeH2,
  homeSection,
} from "@/components/home/homeRhythm";

export function WhatIsIndexlaSection() {
  return (
    <section className={`${homeSection} bg-deep`}>
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(ellipse_at_50%_0%,rgba(56,189,248,0.08),transparent_65%)]"
        aria-hidden
      />
      <div className="section-pad container-max relative">
        <FadeIn className="mx-auto max-w-[46rem] text-center">
          <div className="mx-auto mb-6 h-px w-12 bg-gradient-to-r from-transparent via-electric/70 to-transparent" />

          <h2 className={homeH2}>What is INDEXLA?</h2>

          <p className="mt-7 text-[1.2rem] font-medium leading-[1.75] text-ink sm:text-[1.35rem] sm:leading-[1.7]">
            INDEXLA is a non custodial portfolio management layer for investing
            across crypto, tokenized stocks, commodities, and RWAs, with
            programmable strategies and cross chain execution in one portfolio.
          </p>

          <p className={`mx-auto mt-5 max-w-[40rem] ${homeBodyDim}`}>
            Build your portfolio, define your rules, and let INDEXLA coordinate
            authorized execution while your assets remain under your control.
          </p>

          <div className="mt-9 flex justify-center">
            <div className={homeGreenBox}>
              <p className={homeGreenBoxText}>
                One Portfolio. Every Asset. Full Control.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
