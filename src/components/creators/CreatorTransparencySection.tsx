"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import {
  crBody,
  crGreenBox,
  crGreenText,
  crH2,
  crSection,
} from "@/components/creators/creatorRhythm";

const points = [
  "Your strategy and track record can be evaluated by the people who choose to follow it.",
  "You decide what your portfolio holds and how it behaves.",
  "Followers decide whether to allocate.",
] as const;

export function CreatorTransparencySection() {
  return (
    <section className={`${crSection} bg-deep`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={`${crH2} uppercase`}>
            Transparency Builds{" "}
            <span className="gradient-text">Credibility.</span>
          </h2>
        </FadeIn>

        <FadeIn className="mt-8">
          <div className="mx-auto max-w-2xl space-y-3">
            {points.map((line) => (
              <div
                key={line}
                className="rounded-xl border border-line bg-void/45 px-5 py-4 text-center"
              >
                <p className="text-[1rem] font-medium leading-relaxed text-ink sm:text-[1.05rem]">
                  {line}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn className="mx-auto mt-6 max-w-2xl text-center">
          <p className={crBody}>
            Portfolio performance can go up or down. Creators are responsible
            for communicating their strategy and risks clearly.
          </p>
        </FadeIn>

        <FadeIn className="mt-7 text-center">
          <div className="inline-flex justify-center">
            <div className={crGreenBox}>
              <p className={crGreenText}>
                Don&apos;t sell certainty. Build something you can stand behind.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
