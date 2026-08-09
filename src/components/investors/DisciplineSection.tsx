import { FadeIn } from "@/components/ui/FadeIn";

const lines = [
  "Define your strategy.",
  "Own the assets.",
  "Automate the response.",
  "Stay in control.",
];

export function DisciplineSection() {
  return (
    <section className="relative border-t border-line bg-deep py-20 md:py-28">
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className="display text-[clamp(2rem,4.5vw,3.3rem)] uppercase tracking-[-0.02em] text-balance">
            Built For Investors Who{" "}
            <span className="gradient-text">Want Discipline.</span>
          </h2>
          <div className="mt-6 space-y-4 text-[1.08rem] leading-relaxed text-muted">
            <p>You don&apos;t need to predict every move.</p>
            <p>
              You need to decide how you want to respond before the market tests
              you.
            </p>
            <p>
              INDEXLA turns that conviction into a portfolio that can execute
              according to your strategy.
            </p>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {lines.map((line) => (
              <p
                key={line}
                className="rounded-2xl border border-line bg-void/40 px-5 py-4 text-[1.05rem] font-semibold text-ink"
              >
                {line}
              </p>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
