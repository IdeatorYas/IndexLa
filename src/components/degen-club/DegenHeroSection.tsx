"use client";

import { motion, useReducedMotion } from "framer-motion";
import { DegenCta, MemeCoinBadge, MEME_COINS } from "@/components/degen-club/DegenShared";
import { dcBody, dcEyebrow } from "@/components/degen-club/degenRhythm";
import type { DegenBlock, DegenSection } from "@/lib/degen-club";

const HERO_MULTI_COINS = ["WIF", "BONK", "DOGE", "SHIB", "FLOKI", "BRETT", "POPCAT"] as const;
const HERO_SINGLE = "PEPE";

function coinColor(ticker: string) {
  return MEME_COINS.find((c) => c.ticker === ticker)?.color ?? "#38bdf8";
}

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

function HeroCopy({ blocks }: { blocks: DegenBlock[] }) {
  return (
    <div className="space-y-4">
      {blocks.map((block, i) => {
        if (block.type === "h2") {
          return (
            <h2
              key={i}
              className="display text-[clamp(1.75rem,4.2vw,2.75rem)] tracking-[-0.03em] text-ink"
            >
              {block.text}
            </h2>
          );
        }
        if (block.type === "h3") {
          return (
            <h3
              key={i}
              className="display text-[clamp(1.05rem,2.2vw,1.25rem)] tracking-[-0.02em] text-ink"
            >
              {block.text}
            </h3>
          );
        }
        if (block.type === "p") {
          return (
            <p
              key={i}
              className="whitespace-pre-line text-[1rem] leading-relaxed text-muted sm:text-[1.05rem]"
            >
              {renderBold(block.text)}
            </p>
          );
        }
        return null;
      })}
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
  const dim = size === "lg" ? 120 : 56;
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
        r="42"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeOpacity={active ? 0.85 : 0.35}
      />
      <circle
        cx="60"
        cy="60"
        r="28"
        fill="none"
        stroke={color}
        strokeWidth="1"
        strokeOpacity={active ? 0.55 : 0.25}
        strokeDasharray="4 6"
      />
      <line x1="60" y1="8" x2="60" y2="28" stroke={color} strokeWidth="1.5" strokeOpacity={0.7} />
      <line x1="60" y1="92" x2="60" y2="112" stroke={color} strokeWidth="1.5" strokeOpacity={0.7} />
      <line x1="8" y1="60" x2="28" y2="60" stroke={color} strokeWidth="1.5" strokeOpacity={0.7} />
      <line x1="92" y1="60" x2="112" y2="60" stroke={color} strokeWidth="1.5" strokeOpacity={0.7} />
      <path
        d="M22 22 L34 22 L34 34 M86 22 L98 22 L98 34 M22 98 L34 98 L34 86 M86 98 L98 98 L98 86"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeOpacity={active ? 0.9 : 0.4}
        strokeLinecap="round"
      />
      {active ? (
        <motion.circle
          cx="60"
          cy="60"
          r="4"
          fill={color}
          initial={{ scale: 0.6, opacity: 0.5 }}
          animate={{ scale: [0.6, 1.2, 0.6], opacity: [0.5, 1, 0.5] }}
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
      className="mx-auto w-[min(100%,11rem)] text-electric/80 sm:w-[13rem]"
      aria-hidden
    >
      <defs>
        <linearGradient id="device-glow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <path
        d="M36 52 C36 38, 52 28, 100 28 C148 28, 164 38, 164 52 L164 58 C164 66, 156 72, 100 72 C44 72, 36 66, 36 58 Z"
        fill="url(#device-glow)"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.5"
      />
      <rect x="78" y="36" width="44" height="22" rx="6" fill="#0a0f1a" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.6" />
      <circle cx="100" cy="47" r="6" fill="#38bdf8" fillOpacity="0.85" />
      <path d="M100 22 L100 10 M100 10 L94 16 M100 10 L106 16" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.7" />
      <path d="M48 58 L28 68 M152 58 L172 68" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.35" />
    </svg>
  );
}

function HeroShotVisual() {
  const reduce = useReducedMotion();
  const singleColor = coinColor(HERO_SINGLE);
  const revealDelay = reduce ? 0 : 1.4;

  return (
    <div className="relative mx-auto w-full max-w-[32rem]">
      <div
        className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.14),transparent_65%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-4 right-0 w-1/2 rounded-[1.5rem] bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.12),transparent_70%)]"
        aria-hidden
      />

      <div className="relative overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-deep/80 shadow-[0_32px_100px_rgba(0,0,0,0.45)] backdrop-blur-sm">
        <div className="grid min-h-[17rem] grid-cols-1 sm:min-h-[19rem] sm:grid-cols-[1fr_1.15fr]">
          {/* 1 SHOT */}
          <div className="relative flex flex-col items-center justify-center border-b border-white/[0.06] px-4 py-6 sm:border-b-0 sm:border-r sm:py-8">
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-amber-400/90">
              1 Shot
            </p>
            <div className="relative mt-4 flex h-[7.5rem] w-full items-center justify-center sm:h-[8.5rem]">
              <TargetReticle active color={singleColor} size="lg" />
              <motion.div
                className="relative z-10"
                animate={reduce ? undefined : { scale: [1, 1.04, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <MemeCoinBadge ticker={HERO_SINGLE} color={singleColor} size="lg" />
              </motion.div>
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ boxShadow: `0 0 40px ${singleColor}33` }}
                animate={reduce ? undefined : { opacity: [0.4, 0.75, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <p className="mt-2 text-center text-[0.78rem] font-semibold text-muted">
              One coin
            </p>
          </div>

          {/* 10 SHOTS */}
          <div className="relative flex flex-col items-center justify-center px-4 py-6 sm:py-8">
            <motion.p
              className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-electric"
              initial={reduce ? false : { opacity: 0.35 }}
              animate={{ opacity: 1 }}
              transition={{ delay: revealDelay, duration: 0.6 }}
            >
              10 Shots
            </motion.p>
            <motion.div
              className="relative mt-4 grid w-full max-w-[13rem] grid-cols-3 gap-3 sm:max-w-[14rem]"
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: revealDelay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {HERO_MULTI_COINS.map((ticker, i) => {
                const color = coinColor(ticker);
                return (
                  <motion.div
                    key={ticker}
                    className="relative flex flex-col items-center gap-1"
                    initial={reduce ? false : { opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: revealDelay + 0.08 * i, duration: 0.45 }}
                  >
                    <div className="relative">
                      <TargetReticle active={false} color={color} size="sm" />
                      <div className="relative z-10 flex justify-center pt-1">
                        <MemeCoinBadge ticker={ticker} color={color} size="sm" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
            <motion.p
              className="mt-3 text-center text-[0.78rem] font-semibold text-muted"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: revealDelay + 0.5, duration: 0.5 }}
            >
              A portfolio
            </motion.p>
          </div>
        </div>

        <div className="border-t border-white/[0.06] bg-void/50 px-4 py-3">
          <TargetingDevice />
        </div>
      </div>

      <p className={`mt-3 text-center ${dcBody} text-[0.82rem] text-muted-dim`}>
        Visual representation only. Logos do not imply endorsement.
      </p>
    </div>
  );
}

export function DegenHeroSection({ section }: { section: DegenSection }) {
  const reduce = useReducedMotion();
  const copyBlocks = section.blocks.filter((b) => b.type !== "cta");
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

      <div className="section-pad container-max relative z-10 flex min-h-[100svh] flex-col justify-center pb-10 pt-[5.75rem] lg:pb-12 lg:pt-24">
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 xl:gap-12">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className={dcEyebrow}>DEGEN CLUB</p>
            <HeroCopy blocks={copyBlocks} />
            {cta?.type === "cta" ? (
              <div className="mt-7 lg:mt-8">
                <DegenCta label={cta.text} />
              </div>
            ) : null}
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="lg:max-xl:scale-[0.97] lg:max-xl:origin-center"
          >
            <HeroShotVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
