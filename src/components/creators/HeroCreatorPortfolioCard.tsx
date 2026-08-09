"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AssetLogo } from "@/components/ui/AssetLogo";
import type { AssetKey } from "@/lib/site";

const assets: AssetKey[] = ["btc", "eth", "nvidia", "gold", "sol"];
const allocation = [
  { label: "Crypto", pct: 48, color: "bg-purple" },
  { label: "Equities", pct: 32, color: "bg-electric" },
  { label: "Commodities", pct: 20, color: "bg-blue" },
];

/** Hero-only product visual — do not reuse elsewhere */
export function HeroCreatorPortfolioCard() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="rounded-[1.5rem] glass p-5 sm:p-6"
      initial={reduce ? false : { opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-start gap-3">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple via-electric to-blue text-sm font-bold text-white"
          aria-hidden
        >
          AX
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-sm font-semibold text-ink">apex.signal</p>
              <p className="text-[0.65rem] uppercase tracking-[0.14em] text-muted-dim">
                Demo creator · illustrative
              </p>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-2.5 py-1 text-[0.68rem] font-semibold text-success">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              Live
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5 border-t border-line pt-4">
        <p className="display text-[1.35rem]">Conviction Desk</p>
        <p className="mt-1 text-sm text-muted">Hybrid · Buy Fear / Sell Greed</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {assets.map((key) => (
          <span
            key={key}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-line bg-void/55"
          >
            <AssetLogo asset={key} size={16} />
          </span>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {[
          { label: "Performance", value: "+24.1%", tone: "text-success" },
          { label: "AUM", value: "$8.6M", tone: "text-ink" },
          { label: "PnL", value: "+$1.2M", tone: "text-success" },
          { label: "Creator earn.", value: "$28.4K", tone: "text-electric" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-line bg-void/45 px-3 py-3"
          >
            <p className="text-[0.6rem] uppercase tracking-[0.12em] text-muted-dim">
              {stat.label}
            </p>
            <p className={`mt-1 display text-[1.1rem] ${stat.tone}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-5">
        <p className="text-[0.62rem] uppercase tracking-[0.12em] text-muted-dim">
          Allocation
        </p>
        <div className="mt-2 flex h-2 overflow-hidden rounded-full bg-white/5">
          {allocation.map((row) => (
            <div key={row.label} className={row.color} style={{ width: `${row.pct}%` }} />
          ))}
        </div>
        <div className="mt-2 flex flex-wrap gap-x-3 text-[0.68rem] text-muted-dim">
          {allocation.map((row) => (
            <span key={row.label}>
              {row.label} {row.pct}%
            </span>
          ))}
        </div>
      </div>

      <p className="mt-4 text-[0.7rem] text-muted-dim">
        Illustrative product concept — not live creator data.
      </p>
    </motion.div>
  );
}
