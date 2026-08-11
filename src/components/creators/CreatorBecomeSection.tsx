"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import {
  crBody,
  crBodyStrong,
  crH2,
  crSection,
} from "@/components/creators/creatorRhythm";

const trust = [
  {
    title: "Followers keep their keys.",
    body: "They choose whether to follow, customize, and allocate.",
  },
  {
    title: "Creators publish the thesis.",
    body: "You never custody their assets.",
  },
  {
    title: "INDEXLA provides the infrastructure.",
    body: "Automate authorized execution.",
  },
] as const;

export function CreatorBecomeSection() {
  return (
    <section
      id="become-creator"
      className={`${crSection} scroll-mt-24 bg-deep`}
    >
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-[40rem] text-center">
          <h2 className={`${crH2} uppercase`}>
            Become A Decentralized{" "}
            <span className="gradient-text">Portfolio Creator.</span>
          </h2>
          <p
            className={`mx-auto mt-5 max-w-[34rem] ${crBody} text-balance`}
          >
            Turn your investment thesis into a structured, multi-asset portfolio
            <br className="hidden sm:block" />
            your audience can choose to follow.
          </p>
        </FadeIn>

        <FadeIn className="mt-10">
          <div className="mx-auto max-w-4xl overflow-hidden rounded-[1.35rem] border border-electric/30 bg-gradient-to-b from-electric/[0.1] to-void/40">
            <div className="border-b border-line px-6 py-5 text-center">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-electric">
                Non-custodial by design
              </p>
              <p className="mt-2 display text-[clamp(1.35rem,2.8vw,1.85rem)] text-ink text-balance">
                Your Followers Keep Their Keys.
              </p>
            </div>
            <div className="grid gap-0 md:grid-cols-3">
              {trust.map((item, i) => (
                <div
                  key={item.title}
                  className={`px-5 py-6 text-center ${
                    i < trust.length - 1
                      ? "border-b border-line md:border-b-0 md:border-r"
                      : ""
                  }`}
                >
                  <p className={crBodyStrong}>{item.title}</p>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-muted text-pretty">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
