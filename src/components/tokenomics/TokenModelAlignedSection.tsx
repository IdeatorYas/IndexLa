"use client";

import { FadeIn } from "@/components/ui/FadeIn";

const flows = [
  {
    from: "More creators",
    to: "More permanent burns",
  },
  {
    from: "More trading activity",
    to: "More protocol buybacks",
  },
  {
    from: "More Treasury profits",
    to: "More buybacks",
  },
] as const;

export function TokenModelAlignedSection() {
  return (
    <section className="relative overflow-hidden border-t border-line bg-void py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 hero-glow opacity-45" aria-hidden />
      <div className="section-pad container-max relative">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className="display text-[clamp(2rem,4.5vw,3.25rem)] uppercase tracking-[-0.03em] text-balance">
            A Token Model Aligned With{" "}
            <span className="gradient-text">Usage</span>
          </h2>
          <p className="mt-5 text-[1.05rem] leading-relaxed text-muted">
            $DEXLA is built around real INDEXLA activity:
          </p>
        </FadeIn>

        <div className="mx-auto mt-8 grid max-w-4xl gap-3 md:grid-cols-3">
          {flows.map((flow, i) => (
            <FadeIn key={flow.from} delay={i * 0.05} className="h-full">
              <div className="flex h-full flex-col items-center justify-center rounded-[1.25rem] border border-electric/30 bg-gradient-to-b from-electric/12 to-transparent px-5 py-6 text-center">
                <p className="display text-[1.15rem] tracking-[-0.02em] text-ink">
                  {flow.from}
                </p>
                <p className="my-3 text-electric" aria-hidden>
                  →
                </p>
                <p className="display text-[1.15rem] tracking-[-0.02em] text-electric">
                  {flow.to}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mx-auto mt-8 max-w-2xl text-center">
          <p className="text-[1.05rem] leading-relaxed text-muted">
            As INDEXLA activity grows, $DEXLA utility, demand, and burn activity
            can grow with it.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
