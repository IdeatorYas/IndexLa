"use client";

import { FadeIn } from "@/components/ui/FadeIn";

const steps = [
  { n: "01", title: "Platform launches", detail: "Onboard creators" },
  { n: "02", title: "Ecosystem scales", detail: "Activity grows" },
  { n: "03", title: "$DEXLA launches", detail: "Token goes live" },
  {
    n: "04",
    title: "Public publishing burn",
    detail: "1,000 $DEXLA required",
  },
] as const;

export function LaunchTimingSection() {
  return (
    <section className="relative border-t border-line bg-deep py-14 md:py-20">
      <div className="section-pad container-max">
        <FadeIn className="max-w-3xl">
          <h2 className="display text-[clamp(1.9rem,4.2vw,3rem)] uppercase tracking-[-0.02em]">
            Launch Timing
          </h2>
          <p className="mt-5 text-[1.05rem] leading-relaxed text-muted">
            $DEXLA launches as the INDEXLA ecosystem scales.
          </p>
          <p className="mt-3 text-[1.02rem] leading-relaxed text-muted">
            The platform can launch and onboard creators before the token is
            introduced.
          </p>
        </FadeIn>

        <FadeIn className="mt-8">
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <li key={step.n} className="relative">
                <div className="h-full rounded-[1.2rem] border border-line bg-void/50 p-4 sm:p-5">
                  <p className="text-[0.7rem] font-semibold tracking-[0.12em] text-electric">
                    {step.n}
                  </p>
                  <p className="display mt-3 text-[1.1rem] tracking-[-0.02em] text-ink">
                    {step.title}
                  </p>
                  <p className="mt-2 text-[0.9rem] text-muted">{step.detail}</p>
                </div>
                {i < steps.length - 1 && (
                  <span
                    className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 text-electric/50 lg:block"
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
            Once $DEXLA is live, publishing public portfolios and indexes will
            require the{" "}
            <span className="font-semibold text-ink">
              1,000 $DEXLA permanent burn
            </span>
            .
          </p>
          <p>
            Private portfolios can remain private without the publishing burn.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
