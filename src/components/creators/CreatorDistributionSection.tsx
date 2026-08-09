"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import {
  DiscordLogo,
  TelegramLogo,
  XLogo,
  YouTubeLogo,
} from "@/components/creators/SocialBrandLogos";

const channels = [
  {
    name: "X",
    Logo: XLogo,
    wrap: "bg-black text-white border-white/15",
  },
  {
    name: "YouTube",
    Logo: YouTubeLogo,
    wrap: "bg-[#0f0f0f] border-[#FF0000]/35",
  },
  {
    name: "Telegram",
    Logo: TelegramLogo,
    wrap: "bg-[#0a1a24] border-[#26A5E4]/40",
  },
  {
    name: "Discord",
    Logo: DiscordLogo,
    wrap: "bg-[#1a1b2e] border-[#5865F2]/40",
  },
];

const pipeline = [
  { label: "Portfolio", hint: "INDEXLA product" },
  { label: "Investor Capital", hint: "Allocation in" },
  { label: "AUM", hint: "Capital attracted" },
  { label: "Trading Activity", hint: "Executions" },
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
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-12 xl:gap-16">
          <FadeIn className="flex flex-col justify-center">
            <h2 className="display text-[clamp(2.1rem,4.6vw,3.3rem)] uppercase tracking-[-0.02em] text-balance">
              Your Content Becomes{" "}
              <span className="gradient-text">Distribution.</span>
            </h2>
            <div className="mt-5 max-w-md space-y-3 text-[1.05rem] leading-relaxed text-muted">
              <p>You don&apos;t need another affiliate link.</p>
              <p>Give your audience something they can actually allocate to.</p>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
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

          <FadeIn delay={0.06} className="flex items-center justify-center lg:justify-end">
            <div className="w-full max-w-xl rounded-[1.5rem] glass p-5 sm:p-6">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-dim">
                Content Channels → Portfolio → Investor Capital → AUM → Trading
                Activity
              </p>

              {/* Desktop: horizontal flow with channels on the left */}
              <div className="mt-5 hidden items-stretch gap-2 lg:flex">
                <div className="flex w-[7.5rem] shrink-0 flex-col justify-center gap-2 rounded-2xl border border-line bg-void/50 p-3">
                  <p className="text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-electric">
                    Content
                  </p>
                  {channels.map(({ name, Logo, wrap }) => (
                    <div
                      key={name}
                      className={`flex items-center gap-2 rounded-xl border px-2 py-1.5 ${wrap}`}
                    >
                      <Logo className="h-4 w-4 shrink-0" />
                      <span className="text-[0.68rem] font-semibold text-ink">
                        {name}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center px-0.5" aria-hidden>
                  <span className="text-electric/60">→</span>
                </div>

                <ol className="grid min-w-0 flex-1 grid-cols-2 gap-2">
                  {pipeline.map((item, i) => (
                    <li
                      key={item.label}
                      className="relative flex flex-col justify-center rounded-2xl border border-line bg-void/45 px-3 py-3"
                    >
                      <span className="text-[0.6rem] font-semibold text-electric">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="mt-1 text-[0.8rem] font-semibold leading-snug text-ink">
                        {item.label}
                      </span>
                      <span className="mt-0.5 text-[0.65rem] text-muted-dim">
                        {item.hint}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Mobile / tablet: stacked flow, channels first (left/top) */}
              <div className="mt-5 space-y-3 lg:hidden">
                <div className="rounded-2xl border border-line bg-void/50 p-4">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-electric">
                    Content channels
                  </p>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {channels.map(({ name, Logo, wrap }) => (
                      <div
                        key={name}
                        className={`flex items-center gap-2.5 rounded-xl border px-3 py-2.5 ${wrap}`}
                      >
                        <Logo className="h-5 w-5 shrink-0" />
                        <span className="text-sm font-semibold text-ink">
                          {name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center" aria-hidden>
                  <span className="text-electric/60">↓</span>
                </div>

                <ol className="space-y-2">
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
                          <p className="text-[0.72rem] text-muted-dim">
                            {item.hint}
                          </p>
                        </div>
                      </div>
                      {i < pipeline.length - 1 && (
                        <div className="flex justify-center py-1" aria-hidden>
                          <span className="text-[0.65rem] text-electric/50">
                            ↓
                          </span>
                        </div>
                      )}
                    </li>
                  ))}
                </ol>
              </div>

              <p className="mt-5 text-[0.8rem] font-semibold leading-relaxed text-muted">
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
