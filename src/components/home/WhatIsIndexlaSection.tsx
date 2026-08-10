import { FadeIn } from "@/components/ui/FadeIn";

export function WhatIsIndexlaSection() {
  return (
    <section className="relative border-t border-line bg-deep py-16 md:py-24">
      <div className="section-pad container-max relative">
        <FadeIn className="mx-auto max-w-[42rem] text-center">
          <h2 className="display text-[clamp(1.75rem,3.5vw,2.5rem)] tracking-[-0.03em] text-ink text-balance">
            What is INDEXLA?
          </h2>

          <p className="mt-6 text-[1.0625rem] leading-[1.7] text-muted sm:text-[1.125rem] sm:leading-[1.75]">
            INDEXLA is a non custodial portfolio management layer for investing
            across crypto, tokenized stocks, commodities, and RWAs, with
            programmable strategies and cross chain execution in one portfolio.
          </p>

          <p className="mt-5 text-[1.02rem] leading-[1.7] text-muted-dim sm:text-[1.05rem]">
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
