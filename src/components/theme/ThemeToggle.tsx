"use client";

import { useTheme } from "@/components/theme/ThemeProvider";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-panel/40 text-ink transition-colors hover:border-line-strong hover:bg-panel/70 ${className}`}
      aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
      title={isLight ? "Dark mode" : "Light mode"}
    >
      {isLight ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M21 14.5A8.5 8.5 0 0 1 9.5 3 7 7 0 1 0 21 14.5Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="4.25" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.55 1.55M17.85 17.85l1.55 1.55M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.55-1.55M17.85 6.15l1.55-1.55"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      )}
    </button>
  );
}
