import {
  Component,
  ElementRef,
  afterNextRender,
  computed,
  input,
  output,
  signal,
  viewChild,
} from "@angular/core";
import { createId } from "../../../../core/utils/id.util";

type ComposerMode = "top" | "reply";

@Component({
  selector: "app-comment-composer",
  templateUrl: "./comment-composer.html",
  styleUrl: "./comment-composer.css",
})
export class CommentComposer {
  readonly mode = input<ComposerMode>("top");
  readonly replyTo = input<string | null>(null);
  readonly autoFocus = input(false);
  readonly fieldId = input<string>(`composer-textarea-${createId()}`);

  readonly submitted = output<string>();
  readonly cancelled = output<void>();

  private readonly textarea = viewChild<ElementRef<HTMLTextAreaElement>>("area");

  protected text = signal("");

  protected readonly canSubmit = computed(() => this.text().trim().length > 0);
  protected readonly placeholder = computed(() =>
    this.mode() === "reply" ? `Reply to ${this.replyTo() ?? "Guest"}…` : "Share what you think…",
  );

  constructor() {
    afterNextRender(() => {
      if (this.autoFocus()) {
        this.textarea()?.nativeElement.focus();
      }
    });
  }

  protected onSubmit(event?: Event): void {
    event?.preventDefault();
    if (!this.canSubmit()) return;
    this.submitted.emit(this.text());
    this.text.set("");
  }

  protected onCancel(): void {
    this.text.set("");
    this.cancelled.emit();
  }

  protected onKeyDown(event: KeyboardEvent): void {
    if (event.key === "Escape" && this.mode() === "reply") {
      event.preventDefault();
      this.onCancel();
      return;
    }
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
      event.preventDefault();
      this.onSubmit();
    }
  }
}
