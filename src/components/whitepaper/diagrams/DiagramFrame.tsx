import type { ReactNode } from "react";

export function DiagramFrame({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <figure className="wp-diagram my-8 overflow-hidden rounded-2xl">
      <figcaption className="wp-diagram-cap px-4 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.14em] sm:px-5">
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
          <div className="flex min-h-[3.25rem] flex-1 items-center justify-center rounded-xl border border-[#bfdbfe] bg-[#eff6ff] px-3 py-3 text-center">
            <span className="text-[0.82rem] font-semibold leading-snug tracking-[-0.01em] text-[#0f172a]">
              <span className="mr-1.5 text-[#2563eb]">
                {String(i + 1).padStart(2, "0")}
              </span>
              {step}
            </span>
          </div>
          {i < steps.length - 1 ? (
            <span
              className="hidden px-1.5 text-[#2563eb]/70 sm:inline"
              aria-hidden
            >
              →
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
