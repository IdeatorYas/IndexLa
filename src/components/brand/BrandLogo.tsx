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
      className={`relative inline-flex items-center ${className}`}
    >
      <span className="relative block h-11 w-[7.5rem] sm:h-12 sm:w-[8.75rem]">
        <Image
          src={LOGO_TRANSPARENT}
          alt="INDEXLA"
          fill
          sizes="(max-width: 640px) 120px, 140px"
          priority={priority}
          className="object-contain object-left"
        />
      </span>
    </Link>
  );
}
