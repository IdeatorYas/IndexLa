type WhitepaperExploreCtaProps = {
  href: string;
  label: string;
};

/** Section-end explore link — opens destination in a new tab. */
/** Section-end explore link — opens destination in a new tab. */
export function WhitepaperExploreCta({ href, label }: WhitepaperExploreCtaProps) {
  const text = label.replace(/\s*→\s*$/u, "").trimEnd();

  return (
    <div className="wp-explore-cta mt-10 border-t border-[#dbe4f0] pt-6">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-2 rounded-lg border border-[#bfdbfe] bg-[#eff6ff] px-4 py-3 text-[0.95rem] font-semibold tracking-[-0.01em] text-[#2563eb] transition-colors hover:border-[#2563eb]/55 hover:bg-[#dbeafe] hover:text-[#0f172a]"
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
