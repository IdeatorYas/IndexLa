import { FadeIn } from "@/components/ui/FadeIn";
import { HomeReadMore } from "@/components/home/HomeReadMore";
import {
  homeBody,
  homeBodyStrong,
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
        <FadeIn className={`${homeMeasure} text-center`}>
          <div className="mx-auto mb-6 h-px w-12 bg-gradient-to-r from-transparent via-electric/70 to-transparent" />

          <p className={homeEyebrow}>What is INDEXLA?</p>
          <h2 className={`mt-3 ${homeH2}`}>
            Decentralized Portfolio Management
          </h2>

          <div className={`mt-7 space-y-5 ${homeBody}`}>
            <p>
              INDEXLA is a decentralized portfolio management platform for crypto
              and tokenized assets.
            </p>
            <p>
              Build your own portfolio, discover creator strategies, or automate
              your investment rules from one interface.
            </p>
          </div>

          <p className={`mt-8 ${homeBodyStrong}`}>
            Crypto + Tokenized Assets → One Portfolio → One Interface
          </p>

          <p className={`mt-5 ${homeBody}`}>
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
