"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import {
  crBody,
  crBodyStrong,
  crGreenBox,
  crGreenText,
  crH2,
  crSection,
} from "@/components/creators/creatorRhythm";

export function CreatorStopSellingLinksSection() {
  return (
    <section className={`${crSection} bg-deep`}>
      <div className="section-pad container-max">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-12">
          <FadeIn>
            <h2 className={`${crH2} uppercase`}>
              Stop Selling Links. Build Something Your Audience Can{" "}
              <span className="gradient-text">Follow.</span>
            </h2>
            <p className={`mt-5 ${crBody}`}>
              Create a portfolio around the conviction your audience already
              follows you for.
            </p>
            <p className={`mt-3 ${crBody}`}>
              Followers can discover your strategy, customize it, and automate
              execution according to their own permissions.
            </p>
            <div className="mt-7">
              <div className={crGreenBox}>
                <p className={crGreenText}>
                  Your content creates attention. Your portfolio creates
                  something that lasts.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.06}>
            <div className="space-y-3">
              <div className="rounded-[1.2rem] border border-danger/25 bg-danger/[0.06] px-5 py-5">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-danger/80">
                  Old model
                </p>
                <p className="mt-3 display text-[1.25rem] text-ink">
                  Affiliate links
                </p>
                <p className="mt-2 text-[0.95rem] text-muted">
                  Click → leave → forgotten
                </p>
              </div>
              <div className="flex justify-center text-electric/60" aria-hidden>
                ↓
              </div>
              <div className="rounded-[1.2rem] border border-success/30 bg-success/[0.07] px-5 py-5">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-success">
                  INDEXLA
                </p>
                <p className="mt-3 display text-[1.25rem] text-ink">
                  Followable portfolio
                </p>
                <p className={`mt-2 ${crBodyStrong}`}>
                  Discover → Customize → Automate
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
