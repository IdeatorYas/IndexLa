"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import {
  crBody,
  crGreenBox,
  crGreenText,
  crH2,
  crSection,
} from "@/components/creators/creatorRhythm";

const signals = [
  { label: "Rules", detail: "Defined in advance" },
  { label: "Structure", detail: "Portfolio composition" },
  { label: "Activity", detail: "Visible over time" },
  { label: "Track record", detail: "Remains visible" },
];

export function CreatorTrackRecordSection() {
  return (
    <section className={`${crSection} bg-void`}>
      <div className="section-pad container-max">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
          <FadeIn>
            <h2 className={`${crH2} uppercase`}>
              Your Track Record Becomes{" "}
              <span className="gradient-text">Your Moat.</span>
            </h2>
            <p className={`mt-5 ${crBody}`}>
              Your strategy doesn&apos;t disappear when your post gets buried.
            </p>
            <p className={`mt-3 ${crBody}`}>
              Its rules, portfolio structure, activity, and track record can
              remain visible over time.
            </p>
            <div className="mt-7">
              <div className={crGreenBox}>
                <p className={crGreenText}>
                  Your best call becomes something your audience can follow
                  beyond the timeline.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.06}>
            <div className="grid grid-cols-2 gap-3">
              {signals.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[1.15rem] border border-line bg-deep/50 px-4 py-5 text-center"
                >
                  <p className="display text-[1.1rem] text-ink">{item.label}</p>
                  <p className="mt-1.5 text-[0.82rem] text-muted">{item.detail}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
