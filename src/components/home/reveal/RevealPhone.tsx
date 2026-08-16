"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AssetLogo } from "@/components/ui/AssetLogo";
import type { RevealAsset } from "@/components/home/reveal/revealAssets";

type RevealPhoneProps = {
  visibleCount: number;
  showIdentity: boolean;
  assets: RevealAsset[];
  reduceMotion?: boolean;
  /** Index of the asset currently flying in (0-based), or -1 */
  enteringIndex?: number;
};

function AssetRow({
  asset,
  index,
  reduceMotion,
  isEntering,
}: {
  asset: RevealAsset;
  index: number;
  reduceMotion?: boolean;
  isEntering?: boolean;
}) {
  const fromLeft = index % 2 === 0;

  return (
    <motion.li
      layout={false}
      initial={
        reduceMotion
          ? { opacity: 1 }
          : {
              opacity: 0,
              x: fromLeft ? -120 : 120,
              y: -28,
              scale: 0.88,
              filter: "blur(6px)",
            }
      }
      animate={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: isEntering && !reduceMotion ? [0.88, 1.04, 1] : 1,
        filter: "blur(0px)",
      }}
      transition={{
        duration: reduceMotion ? 0.2 : 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="flex items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.035] px-2 py-1 sm:gap-2.5 sm:rounded-xl sm:px-2.5 sm:py-1.5"
      style={{
        boxShadow: isEntering
          ? "0 0 0 1px rgba(56,189,248,0.35), inset 0 1px 0 rgba(255,255,255,0.06)"
          : "inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/[0.1] bg-void/75 sm:h-7 sm:w-7">
        {asset.assetKey ? (
          <AssetLogo asset={asset.assetKey} size={14} />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={asset.logoSrc}
            alt=""
            width={14}
            height={14}
            className="object-contain"
            draggable={false}
            aria-hidden
          />
        )}
      </span>
      <span className="min-w-0 flex-1 text-left">
        <span className="block truncate text-[0.72rem] font-semibold tracking-[-0.01em] text-ink sm:text-[0.8rem]">
          {asset.displayName}
        </span>
      </span>
      <span className="display shrink-0 text-[0.78rem] font-semibold tracking-[-0.02em] text-electric sm:text-[0.88rem]">
        {asset.allocation}%
      </span>
    </motion.li>
  );
}

export function RevealPhone({
  visibleCount,
  showIdentity,
  assets,
  reduceMotion = false,
  enteringIndex = -1,
}: RevealPhoneProps) {
  const shown = assets.slice(0, visibleCount);
  const incoming =
    enteringIndex >= 0 && enteringIndex < assets.length
      ? assets[enteringIndex]
      : null;

  return (
    <div className="relative mx-auto flex h-full max-h-[min(94svh,46rem)] w-full max-w-[20.5rem] items-center justify-center sm:max-w-[22rem]">
      {/* Incoming asset flight chip */}
      <AnimatePresence>
        {incoming && !reduceMotion ? (
          <motion.div
            key={`fly-${incoming.id}`}
            className="pointer-events-none absolute left-1/2 top-[12%] z-20 -translate-x-1/2"
            initial={{ opacity: 0, y: -36, scale: 0.9 }}
            animate={{ opacity: [0, 1, 1, 0], y: [-36, -8, 28, 72], scale: [0.9, 1, 1, 0.92] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-2 rounded-full border border-electric/40 bg-void/90 px-3 py-1.5 shadow-[0_12px_36px_rgba(0,0,0,0.45)] backdrop-blur-md">
              {incoming.assetKey ? (
                <AssetLogo asset={incoming.assetKey} size={16} />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={incoming.logoSrc}
                  alt=""
                  width={16}
                  height={16}
                  className="object-contain"
                  draggable={false}
                  aria-hidden
                />
              )}
              <span className="text-[0.72rem] font-semibold text-ink">
                {incoming.displayName}
              </span>
              <span className="text-[0.72rem] font-semibold text-electric">
                {incoming.allocation}%
              </span>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div
        className="relative flex max-h-full w-full flex-col overflow-hidden rounded-[1.85rem] border border-white/[0.12] bg-[#0c0a12] sm:rounded-[2.05rem]"
        style={{
          boxShadow:
            "0 28px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(56,189,248,0.12), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      >
        <div className="relative shrink-0 px-3.5 pb-0.5 pt-3 sm:px-4 sm:pt-3.5">
          <div className="mx-auto mb-2.5 h-1.5 w-14 rounded-full bg-white/[0.14]" />
          <div className="flex items-center justify-between text-[0.58rem] font-semibold tracking-[0.04em] text-muted-dim sm:text-[0.62rem]">
            <span>INDEXLA</span>
            <span className="text-electric/80">Portfolio</span>
          </div>
        </div>

        <div className="relative mx-1.5 mb-1.5 flex min-h-0 flex-1 flex-col overflow-hidden rounded-[1.25rem] border border-white/[0.07] bg-gradient-to-b from-[#14101f] to-[#0a0810] px-2.5 pb-2.5 pt-2.5 sm:mx-2 sm:mb-2 sm:rounded-[1.4rem] sm:px-3 sm:pb-3 sm:pt-3">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-electric/[0.07] to-transparent"
            aria-hidden
          />

          <div className="relative flex min-h-0 flex-1 flex-col">
            <p className="shrink-0 text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-electric">
              Portfolio
            </p>
            <h3 className="display mt-1 shrink-0 text-[0.98rem] font-semibold tracking-[-0.03em] text-ink sm:text-[1.1rem]">
              HYBRID MACRO PORTFOLIO
            </h3>
            <div className="mt-2 h-px w-full shrink-0 bg-gradient-to-r from-transparent via-white/15 to-transparent" />

            <ul className="mt-2 flex min-h-0 flex-1 flex-col justify-start gap-1 overflow-visible sm:mt-2.5 sm:gap-1.5">
              <AnimatePresence initial={false}>
                {shown.map((asset, i) => (
                  <AssetRow
                    key={asset.id}
                    asset={asset}
                    index={i}
                    reduceMotion={reduceMotion}
                    isEntering={i === enteringIndex}
                  />
                ))}
              </AnimatePresence>
            </ul>

            <AnimatePresence>
              {showIdentity ? (
                <motion.div
                  key="identity"
                  initial={
                    reduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-2.5 shrink-0 space-y-2 border-t border-white/[0.08] pt-2.5"
                >
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-lg border border-electric/25 bg-electric/[0.07] px-2.5 py-2 text-left">
                      <p className="text-[0.52rem] font-semibold uppercase tracking-[0.12em] text-electric">
                        Portfolio Type
                      </p>
                      <p className="mt-0.5 text-[0.78rem] font-semibold tracking-[-0.015em] text-ink">
                        Hybrid Portfolio
                      </p>
                    </div>
                    <div className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-2 text-left">
                      <p className="text-[0.52rem] font-semibold uppercase tracking-[0.12em] text-muted-dim">
                        Strategy
                      </p>
                      <p className="mt-0.5 text-[0.72rem] font-semibold leading-snug tracking-[-0.015em] text-ink">
                        Buy Fear / Sell Greed
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex shrink-0 justify-center pb-2 pt-0.5">
          <div className="h-1 w-20 rounded-full bg-white/20" />
        </div>
      </div>
    </div>
  );
}
