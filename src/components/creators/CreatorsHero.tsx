"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EarlyAccessCta } from "@/components/early-access/EarlyAccessCta";
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
    <div className={`${crSurface} p-4 sm:p-5`}>
      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-electric">
        Creator path
      </p>
      <p className="mt-1.5 display text-[1.05rem] tracking-[-0.02em] text-ink sm:text-[1.15rem]">
        Thesis → Portfolio → Audience → Revenue
      </p>

      <div className="mt-4 space-y-1.5">
        {journey.map((step, i) => (
          <motion.div
            key={step.label}
            className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-void/45 px-3 py-2.5"
            initial={reduce ? false : { opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-electric/30 bg-electric/[0.08] display text-[0.75rem] text-electric">
              {i + 1}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[0.88rem] font-semibold text-ink">{step.label}</p>
              <p className="text-[0.72rem] text-muted-dim">{step.detail}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-3 rounded-xl border border-success/30 bg-success/[0.08] px-3.5 py-3 text-center">
        <p className="text-[0.84rem] font-semibold leading-snug text-ink text-balance">
          Your thesis becomes something your audience can allocate to.
        </p>
      </div>
    </div>
  );
}

export function CreatorsHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-void">
      <div
        className="pointer-events-none absolute inset-0 hero-glow opacity-40"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-void to-transparent"
        aria-hidden
      />

      <div className="section-pad container-max relative z-10 flex min-h-[100svh] flex-col justify-center pb-10 pt-[5.75rem] lg:pb-12 lg:pt-24">
        <div className="grid items-center gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:gap-10 xl:gap-12">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className={`${crH1} text-[clamp(2rem,5vw,3.55rem)]`}>
              <span className="block">
                Your Thesis Deserves{" "}
                <span className="gradient-text">More Than An X Post</span>
              </span>
            </h1>

            <p className={`mt-5 max-w-xl ${crBody} text-balance lg:mt-6`}>
              Turn your investment thesis into a portfolio your community can
              follow, invest in, and grow with. Earn creator fees as your
              community participates.
            </p>

            <div className="mt-5">
              <div className={crGreenBox}>
                <p className={`${crGreenText} text-balance`}>
                  Build your strategy. Grow your audience. Earn from its use.
                </p>
              </div>
            </div>

            <div className="mt-6 lg:mt-7">
              <EarlyAccessCta mode="creator" className={crCta}>
                Creator Early Access
              </EarlyAccessCta>
            </div>
          </motion.div>

          <motion.div
            className="lg:self-center"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08 }}
          >
            <HeroJourneyVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
