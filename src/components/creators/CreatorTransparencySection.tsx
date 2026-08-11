"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import {
  crBody,
  crGreenBox,
  crGreenText,
  crH2,
  crSection,
} from "@/components/creators/creatorRhythm";

const pillars = [
  { title: "Your strategy is visible.", tone: "border-line" },
  { title: "Your rules are defined.", tone: "border-line" },
  { title: "Your track record can speak for itself.", tone: "border-line" },
];

export function CreatorTransparencySection() {
  return (
    <section className={`${crSection} bg-deep`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={`${crH2} uppercase`}>
            Transparency Builds{" "}
            <span className="gradient-text">Trust.</span>
          </h2>
        </FadeIn>

        <FadeIn className="mt-8">
          <div className="mx-auto grid max-w-3xl gap-3 sm:grid-cols-3">
            {pillars.map((item) => (
              <div
                key={item.title}
                className={`rounded-[1.15rem] border ${item.tone} bg-void/45 px-4 py-5 text-center`}
              >
                <p className="text-[0.95rem] font-semibold leading-snug text-ink">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn className="mx-auto mt-6 max-w-xl space-y-2 text-center">
          <p className={crBody}>No promises of perfect calls.</p>
          <p className={crBody}>No hidden custody.</p>
        </FadeIn>

        <FadeIn className="mt-7 text-center">
          <div className="inline-flex justify-center">
            <div className={crGreenBox}>
              <p className={crGreenText}>
                Build something your audience can understand, follow, and judge
                for themselves.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
