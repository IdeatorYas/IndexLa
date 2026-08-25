"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { renderBold } from "@/components/stable-club/StableShared";
import { scBody, scBodyStrong, scH2, scSectionAlt } from "@/components/stable-club/stableRhythm";
import type { StableBlock, StableSection } from "@/lib/stable-club";

function parsePermissions(blocks: StableBlock[]) {
  const can: string[] = [];
  const cannot: string[] = [];
  let revoke = "";
  let mode: "can" | "cannot" | null = null;

  for (const block of blocks) {
    if (block.type === "p") {
      const plain = block.text.replace(/\*\*/g, "").trim();
      if (plain === "INDEXLA can:") {
        mode = "can";
        continue;
      }
      if (plain === "INDEXLA cannot:") {
        mode = "cannot";
        continue;
      }
      if (plain.startsWith("Revoke permissions")) {
        revoke = block.text;
        continue;
      }
    }

    if (block.type === "ul") {
      if (mode === "can") can.push(...block.items);
      if (mode === "cannot") cannot.push(...block.items);
    }
  }

  return { can, cannot, revoke };
}

function PermissionColumn({
  title,
  items,
  variant,
}: {
  title: string;
  items: string[];
  variant: "can" | "cannot";
}) {
  const isCan = variant === "can";

  return (
    <div
      className={`sc-card-elevated flex h-full flex-col p-6 sm:p-7 ${
        isCan
          ? "border-[rgba(5,150,105,0.22)]"
          : "border-[rgba(220,38,38,0.18)]"
      }`}
    >
      <div
        className={`inline-flex self-start rounded-full px-3.5 py-1.5 text-[0.72rem] font-bold uppercase tracking-[0.12em] ${
          isCan
            ? "bg-[var(--sc-green-soft)] text-[var(--sc-green)]"
            : "bg-danger/10 text-danger"
        }`}
      >
        {title}
      </div>

      <ul className="mt-6 flex-1 space-y-3.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span
              className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[0.75rem] font-bold ${
                isCan
                  ? "bg-[var(--sc-green-soft)] text-[var(--sc-green)]"
                  : "bg-danger/10 text-danger"
              }`}
              aria-hidden
            >
              {isCan ? "✓" : "✕"}
            </span>
            <span className={`${scBody} text-[var(--sc-navy)]`}>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function StablePermissionsSection({ section }: { section: StableSection }) {
  const { can, cannot, revoke } = parsePermissions(section.blocks);

  return (
    <section className={scSectionAlt}>
      <div className="section-pad container-max">
        <FadeIn>
          <h2 className={`text-center ${scH2}`}>{section.title}</h2>

          <div className="mx-auto mt-10 grid max-w-5xl gap-5 lg:grid-cols-2 lg:gap-6">
            <PermissionColumn title="INDEXLA Can" items={can} variant="can" />
            <PermissionColumn title="INDEXLA Cannot" items={cannot} variant="cannot" />
          </div>

          {revoke ? (
            <p className={`mx-auto mt-8 max-w-2xl text-center ${scBodyStrong}`}>
              {renderBold(revoke)}
            </p>
          ) : null}
        </FadeIn>
      </div>
    </section>
  );
}
