import type { ReactNode } from "react";

export function DiagramFrame({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <figure className="my-8 overflow-hidden rounded-xl border border-line bg-void/50">
      <figcaption className="border-b border-line px-4 py-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-muted-dim sm:px-5">
        {title}
      </figcaption>
      <div className="px-4 py-5 sm:px-5 sm:py-6">{children}</div>
    </figure>
  );
}

export function FlowSteps({ steps }: { steps: string[] }) {
  return (
    <ol className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-stretch sm:gap-0">
      {steps.map((step, i) => (
        <li key={step} className="flex min-w-0 flex-1 sm:items-center">
          <div className="flex min-h-[3.5rem] flex-1 items-center justify-center rounded-lg border border-electric/30 bg-electric/10 px-3 py-3 text-center">
            <span className="text-[0.82rem] font-semibold leading-snug tracking-[-0.01em] text-ink">
              <span className="mr-1.5 text-electric">
                {String(i + 1).padStart(2, "0")}
              </span>
              {step}
            </span>
          </div>
          {i < steps.length - 1 ? (
            <span className="hidden px-1.5 text-electric/70 sm:inline" aria-hidden>
              →
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
