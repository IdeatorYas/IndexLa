"use client";

import { EarlyAccessCta } from "@/components/early-access/EarlyAccessCta";
import { dcCta } from "@/components/degen-club/degenRhythm";
import type { DegenBlock } from "@/lib/degen-club";

export const MEME_COINS = [
  { ticker: "DOGE", color: "#C2A633" },
  { ticker: "SHIB", color: "#FFA409" },
  { ticker: "PEPE", color: "#3D9970" },
  { ticker: "BONK", color: "#F7931A" },
  { ticker: "WIF", color: "#E8B849" },
  { ticker: "FLOKI", color: "#FB923C" },
  { ticker: "BRETT", color: "#3B82F6" },
  { ticker: "POPCAT", color: "#A78BFA" },
  { ticker: "MOG", color: "#94A3B8" },
] as const;

export const CHAINS = ["Solana", "Ethereum", "Base", "BNB", "Multi-Chain"] as const;

export const EXAMPLE_ALLOCATIONS = [
  { ticker: "PEPE", pct: 20 },
  { ticker: "WIF", pct: 15 },
  { ticker: "BONK", pct: 15 },
  { ticker: "FLOKI", pct: 10 },
  { ticker: "DOGE", pct: 12 },
  { ticker: "SHIB", pct: 10 },
  { ticker: "BRETT", pct: 8 },
  { ticker: "MOG", pct: 10 },
] as const;

export function MemeCoinBadge({
  ticker,
  color,
  size = "md",
}: {
  ticker: string;
  color: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: "h-8 w-8 text-[0.55rem]",
    md: "h-10 w-10 text-[0.62rem]",
    lg: "h-12 w-12 text-[0.68rem]",
  };

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full border font-bold tracking-tight text-ink ${sizes[size]}`}
      style={{
        borderColor: `${color}66`,
        background: `linear-gradient(145deg, ${color}33 0%, ${color}12 100%)`,
        boxShadow: `0 0 20px ${color}22`,
      }}
      title={ticker}
      aria-hidden
    >
      {ticker.slice(0, 4)}
    </div>
  );
}

export function ChainPills({ compact }: { compact?: boolean }) {
  return (
    <div
      className={`flex flex-wrap gap-2 ${compact ? "justify-center" : ""}`}
    >
      {CHAINS.map((chain) => (
        <span
          key={chain}
          className="rounded-full border border-line bg-void/50 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-muted"
        >
          {chain}
        </span>
      ))}
    </div>
  );
}

export function DegenCta({ label }: { label: string }) {
  return (
    <EarlyAccessCta mode="general" className={dcCta}>
      {label}
    </EarlyAccessCta>
  );
}

export function DegenCopy({
  blocks,
  className = "",
}: {
  blocks: DegenBlock[];
  className?: string;
}) {
  return (
    <div className={`space-y-3 ${className}`}>
      {blocks.map((block, i) => {
        if (block.type === "h2") {
          return (
            <h2 key={i} className="display text-[clamp(1.5rem,3vw,2rem)] tracking-[-0.02em] text-ink">
              {block.text}
            </h2>
          );
        }
        if (block.type === "h3") {
          return (
            <h3 key={i} className="display text-[1.05rem] tracking-[-0.02em] text-ink sm:text-[1.12rem]">
              {block.text}
            </h3>
          );
        }
        if (block.type === "cta") {
          return <DegenCta key={i} label={block.text} />;
        }
        return (
          <p
            key={i}
            className="whitespace-pre-line text-[1rem] leading-relaxed text-muted sm:text-[1.05rem]"
          >
            {block.text}
          </p>
        );
      })}
    </div>
  );
}

export function TerminalShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-deep/75 shadow-[0_24px_80px_rgba(0,0,0,0.4)]">
      <div className="flex items-center justify-between border-b border-white/[0.06] bg-void/70 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-danger/80" />
          <span className="h-2 w-2 rounded-full bg-amber-400/80" />
          <span className="h-2 w-2 rounded-full bg-success/80" />
        </div>
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted-dim">
          {title}
        </p>
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  );
}

export function AllocationBar({
  items,
}: {
  items: readonly { ticker: string; pct: number }[];
}) {
  const colors = Object.fromEntries(
    MEME_COINS.map((c) => [c.ticker, c.color])
  ) as Record<string, string>;

  return (
    <div>
      <div className="flex h-2.5 overflow-hidden rounded-full border border-line">
        {items.map((item) => (
          <div
            key={item.ticker}
            style={{
              width: `${item.pct}%`,
              background: colors[item.ticker] ?? "#38bdf8",
            }}
            title={`${item.ticker} ${item.pct}%`}
          />
        ))}
      </div>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {items.map((item) => (
          <li
            key={item.ticker}
            className="flex items-center justify-between rounded-lg border border-line/80 bg-void/40 px-3 py-2"
          >
            <span className="flex items-center gap-2 text-[0.85rem] font-semibold text-ink">
              <MemeCoinBadge
                ticker={item.ticker}
                color={colors[item.ticker] ?? "#38bdf8"}
                size="sm"
              />
              {item.ticker}
            </span>
            <span className="tabular-nums text-[0.85rem] font-semibold text-electric">
              {item.pct}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
