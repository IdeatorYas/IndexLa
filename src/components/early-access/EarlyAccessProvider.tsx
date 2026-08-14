"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { EarlyAccessModal } from "@/components/early-access/EarlyAccessModal";

export type EarlyAccessMode = "general" | "creator";

type EarlyAccessContextValue = {
  openEarlyAccess: (mode?: EarlyAccessMode) => void;
  closeEarlyAccess: () => void;
};

const EarlyAccessContext = createContext<EarlyAccessContextValue | null>(null);

export function EarlyAccessProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<EarlyAccessMode>("general");
  const [instance, setInstance] = useState(0);

  const openEarlyAccess = useCallback((nextMode: EarlyAccessMode = "general") => {
    setMode(nextMode);
    setInstance((n) => n + 1);
    setOpen(true);
  }, []);

  const closeEarlyAccess = useCallback(() => {
    setOpen(false);
  }, []);

  const value = useMemo(
    () => ({ openEarlyAccess, closeEarlyAccess }),
    [openEarlyAccess, closeEarlyAccess],
  );

  return (
    <EarlyAccessContext.Provider value={value}>
      {children}
      <EarlyAccessModal
        key={instance}
        open={open}
        mode={mode}
        onClose={closeEarlyAccess}
      />
    </EarlyAccessContext.Provider>
  );
}

export function useEarlyAccess() {
  const ctx = useContext(EarlyAccessContext);
  if (!ctx) {
    throw new Error("useEarlyAccess must be used within EarlyAccessProvider");
  }
  return ctx;
}
