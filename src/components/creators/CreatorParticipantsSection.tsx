"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { AssetLogo } from "@/components/ui/AssetLogo";
import {
  crBody,
  crH2,
  crSection,
  crSurfaceSoft,
} from "@/components/creators/creatorRhythm";

const steps = [
  {
    title: "Follow",
    body: "Choose your portfolio.",
    preview: (
      <div className="rounded-xl border border-white/[0.06] bg-void/50 p-3 text-left">
        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-electric">
          Marketplace
        </p>
        <p className="mt-1.5 text-[0.9rem] font-semibold text-ink">
          Hybrid Wealth Strategy
        </p>
        <div className="mt-2 flex items-center gap-1">
          {(["btc", "eth", "gold", "nvidia"] as const).map((key) => (
            <span
              key={key}
              className="flex h-6 w-6 items-center justify-center rounded-full border border-white/[0.08] bg-panel"
            >
              <AssetLogo asset={key} size={12} />
            </span>
          ))}
          <span className="ml-1 text-[0.7rem] text-muted-dim">+2</span>
        </div>
        <p className="mt-2.5 rounded-lg border border-electric/25 bg-electric/[0.08] px-2 py-1.5 text-center text-[0.72rem] font-semibold text-electric">
          Follow
        </p>
      </div>
    ),
  },
  {
    title: "Customize",
    body: "Adjust assets and allocations to fit their conviction.",
    preview: (
      <div className="space-y-2.5 rounded-xl border border-white/[0.06] bg-void/50 p-3 text-left">
        {[
          { label: "BTC", pct: 30 },
          { label: "ETH", pct: 20 },
          { label: "Gold", pct: 15 },
        ].map((row) => (
          <div key={row.label}>
            <div className="mb-1 flex justify-between text-[0.72rem]">
              <span className="font-semibold text-ink">{row.label}</span>
              <span className="tabular-nums text-muted">{row.pct}%</span>
            </div>
            <div className="h-1 overflow-hidden rounded-full bg-white/[0.06]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-purple to-electric"
                style={{ width: `${row.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Allocate",
    body: "Put capital behind the strategy while keeping custody.",
    preview: (
      <div className="rounded-xl border border-white/[0.06] bg-void/50 p-3 text-left">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[0.8rem] font-semibold text-ink">Allocate</p>
          <p className="rounded-full border border-success/30 bg-success/[0.08] px-2 py-0.5 text-[0.65rem] font-semibold text-success">
            Keys retained
          </p>
        </div>
        <p className="mt-2 text-[0.78rem] leading-snug text-muted">
          Capital stays in the follower&apos;s wallet.
        </p>
        <div className="mt-2.5 h-8 rounded-lg border border-electric/25 bg-electric/[0.06]" />
      </div>
    ),
  },
] as const;

export function CreatorParticipantsSection() {
  return (
    <section className={`${crSection} bg-void`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-[40rem] text-center">
          <h2 className={`${crH2} uppercase`}>
            From Followers To{" "}
            <span className="gradient-text">Portfolio Participants.</span>
          </h2>
          <p className={`mt-5 ${crBody} text-balance`}>
            Your audience doesn&apos;t need another signal to chase.
          </p>
          <p className={`mt-3 ${crBody} text-balance`}>
            Give them something they can evaluate, customize, and choose to
            follow.
          </p>
        </FadeIn>

        <FadeIn className="mt-10">
          <div className="mx-auto grid max-w-5xl gap-3 md:grid-cols-3">
            {steps.map((step, i) => (
              <article
                key={step.title}
                className={`relative flex h-full flex-col items-center ${crSurfaceSoft} p-4 sm:p-5`}
              >
                <p className="display text-[1.2rem] gradient-text">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-1.5 display text-[1.15rem] tracking-[-0.02em] text-ink uppercase">
                  {step.title}
                </h3>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-muted">
                  {step.body}
                </p>
                <div className="mt-4 w-full flex-1">{step.preview}</div>
              </article>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
