"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/components/theme/ThemeProvider";
import { LOGO_ON_DARK, LOGO_ON_LIGHT } from "@/lib/site";

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
};

export function BrandLogo({ className = "", priority = false }: BrandLogoProps) {
  const { theme } = useTheme();
  const src = theme === "light" ? LOGO_ON_LIGHT : LOGO_ON_DARK;

  return (
    <Link
      href="/"
      aria-label="INDEXLA home"
      className={`relative inline-flex shrink-0 items-center bg-transparent ${className}`}
    >
      <span className="relative block h-[3.65rem] w-[10.25rem] bg-transparent sm:h-16 sm:w-[11.75rem]">
        <Image
          src={src}
          alt="INDEXLA"
          fill
          sizes="(max-width: 640px) 164px, 188px"
          priority={priority}
          className="bg-transparent object-contain object-left"
        />
      </span>
    </Link>
  );
}
