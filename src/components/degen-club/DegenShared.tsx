"use client";

import Image from "next/image";
import { EarlyAccessCta } from "@/components/early-access/EarlyAccessCta";
import {
  dcBody,
  dcBodyStrong,
  dcCta,
  dcH1,
  dcH2,
  dcH3,
} from "@/components/degen-club/degenRhythm";
import {
  DEGEN_MEME_LOGOS,
  MEME_COIN_COLORS,
  type DegenMemeTicker,
} from "@/components/degen-club/memeLogos";
import { DEGEN_SUPPORTED_CHAINS } from "@/components/degen-club/degenLandingBaskets";
import type { DegenBlock } from "@/lib/degen-club";

export const MEME_COINS = (Object.keys(DEGEN_MEME_LOGOS) as DegenMemeTicker[]).map(
  (ticker) => ({
    ticker,
    color: MEME_COIN_COLORS[ticker],
    src: DEGEN_MEME_LOGOS[ticker],
  })
);

export const CHAINS = ["Solana", "Ethereum", "Base", "BNB", "Multi-Chain"] as const;

export const EXAMPLE_ALLOCATIONS = [
  { ticker: "PEPE", pct: 20 },
  { ticker: "WIF", pct: 15 },
  { ticker: "BONK", pct: 15 },
  { ticker: "FLOKI", pct: 10 },
  { ticker: "DOGE", pct: 12 },
  { ticker: "SHIB", pct: 10 },
  { ticker: "PENGU", pct: 8 },
  { ticker: "SPX6900", pct: 10 },
] as const;

export function splitAccentTitle(text: string): { lead: string; accent: string | null } {
  if (text.includes(">")) {
    const idx = text.indexOf(">");
    return { lead: text.slice(0, idx + 1).trim(), accent: text.slice(idx + 1).trim() };
  }

  const sentences = text.match(/[^.!?]+[.!?]+/g);
  if (sentences && sentences.length >= 2) {
    const accent = sentences[sentences.length - 1].trim();
    const lead = sentences.slice(0, -1).join(" ").trim();
    return { lead, accent };
  }

  const colonIdx = text.indexOf(": ");
  if (colonIdx !== -1 && colonIdx < text.length - 4) {
    return {
      lead: text.slice(0, colonIdx + 1),
      accent: text.slice(colonIdx + 2).trim(),
    };
  }

  const trimmed = text.trim();
  const words = trimmed.split(/\s+/);
  if (words.length >= 3) {
    const accent = words.slice(-2).join(" ");
    const lead = words.slice(0, -2).join(" ");
    return { lead, accent };
  }

  return { lead: text, accent: null };
}

export function DegenAccentHeadline({
  text,
  as = "h2",
  className = "",
  align = "left",
}: {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  align?: "left" | "center";
}) {
  const { lead, accent } = splitAccentTitle(text);
  const Tag = as;
  const sizeClass = as === "h1" ? dcH1 : as === "h3" ? dcH3 : dcH2;
  const alignClass = align === "center" ? "text-center" : "";

  return (
    <Tag className={`${sizeClass} ${alignClass} ${className}`}>
      <span className="text-ink">{lead}</span>
      {accent ? (
        <>
          {lead.endsWith(":") || lead.endsWith(">") ? " " : " "}
          <span className="text-electric">{accent}</span>
        </>
      ) : null}
    </Tag>
  );
}

export function DegenSectionTitle({
  title,
  className = "",
  align = "center",
}: {
  title: string;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <DegenAccentHeadline
      text={title}
      as="h2"
      className={className}
      align={align}
    />
  );
}

export function MemeCoinLogo({
  ticker,
  size = "md",
  className = "",
}: {
  ticker: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const key = ticker.toUpperCase();
  const src =
    DEGEN_MEME_LOGOS[key as DegenMemeTicker] ??
    (key === "SPX" ? DEGEN_MEME_LOGOS.SPX6900 : undefined);
  const color = MEME_COIN_COLORS[key] ?? "#38bdf8";

  const sizes = {
    xs: "h-7 w-7",
    sm: "h-9 w-9",
    md: "h-11 w-11",
    lg: "h-14 w-14",
    xl: "h-[4.5rem] w-[4.5rem] sm:h-20 sm:w-20",
  };

  if (!src) {
    return (
      <div
        className={`flex shrink-0 items-center justify-center rounded-full border font-bold text-ink ${sizes[size]} ${className}`}
        style={{ borderColor: `${color}66`, background: `${color}18` }}
        aria-hidden
      >
        {ticker.slice(0, 3)}
      </div>
    );
  }

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-full border bg-void/80 ${sizes[size]} ${className}`}
      style={{
        borderColor: `${color}55`,
        boxShadow: `0 0 24px ${color}22`,
      }}
      title={ticker}
    >
      <Image
        src={src}
        alt=""
        fill
        className="object-cover"
        sizes={size === "xl" ? "80px" : size === "lg" ? "56px" : "44px"}
        aria-hidden
      />
    </div>
  );
}

/** @deprecated Use MemeCoinLogo — kept for non-hero sections during transition */
export function MemeCoinBadge({
  ticker,
  color,
  size = "md",
}: {
  ticker: string;
  color: string;
  size?: "sm" | "md" | "lg";
}) {
  const logoSize = size === "lg" ? "lg" : size === "sm" ? "sm" : "md";
  const key = ticker.toUpperCase() as DegenMemeTicker;
  if (DEGEN_MEME_LOGOS[key]) {
    return <MemeCoinLogo ticker={key} size={logoSize} />;
  }

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
      }}
      aria-hidden
    >
      {ticker.slice(0, 4)}
    </div>
  );
}

export function ChainPills({ compact }: { compact?: boolean }) {
  return (
    <div className={`flex flex-wrap gap-1.5 ${compact ? "justify-center sm:justify-start" : "gap-2"}`}>
      {CHAINS.map((chain) => (
        <span
          key={chain}
          className={`rounded-full border border-line bg-void/50 font-semibold uppercase tracking-[0.08em] text-muted ${
            compact
              ? "px-2.5 py-1 text-[0.72rem] sm:text-[0.78rem]"
              : "px-3.5 py-1.5 text-[0.82rem] sm:text-[0.88rem]"
          }`}
        >
          {chain}
        </span>
      ))}
    </div>
  );
}

export function SupportedChainLogos({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-x-5 gap-y-3 sm:gap-x-7 ${className}`}
    >
      {DEGEN_SUPPORTED_CHAINS.map((chain) => (
        <div
          key={chain.id}
          className="flex flex-col items-center gap-1.5"
          title={chain.label}
        >
          <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-line bg-void/70 sm:h-10 sm:w-10">
            <Image
              src={chain.logo}
              alt=""
              width={28}
              height={28}
              className="h-6 w-6 object-contain sm:h-7 sm:w-7"
              aria-hidden
            />
          </span>
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-muted-dim sm:text-[0.7rem]">
            {chain.label}
          </span>
        </div>
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

function renderBold(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-ink">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export function DegenCopy({
  blocks,
  className = "",
}: {
  blocks: DegenBlock[];
  className?: string;
}) {
  return (
    <div className={`space-y-3.5 sm:space-y-4 ${className}`}>
      {blocks.map((block, i) => {
        if (block.type === "h2") {
          return <DegenAccentHeadline key={i} text={block.text} as="h2" />;
        }
        if (block.type === "h3") {
          return <DegenAccentHeadline key={i} text={block.text} as="h3" />;
        }
        if (block.type === "cta") {
          return <DegenCta key={i} label={block.text} />;
        }

        const isBoldLine = block.text.startsWith("**") && block.text.endsWith("**");
        return (
          <p
            key={i}
            className={`whitespace-pre-line ${isBoldLine ? dcBodyStrong : dcBody}`}
          >
            {renderBold(block.text)}
          </p>
        );
      })}
    </div>
  );
}

export function TerminalShell({
  title,
  children,
  compact = false,
}: {
  title: string;
  children: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-deep/75 shadow-[0_24px_80px_rgba(0,0,0,0.4)]">
      <div
        className={`flex items-center justify-between border-b border-white/[0.06] bg-void/70 px-3 ${
          compact ? "py-2" : "px-4 py-2.5"
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-danger/80" />
          <span className="h-2 w-2 rounded-full bg-amber-400/80" />
          <span className="h-2 w-2 rounded-full bg-success/80" />
        </div>
        <p
          className={`font-semibold uppercase tracking-[0.14em] text-muted-dim ${
            compact ? "text-[0.65rem]" : "text-[0.72rem]"
          }`}
        >
          {title}
        </p>
      </div>
      <div className={compact ? "p-3 sm:p-3.5" : "p-4 sm:p-5"}>{children}</div>
    </div>
  );
}

export function AllocationBar({
  items,
  compact = false,
}: {
  items: readonly { ticker: string; pct: number }[];
  compact?: boolean;
}) {
  const colors = MEME_COIN_COLORS as Record<string, string>;

  return (
    <div>
      <div
        className={`flex overflow-hidden rounded-full border border-line ${
          compact ? "h-2" : "h-3"
        }`}
      >
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
      <ul
        className={`grid sm:grid-cols-2 ${
          compact ? "mt-2 gap-1" : "mt-3 gap-2"
        }`}
      >
        {items.map((item) => (
          <li
            key={item.ticker}
            className={`flex items-center justify-between rounded-lg border border-line/80 bg-void/40 ${
              compact ? "px-2 py-1.5" : "px-3 py-2.5"
            }`}
          >
            <span
              className={`flex items-center gap-2 font-semibold text-ink ${
                compact
                  ? "gap-1.5 text-[0.82rem] sm:text-[0.88rem]"
                  : "gap-2.5 text-[0.95rem] sm:text-[1rem]"
              }`}
            >
              <MemeCoinLogo ticker={item.ticker} size={compact ? "xs" : "sm"} />
              {item.ticker}
            </span>
            <span
              className={`tabular-nums font-semibold text-electric ${
                compact ? "text-[0.82rem] sm:text-[0.88rem]" : "text-[0.95rem] sm:text-[1rem]"
              }`}
            >
              {item.pct}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
