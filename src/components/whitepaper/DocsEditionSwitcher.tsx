import Link from "next/link";
import type { DocsEdition } from "@/lib/whitepaper";
import { DOCS_EDITIONS } from "@/lib/whitepaper";

export function DocsEditionSwitcher({
  edition,
  whitepaperHref,
  technicalHref,
  light = false,
}: {
  edition: DocsEdition;
  whitepaperHref: string;
  technicalHref: string;
  light?: boolean;
}) {
  const hrefFor = (id: DocsEdition) =>
    id === "technical-paper" ? technicalHref : whitepaperHref;

  return (
    <div
      role="tablist"
      aria-label="Documentation edition"
      className={`inline-flex rounded-lg border p-0.5 ${
        light
          ? "border-[#dbe4f0] bg-white shadow-sm"
          : "border-line bg-deep/80"
      }`}
    >
      {DOCS_EDITIONS.map((item) => {
        const active = item.id === edition;
        return (
          <Link
            key={item.id}
            href={hrefFor(item.id)}
            role="tab"
            aria-selected={active}
            className={`rounded-md px-3 py-1.5 text-[0.78rem] font-semibold tracking-[-0.01em] transition-colors sm:px-3.5 sm:text-[0.82rem] ${
              active
                ? light
                  ? "bg-[#eff6ff] text-[#2563eb]"
                  : "bg-electric/15 text-electric"
                : light
                  ? "text-[#64748b] hover:text-[#0f172a]"
                  : "text-muted hover:text-ink"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
