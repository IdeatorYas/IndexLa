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
      <span className="relative block h-[3.35rem] w-[9.25rem] sm:h-14 sm:w-[10.25rem]">
        <Image
          src={LOGO_TRANSPARENT}
          alt="INDEXLA"
          fill
          sizes="(max-width: 640px) 148px, 164px"
          priority={priority}
          className="object-contain object-left"
        />
      </span>
    </Link>
  );
}
