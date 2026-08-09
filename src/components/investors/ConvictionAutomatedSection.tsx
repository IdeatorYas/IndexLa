import { FadeIn } from "@/components/ui/FadeIn";

export function ConvictionAutomatedSection() {
  return (
    <section className="relative border-t border-line bg-deep py-16 md:py-24">
      <div className="section-pad container-max">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-center lg:gap-14">
          <FadeIn>
            <h2 className="display text-[clamp(2rem,4.5vw,3.4rem)] uppercase tracking-[-0.02em] text-balance">
              Your Conviction.{" "}
              <span className="gradient-text">Automated.</span>
            </h2>
            <div className="mt-6 space-y-4 text-[1.08rem] leading-relaxed text-muted">
              <p>Markets don&apos;t wait for you.</p>
              <p>
                INDEXLA turns your investment thesis into a portfolio with rules
                that respond to the conditions you define.
              </p>
            </div>
            <div className="mt-7 space-y-2 text-[1.05rem] font-semibold leading-snug text-ink">
              <p>AI monitors the market.</p>
              <p>Your strategy determines the action.</p>
              <p>INDEXLA coordinates execution.</p>
            </div>
            <div className="mt-7 space-y-3 text-[1.05rem] leading-relaxed text-muted">
              <p>INDEXLA doesn&apos;t decide what you invest in.</p>
              <p>
                You define the strategy; the infrastructure coordinates
                execution.
              </p>
            </div>
            <p className="mt-8 display text-[clamp(1.15rem,2.2vw,1.45rem)] text-ink">
              From conviction to execution, without constant monitoring.
            </p>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="rounded-[1.5rem] glass p-5 sm:p-7">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-dim">
                Condition → Strategy → Execution
              </p>
              <ol className="mt-5 space-y-3">
                {[
                  { n: "01", label: "AI monitors the market." },
                  { n: "02", label: "Your strategy determines the action." },
                  { n: "03", label: "INDEXLA coordinates execution." },
                ].map((item) => (
                  <li
                    key={item.n}
                    className="flex items-start gap-4 rounded-2xl border border-line bg-void/40 px-4 py-4"
                  >
                    <span className="display text-[1.1rem] text-electric">
                      {item.n}
                    </span>
                    <span className="pt-0.5 font-semibold text-ink">{item.label}</span>
                  </li>
                ))}
              </ol>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
