"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  DegenAccentHeadline,
  DegenCta,
  MemeCoinLogo,
} from "@/components/degen-club/DegenShared";
import {
  dcBody,
  dcDisclaimer,
  dcEyebrow,
  dcHeroStatement,
} from "@/components/degen-club/degenRhythm";
import {
  HERO_PORTFOLIO_COINS,
  HERO_SINGLE_COIN,
  MEME_COIN_COLORS,
} from "@/components/degen-club/memeLogos";
import type { DegenBlock, DegenSection } from "@/lib/degen-club";

const VISUAL_TAGLINES = {
  oneCoin: "One coin. One shot.",
  portfolio: "A portfolio. Multiple shots.",
} as const;

function renderBold(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-ink">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

function HeroBodyCopy({ blocks }: { blocks: DegenBlock[] }) {
  const skipTexts = new Set([
    VISUAL_TAGLINES.oneCoin.replace(/\*\*/g, ""),
    VISUAL_TAGLINES.portfolio.replace(/\*\*/g, ""),
    "**One coin. One shot.**",
    "**A portfolio. Multiple shots.**",
  ]);

  const filtered = blocks.filter((b) => {
    if (b.type === "h2" || b.type === "h3" || b.type === "cta") return false;
    if (b.type === "p") {
      const normalized = b.text.replace(/\*\*/g, "").trim();
      if (skipTexts.has(b.text) || skipTexts.has(normalized)) return false;
    }
    return true;
  });

  return (
    <div className="space-y-3.5 sm:space-y-4">
      {filtered.map((block, i) =>
        block.type === "p" ? (
          <p key={i} className={`whitespace-pre-line ${dcBody}`}>
            {renderBold(block.text)}
          </p>
        ) : null
      )}
    </div>
  );
}

function TargetReticle({
  active,
  color,
  size = "lg",
}: {
  active: boolean;
  color: string;
  size?: "lg" | "sm";
}) {
  const dim = size === "lg" ? 148 : 64;
  return (
    <svg
      width={dim}
      height={dim}
      viewBox="0 0 120 120"
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      aria-hidden
    >
      <circle
        cx="60"
        cy="60"
        r="46"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeOpacity={active ? 0.9 : 0.35}
      />
      <circle
        cx="60"
        cy="60"
        r="30"
        fill="none"
        stroke={color}
        strokeWidth="1"
        strokeOpacity={active ? 0.6 : 0.25}
        strokeDasharray="4 6"
      />
      <line x1="60" y1="6" x2="60" y2="26" stroke={color} strokeWidth="1.5" strokeOpacity={0.75} />
      <line x1="60" y1="94" x2="60" y2="114" stroke={color} strokeWidth="1.5" strokeOpacity={0.75} />
      <line x1="6" y1="60" x2="26" y2="60" stroke={color} strokeWidth="1.5" strokeOpacity={0.75} />
      <line x1="94" y1="60" x2="114" y2="60" stroke={color} strokeWidth="1.5" strokeOpacity={0.75} />
      <path
        d="M18 18 L32 18 L32 32 M88 18 L102 18 L102 32 M18 102 L32 102 L32 88 M88 102 L102 102 L102 88"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeOpacity={active ? 0.95 : 0.4}
        strokeLinecap="round"
      />
      {active ? (
        <motion.circle
          cx="60"
          cy="60"
          r="4"
          fill={color}
          animate={{ scale: [0.6, 1.25, 0.6], opacity: [0.45, 1, 0.45] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : null}
    </svg>
  );
}

function TargetingDevice() {
  return (
    <svg
      viewBox="0 0 200 80"
      className="mx-auto w-[min(100%,12rem)] text-electric/80 sm:w-[14rem]"
      aria-hidden
    >
      <defs>
        <linearGradient id="dc-device-glow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <path
        d="M36 52 C36 38, 52 28, 100 28 C148 28, 164 38, 164 52 L164 58 C164 66, 156 72, 100 72 C44 72, 36 66, 36 58 Z"
        fill="url(#dc-device-glow)"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.5"
      />
      <rect x="78" y="36" width="44" height="22" rx="6" fill="#0a0f1a" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.6" />
      <circle cx="100" cy="47" r="6" fill="#38bdf8" fillOpacity="0.85" />
      <path d="M100 22 L100 10 M100 10 L94 16 M100 10 L106 16" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.7" />
    </svg>
  );
}

function HeroShotStatement({
  lead,
  accent,
  className = "",
}: {
  lead: string;
  accent: string;
  className?: string;
}) {
  return (
    <p className={`${dcHeroStatement} ${className}`}>
      <span className="text-ink">{lead}</span>{" "}
      <span className="text-electric">{accent}</span>
    </p>
  );
}

function HeroShotVisual() {
  const reduce = useReducedMotion();
  const singleColor = MEME_COIN_COLORS[HERO_SINGLE_COIN];
  const revealDelay = reduce ? 0 : 1.2;

  return (
    <div className="relative w-full">
      <div
        className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.12),transparent_68%)] sm:-inset-6"
        aria-hidden
      />

      <div className="relative overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-deep/85 shadow-[0_32px_100px_rgba(0,0,0,0.45)] backdrop-blur-sm">
        <div className="border-b border-white/[0.06] px-4 py-4 sm:px-5 sm:py-5">
          <HeroShotStatement lead="One coin." accent="One shot." className="text-center" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-[1fr_1.2fr]">
          <div className="relative flex flex-col items-center justify-center border-b border-white/[0.06] px-4 py-5 sm:border-b-0 sm:border-r sm:py-6">
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-amber-400/95">
              1 Shot
            </p>
            <div className="relative mt-3 flex h-[8.5rem] w-full items-center justify-center sm:h-[9.5rem]">
              <TargetReticle active color={singleColor} size="lg" />
              <motion.div
                className="relative z-10"
                animate={reduce ? undefined : { scale: [1, 1.05, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <MemeCoinLogo ticker={HERO_SINGLE_COIN} size="xl" />
              </motion.div>
            </div>
          </div>

          <div className="relative flex flex-col items-center justify-center px-4 py-5 sm:py-6">
            <motion.p
              className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-electric"
              initial={reduce ? false : { opacity: 0.35 }}
              animate={{ opacity: 1 }}
              transition={{ delay: revealDelay, duration: 0.5 }}
            >
              10 Shots
            </motion.p>
            <motion.div
              className="relative mt-3 grid w-full max-w-[15rem] grid-cols-3 gap-2.5 sm:max-w-[16rem] sm:gap-3"
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: revealDelay, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              {HERO_PORTFOLIO_COINS.map((ticker, i) => {
                const color = MEME_COIN_COLORS[ticker];
                return (
                  <motion.div
                    key={ticker}
                    className="relative flex flex-col items-center"
                    initial={reduce ? false : { opacity: 0, scale: 0.88 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: revealDelay + 0.06 * i, duration: 0.4 }}
                  >
                    <div className="relative flex h-14 w-full items-center justify-center sm:h-16">
                      <TargetReticle active={false} color={color} size="sm" />
                      <div className="relative z-10">
                        <MemeCoinLogo ticker={ticker} size="sm" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>

        <div className="border-t border-white/[0.06] bg-void/50 px-4 py-3">
          <TargetingDevice />
        </div>
      </div>

      <div className="mt-4 sm:mt-5">
        <HeroShotStatement lead="A portfolio." accent="Multiple shots." className="text-center" />
      </div>

      <p className={`mt-3 text-center ${dcDisclaimer}`}>
        Visual representation only. Logos do not imply endorsement.
      </p>
    </div>
  );
}

export function DegenHeroSection({ section }: { section: DegenSection }) {
  const reduce = useReducedMotion();
  const h2 = section.blocks.find((b) => b.type === "h2");
  const h3 = section.blocks.find((b) => b.type === "h3");
  const bodyBlocks = section.blocks.filter((b) => b.type !== "cta");
  const cta = section.blocks.find((b) => b.type === "cta");

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-void">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(251,191,36,0.12),transparent_55%)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 hero-glow opacity-50" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-void to-transparent"
        aria-hidden
      />

      <div className="section-pad container-max relative z-10 flex min-h-[100svh] flex-col justify-center pb-8 pt-[5.5rem] lg:pb-10 lg:pt-[5.75rem] xl:pt-24">
        <div className="grid items-start gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-10 xl:gap-12">
          <motion.div
            className="order-2 lg:order-1"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className={dcEyebrow}>DEGEN CLUB</p>
            <div className="mt-4 lg:mt-5">
              <HeroBodyCopy blocks={bodyBlocks} />
            </div>
            {cta?.type === "cta" ? (
              <div className="mt-6 lg:mt-7">
                <DegenCta label={cta.text} />
              </div>
            ) : null}
          </motion.div>

          <motion.div
            className="order-1 lg:order-2"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.08 }}
          >
            <div className="mb-4 space-y-2 sm:mb-5 sm:space-y-3 lg:mb-6">
              {h2?.type === "h2" ? (
                <DegenAccentHeadline text={h2.text} as="h1" />
              ) : null}
              {h3?.type === "h3" ? (
                <DegenAccentHeadline text={h3.text} as="h3" className="mt-1" />
              ) : null}
            </div>
            <div className="origin-top scale-[0.98] sm:scale-[0.96] lg:scale-[0.86] xl:scale-[0.9] 2xl:scale-[0.94] lg:-mb-14 xl:-mb-10 2xl:-mb-5">
              <HeroShotVisual />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
