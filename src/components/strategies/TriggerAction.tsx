type TriggerActionProps = {
  trigger: string;
  action: string;
  tone?: "default" | "buy" | "sell" | "neutral";
  className?: string;
};

const tones = {
  default: "border-electric/30 bg-electric/8",
  buy: "border-success/35 bg-success/10",
  sell: "border-danger/35 bg-danger/10",
  neutral: "border-line bg-white/[0.03]",
} as const;

/** Shared trigger → response typography for strategy modules */
export function TriggerAction({
  trigger,
  action,
  tone = "default",
  className = "",
}: TriggerActionProps) {
  return (
    <div
      className={`inline-flex max-w-full flex-wrap items-center gap-x-3 gap-y-1 rounded-2xl border px-4 py-3 ${tones[tone]} ${className}`}
    >
      <span className="display text-[1.05rem] tracking-[-0.02em] text-ink sm:text-[1.15rem]">
        {trigger}
      </span>
      <span className="text-electric" aria-hidden>
        →
      </span>
      <span className="display text-[1.05rem] tracking-[-0.02em] text-electric sm:text-[1.15rem]">
        {action}
      </span>
    </div>
  );
}
