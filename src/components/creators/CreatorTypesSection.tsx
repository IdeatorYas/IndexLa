import { FadeIn } from "@/components/ui/FadeIn";
import {
  crBodyStrong,
  crH2,
  crSection,
  crSurfaceSoft,
} from "@/components/creators/creatorRhythm";

const types = [
  "Crypto KOLs",
  "Finance Influencers",
  "YouTubers",
  "Researchers",
  "Traders & Investors",
] as const;

export function CreatorTypesSection() {
  return (
    <section className={`${crSection} bg-void`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={`${crH2} uppercase`}>
            Built For People With An{" "}
            <span className="gradient-text">Edge</span>
          </h2>
        </FadeIn>

        <div className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {types.map((type, i) => (
            <FadeIn
              key={type}
              className={`${crSurfaceSoft} px-5 py-5 ${
                i === types.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
              delay={0.03 * i}
            >
              <p className="display text-[1.1rem] font-semibold tracking-[-0.02em] text-ink uppercase">
                {type}
              </p>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-8 text-center">
          <p className={`${crBodyStrong} text-balance`}>
            Your expertise. Our infrastructure.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
