import Link from "next/link";

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
};

/**
 * Text wordmark only — the logo PNG is a decorative dot spiral and must not
 * appear as chrome or watermark anywhere on the site.
 */
export function BrandLogo({ className = "" }: BrandLogoProps) {
  return (
    <Link
      href="/"
      aria-label="INDEXLA home"
      className={`relative inline-flex shrink-0 items-center ${className}`}
    >
      <span className="display text-[1.55rem] font-semibold tracking-[-0.04em] text-ink sm:text-[1.7rem]">
        INDEX
        <span className="gradient-text">LA</span>
      </span>
    </Link>
  );
}
