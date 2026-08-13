import { FadeIn } from "@/components/ui/FadeIn";
import {
  homeBody,
  homeH2,
  homeMeasure,
  homeSection,
} from "@/components/home/homeRhythm";

const points = [
  "Own the underlying assets — not a wrapper or vault.",
  "One portfolio — crypto + tokenized assets across chains.",
  "Controlled automation — rules you authorize and can revoke.",
  "Creator distribution — creators earn 50% of applicable execution fees.",
] as const;

export function WhyIndexlaDifferentSection() {
  return (
    <section className={`${homeSection} bg-void`}>
      <div className="section-pad container-max">
        <FadeIn className="text-center">
          <h2 className={`${homeH2} ${homeMeasure}`}>
            Why INDEXLA Is Different
          </h2>
        </FadeIn>

        <div className="mx-auto mt-8 grid max-w-4xl auto-rows-fr gap-3 sm:grid-cols-2 sm:gap-4">
          {points.map((point, i) => (
            <FadeIn key={point} delay={i * 0.04}>
              <article className="flex h-full items-center justify-center rounded-2xl border border-line bg-deep/55 px-5 py-6 text-center sm:px-6 sm:py-7">
                <p className={`${homeBody} text-ink`}>{point}</p>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
