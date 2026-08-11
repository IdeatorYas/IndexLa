"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import {
  TelegramLogo,
  XLogo,
  YouTubeLogo,
} from "@/components/creators/SocialBrandLogos";
import {
  crBody,
  crGreenBox,
  crGreenText,
  crH1,
} from "@/components/creators/creatorRhythm";

function HeroThesisVisual() {
  const reduce = useReducedMotion();

  return (
    <div className="rounded-[1.35rem] border border-line bg-deep/80 p-5 sm:p-6">
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-electric">
        The feed problem
      </p>
      <div className="mt-4 space-y-2.5">
        {[
          { channel: "Telegram", Logo: TelegramLogo, fate: "Scroll buries it" },
          { channel: "X", Logo: XLogo, fate: "Timeline moves on" },
          { channel: "YouTube", Logo: YouTubeLogo, fate: "Video gets buried" },
        ].map((row, i) => (
          <motion.div
            key={row.channel}
            className="flex items-center justify-between gap-3 rounded-xl border border-line bg-void/50 px-3.5 py-3"
            initial={reduce ? false : { opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.08 }}
          >
            <span className="flex items-center gap-2.5">
              <row.Logo className="h-4 w-4 text-muted" />
              <span className="text-[0.9rem] font-semibold text-ink">
                {row.channel}
              </span>
            </span>
            <span className="text-[0.8rem] font-medium text-muted-dim">
              {row.fate}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="my-4 flex justify-center text-electric/60" aria-hidden>
        ↓
      </div>

      <div className="rounded-xl border border-success/35 bg-success/10 px-4 py-4 text-center">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-success">
          INDEXLA
        </p>
        <p className="mt-2 display text-[1.15rem] tracking-[-0.02em] text-ink">
          Thesis → Portfolio → Followers can allocate
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
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-6 h-px w-14 bg-gradient-to-r from-electric/80 to-transparent" />

            <h1 className={crH1}>
              <span className="block">Your Best Call Shouldn&apos;t</span>
              <span className="mt-[0.12em] block gradient-text">
                Disappear Into A Telegram Scroll.
              </span>
            </h1>

            <div className="mt-7 space-y-2">
              <p className={crBody}>
                You spend hours researching markets, building conviction, and
                sharing your thesis.
              </p>
              <p className={crBody}>Your post gets attention.</p>
              <p className={crBody}>Then the feed moves on.</p>
            </div>

            <div className="mt-7">
              <div className={crGreenBox}>
                <p className={crGreenText}>
                  Turn your thesis into a portfolio your audience can actually
                  follow.
                </p>
              </div>
              <p className="mt-4 text-[1.05rem] font-semibold text-ink sm:text-[1.1rem]">
                Build it. Publish it. Automate it. Earn from it.
              </p>
            </div>

            <div className="mt-6 rounded-xl border border-electric/35 bg-electric/10 px-4 py-3.5">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-electric">
                First Portfolio Free At Launch
              </p>
              <p className="mt-1.5 text-[0.92rem] leading-relaxed text-muted">
                Early creators get priority marketplace visibility and early
                access to creator features.
              </p>
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button
                href="#become-creator"
                className="min-w-[14rem] px-8 py-3.5 text-[1.02rem] shadow-[0_16px_48px_rgba(59,130,246,0.38)]"
              >
                Become a Creator
              </Button>
              <Button
                href="/strategies"
                variant="secondary"
                className="min-w-[13rem]"
              >
                Explore Marketplace
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.12 }}
          >
            <HeroThesisVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
