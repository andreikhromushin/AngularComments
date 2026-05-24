import { Component, computed, input, output } from "@angular/core";
import { CommentNode } from "../../../../core/models/comment-node.interface";
import { CommentCard } from "../comment-card/comment-card";
import { CommentComposer } from "../comment-composer/comment-composer";

export interface ReplyEvent {
  readonly parentId: string;
  readonly body: string;
}

@Component({
  selector: "app-comment-thread",
  imports: [CommentCard, CommentComposer],
  templateUrl: "./comment-thread.html",
  styleUrl: "./comment-thread.css",
})
export class CommentThread {
  readonly node = input.required<CommentNode>();
  readonly replyingTo = input<string | null>(null);

  readonly replyToggled = output<string>();
  readonly replied = output<ReplyEvent>();
  readonly replyCancelled = output<void>();

  protected readonly isReplying = computed(() => this.replyingTo() === this.node().id);
  protected readonly composerId = computed(() => `composer-${this.node().id}`);

  protected onReplySubmit(body: string): void {
    this.replied.emit({ parentId: this.node().id, body });
  }
}
