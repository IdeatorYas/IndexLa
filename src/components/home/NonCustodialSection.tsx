import { FadeIn } from "@/components/ui/FadeIn";

export function NonCustodialSection() {
  return (
    <section className="relative border-t border-line bg-deep py-24 md:py-32">
      <div className="section-pad container-max">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <FadeIn>
            <h2 className="display text-[clamp(2rem,4.5vw,3.3rem)] text-balance">
              Not Another Basket Token.
            </h2>
            <div className="mt-6 space-y-4 text-[1.08rem] leading-relaxed text-muted">
              <p>
                Traditional index products package multiple assets into one
                product.
              </p>
              <p>You own the basket representation.</p>
              <p className="font-medium text-ink/90">
                INDEXLA takes a different approach.
              </p>
              <p>You build the portfolio.</p>
              <p>You own the underlying assets.</p>
              <p>
                The portfolio defines the strategy. Your assets remain yours.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="grid gap-4">
              <div className="rounded-3xl border border-danger/20 bg-danger/5 p-6 text-center">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-danger">
                  Traditional
                </p>
                <p className="display mt-3 text-[1.4rem]">Basket representation</p>
                <p className="mt-2 text-sm text-muted">
                  You hold a packaged product — not the underlying assets.
                </p>
              </div>
              <div className="rounded-3xl glass p-6 text-center">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-electric">
                  INDEXLA
                </p>
                <p className="display mt-3 text-[1.4rem]">Direct ownership</p>
                <p className="mt-2 text-sm text-muted">
                  Non-custodial. Your assets stay in your control while strategy
                  executes.
                </p>
                <div className="mt-5 flex justify-center gap-2">
                  {["Wallet", "Permissions", "On-chain"].map((label) => (
                    <span
                      key={label}
                      className="rounded-full border border-line bg-void/40 px-3 py-1 text-xs font-semibold text-muted"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
