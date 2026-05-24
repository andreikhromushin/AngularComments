import { Component, computed, inject } from "@angular/core";
import { ThemeService } from "../../core/services/theme.service";

@Component({
  selector: "app-theme-toggle",
  templateUrl: "./theme-toggle.html",
  styleUrl: "./theme-toggle.css",
})
export class ThemeToggle {
  private readonly themeService = inject(ThemeService);

  protected readonly isDark = computed(() => this.themeService.theme() === "dark");

  protected toggle(): void {
    this.themeService.toggle();
  }
}
