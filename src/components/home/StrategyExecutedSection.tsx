import { FadeIn } from "@/components/ui/FadeIn";

const points = [
  "You define the rules.",
  "AI helps monitor your portfolio and strategy conditions.",
  "Smart contract permissions constrain execution.",
  "Routing infrastructure handles authorized transactions across supported networks.",
] as const;

export function StrategyExecutedSection() {
  return (
    <section className="relative border-t border-line bg-void py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 hero-glow opacity-35" aria-hidden />

      <div className="section-pad container-max relative">
        <FadeIn className="mx-auto max-w-3xl">
          <h2 className="display text-[clamp(2rem,4.5vw,3.3rem)] tracking-[-0.03em] text-balance">
            Your Strategy.{" "}
            <span className="gradient-text">Executed.</span>
          </h2>
          <ul className="mt-8 space-y-4">
            {points.map((point) => (
              <li
                key={point}
                className="flex gap-3 text-[1.05rem] leading-relaxed text-muted"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-electric" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-[1.05rem] leading-relaxed font-semibold text-ink">
            INDEXLA is your AI assisted portfolio management layer, helping you
            monitor, manage, and automate your portfolio within your defined
            rules and permissions.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
