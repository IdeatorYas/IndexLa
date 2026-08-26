"use client";

import Link from "next/link";
import type { WhitepaperSection } from "@/lib/whitepaper";

export function WhitepaperSidebar({
  basePath,
  sections,
  activeSlug,
  mobileOpen,
  onMobileClose,
}: {
  basePath: string;
  sections: WhitepaperSection[];
  activeSlug: string;
  mobileOpen: boolean;
  onMobileClose: () => void;
}) {
  const nav = (
    <nav aria-label="Document contents">
      <p className="wp-dim mb-3 px-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em]">
        Contents
      </p>
      <ul className="space-y-0.5">
        {sections.map((section) => {
          const isActive = section.slug === activeSlug;
          return (
            <li key={section.slug}>
              <Link
                href={`${basePath}/${section.slug}`}
                scroll
                onClick={onMobileClose}
                className={`block rounded-md px-2.5 py-1.5 text-[0.8rem] font-semibold tracking-[-0.01em] transition-colors ${
                  isActive
                    ? "wp-nav-active"
                    : "text-muted hover:bg-panel/60 hover:text-electric"
                }`}
              >
                <span className="mr-1.5 tabular-nums text-muted-dim">
                  {String(section.number).padStart(2, "0")}
                </span>
                {section.title.replace(/^\d+\.\s*/, "")}
              </Link>

              {isActive && section.subsections.length > 0 ? (
                <ul className="mt-0.5 ml-3 space-y-0.5 border-l border-line">
                  {section.subsections.map((sub) => (
                    <li key={sub.id}>
                      <a
                        href={`#${sub.id}`}
                        onClick={onMobileClose}
                        className="block rounded-md py-1 pl-3 pr-2 text-[0.72rem] font-medium text-muted-dim transition-colors hover:text-electric"
                      >
                        {sub.title}
                      </a>
                      {sub.children.length > 0 ? (
                        <ul className="mt-0.5 space-y-0.5">
                          {sub.children.map((child) => (
                            <li key={child.id}>
                              <a
                                href={`#${child.id}`}
                                onClick={onMobileClose}
                                className="block rounded-md py-1 pl-5 pr-2 text-[0.7rem] text-muted-dim transition-colors hover:text-electric"
                              >
                                {child.title}
                              </a>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          );
        })}
      </ul>
    </nav>
  );

  return (
    <>
      <aside className="hidden lg:block">
        <div className="sticky top-[7.5rem] max-h-[calc(100vh-8.5rem)] overflow-y-auto pr-2 pb-10">
          {nav}
        </div>
      </aside>

      {mobileOpen ? (
        <div className="fixed inset-0 z-[70] lg:hidden" role="dialog" aria-modal>
          <button
            type="button"
            className="absolute inset-0 bg-void/70 backdrop-blur-sm"
            aria-label="Close contents"
            onClick={onMobileClose}
          />
          <div className="absolute inset-y-0 left-0 flex w-full max-w-[20rem] flex-col border-r border-line bg-deep shadow-2xl">
            <div className="flex items-center justify-between border-b border-line px-4 py-3.5">
              <p className="text-sm font-semibold text-ink">Contents</p>
              <button
                type="button"
                onClick={onMobileClose}
                className="rounded-md border border-line px-2.5 py-1 text-sm text-muted transition-colors hover:text-ink"
              >
                Close
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-3 py-4">{nav}</div>
          </div>
        </div>
      ) : null}
    </>
  );
}
