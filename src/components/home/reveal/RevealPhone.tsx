"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AssetLogo } from "@/components/ui/AssetLogo";
import type { FloatingPortfolioAsset } from "@/components/home/hero/portfolioAssets";

type RevealPhoneProps = {
  visibleCount: number;
  showIdentity: boolean;
  assets: FloatingPortfolioAsset[];
  reduceMotion?: boolean;
};

function AssetRow({
  asset,
  index,
}: {
  asset: FloatingPortfolioAsset;
  index: number;
}) {
  return (
    <motion.li
      layout={false}
      initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        duration: 0.28,
        ease: [0.22, 1, 0.36, 1],
        delay: 0,
      }}
      className="flex items-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.03] px-2.5 py-2 sm:gap-3 sm:px-3 sm:py-2.5"
      style={{
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-void/70 sm:h-9 sm:w-9">
        {asset.assetKey ? (
          <AssetLogo asset={asset.assetKey} size={18} />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={asset.logoSrc}
            alt=""
            width={18}
            height={18}
            className="object-contain"
            draggable={false}
            aria-hidden
          />
        )}
      </span>
      <span className="min-w-0 flex-1 text-left">
        <span className="block truncate text-[0.8rem] font-semibold tracking-[-0.01em] text-ink sm:text-[0.88rem]">
          {asset.ticker}
        </span>
        <span className="mt-0.5 block text-[0.58rem] font-semibold uppercase tracking-[0.1em] text-muted-dim">
          Allocation
        </span>
      </span>
      <span className="display shrink-0 text-[0.95rem] font-semibold tracking-[-0.02em] text-electric sm:text-[1.05rem]">
        {asset.allocation}%
      </span>
      <span className="sr-only">Asset {index + 1}</span>
    </motion.li>
  );
}

export function RevealPhone({
  visibleCount,
  showIdentity,
  assets,
  reduceMotion = false,
}: RevealPhoneProps) {
  const shown = assets.slice(0, visibleCount);

  return (
    <div className="relative mx-auto w-[min(100%,19.5rem)] sm:w-[21rem]">
      {/* Soft device glow — restrained */}
      <div
        className="pointer-events-none absolute -inset-6 rounded-[3rem] bg-electric/[0.06] blur-2xl"
        aria-hidden
      />

      <div
        className="relative overflow-hidden rounded-[2rem] border border-white/[0.12] bg-[#0c0a12] shadow-[0_28px_80px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.08)] sm:rounded-[2.15rem]"
        style={{
          boxShadow:
            "0 28px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(56,189,248,0.12), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      >
        {/* Bezel / status */}
        <div className="relative px-4 pb-1 pt-3.5 sm:px-5 sm:pt-4">
          <div className="mx-auto mb-3 h-1.5 w-16 rounded-full bg-white/[0.14]" />
          <div className="flex items-center justify-between text-[0.62rem] font-semibold tracking-[0.04em] text-muted-dim">
            <span>INDEXLA</span>
            <span className="text-electric/80">Portfolio</span>
          </div>
        </div>

        {/* Screen surface */}
        <div className="relative mx-2 mb-2 overflow-hidden rounded-[1.35rem] border border-white/[0.07] bg-gradient-to-b from-[#14101f] to-[#0a0810] px-3.5 pb-4 pt-3.5 sm:mx-2.5 sm:mb-2.5 sm:rounded-[1.5rem] sm:px-4 sm:pb-5 sm:pt-4">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-electric/[0.07] to-transparent"
            aria-hidden
          />

          <div className="relative">
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-electric">
              Portfolio
            </p>
            <h3 className="display mt-1.5 text-[1.15rem] font-semibold tracking-[-0.03em] text-ink sm:text-[1.28rem]">
              HYBRID MACRO PORTFOLIO
            </h3>
            <div className="mt-3 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

            <ul className="mt-3 max-h-[min(42svh,22rem)] space-y-1.5 overflow-y-auto overscroll-contain pr-0.5 sm:mt-3.5 sm:max-h-[24rem] sm:space-y-2">
              <AnimatePresence initial={false}>
                {shown.map((asset, i) => (
                  <AssetRow key={asset.id} asset={asset} index={i} />
                ))}
              </AnimatePresence>
            </ul>

            <AnimatePresence>
              {showIdentity ? (
                <motion.div
                  key="identity"
                  initial={
                    reduceMotion
                      ? { opacity: 1 }
                      : { opacity: 0, y: 10 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-4 space-y-3 border-t border-white/[0.08] pt-3.5"
                >
                  <div className="rounded-xl border border-electric/25 bg-electric/[0.07] px-3 py-2.5 text-left">
                    <p className="text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-electric">
                      Portfolio Type
                    </p>
                    <p className="mt-1 text-[0.95rem] font-semibold tracking-[-0.015em] text-ink">
                      Hybrid Portfolio
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2.5 text-left">
                    <p className="text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-muted-dim">
                      Strategy
                    </p>
                    <p className="mt-1 text-[0.95rem] font-semibold tracking-[-0.015em] text-ink">
                      Buy Fear / Sell Greed
                    </p>
                  </div>
                  <p className="pt-0.5 text-center text-[0.68rem] font-semibold tracking-[-0.01em] text-muted">
                    Assets + Allocation + Strategy = INDEXLA Portfolio
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>

        {/* Home indicator */}
        <div className="flex justify-center pb-2.5 pt-1">
          <div className="h-1 w-24 rounded-full bg-white/20" />
        </div>
      </div>
    </div>
  );
}
