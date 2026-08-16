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
      className="flex items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.035] px-2 py-0.5 sm:gap-2.5 sm:rounded-xl sm:px-2.5 sm:py-1"
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
    <div
      className={`relative mx-auto flex w-full max-w-[20.5rem] origin-center items-center justify-center perspective-[1400px] sm:max-w-[22rem] ${
        showIdentity
          ? "scale-[0.88] sm:scale-[0.94] md:scale-100"
          : "scale-[0.92] sm:scale-[0.97] md:scale-100"
      }`}
    >
      {/* Ambient device glow */}
      <div
        className="pointer-events-none absolute inset-[8%] -z-10 rounded-[3rem] bg-electric/15 blur-3xl"
        aria-hidden
      />

      <AnimatePresence>
        {incoming && !reduceMotion ? (
          <motion.div
            key={`fly-${incoming.id}`}
            className="pointer-events-none absolute left-1/2 top-[8%] z-30 -translate-x-1/2"
            initial={{ opacity: 0, y: -36, scale: 0.9 }}
            animate={{
              opacity: [0, 1, 1, 0],
              y: [-36, -8, 28, 72],
              scale: [0.9, 1, 1, 0.92],
            }}
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

      {/* 3D device shell */}
      <div
        className="relative w-full [transform-style:preserve-3d] rotate-x-[4deg] rotate-y-[-3deg]"
        style={{
          filter: "drop-shadow(0 36px 64px rgba(0,0,0,0.62))",
        }}
      >
        {/* Side thickness / chassis edge */}
        <div
          className="pointer-events-none absolute inset-0 translate-x-[5px] translate-y-[7px] rounded-[2.15rem] sm:rounded-[2.35rem]"
          style={{
            background:
              "linear-gradient(160deg, #2a3344 0%, #0c1018 45%, #1a2433 100%)",
            boxShadow: "inset -2px 0 0 rgba(56,189,248,0.12)",
          }}
          aria-hidden
        />

        {/* Outer frame / bezel */}
        <div
          className="relative overflow-hidden rounded-[2.05rem] p-[0.42rem] sm:rounded-[2.25rem] sm:p-[0.48rem]"
          style={{
            background:
              "linear-gradient(155deg, #3a4558 0%, #1a1f2c 28%, #0a0d14 58%, #243040 100%)",
            boxShadow: [
              "inset 0 1px 0 rgba(255,255,255,0.28)",
              "inset 0 -1px 0 rgba(0,0,0,0.55)",
              "inset 1px 0 0 rgba(255,255,255,0.1)",
              "inset -1px 0 0 rgba(56,189,248,0.18)",
              "0 0 0 1px rgba(56,189,248,0.16)",
            ].join(", "),
          }}
        >
          {/* Inner glass rim */}
          <div
            className="relative overflow-hidden rounded-[1.7rem] border border-white/[0.08] sm:rounded-[1.85rem]"
            style={{
              background:
                "linear-gradient(180deg, #121018 0%, #0a0810 100%)",
              boxShadow:
                "inset 0 0 0 1px rgba(56,189,248,0.1), inset 0 20px 40px rgba(56,189,248,0.04)",
            }}
          >
            {/* Screen glass sheen */}
            <div
              className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-br from-white/[0.07] via-transparent to-electric/[0.04]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -left-1/4 top-0 z-10 h-1/2 w-3/4 rotate-12 bg-gradient-to-b from-white/[0.09] to-transparent blur-md"
              aria-hidden
            />

            <div className="relative z-[1] flex flex-col">
              <div className="relative shrink-0 px-3 pb-0.5 pt-2.5 sm:px-4 sm:pt-3">
                <div
                  className="mx-auto mb-2.5 h-1.5 w-16 rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(255,255,255,0.08), rgba(255,255,255,0.22), rgba(255,255,255,0.08))",
                    boxShadow: "inset 0 1px 1px rgba(0,0,0,0.45)",
                  }}
                />
                <div className="flex items-center justify-between">
                  <span className="display text-[0.82rem] font-semibold tracking-[0.08em] text-ink sm:text-[0.95rem]">
                    INDEXLA
                  </span>
                  <span className="text-[0.68rem] font-semibold tracking-[0.04em] text-electric/90 sm:text-[0.75rem]">
                    Portfolio
                  </span>
                </div>
              </div>

              <div className="relative mx-1.5 mb-1.5 flex flex-col rounded-[1.25rem] border border-white/[0.07] bg-gradient-to-b from-[#16121f]/95 to-[#09070e] px-2 pb-2 pt-2 sm:mx-2 sm:mb-2 sm:rounded-[1.4rem] sm:px-3 sm:pb-2.5 sm:pt-2.5">
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-electric/[0.08] to-transparent"
                  aria-hidden
                />

                <div className="relative flex flex-col">
                  <p className="shrink-0 text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-electric">
                    Portfolio
                  </p>
                  <h3 className="display mt-0.5 shrink-0 text-[0.92rem] font-semibold tracking-[-0.03em] text-ink sm:text-[1.05rem]">
                    HYBRID MACRO PORTFOLIO
                  </h3>
                  <div className="mt-1.5 h-px w-full shrink-0 bg-gradient-to-r from-transparent via-white/15 to-transparent" />

                  <ul className="mt-1.5 flex flex-col justify-start gap-1 sm:mt-2 sm:gap-1.5">
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
                        transition={{
                          duration: 0.45,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="mt-2 shrink-0 space-y-2 border-t border-white/[0.08] pt-2"
                      >
                        <div className="grid grid-cols-2 gap-2">
                          <div className="rounded-lg border border-electric/25 bg-electric/[0.07] px-2 py-1.5 text-left sm:px-2.5 sm:py-2">
                            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-electric sm:text-[0.68rem]">
                              Portfolio Type
                            </p>
                            <p className="mt-0.5 text-[0.78rem] font-semibold tracking-[-0.015em] text-ink sm:text-[0.84rem]">
                              Hybrid Portfolio
                            </p>
                          </div>
                          <div className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-2 py-1.5 text-left sm:px-2.5 sm:py-2">
                            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-muted-dim sm:text-[0.68rem]">
                              Strategy
                            </p>
                            <p className="mt-0.5 text-[0.72rem] font-semibold leading-snug tracking-[-0.015em] text-ink sm:text-[0.78rem]">
                              Buy Fear / Sell Greed
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </div>

              <div className="flex shrink-0 justify-center pb-2.5 pt-0.5">
                <div
                  className="h-1 w-22 rounded-full bg-white/25"
                  style={{ width: "5.5rem" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
