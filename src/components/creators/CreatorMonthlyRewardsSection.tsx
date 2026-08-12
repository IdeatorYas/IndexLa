"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import {
  crBody,
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
            Creator Reward{" "}
            <span className="gradient-text">Scoring</span>
          </h2>
          <p className={`mx-auto mt-5 max-w-2xl ${crBody} text-balance`}>
            Top 25 creators ranked by performance points:
          </p>
          <p className="mx-auto mt-4 display text-[clamp(1rem,2.5vw,1.25rem)] font-semibold tracking-[-0.01em] text-ink">
            Performance 35% + AUM 30% + Volume 20% + Tips 15%
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
      </div>
    </section>
  );
}
