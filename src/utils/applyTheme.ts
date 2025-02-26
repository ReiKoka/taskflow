import { Theme } from "./types";

export function applyTheme(theme: Theme) {
  const root = window.document.documentElement;

  root.classList.remove("light", "dark");

  const effectiveTheme = theme === "light" ? "light" : "dark";

  root.classList.add(effectiveTheme);
}
