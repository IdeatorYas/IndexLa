"use client";

import { useEarlyAccess, type EarlyAccessMode } from "@/components/early-access/EarlyAccessProvider";
import { Button } from "@/components/ui/Button";

type EarlyAccessCtaProps = {
  children: React.ReactNode;
  mode?: EarlyAccessMode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

export function EarlyAccessCta({
  children,
  mode = "general",
  variant = "primary",
  className = "",
}: EarlyAccessCtaProps) {
  const { openEarlyAccess } = useEarlyAccess();

  return (
    <Button
      type="button"
      variant={variant}
      className={className}
      onClick={() => openEarlyAccess(mode)}
    >
      {children}
    </Button>
  );
}
