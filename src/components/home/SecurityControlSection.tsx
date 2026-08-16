import { FadeIn } from "@/components/ui/FadeIn";
import { HomeReadMore } from "@/components/home/HomeReadMore";
import {
  homeBody,
  homeEyebrow,
  homeH2,
  homeMeasure,
  homeMeasureTight,
  homeSection,
} from "@/components/home/homeRhythm";

const points = [
  "The protocol cannot withdraw your funds.",
  "The protocol cannot expand its own permissions.",
  "You can revoke automation at any time.",
  "Execution only happens within the rules and limits you authorize.",
] as const;

export function SecurityControlSection() {
  return (
    <section className={`${homeSection} bg-deep`}>
      <div className="section-pad container-max">
        <FadeIn className="text-center">
          <p className={homeEyebrow}>SECURITY &amp; CONTROL</p>
          <h2 className={`mt-3 ${homeH2} ${homeMeasure}`}>
            <span className="block">Your Keys</span>
            <span className="mt-1.5 block sm:mt-2">Your Assets</span>
            <span className="mt-1.5 block sm:mt-2">Your Permissions</span>
          </h2>
        </FadeIn>

        <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:gap-4">
          {points.map((point, i) => (
            <FadeIn key={point} delay={i * 0.04}>
              <article className="flex h-full min-h-[6.75rem] items-center justify-center rounded-2xl border border-line bg-void/50 px-5 py-7 text-center sm:px-6">
                <p className={`${homeMeasureTight} ${homeBody} text-ink`}>
                  {point}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-9 text-center">
          <HomeReadMore
            href="/whitepaper/14-security-architecture"
            label="Security & Permissions →"
          />
        </FadeIn>
      </div>
    </section>
  );
}
