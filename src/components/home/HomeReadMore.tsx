import Link from "next/link";

const readMoreClass =
  "inline-flex items-center text-[1.05rem] font-semibold text-electric transition-colors hover:text-ink";

export function HomeReadMore({
  href,
  className = "",
}: {
  href: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${readMoreClass} ${className}`.trim()}
    >
      Read More →
    </Link>
  );
}
