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
    <section className="relative border-t border-line bg-void py-16 md:py-24">
      <div className="section-pad container-max">
        <FadeIn className="max-w-3xl">
          <h2 className="display text-[clamp(2rem,4.5vw,3.3rem)] uppercase tracking-[-0.02em] text-balance">
            Build. Define.{" "}
            <span className="gradient-text">Automate.</span>
          </h2>
        </FadeIn>

        <ol className="mt-10 grid gap-4 md:grid-cols-3">
          {steps.map((step, i) => (
            <FadeIn key={step.n} delay={i * 0.06}>
              <li className="h-full rounded-[1.35rem] glass p-6">
                <span className="display text-[1.85rem] gradient-text">{step.n}</span>
                <h3 className="mt-3 display text-[1.4rem] tracking-[-0.02em]">
                  {step.title}
                </h3>
                <p className="mt-3 text-[1rem] leading-relaxed text-muted">
                  {step.body}
                </p>
              </li>
            </FadeIn>
          ))}
        </ol>

        <FadeIn className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="display text-[clamp(1.15rem,2.3vw,1.5rem)] text-ink">
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
