import { FadeIn } from "@/components/ui/FadeIn";

const steps = [
  {
    n: "01",
    title: "DISCOVER",
    body: "Find a portfolio that matches your thesis. See its assets, allocations, strategy, performance, and activity.",
  },
  {
    n: "02",
    title: "ALLOCATE",
    body: "Choose how much capital to deploy. Your assets remain under your control.",
  },
  {
    n: "03",
    title: "AUTOMATE",
    body: "Approve your strategy and let INDEXLA execute when your defined conditions are met.",
  },
];

export function FlowSection() {
  return (
    <section className="relative border-t border-line bg-deep py-24 md:py-32">
      <div className="section-pad container-max">
        <FadeIn className="max-w-3xl">
          <h2 className="display text-[clamp(2rem,4.5vw,3.3rem)] uppercase tracking-[-0.02em] text-balance">
            Investing In Three Steps.
          </h2>
        </FadeIn>

        <ol className="mt-14 grid gap-5 md:grid-cols-3">
          {steps.map((step, i) => (
            <FadeIn key={step.n} delay={i * 0.08}>
              <li className="relative h-full rounded-3xl glass p-7">
                <span className="display text-[2rem] gradient-text">{step.n}</span>
                <h3 className="mt-4 display text-[1.45rem] tracking-[-0.02em]">
                  {step.title}
                </h3>
                <p className="mt-4 text-[1rem] leading-relaxed text-muted">
                  {step.body}
                </p>
              </li>
            </FadeIn>
          ))}
        </ol>

        <FadeIn className="mt-10">
          <p className="display text-[clamp(1.25rem,2.5vw,1.75rem)]">
            Discover. Allocate. Automate.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
