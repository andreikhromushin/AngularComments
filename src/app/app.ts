import { Component } from "@angular/core";
import { CommentsSection } from "./features/comments-section/comments-section";
import { ThemeToggle } from "./shared/theme-toggle/theme-toggle";

@Component({
  selector: "app-root",
  imports: [CommentsSection, ThemeToggle],
  templateUrl: "./app.html",
  styleUrl: "./app.css",
})
export class App {}
