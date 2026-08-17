export const fieldClass =
  "mt-2 w-full rounded-xl border border-white/[0.1] bg-void/70 px-4 py-3 text-[0.98rem] text-ink outline-none transition-all placeholder:text-muted-dim focus:border-electric/50 focus:bg-void/90 focus:ring-2 focus:ring-electric/20";

export const labelClass =
  "block text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-muted";

export const surfaceClass =
  "overflow-hidden rounded-[1.35rem] border border-white/[0.09] bg-gradient-to-b from-deep/90 to-void/80 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm";

export const chipActive =
  "border-electric/45 bg-electric/15 text-electric shadow-[0_0_24px_rgba(56,189,248,0.12)]";

export const chipIdle =
  "border-white/[0.08] bg-void/50 text-muted hover:border-white/18 hover:text-ink";

export const optionCardActive =
  "border-electric/45 bg-electric/[0.12] shadow-[0_0_0_1px_rgba(56,189,248,0.15)]";

export const optionCardIdle =
  "border-white/[0.08] bg-void/45 hover:border-white/16 hover:bg-void/60";

/** Percentage/value field — starts empty; supports full clear and replace. */
export function OptionalNumInput({
  value,
  onChange,
  suffix,
  className = "",
  placeholder = "",
  inputMode = "decimal",
}: {
  value?: number;
  onChange: (n: number | undefined) => void;
  suffix?: string;
  className?: string;
  placeholder?: string;
  inputMode?: "decimal" | "numeric";
}) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <input
        type="text"
        inputMode={inputMode}
        className={`${fieldClass} !mt-0 max-w-[9rem] !py-2 tabular-nums`}
        value={value === undefined ? "" : String(value)}
        placeholder={placeholder}
        onChange={(e) => {
          const raw = e.target.value;
          if (raw === "") {
            onChange(undefined);
            return;
          }
          const n = Number(raw);
          if (Number.isFinite(n)) onChange(n);
        }}
      />
      {suffix ? <span className="text-[0.85rem] text-muted">{suffix}</span> : null}
    </div>
  );
}
