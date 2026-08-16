"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AssetLogo } from "@/components/ui/AssetLogo";
import {
  allocationSizeRem,
  type FloatingPortfolioAsset,
} from "./portfolioAssets";

type FloatingAssetBubbleProps = {
  asset: FloatingPortfolioAsset;
  compact?: boolean;
  position: { x: number; y: number; depth: number };
};

export function FloatingAssetBubble({
  asset,
  compact = false,
  position,
}: FloatingAssetBubbleProps) {
  const reduce = useReducedMotion();
  const sizeRem = allocationSizeRem(asset.allocation, compact);
  const logoPx = Math.round(sizeRem * (compact ? 9.5 : 10.5));
  const opacity = 0.58 + position.depth * 0.38;
  const blur = (1 - position.depth) * 0.5;

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
                x: [0, asset.drift.x, -asset.drift.x * 0.55, 0],
                y: [0, asset.drift.y, -asset.drift.y * 0.65, 0],
              }
        }
        transition={
          reduce
            ? undefined
            : {
                duration: asset.drift.duration,
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
