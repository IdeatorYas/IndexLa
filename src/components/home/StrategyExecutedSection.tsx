import { FadeIn } from "@/components/ui/FadeIn";
import {
  homeBody,
  homeH2,
  homeSection,
} from "@/components/home/homeRhythm";

const points = [
  "You define the rules.",
  "AI helps monitor your portfolio and strategy conditions.",
  "Smart contract permissions constrain execution.",
  "Routing infrastructure handles authorized transactions across supported networks.",
] as const;

export function StrategyExecutedSection() {
  return (
    <section className={`${homeSection} bg-void`}>
      <div
        className="pointer-events-none absolute inset-0 hero-glow opacity-30"
        aria-hidden
      />

      <div className="section-pad container-max relative">
        <FadeIn className="mx-auto max-w-3xl">
          <h2 className={homeH2}>
            Your Strategy. <span className="gradient-text">Executed.</span>
          </h2>
          <ul className="mt-7 space-y-4">
            {points.map((point) => (
              <li key={point} className={`flex gap-3 ${homeBody}`}>
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-electric" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <p className={`mt-7 font-semibold text-ink ${homeBody}`}>
            INDEXLA is your AI assisted portfolio management layer, helping you
            monitor, manage, and automate your portfolio within your defined
            rules and permissions.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
