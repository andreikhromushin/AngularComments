import { Injectable, computed, effect, signal } from "@angular/core";
import { Comment } from "../models/comment.interface";
import { STORAGE_KEYS } from "../tokens/storage-keys.const";
import { buildCommentTree } from "../utils/build-comment-tree.util";
import { createId } from "../utils/id.util";
import { createSeedComments } from "../../mocks/seed-comments.const";

const GUEST_AUTHOR = "Guest";

@Injectable({ providedIn: "root" })
export class CommentsStoreService {
  private commentsSignal = signal<Comment[]>(this.hydrate());

  readonly comments = this.commentsSignal.asReadonly();
  readonly tree = computed(() => buildCommentTree(this.commentsSignal()));
  readonly flat = computed(() =>
    [...this.commentsSignal()].sort((a, b) => b.createdAt - a.createdAt),
  );
  readonly totalCount = computed(() => this.commentsSignal().length);

  constructor() {
    effect(() => {
      const snapshot = this.commentsSignal();
      if (typeof localStorage === "undefined") return;
      try {
        localStorage.setItem(STORAGE_KEYS.comments, JSON.stringify(snapshot));
      } catch {
        // storage full or disabled — silently skip
      }
    });
  }

  addRoot(body: string): void {
    const trimmed = body.trim();
    if (!trimmed) return;
    this.commentsSignal.update((current) => [...current, this.buildGuestComment(trimmed, null)]);
  }

  addReply(parentId: string, body: string): void {
    const trimmed = body.trim();
    if (!trimmed) return;
    this.commentsSignal.update((current) => [
      ...current,
      this.buildGuestComment(trimmed, parentId),
    ]);
  }

  toggleLike(id: string): void {
    this.commentsSignal.update((current) =>
      current.map((c) =>
        c.id === id
          ? {
              ...c,
              likes: c.likedByMe ? c.likes - 1 : c.likes + 1,
              likedByMe: !c.likedByMe,
            }
          : c,
      ),
    );
  }

  private buildGuestComment(body: string, parentId: string | null): Comment {
    return {
      id: createId(),
      parentId,
      author: GUEST_AUTHOR,
      isGuest: true,
      body,
      createdAt: Date.now(),
      likes: 0,
      likedByMe: false,
    };
  }

  private hydrate(): Comment[] {
    if (typeof localStorage === "undefined") {
      return createSeedComments();
    }
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.comments);
      if (!raw) return createSeedComments();
      const parsed: unknown = JSON.parse(raw);
      if (!Array.isArray(parsed) || !parsed.every(isComment)) {
        return createSeedComments();
      }
      return parsed;
    } catch {
      return createSeedComments();
    }
  }
}

function isComment(value: unknown): value is Comment {
  if (typeof value !== "object" || value === null) return false;
  const c = value as Record<string, unknown>;
  return (
    typeof c["id"] === "string" &&
    (typeof c["parentId"] === "string" || c["parentId"] === null) &&
    typeof c["author"] === "string" &&
    typeof c["isGuest"] === "boolean" &&
    typeof c["body"] === "string" &&
    typeof c["createdAt"] === "number" &&
    Number.isFinite(c["createdAt"]) &&
    typeof c["likes"] === "number" &&
    Number.isFinite(c["likes"]) &&
    typeof c["likedByMe"] === "boolean"
  );
}
