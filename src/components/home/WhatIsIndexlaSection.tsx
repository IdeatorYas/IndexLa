import { FadeIn } from "@/components/ui/FadeIn";
import {
  homeBody,
  homeBodyDim,
  homeH2,
  homeSection,
} from "@/components/home/homeRhythm";

export function WhatIsIndexlaSection() {
  return (
    <section className={`${homeSection} bg-deep`}>
      <div className="section-pad container-max relative">
        <FadeIn className="mx-auto max-w-[40rem] text-center">
          <h2 className={homeH2}>What is INDEXLA?</h2>

          <p className={`mt-6 ${homeBody}`}>
            INDEXLA is a non custodial portfolio management layer for investing
            across crypto, tokenized stocks, commodities, and RWAs, with
            programmable strategies and cross chain execution in one portfolio.
          </p>

          <p className={`mt-5 ${homeBodyDim}`}>
            Build your portfolio, define your rules, and let INDEXLA coordinate
            authorized execution while your assets remain under your control.
          </p>

          <p className="mt-8 text-[1.05rem] font-semibold tracking-[-0.02em] text-ink sm:text-[1.125rem]">
            One Portfolio. Every Asset. Full Control.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
