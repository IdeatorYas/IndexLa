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
      className={`inline-flex shrink-0 bg-transparent ${
        header ? "flex-col items-center" : "items-center gap-2"
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
            ? "h-[1.875rem] w-[1.875rem] shrink-0 sm:h-9 sm:w-9 xl:h-[2.625rem] xl:w-[2.625rem]"
            : "h-10 w-10 shrink-0"
        }
      />
      <span
        className={`flex min-w-0 flex-col items-stretch ${
          header
            ? "mt-1 w-[9.9375rem] sm:w-[10.125rem] xl:mt-0.5 xl:w-[12.5625rem] 2xl:w-[13.875rem]"
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
          className={
            header
              ? "mt-1 block h-auto w-full xl:mt-0.5"
              : "mt-[0.28rem] block h-auto w-full sm:mt-1.5"
          }
        />
      </span>
    </Link>
  );
}
