"use client";

import { EarlyAccessCta } from "@/components/early-access/EarlyAccessCta";
import type { StableBlock } from "@/lib/stable-club";
import { scBody, scBodyStrong, scCta, scH2, scH3 } from "@/components/stable-club/stableRhythm";

export function renderBold(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-[var(--sc-navy)]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export function StableCta({ label }: { label: string }) {
  const clean = label.replace(/\s*→\s*$/, "").trim();
  return (
    <EarlyAccessCta mode="general" className={scCta}>
      {clean}
    </EarlyAccessCta>
  );
}

export function StableCopy({
  blocks,
  className = "",
}: {
  blocks: StableBlock[];
  className?: string;
}) {
  return (
    <div className={`space-y-3.5 sm:space-y-4 ${className}`}>
      {blocks.map((block, i) => {
        if (block.type === "h2") {
          return (
            <h2 key={i} className={scH2}>
              {block.text}
            </h2>
          );
        }
        if (block.type === "h3") {
          return (
            <h3 key={i} className={scH3}>
              {block.text}
            </h3>
          );
        }
        if (block.type === "cta") {
          return <StableCta key={i} label={block.text} />;
        }
        if (block.type === "ul") {
          return (
            <ul key={i} className="space-y-2">
              {block.items.map((item) => (
                <li key={item} className={`flex items-start gap-2.5 ${scBody}`}>
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--sc-teal)]"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        }
        if (block.type === "italic") {
          return (
            <p key={i} className={`italic ${scBody} text-[var(--sc-muted)]`}>
              {block.text}
            </p>
          );
        }

        const isBoldLine = block.text.startsWith("**") && block.text.endsWith("**");
        return (
          <p
            key={i}
            className={`whitespace-pre-line ${isBoldLine ? scBodyStrong : scBody}`}
          >
            {renderBold(block.text)}
          </p>
        );
      })}
    </div>
  );
}

export function StablecoinBadge({
  symbol,
  color,
  size = "md",
}: {
  symbol: "USDC" | "USDT";
  color: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: "h-8 w-8 text-[0.55rem]",
    md: "h-10 w-10 text-[0.62rem]",
    lg: "h-12 w-12 text-[0.7rem]",
  };

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full border font-bold tracking-tight text-white ${sizes[size]}`}
      style={{
        borderColor: `${color}88`,
        background: `linear-gradient(145deg, ${color} 0%, ${color}cc 100%)`,
        boxShadow: `0 4px 16px ${color}33`,
      }}
      aria-hidden
      title={symbol}
    >
      {symbol === "USDC" ? "$" : "₮"}
    </div>
  );
}

export function AssetLogo({
  src,
  alt,
  size = 32,
}: {
  src: string;
  alt: string;
  size?: number;
}) {
  return (
    <span
      className="flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-[var(--sc-line)] bg-white"
      style={{ width: size, height: size }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        width={size - 8}
        height={size - 8}
        className="object-contain"
        loading="lazy"
        decoding="async"
        aria-hidden
        title={alt}
      />
    </span>
  );
}
