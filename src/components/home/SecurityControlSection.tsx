import { FadeIn } from "@/components/ui/FadeIn";
import { HomeReadMore } from "@/components/home/HomeReadMore";
import {
  homeBody,
  homeEyebrow,
  homeH2,
  homeMeasure,
  homeSection,
} from "@/components/home/homeRhythm";

const points = [
  "The protocol cannot withdraw your funds.",
  "The protocol cannot expand its own permissions.",
  "You can revoke access at any time.",
  "Execution only happens inside the rules you set.",
] as const;

export function SecurityControlSection() {
  return (
    <section className={`${homeSection} bg-deep`}>
      <div className="section-pad container-max">
        <FadeIn className="text-center">
          <p className={homeEyebrow}>SECURITY AND CONTROL</p>
          <h2 className={`mt-3 ${homeH2} ${homeMeasure}`}>
            Your Keys. Your Assets. Your Permissions.
          </h2>
        </FadeIn>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {points.map((point, i) => (
            <FadeIn key={point} delay={i * 0.04}>
              <article className="flex h-full items-center justify-center rounded-2xl border border-line bg-void/45 px-5 py-6 text-center">
                <p className={`mx-auto max-w-[20rem] ${homeBody} text-ink`}>
                  {point}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-8 text-center">
          <HomeReadMore
            href="/whitepaper/15-security-architecture"
            label="Security & Permissions →"
          />
        </FadeIn>
      </div>
    </section>
  );
}
