"use client";

import Link from "next/link";
import type { WhitepaperSection } from "@/lib/whitepaper";

export function WhitepaperSidebar({
  basePath,
  sections,
  activeSlug,
  mobileOpen,
  onMobileClose,
  light = false,
}: {
  basePath: string;
  sections: WhitepaperSection[];
  activeSlug: string;
  mobileOpen: boolean;
  onMobileClose: () => void;
  light?: boolean;
}) {
  const nav = (
    <nav aria-label="Document contents">
      <p
        className={`mb-3 px-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] ${
          light ? "wp-dim" : "text-muted-dim"
        }`}
      >
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
                    ? light
                      ? "wp-nav-active"
                      : "bg-electric/10 text-electric"
                    : light
                      ? "text-[#475569] hover:bg-[#eff6ff] hover:text-[#2563eb]"
                      : "text-muted hover:bg-panel/60 hover:text-ink"
                }`}
              >
                <span
                  className={`mr-1.5 tabular-nums ${
                    light ? "text-[#94a3b8]" : "text-muted-dim"
                  }`}
                >
                  {String(section.number).padStart(2, "0")}
                </span>
                {section.title.replace(/^\d+\.\s*/, "")}
              </Link>

              {isActive && section.subsections.length > 0 ? (
                <ul
                  className={`mt-0.5 ml-3 space-y-0.5 border-l ${
                    light ? "border-[#dbe4f0]" : "border-line"
                  }`}
                >
                  {section.subsections.map((sub) => (
                    <li key={sub.id}>
                      <a
                        href={`#${sub.id}`}
                        onClick={onMobileClose}
                        className={`block rounded-md py-1 pl-3 pr-2 text-[0.72rem] font-medium transition-colors ${
                          light
                            ? "text-[#64748b] hover:text-[#2563eb]"
                            : "text-muted hover:text-electric"
                        }`}
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
                                className={`block rounded-md py-1 pl-5 pr-2 text-[0.7rem] transition-colors ${
                                  light
                                    ? "text-[#94a3b8] hover:text-[#2563eb]"
                                    : "text-muted-dim hover:text-electric"
                                }`}
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
            className={`absolute inset-0 backdrop-blur-sm ${
              light ? "bg-[#0f172a]/30" : "bg-void/70"
            }`}
            aria-label="Close contents"
            onClick={onMobileClose}
          />
          <div
            className={`absolute inset-y-0 left-0 flex w-full max-w-[20rem] flex-col border-r shadow-2xl ${
              light
                ? "border-[#dbe4f0] bg-white"
                : "border-line bg-deep"
            }`}
          >
            <div
              className={`flex items-center justify-between border-b px-4 py-3.5 ${
                light ? "border-[#dbe4f0]" : "border-line"
              }`}
            >
              <p
                className={`text-sm font-semibold ${
                  light ? "text-[#0f172a]" : "text-ink"
                }`}
              >
                Contents
              </p>
              <button
                type="button"
                onClick={onMobileClose}
                className={`rounded-md border px-2.5 py-1 text-sm transition-colors ${
                  light
                    ? "border-[#dbe4f0] text-[#64748b] hover:text-[#0f172a]"
                    : "border-line text-muted hover:text-ink"
                }`}
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
