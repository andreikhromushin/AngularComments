import { Injectable, effect, signal } from "@angular/core";
import { STORAGE_KEYS } from "../tokens/storage-keys.const";
import { Theme } from "../types/theme.type";

const DEFAULT_THEME: Theme = "dark";

@Injectable({ providedIn: "root" })
export class ThemeService {
  private themeSignal = signal<Theme>(this.hydrate());

  readonly theme = this.themeSignal.asReadonly();

  constructor() {
    effect(() => {
      const value = this.themeSignal();
      if (typeof document !== "undefined") {
        document.documentElement.setAttribute("data-theme", value);
      }
      if (typeof localStorage !== "undefined") {
        try {
          localStorage.setItem(STORAGE_KEYS.theme, value);
        } catch {
          // storage disabled — silently skip
        }
      }
    });
  }

  toggle(): void {
    this.themeSignal.update((t) => (t === "dark" ? "light" : "dark"));
  }

  private hydrate(): Theme {
    if (typeof localStorage === "undefined") return DEFAULT_THEME;
    const raw = localStorage.getItem(STORAGE_KEYS.theme);
    return raw === "dark" || raw === "light" ? raw : DEFAULT_THEME;
  }
}
