import Link from "next/link";

const linkClass =
  "inline-flex items-center text-[1.05rem] font-semibold text-electric transition-colors hover:text-ink";

export function HomeReadMore({
  href,
  label = "Read More →",
  className = "",
  external = true,
}: {
  href: string;
  label?: string;
  className?: string;
  external?: boolean;
}) {
  return (
    <Link
      href={href}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className={`${linkClass} ${className}`.trim()}
    >
      {label}
    </Link>
  );
}
