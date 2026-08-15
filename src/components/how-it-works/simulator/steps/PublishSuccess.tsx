"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { useSimulator } from "../SimulatorContext";
import type { SimulatorPortfolio } from "../types";
import { surfaceClass } from "../ui";

export function PublishSuccess() {
  const { justCreatedId, resetDraft, published, setSelectedId, setStep } =
    useSimulator();
  const [portfolio, setPortfolio] = useState<SimulatorPortfolio | null>(() =>
    published.find((p) => p.id === justCreatedId) ?? published[0] ?? null,
  );
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!justCreatedId) return;
    const found = published.find((p) => p.id === justCreatedId);
    if (found) setPortfolio(found);
  }, [justCreatedId, published]);

  const shareLink = portfolio
    ? `https://indexla.tech/marketplace/${portfolio.id}`
    : "https://indexla.tech/marketplace";

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
          {portfolio
            ? `"${portfolio.name}" is live in Marketplace.`
            : "Your portfolio is now available in the INDEXLA Marketplace."}
        </h3>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
          Product simulation — no wallet, no real funds.
        </p>
      </div>

      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
        <Button
          type="button"
          variant="primary"
          className="!min-h-0 !px-5 !py-2.5 !text-[0.9rem]"
          onClick={() => {
            if (portfolio) setSelectedId(portfolio.id);
            document
              .getElementById("simulator-marketplace")
              ?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
        >
          View Portfolio
        </Button>
        <Button
          type="button"
          variant="secondary"
          className="!min-h-0 !px-5 !py-2.5 !text-[0.9rem]"
          onClick={() => void copyShare()}
        >
          {copied ? "Link Copied" : "Share Portfolio"}
        </Button>
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
          {["Share", "Follow", "Customize", "Allocate"].map((label, i, arr) => (
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
          ))}
        </div>
      </div>

      <p className="mt-4 rounded-2xl border border-white/[0.08] bg-void/45 px-4 py-3 text-[0.9rem] leading-relaxed text-muted">
        Share with your friends or community to earn 50% of applicable execution
        fees.
      </p>

      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
        <Button
          type="button"
          className="!min-h-0 !px-5 !py-2.5 !text-[0.9rem]"
          onClick={() => setStep("monitor")}
        >
          Open Monitor
        </Button>
        <Button
          href="#simulator-marketplace"
          variant="secondary"
          className="!min-h-0 !px-5 !py-2.5 !text-[0.9rem]"
        >
          View Marketplace
        </Button>
        <Button
          variant="ghost"
          onClick={() => resetDraft()}
          className="!min-h-0 !px-5 !py-2.5 !text-[0.9rem]"
        >
          Create Another
        </Button>
      </div>
    </div>
  );
}
