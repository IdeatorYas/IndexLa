"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { useSimulator } from "../SimulatorContext";

export function PublishSuccess() {
  const { justCreatedId, resetDraft, published } = useSimulator();
  const newest = published.find((p) => p.id === justCreatedId);

  useEffect(() => {
    const el = document.getElementById("simulator-marketplace");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <div className="mx-auto max-w-xl text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-success/40 bg-success/15 text-2xl text-success">
        ✓
      </div>
      <h3 className="display mt-5 text-[clamp(1.35rem,2.5vw,1.75rem)] font-semibold tracking-[-0.02em] text-ink">
        Portfolio Published
      </h3>
      <p className="mt-3 text-[0.98rem] leading-relaxed text-muted">
        {newest
          ? `"${newest.name}" is now live in the Marketplace simulation below.`
          : "Your portfolio is live in the Marketplace simulation below."}
      </p>
      <p className="mt-2 text-[0.88rem] text-muted">
        This is a front-end simulation only — no wallet, no real funds.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
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
