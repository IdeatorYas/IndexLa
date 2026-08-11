"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import {
  crBody,
  crBodyStrong,
  crH2,
  crSection,
} from "@/components/creators/creatorRhythm";

const points = [
  {
    title: "You don't custody their assets.",
    body: null,
  },
  {
    title: "They control their wallets, assets, allocations, and permissions.",
    body: null,
  },
  {
    title: "You publish the strategy. They decide whether to follow it.",
    body: null,
  },
];

export function CreatorNonCustodialSection() {
  return (
    <section className={`${crSection} bg-deep`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={`${crH2} uppercase`}>
            Become A Decentralized{" "}
            <span className="gradient-text">Portfolio Creator.</span>
          </h2>
          <p className={`mt-5 ${crBody}`}>
            Turn your investment thesis into a portfolio your audience can
            follow, customize, and automate.
          </p>
        </FadeIn>

        <FadeIn className="mt-10">
          <div className="mx-auto max-w-2xl overflow-hidden rounded-[1.35rem] border border-electric/30 bg-gradient-to-b from-electric/[0.1] to-void/40">
            <div className="border-b border-line px-6 py-5 text-center">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-electric">
                Non-custodial by design
              </p>
              <p className="mt-2 display text-[clamp(1.35rem,2.8vw,1.75rem)] text-ink">
                Your Followers Keep Their Keys.
              </p>
            </div>
            <ul className="divide-y divide-line">
              {points.map((item) => (
                <li key={item.title} className="px-6 py-4 text-center">
                  <p className={crBodyStrong}>{item.title}</p>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
