"use client";

import { useCallback, useMemo, useState } from "react";
import { FaqAccordionItem } from "@/components/faq/FaqAccordionItem";
import { FaqDisclaimer } from "@/components/faq/FaqDisclaimer";
import {
  countFaqItems,
  faqItemKey,
  filterFaqSections,
  sectionTabLabel,
} from "@/lib/faqSearch";
import type { FaqBlock, FaqSection } from "@/lib/faq";

type FaqExperienceProps = {
  sections: FaqSection[];
  disclaimer: FaqBlock[];
};

export function FaqExperience({ sections, disclaimer }: FaqExperienceProps) {
  const [query, setQuery] = useState("");
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [openKey, setOpenKey] = useState<string | null>(null);

  const filteredSections = useMemo(
    () => filterFaqSections(sections, activeSectionId, query),
    [sections, activeSectionId, query]
  );

  const visibleCount = countFaqItems(filteredSections);
  const totalCount = countFaqItems(sections);
  const isFiltering = Boolean(query.trim()) || activeSectionId !== null;

  const handleQueryChange = useCallback((value: string) => {
    setQuery(value);
    setOpenKey(null);
  }, []);

  const handleSectionChange = useCallback((sectionId: string | null) => {
    setActiveSectionId(sectionId);
    setOpenKey(null);

    if (sectionId) {
      requestAnimationFrame(() => {
        document.getElementById(sectionId)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    }
  }, []);

  const clearFilters = useCallback(() => {
    setQuery("");
    setActiveSectionId(null);
    setOpenKey(null);
  }, []);

  return (
    <>
      <div className="sticky top-20 z-30 border-b border-line bg-void/95 backdrop-blur-xl">
        <div className="section-pad container-max py-4 md:py-5">
          <div className="mx-auto max-w-3xl space-y-3.5">
            <div className="relative">
              <label htmlFor="faq-search" className="sr-only">
                Search FAQ questions
              </label>
              <span
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-dim"
                aria-hidden
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle
                    cx="8"
                    cy="8"
                    r="5.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M12.5 12.5L16 16"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <input
                id="faq-search"
                type="search"
                value={query}
                onChange={(event) => handleQueryChange(event.target.value)}
                placeholder="Search questions…"
                className="display w-full rounded-xl border border-line bg-deep/80 py-3.5 pl-11 pr-11 text-[0.98rem] tracking-[-0.01em] text-ink outline-none transition-colors placeholder:text-muted-dim focus:border-electric/45 focus:ring-2 focus:ring-electric/15 sm:text-[1.02rem]"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => handleQueryChange("")}
                  className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-muted transition-colors hover:bg-white/5 hover:text-ink"
                  aria-label="Clear search"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M3 3l8 8M11 3L3 11"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              ) : null}
            </div>

            <div
              className="-mx-1 overflow-x-auto px-1 pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              role="tablist"
              aria-label="FAQ categories"
            >
              <div className="flex min-w-max gap-2">
                <CategoryTab
                  active={activeSectionId === null}
                  onClick={() => handleSectionChange(null)}
                  label="All"
                />
                {sections.map((section) => (
                  <CategoryTab
                    key={section.id}
                    active={activeSectionId === section.id}
                    onClick={() => handleSectionChange(section.id)}
                    label={sectionTabLabel(section.title)}
                  />
                ))}
              </div>
            </div>

            {isFiltering ? (
              <p className="text-[0.82rem] font-medium tabular-nums text-muted-dim">
                Showing {visibleCount} of {totalCount} questions
                {query.trim() ? (
                  <>
                    {" "}
                    matching &ldquo;{query.trim()}&rdquo;
                  </>
                ) : null}
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="border-t border-line bg-deep pb-20 md:pb-28">
        <div className="section-pad container-max">
          <div className="mx-auto max-w-3xl">
            {visibleCount === 0 ? (
              <div className="rounded-2xl border border-line bg-void/40 px-5 py-10 text-center sm:px-8 sm:py-12">
                <p className="display text-[1.15rem] tracking-[-0.02em] text-ink sm:text-[1.25rem]">
                  No matching questions
                </p>
                <p className="mx-auto mt-3 max-w-md text-[0.96rem] leading-relaxed text-muted">
                  Try different keywords such as fees, MEV, creator, $DEXLA, or
                  cross-chain. You can also browse another category.
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-6 inline-flex rounded-full border border-line bg-void/50 px-5 py-2.5 text-[0.88rem] font-semibold text-ink transition-colors hover:border-electric/35 hover:text-electric"
                >
                  Clear search and filters
                </button>
              </div>
            ) : (
              <div className="space-y-10 md:space-y-12">
                {filteredSections.map((section) => {
                  const isSafety = section.id.includes("security");
                  return (
                    <section
                      key={section.id}
                      id={section.id}
                      className="scroll-mt-44"
                    >
                      <div
                        className={
                          isSafety
                            ? "mb-4 flex items-end justify-between gap-4 border-b border-line border-l-2 border-l-electric/50 pb-3 pl-4 sm:pl-5"
                            : "mb-4 flex items-end justify-between gap-4 border-b border-line pb-3"
                        }
                      >
                        <h2 className="display text-[clamp(1.35rem,2.8vw,1.85rem)] tracking-[-0.02em] text-ink">
                          {sectionTabLabel(section.title)}
                        </h2>
                        <p className="shrink-0 pb-0.5 text-[0.72rem] font-semibold tabular-nums text-muted-dim">
                          {String(section.items.length).padStart(2, "0")}
                        </p>
                      </div>

                      <div className="space-y-2.5 sm:space-y-3">
                        {section.items.map((item) => {
                          const key = faqItemKey(section.id, item);
                          return (
                            <FaqAccordionItem
                              key={key}
                              item={item}
                              card
                              open={openKey === key}
                              onToggle={() =>
                                setOpenKey((current) =>
                                  current === key ? null : key
                                )
                              }
                            />
                          );
                        })}
                      </div>
                    </section>
                  );
                })}
              </div>
            )}

            <div className="mt-12 md:mt-16">
              <FaqDisclaimer blocks={disclaimer} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function CategoryTab({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`inline-flex shrink-0 rounded-full border px-3.5 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.04em] transition-colors sm:px-4 sm:text-[0.76rem] ${
        active
          ? "border-electric/45 bg-electric/12 text-electric shadow-[0_0_0_1px_rgba(0,255,163,0.08)]"
          : "border-line bg-void/35 text-muted hover:border-electric/25 hover:text-ink"
      }`}
    >
      {label}
    </button>
  );
}
