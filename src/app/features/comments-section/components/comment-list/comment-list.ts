import { Component, input, output } from "@angular/core";
import { Comment } from "../../../../core/models/comment.interface";
import { CommentCard } from "../comment-card/comment-card";
import { CommentComposer } from "../comment-composer/comment-composer";
import { ReplyEvent } from "../comment-thread/comment-thread";

@Component({
  selector: "app-comment-list",
  imports: [CommentCard, CommentComposer],
  templateUrl: "./comment-list.html",
  styleUrl: "./comment-list.css",
})
export class CommentList {
  readonly comments = input.required<readonly Comment[]>();
  readonly replyingTo = input<string | null>(null);

  readonly replyToggled = output<string>();
  readonly replied = output<ReplyEvent>();
  readonly replyCancelled = output<void>();

  protected onReplySubmit(comment: Comment, body: string): void {
    this.replied.emit({ parentId: comment.id, body });
  }
}
