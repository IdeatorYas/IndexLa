"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import {
  crBody,
  crGreenBox,
  crGreenText,
  crH2,
  crSection,
  crSurface,
} from "@/components/creators/creatorRhythm";

const weights = [
  { label: "Performance", pct: "35%" },
  { label: "AUM", pct: "30%" },
  { label: "Volume", pct: "20%" },
  { label: "Tips", pct: "15%" },
] as const;

export function CreatorMonthlyRewardsSection() {
  return (
    <section className={`${crSection} bg-void`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={`${crH2} uppercase`}>
            Monthly Creator{" "}
            <span className="gradient-text">Rewards</span>
          </h2>
          <p className={`mx-auto mt-5 max-w-2xl ${crBody} text-balance`}>
            Every month, the Top 25 performing creators compete for a dedicated
            rewards pool funded by a percentage of platform fees from every
            transaction.
          </p>
          <p className={`mx-auto mt-3 max-w-2xl ${crBody} text-balance`}>
            Creators are ranked using a transparent scoring system:
          </p>
        </FadeIn>

        <FadeIn className="mt-9">
          <div className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {weights.map((item) => (
              <div
                key={item.label}
                className={`${crSurface} px-5 py-8 text-center`}
              >
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-muted-dim">
                  {item.label}
                </p>
                <p className="display mt-2 text-[clamp(2.4rem,6vw,3.4rem)] leading-none gradient-text">
                  {item.pct}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn className="mt-5 text-center">
          <p className="text-[0.92rem] font-semibold tracking-[-0.01em] text-ink text-balance sm:text-[1.02rem]">
            Performance 35% + AUM 30% + Volume 20% + Tips 15%
          </p>
        </FadeIn>

        <FadeIn className="mt-9 text-center">
          <div className="inline-flex justify-center">
            <div className={crGreenBox}>
              <p className={`${crGreenText} text-balance`}>
                Build, perform, grow your AUM, and earn your place among the top
                creators.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
