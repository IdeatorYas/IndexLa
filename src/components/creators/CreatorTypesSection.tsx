"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import {
  crH2,
  crSection,
} from "@/components/creators/creatorRhythm";

const types = [
  {
    title: "Crypto KOLs",
    body: "Turn market conviction into a portfolio your audience can follow.",
  },
  {
    title: "Finance Influencers",
    body: "Turn financial content into structured investment strategies.",
  },
  {
    title: "YouTubers",
    body: "Turn your research into a portfolio that lives beyond the video.",
  },
  {
    title: "Researchers",
    body: "Turn analysis into programmable strategies.",
  },
  {
    title: "Traders & Investors",
    body: "Turn proven frameworks into long-term portfolio strategies.",
  },
];

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

        <FadeIn className="mt-8">
          <div className="mx-auto grid max-w-4xl gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {types.map((item) => (
              <article
                key={item.title}
                className="rounded-xl border border-line bg-void/45 px-4 py-4"
              >
                <h3 className="text-[0.95rem] font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-[0.88rem] leading-relaxed text-muted">
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
