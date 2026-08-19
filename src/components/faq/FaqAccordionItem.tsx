"use client";

import { useId, useState } from "react";
import { FaqAnswer } from "@/components/faq/FaqAnswer";
import { FaqInline } from "@/components/faq/faqInline";
import type { FaqItem } from "@/lib/faq";

type FaqAccordionItemProps = {
  item: FaqItem;
  open?: boolean;
  onToggle?: () => void;
  card?: boolean;
};

export function FaqAccordionItem({
  item,
  open: openProp,
  onToggle,
  card = false,
}: FaqAccordionItemProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const panelId = useId();
  const controlled = onToggle !== undefined;
  const open = controlled ? Boolean(openProp) : internalOpen;

  const handleToggle = () => {
    if (controlled) {
      onToggle();
      return;
    }
    setInternalOpen((value) => !value);
  };

  return (
    <div
      data-open={open ? "true" : "false"}
      className={
        card
          ? "rounded-xl border border-line bg-void/35 transition-colors hover:border-electric/25 data-[open=true]:border-electric/40 data-[open=true]:bg-void/55"
          : "border-b border-line last:border-b-0"
      }
    >
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={handleToggle}
          className={
            card
              ? "group flex w-full items-start justify-between gap-3 px-4 py-4 text-left sm:gap-4 sm:px-5 sm:py-4"
              : "group flex w-full items-start justify-between gap-4 py-4 text-left sm:py-5"
          }
        >
          <span className="display text-[1.02rem] leading-snug tracking-[-0.02em] text-ink transition-colors group-hover:text-electric sm:text-[1.08rem]">
            <FaqInline text={item.q} />
          </span>
          <span
            className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-electric transition-transform duration-200 ${
              open
                ? "rotate-45 border-electric/45 bg-electric/10"
                : "border-line bg-void/40 group-hover:border-electric/35"
            }`}
            aria-hidden
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M6 1v10M1 6h10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-hidden={!open}
        className={`grid transition-[grid-template-rows] duration-200 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className={card ? "px-4 pb-4 pt-0 sm:px-5 sm:pb-5" : "pb-5 pr-10 sm:pb-6"}>
            <FaqAnswer blocks={item.a} />
          </div>
        </div>
      </div>
    </div>
  );
}
