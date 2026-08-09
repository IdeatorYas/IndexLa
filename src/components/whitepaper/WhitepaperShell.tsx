"use client";

import { useState } from "react";
import type { TocItem } from "@/lib/whitepaper";
import { WhitepaperMarkdown } from "@/components/whitepaper/WhitepaperMarkdown";
import { WhitepaperSidebar } from "@/components/whitepaper/WhitepaperSidebar";

export function WhitepaperShell({
  title,
  markdown,
  toc,
}: {
  title: string;
  markdown: string;
  toc: TocItem[];
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <main className="relative min-h-screen bg-void">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[22rem] hero-glow opacity-35"
        aria-hidden
      />

      <div className="section-pad relative z-10 mx-auto max-w-[84rem] pt-24 pb-5 md:pt-28">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-5">
          <h1 className="display text-[clamp(1.85rem,3.8vw,2.7rem)] tracking-[-0.03em] text-ink">
            {title}
          </h1>
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
      </div>

      <div className="section-pad relative z-10 mx-auto grid max-w-[84rem] gap-10 pb-24 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-14 xl:grid-cols-[18rem_minmax(0,42rem)] xl:justify-between">
        <WhitepaperSidebar
          toc={toc}
          mobileOpen={mobileOpen}
          onMobileClose={() => setMobileOpen(false)}
        />

        <article className="min-w-0">
          <WhitepaperMarkdown markdown={markdown} />
        </article>
      </div>
    </main>
  );
}
