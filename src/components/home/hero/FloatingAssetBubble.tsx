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
    ? 0.88 + position.depth * 0.12
    : 0.58 + position.depth * 0.38;
  const blur = isReveal ? (1 - position.depth) * 0.2 : (1 - position.depth) * 0.5;
  const driftScale = isReveal ? 1.85 : 1;
  const driftDuration = isReveal
    ? asset.drift.duration * 0.95
    : asset.drift.duration;
  const displayName = REVEAL_LABEL[asset.id] ?? asset.ticker;

  if (isReveal) {
    const chipW = compact ? "7.85rem" : "9.6rem";
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
                    -asset.drift.x * 0.7 * driftScale,
                    asset.drift.x * 0.35 * driftScale,
                    0,
                  ],
                  y: [
                    0,
                    asset.drift.y * driftScale,
                    -asset.drift.y * 0.75 * driftScale,
                    asset.drift.y * 0.4 * driftScale,
                    0,
                  ],
                  rotate: [0, 1.2, -1.1, 0.6, 0],
                }
          }
          transition={
            reduce
              ? undefined
              : {
                  duration: driftDuration,
                  delay: asset.drift.delay * 0.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
          className="relative"
          style={{ width: chipW }}
        >
          <div
            className="relative overflow-hidden rounded-2xl border border-electric/30 bg-gradient-to-br from-deep/95 via-void/90 to-panel/80 px-3 py-2.5 shadow-[0_16px_40px_rgba(0,0,0,0.45)] backdrop-blur-md sm:rounded-[1.15rem] sm:px-3.5 sm:py-3"
            style={{
              boxShadow:
                "0 16px 40px rgba(0,0,0,0.48), inset 0 1px 0 rgba(56,189,248,0.16), 0 0 0 1px rgba(255,255,255,0.04)",
            }}
          >
            <div
              className="pointer-events-none absolute -right-4 -top-4 h-14 w-14 rounded-full bg-electric/15 blur-2xl"
              aria-hidden
            />
            <div className="relative flex items-center gap-2.5">
              <span
                className="flex shrink-0 items-center justify-center rounded-full border border-white/[0.12] bg-void/80"
                style={{
                  width: `${Math.max(2.55, sizeRem * 0.52)}rem`,
                  height: `${Math.max(2.55, sizeRem * 0.52)}rem`,
                }}
              >
                {asset.assetKey ? (
                  <AssetLogo
                    asset={asset.assetKey}
                    size={Math.round(logoPx * 0.72)}
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={asset.logoSrc}
                    alt=""
                    width={Math.round(logoPx * 0.72)}
                    height={Math.round(logoPx * 0.72)}
                    className="h-[60%] w-[60%] object-contain"
                    draggable={false}
                    aria-hidden
                  />
                )}
              </span>
              <div className="min-w-0 flex-1 text-left">
                <p className="truncate text-[0.88rem] font-semibold tracking-[-0.015em] text-ink sm:text-[1.02rem]">
                  {displayName}
                </p>
                <p className="mt-1.5 text-[0.86rem] font-semibold tracking-[-0.01em] text-electric sm:text-[0.98rem]">
                  Allocation {asset.allocation}%
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

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
