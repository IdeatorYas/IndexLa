"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AssetLogo } from "@/components/ui/AssetLogo";
import {
  allocationSizeRem,
  type FloatingPortfolioAsset,
} from "./portfolioAssets";

export type FloatingBubbleVariant = "default" | "reveal";

const REVEAL_LABEL: Record<string, string> = {
  btc: "Bitcoin",
  eth: "Ethereum",
  sol: "Solana",
  tao: "TAO",
  sp500: "S&P 500",
  gold: "Gold",
  sui: "SUI",
  silver: "Silver",
  msft: "MSFT",
  nvda: "NVDA",
};

type FloatingAssetBubbleProps = {
  asset: FloatingPortfolioAsset;
  compact?: boolean;
  position: { x: number; y: number; depth: number };
  variant?: FloatingBubbleVariant;
};

export function FloatingAssetBubble({
  asset,
  compact = false,
  position,
  variant = "default",
}: FloatingAssetBubbleProps) {
  const reduce = useReducedMotion();
  const isReveal = variant === "reveal";
  const sizeRem = allocationSizeRem(asset.allocation, compact, variant);
  const logoPx = Math.round(
    sizeRem * (isReveal ? (compact ? 10 : 11) : compact ? 9.5 : 10.5),
  );
  const opacity = isReveal
    ? 0.9 + position.depth * 0.1
    : 0.58 + position.depth * 0.38;
  const blur = isReveal ? (1 - position.depth) * 0.15 : (1 - position.depth) * 0.5;
  const displayName = REVEAL_LABEL[asset.id] ?? asset.ticker;

  if (isReveal) {
    // Orbital drift so circles travel and cross paths, not bob in place
    const amp = compact ? 2.35 : 2.85;
    const dx = asset.drift.x * amp;
    const dy = asset.drift.y * amp;
    const side = position.x < 50 ? 1 : -1;
    const duration = asset.drift.duration * 1.15;
    const nameFs = Math.max(0.62, sizeRem * 0.108);
    const allocFs = Math.max(0.58, sizeRem * 0.098);
    const logoSize = Math.round(Math.max(18, sizeRem * 3.05));

    return (
      <div
        className="absolute"
        style={{
          left: `${position.x}%`,
          top: `${position.y}%`,
          transform: "translate(-50%, -50%)",
          zIndex: Math.round(4 + position.depth * 16),
          opacity,
          filter: blur > 0.08 ? `blur(${blur}px)` : undefined,
        }}
      >
        <motion.div
          animate={
            reduce
              ? undefined
              : {
                  x: [
                    0,
                    dx * side * 1.15,
                    dx * side * -0.85,
                    dx * side * 0.55,
                    -dx * side * 0.4,
                    0,
                  ],
                  y: [
                    0,
                    -dy * 1.1,
                    dy * 0.95,
                    -dy * 0.45,
                    dy * 0.65,
                    0,
                  ],
                  rotate: [0, 2.4 * side, -1.8 * side, 1.2 * side, 0],
                }
          }
          transition={
            reduce
              ? undefined
              : {
                  duration,
                  delay: asset.drift.delay * 0.45,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
          className="relative"
          style={{ width: `${sizeRem}rem`, height: `${sizeRem}rem` }}
        >
          <div
            className="pointer-events-none absolute inset-0 -z-10 scale-[1.28] rounded-full bg-electric/18 blur-2xl"
            aria-hidden
          />

          <div
            className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-full border border-electric/40 px-2.5 text-center"
            style={{
              aspectRatio: "1 / 1",
              background:
                "radial-gradient(circle at 32% 28%, rgba(56,189,248,0.18) 0%, rgba(18,22,36,0.82) 42%, rgba(8,10,18,0.94) 100%)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              boxShadow: [
                "0 22px 48px rgba(0,0,0,0.55)",
                "0 0 32px rgba(56,189,248,0.16)",
                "inset 0 1px 0 rgba(255,255,255,0.24)",
                "inset 0 -10px 22px rgba(56,189,248,0.08)",
                "inset 0 0 0 1px rgba(255,255,255,0.05)",
              ].join(", "),
            }}
          >
            <span className="mb-1 flex shrink-0 items-center justify-center sm:mb-1.5">
              {asset.assetKey ? (
                <AssetLogo asset={asset.assetKey} size={logoSize} />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={asset.logoSrc}
                  alt=""
                  width={logoSize}
                  height={logoSize}
                  className="object-contain"
                  style={{ width: logoSize, height: logoSize }}
                  draggable={false}
                  aria-hidden
                />
              )}
            </span>
            <p
              className="max-w-[92%] truncate font-semibold tracking-[-0.02em] text-ink"
              style={{ fontSize: `${nameFs}rem`, lineHeight: 1.15 }}
            >
              {displayName}
            </p>
            <p
              className="mt-0.5 max-w-[94%] font-semibold tracking-[-0.015em] text-electric sm:mt-1"
              style={{ fontSize: `${allocFs}rem`, lineHeight: 1.2 }}
            >
              Allocation {asset.allocation}%
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  const driftScale = 1;
  const driftDuration = asset.drift.duration;

  return (
    <div
      className="absolute"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: "translate(-50%, -50%)",
        zIndex: Math.round(4 + position.depth * 16),
        opacity,
        filter: blur > 0.08 ? `blur(${blur}px)` : undefined,
      }}
    >
      <motion.div
        animate={
          reduce
            ? undefined
            : {
                x: [
                  0,
                  asset.drift.x * driftScale,
                  -asset.drift.x * 0.55 * driftScale,
                  0,
                ],
                y: [
                  0,
                  asset.drift.y * driftScale,
                  -asset.drift.y * 0.65 * driftScale,
                  0,
                ],
              }
        }
        transition={
          reduce
            ? undefined
            : {
                duration: driftDuration,
                delay: asset.drift.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
        className="flex flex-col items-center"
        style={{ width: `${sizeRem + 1.6}rem` }}
      >
        <div
          className="flex items-center justify-center rounded-full border border-line bg-deep/80 backdrop-blur-md"
          style={{
            width: `${sizeRem}rem`,
            height: `${sizeRem}rem`,
            boxShadow:
              position.depth > 0.85
                ? "0 14px 40px rgba(0,0,0,0.42), inset 0 1px 0 rgba(56,189,248,0.12)"
                : "0 10px 28px rgba(0,0,0,0.32), inset 0 1px 0 rgba(167,139,250,0.08)",
          }}
        >
          {asset.assetKey ? (
            <AssetLogo asset={asset.assetKey} size={logoPx} />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={asset.logoSrc}
              alt=""
              width={logoPx}
              height={logoPx}
              className="object-contain"
              draggable={false}
              aria-hidden
            />
          )}
        </div>
        <div className="mt-1.5 text-center leading-none">
          <p className="text-[0.62rem] font-semibold tracking-[0.04em] text-ink sm:text-[0.68rem]">
            {asset.ticker}
          </p>
          <p className="mt-0.5 text-[0.5rem] font-semibold uppercase tracking-[0.1em] text-muted-dim sm:text-[0.52rem]">
            {asset.allocation}% allocation
          </p>
        </div>
      </motion.div>
    </div>
  );
}
