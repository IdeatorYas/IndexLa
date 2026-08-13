import { FadeIn } from "@/components/ui/FadeIn";
import { HomeReadMore } from "@/components/home/HomeReadMore";
import {
  homeBody,
  homeBodyStrong,
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

          <p className="text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-electric">
            What is INDEXLA?
          </p>
          <h2 className={`mt-3 ${homeH2}`}>Decentralized Portfolio Management</h2>

          <p className={`mx-auto mt-5 max-w-[42rem] ${homeBody}`}>
            INDEXLA is a decentralized portfolio management platform for crypto
            and tokenized assets.
          </p>

          <p className={`mx-auto mt-5 max-w-[40rem] ${homeBody}`}>
            Build your own portfolio, discover creator strategies, or automate
            your investment rules from one interface.
          </p>

          <p className={`mx-auto mt-7 max-w-[40rem] ${homeBodyStrong}`}>
            Crypto + Tokenized Assets → One Portfolio → One Interface
          </p>

          <p className={`mx-auto mt-5 max-w-[40rem] ${homeBody}`}>
            Your assets remain in your wallet. INDEXLA can never touch your
            funds.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
            <HomeReadMore href="/investors" label="Investor Guide →" />
            <HomeReadMore href="/creators" label="Creator Guide →" />
            <HomeReadMore href="/strategies" label="Strategies →" />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
