import Image from "next/image";
import Link from "next/link";
import { LOGO_TRANSPARENT } from "@/lib/site";

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
};

export function BrandLogo({ className = "", priority = false }: BrandLogoProps) {
  return (
    <Link
      href="/"
      aria-label="INDEXLA home"
      className={`relative inline-flex shrink-0 items-center ${className}`}
    >
      <span className="relative block h-14 w-[9.85rem] sm:h-[3.75rem] sm:w-[11rem]">
        <Image
          src={LOGO_TRANSPARENT}
          alt="INDEXLA"
          fill
          sizes="(max-width: 640px) 158px, 176px"
          priority={priority}
          className="object-contain object-left"
        />
      </span>
    </Link>
  );
}
