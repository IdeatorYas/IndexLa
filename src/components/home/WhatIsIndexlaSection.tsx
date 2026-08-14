import { FadeIn } from "@/components/ui/FadeIn";
import { HomeReadMore } from "@/components/home/HomeReadMore";
import {
  homeBody,
  homeEyebrow,
  homeH2,
  homeMeasure,
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
        <FadeIn className="text-center">
          <div className="mx-auto mb-6 h-px w-12 bg-gradient-to-r from-transparent via-electric/70 to-transparent" />

          <p className={homeEyebrow}>What is INDEXLA?</p>
          <h2 className={`mx-auto mt-3 ${homeMeasure} ${homeH2}`}>
            Decentralized Portfolio Management
          </h2>

          <div className={`mx-auto mt-7 space-y-5 ${homeMeasure} ${homeBody}`}>
            <p>
              INDEXLA is a decentralized portfolio management platform for crypto
              and tokenized assets.
            </p>
            <p>
              Build your own portfolio, discover creator strategies, or automate
              your investment rules from one interface.
            </p>
          </div>

          <p
            className={`mx-auto mt-8 max-w-full px-1 text-[clamp(0.95rem,1.65vw,1.175rem)] font-semibold leading-snug tracking-[-0.015em] text-ink text-balance sm:whitespace-nowrap sm:px-0 sm:text-[1.175rem]`}
          >
            Crypto + Tokenized Assets → One Portfolio → One Interface
          </p>

          <p className={`mx-auto mt-5 ${homeMeasure} ${homeBody}`}>
            Your assets remain in your wallet. INDEXLA can never touch your
            funds.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <HomeReadMore href="/investors" label="Investor Guide →" />
            <HomeReadMore href="/creators" label="Creator Guide →" />
            <HomeReadMore href="/strategies" label="Strategies →" />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
