"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import {
  crBody,
  crH2,
  crSection,
} from "@/components/creators/creatorRhythm";

const steps = [
  {
    title: "Follow",
    body: "Choose your portfolio.",
  },
  {
    title: "Customize",
    body: "Adjust assets and allocations to fit their conviction.",
  },
  {
    title: "Allocate",
    body: "Put capital behind the strategy while keeping custody.",
  },
] as const;

export function CreatorParticipantsSection() {
  return (
    <section className={`${crSection} bg-deep`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={`${crH2} uppercase`}>
            From Followers To{" "}
            <span className="gradient-text">Portfolio Participants.</span>
          </h2>
          <p className={`mt-5 ${crBody}`}>
            Your audience doesn&apos;t need another signal to chase.
          </p>
          <p className={`mt-3 ${crBody}`}>
            Give them something they can evaluate, customize, and choose to
            follow.
          </p>
        </FadeIn>

        <FadeIn className="mt-10">
          <div className="mx-auto grid max-w-4xl gap-3 md:grid-cols-3">
            {steps.map((step, i) => (
              <article
                key={step.title}
                className="relative rounded-[1.2rem] border border-line bg-void/50 px-5 py-6 text-center"
              >
                <p className="display text-[1.4rem] gradient-text">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 display text-[1.25rem] tracking-[-0.02em] text-ink uppercase">
                  {step.title}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
                  {step.body}
                </p>
                {i < steps.length - 1 && (
                  <span
                    className="pointer-events-none absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 text-electric/40 md:block"
                    aria-hidden
                  >
                    →
                  </span>
                )}
              </article>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
