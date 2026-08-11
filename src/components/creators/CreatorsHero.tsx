"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import {
  crBody,
  crCta,
  crGreenBox,
  crGreenText,
  crH1,
  crSurface,
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
    <div className={`${crSurface} p-5 sm:p-6`}>
      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-electric">
        Creator path
      </p>
      <p className="mt-2 display text-[1.12rem] tracking-[-0.02em] text-ink sm:text-[1.22rem]">
        Thesis → Portfolio → Audience → Revenue
      </p>

      <div className="mt-5 space-y-2">
        {journey.map((step, i) => (
          <motion.div
            key={step.label}
            className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-void/45 px-3.5 py-3"
            initial={reduce ? false : { opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.06 }}
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-electric/30 bg-electric/[0.08] display text-[0.8rem] text-electric">
              {i + 1}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[0.92rem] font-semibold text-ink">{step.label}</p>
              <p className="text-[0.76rem] text-muted-dim">{step.detail}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 rounded-xl border border-success/30 bg-success/[0.08] px-4 py-3.5 text-center">
        <p className="text-[0.88rem] font-semibold leading-snug text-ink text-balance">
          Your thesis becomes something your audience can allocate to.
        </p>
      </div>
    </div>
  );
}

export function CreatorsHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-void pt-28 pb-14 md:pb-16 md:pt-32">
      <div className="pointer-events-none absolute inset-0 hero-glow opacity-40" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-void to-transparent"
        aria-hidden
      />

      <div className="section-pad container-max relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:gap-14">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-7 h-px w-12 bg-gradient-to-r from-electric/70 to-transparent" />

            <h1 className={crH1}>
              <span className="block">Your Thesis Deserves</span>
              <span className="mt-[0.1em] block gradient-text">
                More Than An X Post.
              </span>
            </h1>

            <p className={`mt-7 max-w-xl ${crBody} text-balance`}>
              Turn your investment conviction into a portfolio your audience can
              follow, customize, and automate.
            </p>

            <div className="mt-6">
              <div className={crGreenBox}>
                <p className={`${crGreenText} text-balance`}>
                  Build your strategy. Grow your audience. Earn from its use.
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-electric/30 bg-electric/[0.07] px-5 py-4">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-electric">
                First Portfolio Free At Launch
              </p>
              <p className="mt-1.5 max-w-md text-[0.95rem] leading-relaxed text-muted text-pretty">
                Get early creator access and publish your first portfolio free at
                launch.
              </p>
            </div>

            <div className="mt-9">
              <Button href="#become-creator" className={crCta}>
                Become an INDEXLA Creator
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.1 }}
          >
            <HeroJourneyVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
