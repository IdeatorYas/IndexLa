"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  FloatingAssetBubble,
  type FloatingBubbleVariant,
} from "./FloatingAssetBubble";
import { HERO_PORTFOLIO_ASSETS } from "./portfolioAssets";

type FloatingPortfolioProps = {
  className?: string;
  /** When false, hides the centered Portfolio / 100% allocated badge */
  showBadge?: boolean;
  /** Reveal mode: larger premium bubbles; homepage hero stays on default */
  variant?: FloatingBubbleVariant;
};

export function FloatingPortfolio({
  className = "",
  showBadge = true,
  variant = "default",
}: FloatingPortfolioProps) {
  const reduce = useReducedMotion();
  const [compact, setCompact] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isReveal = variant === "reveal";

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setCompact(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
        aria-hidden
      />
    );
  }

  const assets =
    isReveal || !compact
      ? HERO_PORTFOLIO_ASSETS
      : HERO_PORTFOLIO_ASSETS.filter((a) => a.mobile);

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-label="Illustrative portfolio allocation visualization"
    >
      <div
        className="absolute inset-[8%] rounded-[2rem] border border-white/[0.02]"
        aria-hidden
      />
      <div
        className="absolute inset-[16%] rounded-[1.75rem] border border-electric/[0.04]"
        aria-hidden
      />

      {showBadge ? (
        <motion.div
          className="absolute left-1/2 top-[calc(5rem+0.75rem)] z-[5] -translate-x-1/2 lg:top-[calc(5rem+1.25rem)]"
          initial={reduce ? false : { opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <div className="rounded-full border border-line bg-void/75 px-3 py-1.5 text-center shadow-[0_8px_24px_rgba(0,0,0,0.25)] backdrop-blur-sm sm:px-3.5">
            <p className="text-[0.55rem] font-semibold uppercase tracking-[0.16em] text-electric">
              Portfolio
            </p>
            <p className="mt-0.5 text-[0.58rem] font-semibold uppercase tracking-[0.1em] text-muted-dim">
              100% allocated
            </p>
          </div>
        </motion.div>
      ) : null}

      {assets.map((asset) => {
        const base = compact
          ? (asset.mobile ?? {
              x: asset.desktop.x,
              y: Math.min(90, 10 + asset.desktop.y * 0.78),
              depth: asset.desktop.depth,
            })
          : asset.desktop;

        // Reveal: keep a clear center corridor for logo + CTA
        const position = isReveal
          ? {
              x: Math.max(
                5,
                Math.min(95, 50 + (base.x - 50) * (compact ? 1.22 : 1.28)),
              ),
              y: Math.max(
                7,
                Math.min(93, 50 + (base.y - 50) * (compact ? 1.18 : 1.24)),
              ),
              depth: base.depth,
            }
          : base;

        return (
          <FloatingAssetBubble
            key={asset.id}
            asset={asset}
            compact={compact}
            position={position}
            variant={variant}
          />
        );
      })}
    </div>
  );
}
