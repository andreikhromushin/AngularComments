import { Component, input, output } from "@angular/core";
import { ViewMode } from "../../../../core/types/view-mode.type";

@Component({
  selector: "app-view-toggle",
  templateUrl: "./view-toggle.html",
  styleUrl: "./view-toggle.css",
})
export class ViewToggle {
  readonly mode = input.required<ViewMode>();

  readonly modeChange = output<ViewMode>();

  protected select(next: ViewMode): void {
    if (next !== this.mode()) {
      this.modeChange.emit(next);
    }
  }
}
