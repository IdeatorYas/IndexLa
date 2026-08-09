import { FadeIn } from "@/components/ui/FadeIn";

const zeros = [
  {
    value: "0%",
    label: "MANAGEMENT FEES",
    body: "No recurring percentage of your portfolio.",
  },
  {
    value: "0%",
    label: "PERFORMANCE FEES",
    body: "No percentage of your gains.",
  },
  {
    value: "0%",
    label: "EXIT FEES",
    body: "No fee for leaving.",
  },
];

export function InvestorFeesSection() {
  return (
    <section className="relative border-t border-line bg-deep py-16 md:py-24">
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className="display text-[clamp(2rem,4.5vw,3.35rem)] uppercase tracking-[-0.02em] text-balance">
            Portfolio Management Without{" "}
            <span className="gradient-text">The Management Fees.</span>
          </h2>
          <div className="mt-6 space-y-3 text-[1.08rem] leading-relaxed text-muted">
            <p>
              Traditional portfolio management can charge a percentage of your
              assets and profits.
            </p>
            <p className="font-medium text-ink/90">INDEXLA doesn&apos;t.</p>
          </div>
        </FadeIn>

        <FadeIn className="mt-10">
          <div className="grid gap-4 sm:grid-cols-3">
            {zeros.map((item) => (
              <div
                key={item.label}
                className="rounded-[1.35rem] glass px-6 py-9 text-center"
              >
                <p className="display text-[3.2rem] leading-none gradient-text">
                  {item.value}
                </p>
                <p className="mt-4 text-[0.78rem] font-semibold tracking-[0.14em] text-ink">
                  {item.label}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn className="mx-auto mt-10 max-w-2xl space-y-4 text-center">
          <p className="text-[1.08rem] leading-relaxed text-muted">
            You pay a{" "}
            <span className="font-semibold text-ink">1% execution fee</span> when
            transactions are executed through the platform.
          </p>
          <p className="display text-[clamp(1.2rem,2.4vw,1.6rem)] text-ink">
            More of what you make stays yours.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
