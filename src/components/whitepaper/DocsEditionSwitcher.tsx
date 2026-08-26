import Link from "next/link";
import type { DocsEdition } from "@/lib/whitepaper";
import { DOCS_EDITIONS } from "@/lib/whitepaper";

export function DocsEditionSwitcher({
  edition,
  whitepaperHref,
  technicalHref,
}: {
  edition: DocsEdition;
  whitepaperHref: string;
  technicalHref: string;
}) {
  const hrefFor = (id: DocsEdition) =>
    id === "technical-paper" ? technicalHref : whitepaperHref;

  return (
    <div
      role="tablist"
      aria-label="Documentation edition"
      className="inline-flex rounded-lg border border-line bg-deep p-0.5 shadow-sm"
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
                ? "bg-panel text-electric"
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
