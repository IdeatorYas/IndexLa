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
  oneCoin: "One Coin. One Shot.",
  portfolio: "Portfolio. Multiple Shots.",
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
    VISUAL_TAGLINES.oneCoin,
    VISUAL_TAGLINES.portfolio,
    "One coin. One shot.",
    "A portfolio. Multiple shots.",
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
    <div className="space-y-3 sm:space-y-3.5">
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
  const dim = size === "lg" ? 118 : 54;
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
      className="mx-auto w-[min(100%,10.5rem)] text-electric/80 sm:w-[11.5rem]"
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
    <div className="relative mx-auto w-full max-w-[min(100%,22rem)] lg:max-w-none">
      <div
        className="pointer-events-none absolute -inset-3 rounded-[2rem] bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.12),transparent_68%)] sm:-inset-4"
        aria-hidden
      />

      <HeroShotStatement
        lead="One Coin."
        accent="One Shot."
        className="text-center text-[clamp(1.35rem,2.8vw,1.85rem)]"
      />

      <div className="relative mt-2.5 overflow-hidden rounded-[1.5rem] border border-white/[0.08] bg-deep/85 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-sm sm:mt-3 sm:rounded-[1.65rem]">
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_1.15fr]">
          <div className="relative flex flex-col items-center justify-center border-b border-white/[0.06] px-3 py-3.5 sm:border-b-0 sm:border-r sm:px-4 sm:py-4">
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-amber-400/95 sm:text-[0.68rem]">
              1 Shot
            </p>
            <div className="relative mt-2 flex h-[6.5rem] w-full items-center justify-center sm:h-[7rem]">
              <TargetReticle active color={singleColor} size="lg" />
              <motion.div
                className="relative z-10"
                animate={reduce ? undefined : { scale: [1, 1.05, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <MemeCoinLogo ticker={HERO_SINGLE_COIN} size="lg" className="!h-[3.75rem] !w-[3.75rem] sm:!h-16 sm:!w-16" />
              </motion.div>
            </div>
          </div>

          <div className="relative flex flex-col items-center justify-center px-3 py-3.5 sm:px-4 sm:py-4">
            <motion.p
              className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-electric sm:text-[0.68rem]"
              initial={reduce ? false : { opacity: 0.35 }}
              animate={{ opacity: 1 }}
              transition={{ delay: revealDelay, duration: 0.5 }}
            >
              10 Shots
            </motion.p>
            <motion.div
              className="relative mt-2 grid w-full max-w-[12.5rem] grid-cols-3 gap-1.5 sm:max-w-[13.25rem] sm:gap-2"
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
                    <div className="relative flex h-11 w-full items-center justify-center sm:h-12">
                      <TargetReticle active={false} color={color} size="sm" />
                      <div className="relative z-10">
                        <MemeCoinLogo ticker={ticker} size="sm" className="!h-8 !w-8 sm:!h-[2.125rem] sm:!w-[2.125rem]" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>

        <div className="border-t border-white/[0.06] bg-void/50 px-3 py-2 sm:px-4 sm:py-2.5">
          <TargetingDevice />
        </div>
      </div>

      <div className="mt-2.5 sm:mt-3">
        <HeroShotStatement
          lead="Portfolio."
          accent="Multiple Shots."
          className="text-center text-[clamp(1.35rem,2.8vw,1.85rem)]"
        />
      </div>

      <p className={`mt-2 text-center ${dcDisclaimer}`}>
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
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-void to-transparent"
        aria-hidden
      />

      <div className="section-pad container-max relative z-10 flex min-h-[100svh] items-center py-6 pt-[5.25rem] pb-6 lg:py-8 lg:pt-[5.5rem] lg:pb-8">
        <div className="grid w-full items-center gap-6 sm:gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)_minmax(0,1fr)] lg:gap-6 xl:gap-8">
          <motion.div
            className="order-3 flex flex-col justify-center lg:order-1 lg:pr-2 xl:pr-4"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className={dcEyebrow}>DEGEN CLUB</p>
            <div className="mt-3 lg:mt-4">
              <HeroBodyCopy blocks={bodyBlocks} />
            </div>
            {cta?.type === "cta" ? (
              <div className="mt-5 lg:mt-6">
                <DegenCta label={cta.text} />
              </div>
            ) : null}
          </motion.div>

          <motion.div
            className="order-1 flex flex-col items-center justify-center px-1 text-center lg:order-2 lg:px-3"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.04 }}
          >
            {h2?.type === "h2" ? (
              <DegenAccentHeadline text={h2.text} as="h1" align="center" />
            ) : null}
            {h3?.type === "h3" ? (
              <DegenAccentHeadline
                text={h3.text}
                as="h3"
                align="center"
                className="mt-2 sm:mt-3"
              />
            ) : null}
          </motion.div>

          <motion.div
            className="order-2 flex flex-col justify-center lg:order-3 lg:pl-1 xl:pl-2"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.08 }}
          >
            <HeroShotVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
