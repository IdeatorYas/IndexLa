"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import { AssetLogo } from "@/components/ui/AssetLogo";
import {
  invBody,
  invGreenBox,
  invGreenText,
  invH2,
  invLabel,
  invSection,
} from "@/components/investors/investorRhythm";

const flowSummary = [
  "I choose what I own",
  "I define what should happen",
  "I activate the rules",
  "INDEXLA handles execution",
];

export function BuildDefineAutomateSection() {
  const reduce = useReducedMotion();

  return (
    <section id="how-it-works" className={`${invSection} scroll-mt-24 bg-void`}>
      <div className="section-pad container-max">
        <FadeIn className="max-w-3xl">
          <h2 className={`${invH2} uppercase`}>
            Build. Define. Automate.{" "}
            <span className="gradient-text">Execute.</span>
          </h2>
          <p className={`mt-5 ${invBody}`}>
            A clear product flow from portfolio construction to authorized
            execution.
          </p>
        </FadeIn>

        {/* Desktop / tablet flow */}
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {/* 01 BUILD */}
          <FadeIn delay={0}>
            <article className="flex h-full flex-col rounded-[1.25rem] border border-line bg-deep/50 p-5">
              <p className="display text-[1.5rem] gradient-text">01</p>
              <h3 className="mt-1 display text-[1.2rem] tracking-[-0.02em] text-ink">
                BUILD
              </h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
                Choose your assets, allocations, and portfolio.
              </p>
              <div className="mt-4 flex-1 rounded-xl border border-line/80 bg-void/50 p-3.5">
                <div className="flex flex-wrap items-center gap-1.5">
                  {(["btc", "eth", "sol", "nvidia"] as const).map((key) => (
                    <span
                      key={key}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-line bg-panel/80"
                    >
                      <AssetLogo asset={key} size={16} />
                    </span>
                  ))}
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[0.72rem] font-semibold text-muted">
                  <span className="rounded-md border border-line px-2 py-1 text-ink">
                    Assets
                  </span>
                  <span className="text-electric/70" aria-hidden>
                    →
                  </span>
                  <span className="rounded-md border border-line px-2 py-1 text-ink">
                    Allocations
                  </span>
                  <span className="text-electric/70" aria-hidden>
                    →
                  </span>
                  <span className="rounded-md border border-electric/35 bg-electric/10 px-2 py-1 text-electric">
                    Portfolio
                  </span>
                </div>
              </div>
            </article>
          </FadeIn>

          {/* 02 DEFINE */}
          <FadeIn delay={0.05}>
            <article className="flex h-full flex-col rounded-[1.25rem] border border-line bg-deep/50 p-5">
              <p className="display text-[1.5rem] gradient-text">02</p>
              <h3 className="mt-1 display text-[1.2rem] tracking-[-0.02em] text-ink">
                DEFINE
              </h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
                Set the conditions that determine when your portfolio should act.
              </p>
              <div className="mt-4 flex-1 space-y-2 rounded-xl border border-line/80 bg-void/50 p-3.5">
                {[
                  { trigger: "Fear < 20", action: "DCA IN" },
                  { trigger: "Greed > 70", action: "DCA OUT" },
                  { trigger: "Rebalance", action: "5% drift" },
                ].map((rule) => (
                  <div
                    key={rule.trigger}
                    className="flex items-center justify-between gap-2 rounded-lg border border-line bg-void/60 px-3 py-2 text-[0.78rem] font-semibold"
                  >
                    <span className="text-muted">{rule.trigger}</span>
                    <span className="shrink-0 text-electric" aria-hidden>
                      →
                    </span>
                    <span className="text-ink">{rule.action}</span>
                  </div>
                ))}
              </div>
            </article>
          </FadeIn>

          {/* 03 AUTOMATE */}
          <FadeIn delay={0.1}>
            <article className="flex h-full flex-col rounded-[1.25rem] border border-line bg-deep/50 p-5">
              <p className="display text-[1.5rem] gradient-text">03</p>
              <h3 className="mt-1 display text-[1.2rem] tracking-[-0.02em] text-ink">
                AUTOMATE
              </h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
                Approve your strategy and let INDEXLA monitor conditions.
              </p>
              <div className="mt-4 flex-1 space-y-3 rounded-xl border border-line/80 bg-void/50 p-3.5">
                <div className="flex items-center gap-2 rounded-lg border border-success/35 bg-success/10 px-3 py-2.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-50" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-success" />
                  </span>
                  <span className="text-[0.85rem] font-semibold text-success">
                    Strategy Active ✓
                  </span>
                </div>
                <p className={`${invLabel} normal-case tracking-normal text-muted`}>
                  Monitoring market conditions…
                </p>
              </div>
            </article>
          </FadeIn>

          {/* 04 EXECUTE */}
          <FadeIn delay={0.15}>
            <article className="flex h-full flex-col rounded-[1.25rem] border border-electric/30 bg-deep/50 p-5">
              <p className="display text-[1.5rem] gradient-text">04</p>
              <h3 className="mt-1 display text-[1.2rem] tracking-[-0.02em] text-ink">
                EXECUTE
              </h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
                When a condition triggers, INDEXLA coordinates an authorized
                transaction.
              </p>
              <div className="mt-4 flex-1 space-y-2 rounded-xl border border-line/80 bg-void/50 p-3.5">
                <p className="rounded-lg border border-electric/30 bg-electric/10 px-3 py-2 text-center text-[0.8rem] font-semibold text-electric">
                  Condition Triggered
                </p>
                <p className="text-center text-electric/70" aria-hidden>
                  ↓
                </p>
                <p className="text-center text-[0.8rem] font-semibold leading-snug text-muted">
                  INDEXLA coordinates authorized transaction
                </p>
                <p className="text-center text-electric/70" aria-hidden>
                  ↓
                </p>
                <p className="rounded-lg border border-success/30 bg-success/10 px-3 py-2 text-center text-[0.8rem] font-semibold text-success">
                  Portfolio updated
                </p>
              </div>
            </article>
          </FadeIn>
        </div>

        {/* Narrative strip */}
        <FadeIn className="mt-8">
          <div className="overflow-x-auto rounded-[1.15rem] border border-line bg-deep/40 px-4 py-4 sm:px-5">
            <div className="flex min-w-[36rem] flex-wrap items-center justify-center gap-2 sm:min-w-0 sm:gap-3">
              {flowSummary.map((item, i) => (
                <div key={item} className="flex items-center gap-2 sm:gap-3">
                  <motion.span
                    className="text-[0.9rem] font-semibold text-ink sm:text-[0.95rem]"
                    initial={reduce ? false : { opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    {item}
                  </motion.span>
                  {i < flowSummary.length - 1 && (
                    <span className="text-electric/60" aria-hidden>
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn className="mt-8 space-y-5">
          <div className={invGreenBox}>
            <p className={invGreenText}>
              Build your portfolio and automate your strategy in under 5 minutes.
            </p>
          </div>
          <Button href="/creators" className="w-fit min-w-[13.5rem]">
            Build Your First Portfolio
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
