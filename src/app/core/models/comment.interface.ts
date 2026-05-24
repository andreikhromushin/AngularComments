export interface Comment {
  readonly id: string;
  readonly parentId: string | null;
  readonly author: string;
  readonly isGuest: boolean;
  readonly body: string;
  readonly createdAt: number;
  readonly likes: number;
  readonly likedByMe: boolean;
}
