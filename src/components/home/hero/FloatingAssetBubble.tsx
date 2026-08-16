"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AssetLogo } from "@/components/ui/AssetLogo";
import {
  allocationSizeRem,
  type FloatingPortfolioAsset,
} from "./portfolioAssets";

export type FloatingBubbleVariant = "default" | "reveal";

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
    sizeRem * (isReveal ? (compact ? 11 : 12) : compact ? 9.5 : 10.5),
  );
  const opacity = isReveal
    ? 0.78 + position.depth * 0.22
    : 0.58 + position.depth * 0.38;
  const blur = isReveal ? (1 - position.depth) * 0.25 : (1 - position.depth) * 0.5;
  const driftScale = isReveal ? 1.45 : 1;
  const driftDuration = isReveal
    ? asset.drift.duration * 1.15
    : asset.drift.duration;

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
        style={{ width: `${sizeRem + (isReveal ? 2.4 : 1.6)}rem` }}
      >
        <div
          className={
            isReveal
              ? "flex items-center justify-center rounded-full border border-electric/35 bg-deep/85 backdrop-blur-md"
              : "flex items-center justify-center rounded-full border border-line bg-deep/80 backdrop-blur-md"
          }
          style={{
            width: `${sizeRem}rem`,
            height: `${sizeRem}rem`,
            boxShadow: isReveal
              ? position.depth > 0.8
                ? "0 18px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(56,189,248,0.1), inset 0 1px 0 rgba(56,189,248,0.18)"
                : "0 14px 36px rgba(0,0,0,0.42), inset 0 1px 0 rgba(56,189,248,0.1)"
              : position.depth > 0.85
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

        {isReveal ? (
          <div className="mt-2.5 text-center leading-none sm:mt-3">
            <p className="text-[0.78rem] font-semibold tracking-[-0.01em] text-ink sm:text-[0.88rem]">
              {asset.ticker}
            </p>
            <p className="display mt-1.5 text-[1.35rem] font-semibold tracking-[-0.03em] text-electric sm:mt-2 sm:text-[1.65rem]">
              {asset.allocation}%
            </p>
          </div>
        ) : (
          <div className="mt-1.5 text-center leading-none">
            <p className="text-[0.62rem] font-semibold tracking-[0.04em] text-ink sm:text-[0.68rem]">
              {asset.ticker}
            </p>
            <p className="mt-0.5 text-[0.5rem] font-semibold uppercase tracking-[0.1em] text-muted-dim sm:text-[0.52rem]">
              {asset.allocation}% allocation
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
