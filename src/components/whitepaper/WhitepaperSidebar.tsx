"use client";

import { useEffect, useMemo, useState } from "react";
import type { TocItem } from "@/lib/whitepaper";
import { flattenToc } from "@/lib/whitepaper";

function TocLink({
  item,
  activeId,
  onNavigate,
}: {
  item: TocItem;
  activeId: string;
  onNavigate?: () => void;
}) {
  const active = activeId === item.id;
  const childActive = item.children.some(
    (child) =>
      child.id === activeId ||
      child.children.some((g) => g.id === activeId),
  );

  return (
    <li>
      <a
        href={`#${item.id}`}
        onClick={onNavigate}
        className={`block rounded-md px-2.5 py-1.5 transition-colors ${
          item.depth === 1
            ? "text-[0.8rem] font-semibold tracking-[-0.01em]"
            : item.depth === 2
              ? "pl-3 text-[0.76rem] font-medium"
              : "pl-5 text-[0.72rem] font-medium"
        } ${
          active
            ? "bg-electric/10 text-electric"
            : childActive
              ? "text-ink"
              : "text-muted hover:bg-panel/60 hover:text-ink"
        }`}
      >
        {item.title}
      </a>
      {item.children.length > 0 ? (
        <ul className="mt-0.5 space-y-0.5 border-l border-line ml-2.5">
          {item.children.map((child) => (
            <TocLink
              key={child.id}
              item={child}
              activeId={activeId}
              onNavigate={onNavigate}
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

export function WhitepaperSidebar({
  toc,
  mobileOpen,
  onMobileClose,
}: {
  toc: TocItem[];
  mobileOpen: boolean;
  onMobileClose: () => void;
}) {
  const flat = useMemo(() => flattenToc(toc), [toc]);
  const [activeId, setActiveId] = useState(flat[0]?.id ?? "");

  useEffect(() => {
    const syncActive = () => {
      const offset = 120;
      let current = flat[0]?.id ?? "";
      for (const item of flat) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - offset <= 0) {
          current = item.id;
        }
      }
      setActiveId(current);
    };

    syncActive();
    window.addEventListener("scroll", syncActive, { passive: true });
    window.addEventListener("resize", syncActive);
    return () => {
      window.removeEventListener("scroll", syncActive);
      window.removeEventListener("resize", syncActive);
    };
  }, [flat]);

  const nav = (
    <nav aria-label="Whitepaper contents">
      <p className="mb-3 px-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted-dim">
        Contents
      </p>
      <ul className="space-y-0.5">
        {toc.map((item) => (
          <TocLink
            key={item.id}
            item={item}
            activeId={activeId}
            onNavigate={onMobileClose}
          />
        ))}
      </ul>
    </nav>
  );

  return (
    <>
      <aside className="hidden lg:block">
        <div className="sticky top-[5.5rem] max-h-[calc(100vh-6.5rem)] overflow-y-auto pr-2 pb-10">
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
                className="rounded-md border border-line px-2.5 py-1 text-sm text-muted hover:text-ink"
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
