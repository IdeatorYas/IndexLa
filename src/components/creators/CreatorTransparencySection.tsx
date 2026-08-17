import { FadeIn } from "@/components/ui/FadeIn";
import {
  crGreenBox,
  crGreenText,
  crH2,
  crSection,
  crSurfaceSoft,
} from "@/components/creators/creatorRhythm";

const points = [
  "Your strategy and track record can be evaluated by the people who choose to follow it.",
  "You decide what your portfolio holds and how it behaves.",
  "Followers decide whether to allocate.",
] as const;

export function CreatorTransparencySection() {
  return (
    <section className={`${crSection} bg-void`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={`${crH2} uppercase`}>
            Transparency Builds{" "}
            <span className="gradient-text">Credibility.</span>
          </h2>
        </FadeIn>

        <FadeIn className="mt-9">
          <div className="mx-auto grid max-w-3xl gap-3 sm:grid-cols-3">
            {points.map((line) => (
              <div
                key={line}
                className={`${crSurfaceSoft} px-4 py-5 text-center`}
              >
                <p className="text-[0.95rem] font-medium leading-snug text-ink text-pretty sm:text-[1rem]">
                  {line}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn className="mt-8 text-center">
          <div className="inline-flex justify-center">
            <div className={crGreenBox}>
              <p className={`${crGreenText} text-balance`}>
                Don&apos;t sell certainty. Build something you can stand behind.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
