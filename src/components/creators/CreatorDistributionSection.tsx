"use client";

import { FadeIn } from "@/components/ui/FadeIn";

const channels = [
  { name: "X", mark: "𝕏" },
  { name: "YouTube", mark: "▶" },
  { name: "Telegram", mark: "✈" },
  { name: "Discord", mark: "◈" },
];

const pipeline = [
  { label: "INDEXLA Portfolio", hint: "Investable product" },
  { label: "Investor Capital", hint: "Allocation in" },
  { label: "AUM", hint: "Capital attracted" },
  { label: "Trading Activity", hint: "Executions" },
  { label: "Creator Earnings", hint: "From activity" },
];

const actions = [
  "Mention it in threads.",
  "Feature it in videos.",
  "Share allocation changes.",
];

export function CreatorDistributionSection() {
  return (
    <section className="relative border-t border-line bg-void py-14 md:py-20">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(56,189,248,0.08),transparent_45%)]"
        aria-hidden
      />
      <div className="section-pad container-max relative">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-14">
          <FadeIn>
            <h2 className="display text-[clamp(2.1rem,4.6vw,3.3rem)] uppercase tracking-[-0.02em] text-balance">
              Your Content Becomes{" "}
              <span className="gradient-text">Distribution.</span>
            </h2>
            <div className="mt-5 max-w-md space-y-3 text-[1.05rem] leading-relaxed text-muted">
              <p>You don&apos;t need another affiliate link.</p>
              <p>Give your audience something they can actually allocate to.</p>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {actions.map((action) => (
                <article
                  key={action}
                  className="rounded-2xl border border-line bg-deep/70 px-4 py-4"
                >
                  <p className="text-[0.95rem] font-semibold leading-snug text-ink">
                    {action}
                  </p>
                </article>
              ))}
            </div>

            <p className="mt-6 text-[1.02rem] font-medium leading-relaxed text-ink/90">
              Every piece of content becomes a discovery point for your
              portfolio.
            </p>
            <p className="mt-5 display text-[clamp(1.2rem,2.4vw,1.55rem)] text-balance text-ink">
              Keep talking about what you believe in. Your portfolio keeps
              working underneath it.
            </p>
          </FadeIn>

          <FadeIn delay={0.06}>
            <div className="rounded-[1.5rem] glass p-5 sm:p-7">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-dim">
                Content → Capital → Earnings
              </p>

              <div className="mt-5 rounded-2xl border border-line bg-void/50 p-4">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-electric">
                  Content channels
                </p>
                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {channels.map((channel) => (
                    <div
                      key={channel.name}
                      className="flex flex-col items-center gap-2 rounded-xl border border-line bg-deep/80 px-2 py-3"
                    >
                      <span
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-panel text-sm text-electric"
                        aria-hidden
                      >
                        {channel.mark}
                      </span>
                      <span className="text-[0.72rem] font-semibold text-muted">
                        {channel.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="my-3 flex justify-center" aria-hidden>
                <div className="flex h-8 w-px flex-col items-center">
                  <div className="h-full w-px bg-gradient-to-b from-electric/60 to-electric/20" />
                  <span className="mt-0.5 text-[0.65rem] text-electric">↓</span>
                </div>
              </div>

              <ol className="space-y-2.5">
                {pipeline.map((item, i) => (
                  <li key={item.label}>
                    <div className="flex items-center gap-3 rounded-2xl border border-line bg-void/45 px-4 py-3.5">
                      <span className="display text-[1.05rem] text-electric">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-ink">
                          {item.label}
                        </p>
                        <p className="text-[0.72rem] text-muted-dim">{item.hint}</p>
                      </div>
                    </div>
                    {i < pipeline.length - 1 && (
                      <div className="flex justify-center py-1" aria-hidden>
                        <span className="text-[0.65rem] text-electric/50">↓</span>
                      </div>
                    )}
                  </li>
                ))}
              </ol>

              <p className="mt-5 text-center text-[0.8rem] font-semibold leading-relaxed text-muted sm:text-left">
                X · YouTube · Telegram · Discord → Portfolio → Investor Capital
                → AUM → Trading Activity
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
