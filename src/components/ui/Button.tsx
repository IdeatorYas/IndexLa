import Link from "next/link";

type CommonButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

type LinkButtonProps = CommonButtonProps & {
  href: string;
  onClick?: never;
  type?: never;
};

type ActionButtonProps = CommonButtonProps & {
  href?: undefined;
  onClick?: () => void;
  type?: "button" | "submit";
};

type ButtonProps = LinkButtonProps | ActionButtonProps;

const variants = {
  primary:
    "bg-gradient-to-r from-purple to-blue text-white shadow-[0_12px_40px_rgba(59,130,246,0.28)] hover:brightness-110",
  secondary:
    "border border-white/15 bg-white/[0.04] text-white backdrop-blur-sm hover:border-electric/40 hover:bg-white/[0.07]",
  ghost:
    "border border-white/12 bg-transparent text-ink hover:border-purple-bright/40 hover:bg-white/[0.04]",
};

const baseClass =
  "inline-flex items-center justify-center rounded-full px-6 py-3 text-[0.95rem] font-semibold tracking-[-0.01em] transition-all duration-300";

export function Button(props: ButtonProps) {
  const { children, variant = "primary", className = "" } = props;
  const classes = `${baseClass} ${variants[variant]} ${className}`;

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      className={classes}
    >
      {children}
    </button>
  );
}
