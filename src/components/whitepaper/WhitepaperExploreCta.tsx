type WhitepaperExploreCtaProps = {
  href: string;
  label: string;
};

/** Section-end explore link — opens destination in a new tab. */
export function WhitepaperExploreCta({ href, label }: WhitepaperExploreCtaProps) {
  const text = label.replace(/\s*→\s*$/u, "").trimEnd();

  return (
    <div className="mt-10 border-t border-line pt-6">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-2 rounded-lg border border-electric/35 bg-electric/10 px-4 py-3 text-[0.95rem] font-semibold tracking-[-0.01em] text-electric transition-colors hover:border-electric/55 hover:bg-electric/15 hover:text-ink"
      >
        <span>{text}</span>
        <span
          aria-hidden
          className="transition-transform group-hover:translate-x-0.5"
        >
          →
        </span>
      </a>
    </div>
  );
}
