import { Component, computed, inject, input, output } from "@angular/core";
import { Comment } from "../../../../core/models/comment.interface";
import { CommentsStoreService } from "../../../../core/services/comments-store.service";
import { TimeTickService } from "../../../../core/services/time-tick.service";
import { avatarGradient, avatarInitial } from "../../../../core/utils/avatar-gradient.util";
import { formatTimeAgo } from "../../../../core/utils/format-time-ago.util";

@Component({
  selector: "app-comment-card",
  templateUrl: "./comment-card.html",
  styleUrl: "./comment-card.css",
})
export class CommentCard {
  private readonly commentsStoreService = inject(CommentsStoreService);
  private readonly timeTickService = inject(TimeTickService);

  readonly comment = input.required<Comment>();
  readonly isReplying = input(false);

  readonly replyToggled = output<string>();

  protected readonly avatarBackground = computed(() => avatarGradient(this.comment().author));
  protected readonly avatarLetter = computed(() => avatarInitial(this.comment().author));
  protected readonly datetimeIso = computed(() => new Date(this.comment().createdAt).toISOString());
  protected readonly timeAgoLabel = computed(() =>
    formatTimeAgo(this.comment().createdAt, this.timeTickService.now()),
  );
  protected readonly composerId = computed(() => `composer-${this.comment().id}`);

  protected onLike(): void {
    this.commentsStoreService.toggleLike(this.comment().id);
  }

  protected onReply(): void {
    this.replyToggled.emit(this.comment().id);
  }
}
