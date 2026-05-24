import { Component, inject, signal } from "@angular/core";
import { CommentsStoreService } from "../../core/services/comments-store.service";
import { ViewMode } from "../../core/types/view-mode.type";
import { CommentComposer } from "./components/comment-composer/comment-composer";
import { CommentList } from "./components/comment-list/comment-list";
import { CommentThread, ReplyEvent } from "./components/comment-thread/comment-thread";
import { ViewToggle } from "./components/view-toggle/view-toggle";

@Component({
  selector: "app-comments-section",
  imports: [ViewToggle, CommentComposer, CommentThread, CommentList],
  templateUrl: "./comments-section.html",
  styleUrl: "./comments-section.css",
})
export class CommentsSection {
  private readonly store = inject(CommentsStoreService);

  protected mode = signal<ViewMode>("tree");
  protected replyingTo = signal<string | null>(null);

  protected readonly tree = this.store.tree;
  protected readonly flat = this.store.flat;
  protected readonly totalCount = this.store.totalCount;

  protected onModeChange(mode: ViewMode): void {
    this.mode.set(mode);
    this.replyingTo.set(null);
  }

  protected onComposerSubmit(body: string): void {
    this.store.addRoot(body);
  }

  protected onReplyToggle(id: string): void {
    this.replyingTo.update((current) => (current === id ? null : id));
  }

  protected onReplied(event: ReplyEvent): void {
    this.store.addReply(event.parentId, event.body);
    this.replyingTo.set(null);
  }

  protected onReplyCancel(): void {
    this.replyingTo.set(null);
  }
}
