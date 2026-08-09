"use client";

import { FadeIn } from "@/components/ui/FadeIn";

const steps = [
  { n: "01", title: "INDEXLA launches" },
  { n: "02", title: "Creators onboard" },
  { n: "03", title: "$DEXLA launches" },
  { n: "04", title: "Public publishing burn activates" },
] as const;

export function LaunchTimingSection() {
  return (
    <section className="relative border-t border-line bg-void py-14 md:py-20">
      <div className="section-pad container-max">
        <FadeIn className="max-w-3xl">
          <h2 className="display text-[clamp(1.9rem,4.2vw,3rem)] uppercase tracking-[-0.02em]">
            Launch Timing
          </h2>
          <p className="mt-5 text-[1.05rem] leading-relaxed text-muted">
            $DEXLA launches as the INDEXLA ecosystem scales.
          </p>
          <p className="mt-3 text-[1.02rem] leading-relaxed text-muted">
            INDEXLA can launch and onboard creators before the token is
            introduced.
          </p>
        </FadeIn>

        <FadeIn className="mt-8">
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <li key={step.n} className="relative">
                <div className="flex h-full flex-col rounded-[1.2rem] border border-line bg-deep/55 p-4 sm:p-5">
                  <p className="text-[0.7rem] font-semibold tracking-[0.12em] text-electric">
                    {step.n}
                  </p>
                  <p className="display mt-3 text-[1.05rem] leading-snug tracking-[-0.02em] text-ink sm:text-[1.1rem]">
                    {step.title}
                  </p>
                </div>
                {i < steps.length - 1 && (
                  <span
                    className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 text-electric/45 lg:block"
                    aria-hidden
                  >
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>
        </FadeIn>

        <FadeIn className="mt-8 max-w-3xl space-y-3 text-[1.02rem] leading-relaxed text-muted">
          <p>
            Once $DEXLA launches, the 1,000 $DEXLA burn becomes required for
            public portfolio and index publishing.
          </p>
          <p>
            This allows INDEXLA to establish real platform activity before token
            utility is activated.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
