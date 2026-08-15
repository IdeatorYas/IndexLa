"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { useSimulator } from "../SimulatorContext";
import { surfaceClass } from "../ui";

function usd(n: number) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export function PublishSuccess() {
  const { justCreatedId, resetDraft, published } = useSimulator();
  const newest = published.find((p) => p.id === justCreatedId);
  const [copied, setCopied] = useState(false);
  const shareLink = newest
    ? `https://indexla.tech/marketplace/${newest.id}`
    : "https://indexla.tech/marketplace";

  const fee = newest ? newest.amountUsd * 0.01 : 0;
  const creatorShare = fee * 0.5;

  useEffect(() => {
    const el = document.getElementById("simulator-marketplace");
    if (el) {
      window.setTimeout(
        () => el.scrollIntoView({ behavior: "smooth", block: "start" }),
        400,
      );
    }
  }, []);

  async function copyShare() {
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="mx-auto max-w-lg">
      <div className="text-center">
        <div className="relative mx-auto flex h-16 w-16 items-center justify-center">
          <span className="absolute inset-0 animate-ping rounded-full bg-success/20 opacity-40" />
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-success/45 bg-success/15 text-2xl text-success shadow-[0_0_40px_rgba(52,211,153,0.25)]">
            ✓
          </div>
        </div>
        <p className="mt-5 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-success">
          Portfolio Published
        </p>
        <h3 className="display mt-2 text-[clamp(1.4rem,2.8vw,1.85rem)] font-semibold tracking-[-0.02em] text-ink">
          Your portfolio is now available in the INDEXLA Marketplace.
        </h3>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
          {newest
            ? `"${newest.name}" is discoverable below. This is a product simulation — no wallet, no real funds.`
            : "Your portfolio is discoverable below."}
        </p>
      </div>

      <div className={`${surfaceClass} mt-6 p-5`}>
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-electric">
          Share Portfolio
        </p>
        <p className="mt-2 text-[0.88rem] text-muted">
          Simulated shareable link for this product preview.
        </p>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <input
            readOnly
            value={shareLink}
            className="w-full truncate rounded-xl border border-white/10 bg-void/60 px-3 py-2.5 text-[0.82rem] text-muted"
          />
          <Button
            type="button"
            variant="secondary"
            className="!shrink-0 !px-4 !py-2.5 !text-[0.85rem]"
            onClick={() => void copyShare()}
          >
            {copied ? "Copied" : "Copy link"}
          </Button>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-[0.78rem] font-semibold text-muted">
          {["Share", "Audience Follows", "Customize", "Allocate"].map(
            (label, i, arr) => (
              <span key={label} className="flex items-center gap-2">
                <span className="rounded-full border border-white/12 bg-void/50 px-3 py-1 text-ink">
                  {label}
                </span>
                {i < arr.length - 1 ? (
                  <span className="text-electric/70" aria-hidden>
                    →
                  </span>
                ) : null}
              </span>
            ),
          )}
        </div>
      </div>

      {newest ? (
        <div className="mt-4 rounded-2xl border border-white/[0.08] bg-void/45 p-4">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-muted">
            Creator Revenue
          </p>
          <p className="mt-2 text-[0.95rem] text-ink">
            50% of applicable execution fees
          </p>
          <p className="mt-2 text-[0.88rem] text-muted">
            Illustrative on simulated {usd(newest.amountUsd)} · 1% execution fee{" "}
            {usd(fee)} → creator share{" "}
            <strong className="text-success">{usd(creatorShare)}</strong>
          </p>
          <p className="mt-2 text-[0.75rem] text-muted-dim">
            Simulated / illustrative only — not earnings, AUM, or performance.
          </p>
        </div>
      ) : null}

      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
        <Button
          href="#simulator-marketplace"
          variant="primary"
          className="!min-h-0 !px-5 !py-2.5 !text-[0.9rem]"
        >
          View Marketplace
        </Button>
        <Button
          variant="secondary"
          onClick={() => resetDraft()}
          className="!min-h-0 !px-5 !py-2.5 !text-[0.9rem]"
        >
          Create Another
        </Button>
      </div>
    </div>
  );
}
