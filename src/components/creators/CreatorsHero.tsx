"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import {
  crBody,
  crGreenBox,
  crGreenText,
  crH1,
} from "@/components/creators/creatorRhythm";

const journey = [
  { label: "Creator", detail: "Conviction" },
  { label: "Thesis", detail: "Rules & assets" },
  { label: "Portfolio", detail: "Publishable" },
  { label: "Audience", detail: "Follow & allocate" },
  { label: "Revenue", detail: "Fee share" },
] as const;

function HeroJourneyVisual() {
  const reduce = useReducedMotion();

  return (
    <div className="rounded-[1.35rem] border border-line bg-deep/80 p-5 sm:p-6">
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-electric">
        Creator path
      </p>
      <p className="mt-2 display text-[1.15rem] tracking-[-0.02em] text-ink sm:text-[1.25rem]">
        Thesis → Portfolio → Audience → Revenue
      </p>

      <div className="mt-5 space-y-2">
        {journey.map((step, i) => (
          <motion.div
            key={step.label}
            className="flex items-center gap-3 rounded-xl border border-line bg-void/50 px-3.5 py-3"
            initial={reduce ? false : { opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.12 + i * 0.07 }}
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-electric/35 bg-electric/10 display text-[0.85rem] text-electric">
              {i + 1}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[0.95rem] font-semibold text-ink">{step.label}</p>
              <p className="text-[0.78rem] text-muted-dim">{step.detail}</p>
            </div>
            {i < journey.length - 1 && (
              <span className="hidden text-electric/45 sm:inline" aria-hidden>
                →
              </span>
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-4 rounded-xl border border-success/35 bg-success/10 px-4 py-3.5 text-center">
        <p className="text-[0.88rem] font-semibold text-ink">
          Your thesis becomes something your audience can allocate to.
        </p>
      </div>
    </div>
  );
}

export function CreatorsHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-void pt-28 pb-12 md:pb-16 md:pt-32">
      <div className="pointer-events-none absolute inset-0 hero-glow opacity-55" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-void to-transparent"
        aria-hidden
      />

      <div className="section-pad container-max relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-6 h-px w-14 bg-gradient-to-r from-electric/80 to-transparent" />

            <h1 className={crH1}>
              <span className="block">Your Thesis Deserves</span>
              <span className="mt-[0.12em] block gradient-text">
                More Than An X Post.
              </span>
            </h1>

            <p className={`mt-7 ${crBody}`}>
              Turn your investment conviction into a portfolio your audience can
              follow, customize, and automate.
            </p>

            <div className="mt-6">
              <div className={crGreenBox}>
                <p className={crGreenText}>
                  Build your strategy. Grow your audience. Earn from its use.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-electric/40 bg-electric/10 px-4 py-4">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-electric">
                First Portfolio Free At Launch
              </p>
              <p className="mt-1.5 text-[0.95rem] leading-relaxed text-muted">
                Get early creator access and publish your first portfolio free at
                launch.
              </p>
            </div>

            <div className="mt-9">
              <Button
                href="#become-creator"
                className="min-w-[16rem] px-8 py-3.5 text-[1.02rem] shadow-[0_16px_48px_rgba(59,130,246,0.38)]"
              >
                Become an INDEXLA Creator
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.12 }}
          >
            <HeroJourneyVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
