"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { TocItem, WhitepaperSection } from "@/lib/whitepaper";
import { formatProgress } from "@/lib/whitepaper";
import { WhitepaperSidebar } from "@/components/whitepaper/WhitepaperSidebar";
import { WhitepaperSectionBody } from "@/components/whitepaper/WhitepaperSectionBody";

function stripMajorHeading(markdown: string): string {
  return markdown.replace(/^#{1,2}\s+\d+\.\s+.+\n*/, "").trim();
}

function sidebarSubsections(section: WhitepaperSection): TocItem[] {
  const roots = section.subsections;
  if (roots.length === 1) return roots[0].children;
  return roots;
}

export function WhitepaperShell({
  docTitle,
  sections,
}: {
  docTitle: string;
  sections: WhitepaperSection[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeSlug = searchParams.get("section") || sections[0]?.slug || "";
  const activeIndex = Math.max(
    0,
    sections.findIndex((s) => s.slug === activeSlug),
  );
  const section = sections[activeIndex] ?? sections[0];
  const total = sections.length;
  const prev = activeIndex > 0 ? sections[activeIndex - 1] : null;
  const next = activeIndex < total - 1 ? sections[activeIndex + 1] : null;

  const bodyMarkdown = useMemo(
    () => stripMajorHeading(section.markdown),
    [section.markdown],
  );

  const subs = useMemo(() => sidebarSubsections(section), [section]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [section.slug]);

  // Ensure URL always has a section param
  useEffect(() => {
    if (!searchParams.get("section") && sections[0]) {
      router.replace(`/whitepaper?section=${sections[0].slug}`, { scroll: false });
    }
  }, [router, searchParams, sections]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === "ArrowRight" && next) {
        router.push(`/whitepaper?section=${next.slug}`);
      }
      if (e.key === "ArrowLeft" && prev) {
        router.push(`/whitepaper?section=${prev.slug}`);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, router]);

  const sectionsForSidebar = useMemo(
    () =>
      sections.map((s) => ({
        ...s,
        subsections: s.slug === section.slug ? subs : [],
      })),
    [sections, section.slug, subs],
  );

  return (
    <main className="relative min-h-screen bg-void">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[22rem] hero-glow opacity-35"
        aria-hidden
      />

      <div className="section-pad relative z-10 mx-auto max-w-[84rem] pt-24 pb-5 md:pt-28">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-5">
          <div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-dim">
              {docTitle}
            </p>
            <div className="mt-2 flex flex-wrap items-baseline gap-3">
              <h1 className="display text-[clamp(1.7rem,3.4vw,2.45rem)] tracking-[-0.03em] text-ink">
                {section.title}
              </h1>
              <p className="text-[0.85rem] font-semibold tabular-nums text-electric">
                {formatProgress(activeIndex, total)}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="inline-flex items-center gap-2 rounded-md border border-line bg-deep/80 px-3.5 py-2 text-sm font-semibold text-ink transition-colors hover:border-electric/40 hover:text-electric lg:hidden"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path
                d="M2 3.5h10M2 7h10M2 10.5h10"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
            Contents
          </button>
        </div>

        <div className="mt-3 h-1 overflow-hidden rounded-full bg-panel">
          <div
            className="h-full rounded-full bg-gradient-to-r from-electric to-purple-bright transition-all duration-500"
            style={{ width: `${((activeIndex + 1) / total) * 100}%` }}
          />
        </div>
      </div>

      <div className="section-pad relative z-10 mx-auto grid max-w-[84rem] gap-10 pb-10 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-14 xl:grid-cols-[18rem_minmax(0,42rem)] xl:justify-between">
        <WhitepaperSidebar
          sections={sectionsForSidebar}
          activeSlug={section.slug}
          mobileOpen={mobileOpen}
          onMobileClose={() => setMobileOpen(false)}
        />

        <article className="min-w-0">
          <WhitepaperSectionBody slug={section.slug} markdown={bodyMarkdown} />

          <nav
            aria-label="Section pagination"
            className="mt-14 border-t border-line pt-6"
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="text-[0.8rem] font-semibold tabular-nums text-muted">
                {formatProgress(activeIndex, total)}
              </p>
              <p className="text-[0.75rem] text-muted-dim">
                Use ← → to navigate
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {prev ? (
                <Link
                  href={`/whitepaper?section=${prev.slug}`}
                  className="rounded-xl border border-line bg-deep/60 px-4 py-3.5 transition-colors hover:border-electric/40"
                >
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted-dim">
                    Previous
                  </p>
                  <p className="mt-1 text-[0.95rem] font-semibold text-ink">
                    {prev.title}
                  </p>
                </Link>
              ) : (
                <div />
              )}
              {next ? (
                <Link
                  href={`/whitepaper?section=${next.slug}`}
                  className="rounded-xl border border-line bg-deep/60 px-4 py-3.5 text-right transition-colors hover:border-electric/40 sm:justify-self-end sm:text-right"
                >
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted-dim">
                    Next
                  </p>
                  <p className="mt-1 text-[0.95rem] font-semibold text-ink">
                    {next.title}
                  </p>
                </Link>
              ) : null}
            </div>
          </nav>
        </article>
      </div>
    </main>
  );
}
