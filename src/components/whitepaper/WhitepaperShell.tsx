"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { TocItem, WhitepaperSection } from "@/lib/whitepaper";
import {
  formatProgress,
  stripCompetitorMarkdownTable,
} from "@/lib/whitepaper";
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

function prepareBodyMarkdown(slug: string, markdown: string): string {
  let body = stripMajorHeading(markdown);
  if (slug === "5-why-indexla-is-different") {
    body = stripCompetitorMarkdownTable(body);
  }
  return body;
}

export function WhitepaperShell({
  docTitle,
  sections,
  activeSlug,
}: {
  docTitle: string;
  sections: WhitepaperSection[];
  activeSlug: string;
}) {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeIndex = Math.max(
    0,
    sections.findIndex((s) => s.slug === activeSlug),
  );
  const section = sections[activeIndex] ?? sections[0];
  const total = sections.length;
  const prev = activeIndex > 0 ? sections[activeIndex - 1] : null;
  const next = activeIndex < total - 1 ? sections[activeIndex + 1] : null;
  const sectionLabel = String(section.number).padStart(2, "0");

  const bodyMarkdown = useMemo(
    () => prepareBodyMarkdown(section.slug, section.markdown),
    [section.markdown, section.slug],
  );

  const subs = useMemo(() => sidebarSubsections(section), [section]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [section.slug]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }
      if (e.key === "ArrowRight" && next) {
        router.push(`/whitepaper/${next.slug}`);
      }
      if (e.key === "ArrowLeft" && prev) {
        router.push(`/whitepaper/${prev.slug}`);
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

      <div className="section-pad relative z-10 mx-auto max-w-[84rem] pt-24 pb-4 md:pt-28">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-dim">
              {docTitle}
            </p>
            <span className="hidden text-muted-dim sm:inline" aria-hidden>
              ·
            </span>
            <p className="text-[0.85rem] font-semibold tabular-nums text-electric">
              {formatProgress(activeIndex, total)}
            </p>
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
          <header className="mb-8 border-b border-line pb-6">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-electric">
              Section {sectionLabel}
            </p>
            <h1 className="display mt-3 text-[clamp(1.85rem,3.6vw,2.65rem)] tracking-[-0.03em] text-ink text-balance">
              {section.headline}
            </h1>
          </header>

          <WhitepaperSectionBody slug={section.slug} markdown={bodyMarkdown} />

          <nav
            aria-label="Section pagination"
            className="mt-14 border-t border-line pt-6"
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="text-[0.8rem] font-semibold tabular-nums text-muted">
                {formatProgress(activeIndex, total)}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {prev ? (
                <Link
                  href={`/whitepaper/${prev.slug}`}
                  className="rounded-xl border border-line bg-deep/60 px-4 py-3.5 transition-colors hover:border-electric/40"
                >
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted-dim">
                    Previous
                  </p>
                  <p className="mt-1 text-[0.95rem] font-semibold text-ink">
                    {prev.headline}
                  </p>
                </Link>
              ) : (
                <div />
              )}
              {next ? (
                <Link
                  href={`/whitepaper/${next.slug}`}
                  className="rounded-xl border border-line bg-deep/60 px-4 py-3.5 transition-colors hover:border-electric/40 sm:text-right"
                >
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted-dim">
                    Next
                  </p>
                  <p className="mt-1 text-[0.95rem] font-semibold text-ink">
                    {next.headline}
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
