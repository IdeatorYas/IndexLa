"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import {
  crH2,
  crSection,
  crSurfaceSoft,
} from "@/components/creators/creatorRhythm";

const types = [
  {
    title: "Crypto KOLs",
    body: "Turn market views into structured portfolios.",
  },
  {
    title: "Finance Influencers",
    body: "Turn financial perspectives into multi-asset allocations.",
  },
  {
    title: "YouTubers",
    body: "Turn educational content into portfolios your audience can follow.",
  },
  {
    title: "Researchers",
    body: "Turn research into programmable strategies.",
  },
  {
    title: "Traders & Investors",
    body: "Turn proven frameworks into long-term portfolios.",
  },
] as const;

export function CreatorTypesSection() {
  return (
    <section className={`${crSection} bg-deep`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={`${crH2} uppercase`}>
            Built For Creators With{" "}
            <span className="gradient-text">Conviction.</span>
          </h2>
        </FadeIn>

        <FadeIn className="mt-9">
          <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-2.5">
            {types.map((item) => (
              <article
                key={item.title}
                className={`w-full ${crSurfaceSoft} px-4 py-3.5 sm:w-[calc(50%-0.35rem)] lg:w-[calc(33.333%-0.45rem)]`}
              >
                <h3 className="text-[0.88rem] font-semibold uppercase tracking-[0.06em] text-ink">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-[0.85rem] leading-snug text-muted">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
