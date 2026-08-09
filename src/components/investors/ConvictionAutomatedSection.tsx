import { FadeIn } from "@/components/ui/FadeIn";

export function ConvictionAutomatedSection() {
  return (
    <section className="relative border-t border-line bg-deep py-14 md:py-20">
      <div className="section-pad container-max">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-12">
          <FadeIn>
            <h2 className="display text-[clamp(2rem,4.5vw,3.3rem)] uppercase tracking-[-0.02em] text-balance">
              Your Conviction.{" "}
              <span className="gradient-text">Automated.</span>
            </h2>
            <div className="mt-5 space-y-3 text-[1.05rem] leading-relaxed text-muted sm:text-[1.08rem]">
              <p>Markets don&apos;t wait for you.</p>
              <p>
                INDEXLA turns your investment thesis into a portfolio with rules
                that respond to the conditions you define.
              </p>
            </div>
            <div className="mt-6 space-y-1.5 text-[1.02rem] font-semibold leading-snug text-ink">
              <p>AI monitors the market.</p>
              <p>Your strategy determines the action.</p>
              <p>INDEXLA coordinates execution.</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.06}>
            <div className="rounded-[1.35rem] border border-electric/30 bg-gradient-to-br from-electric/10 via-purple/10 to-transparent p-6 sm:p-7">
              <p className="display text-[clamp(1.2rem,2.4vw,1.55rem)] text-balance text-ink">
                INDEXLA doesn&apos;t decide what you invest in. You define the
                rules. We coordinate the execution.
              </p>
              <p className="mt-5 text-[0.98rem] leading-relaxed text-muted">
                Connect your compatible wallet and put your strategy to work
                across supported markets and chains.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
