import Image from "next/image";
import Link from "next/link";
import { LOGO_DARK } from "@/lib/site";

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
};

export function BrandLogo({ className = "", priority = false }: BrandLogoProps) {
  return (
    <Link
      href="/"
      aria-label="INDEXLA home"
      className={`relative inline-flex items-center overflow-hidden ${className}`}
    >
      <span className="relative block h-12 w-[9.75rem] sm:h-[3.35rem] sm:w-[11rem]">
        <Image
          src={LOGO_DARK}
          alt="INDEXLA"
          fill
          sizes="176px"
          priority={priority}
          className="object-contain object-[center_42%] mix-blend-screen scale-[1.55]"
        />
      </span>
    </Link>
  );
}
