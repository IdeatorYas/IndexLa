"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { DocsEdition, TocItem, WhitepaperSection } from "@/lib/whitepaper";
import { docsBasePath, formatProgress } from "@/lib/whitepaper";
import { DocsEditionSwitcher } from "@/components/whitepaper/DocsEditionSwitcher";
import { WhitepaperSidebar } from "@/components/whitepaper/WhitepaperSidebar";
import "@/components/whitepaper/whitepaperDocs.css";

function sidebarSubsections(section: WhitepaperSection): TocItem[] {
  const roots = section.subsections;
  const major = roots.find(
    (item) =>
      item.title === section.headline || item.title === section.title,
  );
  if (major?.children.length) return major.children;
  if (roots.length === 1) return roots[0].children;
  return roots.filter(
    (item) =>
      item.title !== section.headline && item.title !== section.title,
  );
}

export function WhitepaperShell({
  edition,
  docTitle,
  sections,
  activeSlug,
  switcherHrefs,
  children,
}: {
  edition: DocsEdition;
  docTitle: string;
  sections: WhitepaperSection[];
  activeSlug: string;
  switcherHrefs: { whitepaper: string; technical: string };
  children: ReactNode;
}) {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const basePath = docsBasePath(edition);

  const activeIndex = Math.max(
    0,
    sections.findIndex((s) => s.slug === activeSlug),
  );
  const section = sections[activeIndex] ?? sections[0];
  const total = sections.length;
  const prev = activeIndex > 0 ? sections[activeIndex - 1] : null;
  const next = activeIndex < total - 1 ? sections[activeIndex + 1] : null;
  const sectionLabel = String(section.number).padStart(2, "0");

  const subs = useMemo(() => sidebarSubsections(section), [section]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [section.slug, edition]);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setScrollProgress(max > 0 ? (el.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
        router.push(`${basePath}/${next.slug}`);
      }
      if (e.key === "ArrowLeft" && prev) {
        router.push(`${basePath}/${prev.slug}`);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [basePath, next, prev, router]);

  const sectionsForSidebar = useMemo(
    () =>
      sections.map((s) => ({
        ...s,
        subsections: s.slug === section.slug ? subs : [],
      })),
    [sections, section.slug, subs],
  );

  const sectionProgress = ((activeIndex + 1) / total) * 100;

  return (
    <main className="wp-docs relative min-h-screen">
      <div
        className="wp-no-print pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]"
        aria-hidden
      >
        <div
          className="wp-progress-fill h-full transition-[width] duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="wp-no-print wp-sticky-progress sticky top-0 z-50">
        <div className="section-pad mx-auto max-w-[84rem] pt-[5.25rem] pb-4 lg:pt-[5.5rem]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
            <DocsEditionSwitcher
              edition={edition}
              whitepaperHref={switcherHrefs.whitepaper}
              technicalHref={switcherHrefs.technical}
            />
            <div className="flex flex-wrap items-center gap-3">
              <p className="wp-accent-text text-[0.85rem] font-semibold tabular-nums">
                {formatProgress(activeIndex, total)}
              </p>
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="inline-flex items-center gap-2 rounded-md border border-line bg-deep px-3.5 py-2 text-sm font-semibold text-ink transition-colors hover:border-electric/40 hover:text-electric lg:hidden"
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
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <p className="wp-dim text-[0.68rem] font-semibold uppercase tracking-[0.16em]">
              {docTitle}
            </p>
          </div>

          <div className="wp-progress-track mt-3 h-1 overflow-hidden rounded-full">
            <div
              className="wp-progress-fill h-full rounded-full transition-all duration-500"
              style={{ width: `${sectionProgress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="section-pad relative z-10 mx-auto grid max-w-[84rem] gap-10 pb-10 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-14 xl:grid-cols-[18rem_minmax(0,42rem)] xl:justify-between">
        <WhitepaperSidebar
          basePath={basePath}
          sections={sectionsForSidebar}
          activeSlug={section.slug}
          mobileOpen={mobileOpen}
          onMobileClose={() => setMobileOpen(false)}
        />

        <article className="min-w-0">
          <header className="mb-8 border-b border-line pb-6">
            <p className="wp-accent-text text-[0.7rem] font-semibold uppercase tracking-[0.18em]">
              Section {sectionLabel}
            </p>
            <h1 className="display mt-3 text-[clamp(1.85rem,3.6vw,2.65rem)] tracking-[-0.03em] text-balance text-ink">
              {section.headline}
            </h1>
          </header>

          {children}

          <nav
            aria-label="Section pagination"
            className="mt-14 border-t border-line pt-6"
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="wp-muted text-[0.8rem] font-semibold tabular-nums">
                {formatProgress(activeIndex, total)}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {prev ? (
                <Link
                  href={`${basePath}/${prev.slug}`}
                  className="rounded-xl border border-line bg-deep px-4 py-3.5 shadow-sm transition-colors hover:border-electric/35"
                >
                  <p className="wp-dim text-[0.68rem] font-semibold uppercase tracking-[0.12em]">
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
                  href={`${basePath}/${next.slug}`}
                  className="rounded-xl border border-line bg-deep px-4 py-3.5 shadow-sm transition-colors hover:border-electric/35 sm:text-right"
                >
                  <p className="wp-dim text-[0.68rem] font-semibold uppercase tracking-[0.12em]">
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
