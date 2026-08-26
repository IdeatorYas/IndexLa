export type ThemeMode = "light" | "dark";

export const THEME_STORAGE_KEY = "indexla-theme";

export function resolveTheme(stored: string | null): ThemeMode | null {
  if (stored === "light" || stored === "dark") return stored;
  return null;
}

export function systemTheme(): ThemeMode {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

export function readStoredTheme(): ThemeMode | null {
  if (typeof window === "undefined") return null;
  try {
    return resolveTheme(localStorage.getItem(THEME_STORAGE_KEY));
  } catch {
    return null;
  }
}

export function getInitialTheme(): ThemeMode {
  return readStoredTheme() ?? systemTheme();
}

export function applyTheme(theme: ThemeMode) {
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.style.colorScheme = theme;
}

export function persistTheme(theme: ThemeMode) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    /* storage unavailable */
  }
  applyTheme(theme);
}
