"use client";

import { FadeIn } from "@/components/ui/FadeIn";

const flows = [
  { from: "More creators", to: "More burns" },
  { from: "More trading activity", to: "More protocol buybacks" },
  { from: "More Treasury profits", to: "More buybacks" },
] as const;

const chain = [
  "More creators",
  "More burns",
  "More activity",
  "More buybacks",
  "Greater scarcity",
] as const;

export function TokenModelAlignedSection() {
  return (
    <section className="relative overflow-hidden border-t border-line bg-deep py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 hero-glow opacity-40" aria-hidden />
      <div className="section-pad container-max relative">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className="display text-[clamp(2rem,4.5vw,3.25rem)] uppercase tracking-[-0.03em] text-balance">
            A Token Model Built Around{" "}
            <span className="gradient-text">Usage</span>
          </h2>
        </FadeIn>

        <div className="mx-auto mt-8 grid max-w-4xl gap-3 md:grid-cols-3">
          {flows.map((flow, i) => (
            <FadeIn key={flow.from} delay={i * 0.04} className="h-full">
              <div className="flex h-full flex-col items-center justify-center rounded-[1.25rem] border border-electric/30 bg-gradient-to-b from-electric/12 to-transparent px-5 py-6 text-center">
                <p className="display text-[1.1rem] tracking-[-0.02em] text-ink">
                  {flow.from}
                </p>
                <p className="my-3 text-electric" aria-hidden>
                  →
                </p>
                <p className="display text-[1.1rem] tracking-[-0.02em] text-electric">
                  {flow.to}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mx-auto mt-8 max-w-4xl">
          <div className="rounded-[1.35rem] border border-line-strong glass-soft p-4 sm:p-6">
            <p className="text-center text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-muted-dim">
              Compounding loop
            </p>
            <ol className="mt-4 flex flex-col items-stretch gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
              {chain.map((step, i) => (
                <li key={step} className="flex items-center gap-2">
                  <span className="rounded-lg border border-electric/30 bg-electric/10 px-3 py-2 text-center text-[0.9rem] font-semibold text-ink">
                    {step}
                  </span>
                  {i < chain.length - 1 && (
                    <span className="text-electric/50" aria-hidden>
                      →
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </FadeIn>

        <FadeIn className="mx-auto mt-8 max-w-2xl text-center">
          <p className="text-[1.05rem] leading-relaxed text-muted">
            The growth of INDEXLA scales the utility and deflationary mechanisms
            of $DEXLA.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
