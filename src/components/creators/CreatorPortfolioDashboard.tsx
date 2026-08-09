"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AssetLogo } from "@/components/ui/AssetLogo";
import type { AssetKey } from "@/lib/site";

const demoAssets: AssetKey[] = ["btc", "eth", "nvidia", "gold", "sol"];
const allocation = [
  { label: "Crypto", pct: 48, color: "bg-purple" },
  { label: "Equities", pct: 32, color: "bg-electric" },
  { label: "Commodities", pct: 20, color: "bg-blue" },
];

type CreatorPortfolioDashboardProps = {
  compact?: boolean;
  className?: string;
};

/** Illustrative product UI — not live creator data */
export function CreatorPortfolioDashboard({
  compact = false,
  className = "",
}: CreatorPortfolioDashboardProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={`rounded-[1.5rem] glass p-5 sm:p-6 ${className}`}
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted-dim">
            Creator portfolio · illustrative
          </p>
          <p className="display mt-2 text-[1.35rem] sm:text-[1.5rem]">
            Flagship Thesis
          </p>
          <p className="mt-1 text-sm text-muted">Hybrid · Buy Fear / Sell Greed</p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-3 py-1 text-[0.7rem] font-semibold text-success">
          <span className="relative flex h-2 w-2">
            {!reduce && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-50" />
            )}
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
          </span>
          Strategy live
        </span>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {demoAssets.map((key) => (
          <span
            key={key}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-void/55"
          >
            <AssetLogo asset={key} size={18} />
          </span>
        ))}
      </div>

      <div className={`mt-5 grid gap-3 ${compact ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-4"}`}>
        {[
          { label: "Demo performance", value: "+18.4%", tone: "text-success" },
          { label: "Demo AUM", value: "$4.2M", tone: "text-ink" },
          { label: "Demo PnL", value: "+$772K", tone: "text-success" },
          { label: "Creator earnings", value: "$12.4K", tone: "text-electric" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-line bg-void/45 px-3 py-3"
          >
            <p className="text-[0.62rem] uppercase tracking-[0.12em] text-muted-dim">
              {stat.label}
            </p>
            <p className={`mt-1 display text-[1.15rem] ${stat.tone}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-5">
        <p className="text-[0.65rem] uppercase tracking-[0.12em] text-muted-dim">
          Demo allocation
        </p>
        <div className="mt-2 flex h-2.5 overflow-hidden rounded-full bg-white/5">
          {allocation.map((row) => (
            <div
              key={row.label}
              className={row.color}
              style={{ width: `${row.pct}%` }}
            />
          ))}
        </div>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[0.7rem] text-muted-dim">
          {allocation.map((row) => (
            <span key={row.label}>
              {row.label} {row.pct}%
            </span>
          ))}
        </div>
      </div>

      {!compact && (
        <p className="mt-5 border-t border-line pt-3 text-xs text-muted-dim">
          Illustrative product concept — not live creator data.
        </p>
      )}
    </motion.div>
  );
}
