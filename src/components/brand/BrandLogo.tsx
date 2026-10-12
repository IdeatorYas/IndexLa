"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/components/theme/ThemeProvider";

const DARK = {
  symbol: "/logo/brand/symbol.png",
  wordmark: "/logo/brand/wordmark.png",
  tagline: "/logo/brand/tagline.png",
  symbolSize: [640, 638] as const,
  wordmarkSize: [1600, 205] as const,
  taglineSize: [1800, 64] as const,
};

const LIGHT = {
  symbol: "/logo/brand/symbol-on-light.png",
  wordmark: "/logo/brand/wordmark-on-light.png",
  tagline: "/logo/brand/tagline-on-light.png",
  symbolSize: [640, 637] as const,
  wordmarkSize: [995, 129] as const,
  taglineSize: [1003, 36] as const,
};

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
  size?: "header" | "footer";
};

export function BrandLogo({
  className = "",
  priority = false,
  size = "header",
}: BrandLogoProps) {
  const { theme } = useTheme();
  const art = theme === "light" ? LIGHT : DARK;
  const header = size === "header";

  return (
    <Link
      href="/"
      aria-label="INDEXLA home"
      className={`inline-flex shrink-0 items-center bg-transparent ${
        header ? "gap-2 sm:gap-2.5" : "gap-2"
      } ${className}`}
    >
      <Image
        src={art.symbol}
        alt=""
        width={art.symbolSize[0]}
        height={art.symbolSize[1]}
        priority={priority}
        unoptimized
        className={
          header
            ? "h-10 w-10 shrink-0 sm:h-12 sm:w-12 xl:h-14 xl:w-14"
            : "h-10 w-10 shrink-0"
        }
      />
      <span
        className={`flex min-w-0 flex-col items-stretch ${
          header
            ? "w-[13.25rem] sm:w-[13.5rem] xl:w-[16.75rem] 2xl:w-[18.5rem]"
            : "w-[11rem]"
        }`}
      >
        <Image
          src={art.wordmark}
          alt="INDEXLA"
          width={art.wordmarkSize[0]}
          height={art.wordmarkSize[1]}
          priority={priority}
          unoptimized
          className="block h-auto w-full"
        />
        <Image
          src={art.tagline}
          alt="Invest in Everything"
          width={art.taglineSize[0]}
          height={art.taglineSize[1]}
          priority={priority}
          unoptimized
          className="mt-[0.28rem] block h-auto w-full sm:mt-1.5"
        />
      </span>
    </Link>
  );
}
