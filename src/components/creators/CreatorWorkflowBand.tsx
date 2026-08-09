"use client";

import { FadeIn } from "@/components/ui/FadeIn";

const steps = [
  { n: "01", title: "CHOOSE" },
  { n: "02", title: "ALLOCATE" },
  { n: "03", title: "DEFINE" },
  { n: "04", title: "PUBLISH" },
] as const;

/** Compact full-width bridge between hero and build flow */
export function CreatorWorkflowBand() {
  return (
    <section className="relative border-t border-line/50 bg-void pb-12 pt-4 md:pb-14 md:pt-6">
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-4xl text-center">
          <p className="display text-[clamp(1.45rem,3.2vw,2.15rem)] tracking-[-0.03em] text-balance">
            Set it up once. Keep building.{" "}
            <span className="gradient-text">Keep earning.</span>
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-[1.05rem] leading-relaxed text-muted sm:text-[1.125rem]">
            Choose the assets. Set the allocations. Define the strategy.
            Publish.
          </p>
        </FadeIn>

        <FadeIn className="mt-9 md:mt-10">
          <div className="relative mx-auto max-w-4xl">
            <div
              className="pointer-events-none absolute left-[12%] right-[12%] top-[1.35rem] hidden h-px bg-gradient-to-r from-electric/10 via-electric/40 to-electric/10 md:block"
              aria-hidden
            />
            <ol className="grid grid-cols-2 gap-y-6 md:grid-cols-4 md:gap-0">
              {steps.map((step) => (
                <li key={step.n} className="relative flex flex-col items-center text-center">
                  <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-electric/35 bg-void text-[0.72rem] font-semibold tracking-[0.08em] text-electric">
                    {step.n}
                  </span>
                  <span className="display mt-3 text-[1.05rem] tracking-[-0.02em] text-ink sm:text-[1.15rem]">
                    {step.title}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
