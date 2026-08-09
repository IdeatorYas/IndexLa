import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";

const steps = [
  {
    n: "01",
    title: "BUILD",
    body: "Choose your assets, allocations, and portfolio.",
  },
  {
    n: "02",
    title: "DEFINE",
    body: "Set the conditions that determine when your portfolio should act.",
  },
  {
    n: "03",
    title: "AUTOMATE",
    body: "Approve your strategy and let INDEXLA monitor conditions and coordinate execution.",
  },
];

export function BuildDefineAutomateSection() {
  return (
    <section
      id="how-it-works"
      className="relative scroll-mt-24 border-t border-line bg-void py-14 md:py-20"
    >
      <div className="section-pad container-max">
        <FadeIn className="max-w-3xl">
          <h2 className="display text-[clamp(2rem,4.5vw,3.2rem)] uppercase tracking-[-0.02em] text-balance">
            Build. Define.{" "}
            <span className="gradient-text">Automate.</span>
          </h2>
        </FadeIn>

        <ol className="mt-8 grid gap-3 md:grid-cols-3">
          {steps.map((step, i) => (
            <FadeIn key={step.n} delay={i * 0.05}>
              <li className="h-full rounded-[1.25rem] glass p-5 sm:p-6">
                <span className="display text-[1.7rem] gradient-text">{step.n}</span>
                <h3 className="mt-2 display text-[1.3rem] tracking-[-0.02em]">
                  {step.title}
                </h3>
                <p className="mt-3 text-[0.98rem] leading-relaxed text-muted">
                  {step.body}
                </p>
              </li>
            </FadeIn>
          ))}
        </ol>

        <FadeIn className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="display text-[clamp(1.1rem,2.2vw,1.4rem)] text-ink">
            Build your strategy once. Let it work continuously.
          </p>
          <Button href="/creators" className="w-fit min-w-[13.5rem]">
            Build Your First Portfolio
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
