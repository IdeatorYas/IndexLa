import { FadeIn } from "@/components/ui/FadeIn";

const zeros = [
  { value: "0%", label: "management fees" },
  { value: "0%", label: "performance fees" },
  { value: "0%", label: "exit fees" },
] as const;

export function FeesSection() {
  return (
    <section className="relative border-t border-line bg-deep py-20 md:py-28">
      <div className="section-pad container-max">
        <FadeIn className="max-w-3xl">
          <h2 className="display text-[clamp(2rem,4.5vw,3.3rem)] tracking-[-0.03em] text-balance">
            Simple Economics
          </h2>
          <p className="mt-5 text-[1.2rem] font-semibold text-ink">
            Pay for execution, not management.
          </p>
        </FadeIn>

        <FadeIn className="mt-10">
          <div className="rounded-3xl glass px-6 py-8 text-center sm:px-10">
            <p className="display mt-1 text-[clamp(2.8rem,8vw,4.5rem)] leading-none gradient-text">
              1%
            </p>
            <p className="mt-3 text-sm font-semibold text-ink">execution fee</p>
            <p className="mt-3 text-sm text-muted">No subscription required.</p>
          </div>
        </FadeIn>

        <FadeIn className="mt-5">
          <div className="grid gap-4 sm:grid-cols-3">
            {zeros.map((item) => (
              <div
                key={item.label}
                className="rounded-3xl border border-line bg-void/40 px-6 py-8 text-center"
              >
                <p className="display text-[2.6rem] leading-none text-ink">
                  {item.value}
                </p>
                <p className="mt-3 text-sm font-semibold tracking-[0.06em] text-muted">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn className="mt-10 max-w-3xl">
          <p className="text-[1.05rem] leading-relaxed text-muted">
            Creator portfolios share 50% of applicable execution fees with the
            creator.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
