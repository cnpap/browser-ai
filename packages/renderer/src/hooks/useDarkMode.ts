import { useCallback, useEffect, useState } from "react";

export type UseDarkModeResult = {
  isDark: boolean;
  setDark: (val: boolean) => void;
  toggle: () => void;
};

/**
 * Manage dark mode at the document root so Tailwind/HeroUI variants work globally.
 * Persists choice to localStorage and falls back to system preference on first load.
 */
export function useDarkMode(): UseDarkModeResult {
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const root = document.documentElement;
      const saved = localStorage.getItem("theme");
      if (saved === "dark") return true;
      if (saved === "light") return false;
      // Fallback to current DOM class or system preference
      const hasClass = root.classList.contains("dark");
      const prefersDark = window.matchMedia?.(
        "(prefers-color-scheme: dark)",
      ).matches;
      return hasClass || prefersDark;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      const root = document.documentElement;
      if (isDark) {
        root.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        root.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    } catch {
      // no-op in non-browser environments
    }
  }, [isDark]);

  const setDark = useCallback((val: boolean) => setIsDark(val), []);
  const toggle = useCallback(() => setIsDark((v) => !v), []);

  return { isDark, setDark, toggle };
}
