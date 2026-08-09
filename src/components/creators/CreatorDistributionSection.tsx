"use client";

import { FadeIn } from "@/components/ui/FadeIn";

const flow = [
  { label: "X · YouTube · Telegram · Discord", sub: "Content" },
  { label: "Portfolio", sub: "Investable product" },
  { label: "Investor Capital", sub: "Allocation" },
  { label: "AUM", sub: "Scale" },
  { label: "Trading Activity", sub: "Execution" },
];

export function CreatorDistributionSection() {
  return (
    <section className="relative border-t border-line bg-void py-14 md:py-18">
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className="display text-[clamp(2rem,4.5vw,3.15rem)] uppercase tracking-[-0.02em] text-balance">
            Your Content Becomes{" "}
            <span className="gradient-text">Distribution.</span>
          </h2>
          <div className="mt-5 space-y-2 text-[1.05rem] leading-relaxed text-muted">
            <p>You don&apos;t need another affiliate link.</p>
            <p>Give your audience something they can actually allocate to.</p>
          </div>
        </FadeIn>

        <FadeIn className="mt-8">
          <div className="overflow-hidden rounded-[1.35rem] glass p-5 sm:p-6">
            <ol className="grid gap-2 md:grid-cols-5">
              {flow.map((item, i) => (
                <li key={item.label} className="relative">
                  <div className="flex h-full flex-col rounded-2xl border border-line bg-void/45 p-4 text-center md:text-left">
                    <span className="text-[0.62rem] font-semibold text-electric">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="mt-2 text-sm font-semibold leading-snug text-ink">
                      {item.label}
                    </span>
                    <span className="mt-1 text-[0.7rem] text-muted-dim">{item.sub}</span>
                  </div>
                  {i < flow.length - 1 && (
                    <div
                      className="pointer-events-none absolute top-1/2 -right-1 hidden h-px w-2 bg-electric/40 md:block"
                      aria-hidden
                    />
                  )}
                </li>
              ))}
            </ol>
            <p className="mt-5 text-center text-sm font-semibold text-ink md:text-left">
              X · YouTube · Telegram · Discord → Portfolio → Investor Capital →
              AUM → Trading Activity
            </p>
          </div>
        </FadeIn>

        <FadeIn className="mx-auto mt-8 max-w-2xl space-y-2 text-center text-[1.02rem] leading-relaxed text-muted">
          <p>Mention it in threads.</p>
          <p>Feature it in videos.</p>
          <p>Share allocation changes.</p>
          <p className="pt-2 font-medium text-ink/90">
            Every piece of content becomes a discovery point for your portfolio.
          </p>
          <p className="pt-4 display text-[clamp(1.1rem,2.2vw,1.4rem)] text-ink">
            Keep talking about what you believe in. Your portfolio keeps working
            underneath it.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
