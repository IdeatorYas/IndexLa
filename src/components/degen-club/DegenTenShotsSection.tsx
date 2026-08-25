"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import {
  DegenCopy,
  DegenSectionTitle,
  MemeCoinLogo,
} from "@/components/degen-club/DegenShared";
import { dcBodyStrong, dcSection } from "@/components/degen-club/degenRhythm";
import {
  HERO_PORTFOLIO_COINS,
  HERO_SINGLE_COIN,
} from "@/components/degen-club/memeLogos";
import type { DegenSection } from "@/lib/degen-club";

const BASKET_OUTCOMES = [
  { ticker: "DOGE", move: "↑", tone: "text-success" },
  { ticker: "SHIB", move: "↓", tone: "text-danger" },
  { ticker: "WIF", move: "↑↑", tone: "text-success" },
  { ticker: "BONK", move: "→", tone: "text-muted" },
  { ticker: "FLOKI", move: "↓", tone: "text-danger" },
  { ticker: "PENGU", move: "↑", tone: "text-success" },
  { ticker: "PEPE", move: "↑", tone: "text-success" },
  { ticker: "FARTCOIN", move: "→", tone: "text-muted" },
  { ticker: "SPX6900", move: "↑↑", tone: "text-success" },
  { ticker: "CASHCAT", move: "↓", tone: "text-danger" },
] as const;

export function DegenTenShotsSection({ section }: { section: DegenSection }) {
  const reduce = useReducedMotion();

  return (
    <section className={`${dcSection} relative overflow-hidden bg-void`}>
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(248,113,113,0.06),transparent_60%)]"
        aria-hidden
      />
      <div className="section-pad container-max relative">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <DegenSectionTitle title={section.title} />
            <DegenCopy
              blocks={section.blocks}
              className="mx-auto mt-5 max-w-2xl text-center"
            />
          </FadeIn>

          <FadeIn className="mt-8">
            <div className="grid gap-6 md:grid-cols-2 md:items-stretch">
              {/* 1 Shot — concentrated bet */}
              <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-danger/35 bg-danger/[0.05] p-6 text-center sm:p-8">
                <p className="display text-[clamp(2rem,4.5vw,3.25rem)] font-semibold uppercase tracking-[-0.03em] text-danger/90">
                  1 Shot
                </p>
                <p className="mx-auto mt-2 max-w-sm text-[0.95rem] text-muted sm:text-[1.02rem]">
                  One concentrated bet. All-in on a single outcome.
                </p>

                <div className="relative mt-8 flex flex-1 flex-col items-center justify-center">
                  <motion.div
                    animate={
                      reduce
                        ? undefined
                        : { y: [0, 6, 0], opacity: [1, 0.75, 1] }
                    }
                    transition={{
                      duration: 2.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <MemeCoinLogo ticker={HERO_SINGLE_COIN} size="xl" />
                  </motion.div>
                  <div className="pointer-events-none absolute inset-x-8 bottom-2 h-16 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(248,113,113,0.28),transparent_70%)] blur-md" />
                </div>

                <div className="mt-8 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-success/30 bg-success/10 py-5 text-center">
                    <p className="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-success/80">
                      Win
                    </p>
                    <p className="display mt-1 text-[clamp(1.75rem,3.5vw,2.25rem)] font-semibold text-success">
                      100x
                    </p>
                  </div>
                  <div className="rounded-xl border border-danger/40 bg-danger/10 py-5 text-center">
                    <p className="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-danger/80">
                      Miss
                    </p>
                    <p className="display mt-1 text-[clamp(1.75rem,3.5vw,2.25rem)] font-semibold text-danger">
                      0
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-center text-[0.88rem] font-semibold text-danger/90 sm:text-[0.95rem]">
                  Capital gone. Back to zero.
                </p>
              </div>

              {/* 10 Shots — diversified basket */}
              <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-electric/35 bg-electric/[0.05] p-6 text-center sm:p-8">
                <p className="display text-[clamp(2rem,4.5vw,3.25rem)] font-semibold uppercase tracking-[-0.03em] text-electric">
                  10 Shots
                </p>
                <p className="mx-auto mt-2 max-w-sm text-[0.95rem] text-muted sm:text-[1.02rem]">
                  Ten positions. Multiple chances. Managed downside.
                </p>

                <div className="mt-6 grid flex-1 grid-cols-5 gap-2 sm:gap-2.5">
                  {BASKET_OUTCOMES.map((item, i) => (
                    <motion.div
                      key={item.ticker}
                      className="flex flex-col items-center gap-1 rounded-lg border border-line bg-void/55 px-1 py-2.5 text-center"
                      initial={reduce ? false : { opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.04 * i, duration: 0.35 }}
                    >
                      <MemeCoinLogo
                        ticker={
                          HERO_PORTFOLIO_COINS[i] ?? item.ticker
                        }
                        size="xs"
                      />
                      <p className={`text-[0.95rem] font-bold sm:text-[1.05rem] ${item.tone}`}>
                        {item.move}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <p className={`mt-6 text-center ${dcBodyStrong}`}>
                  Multiple opportunities. Managed downside.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
