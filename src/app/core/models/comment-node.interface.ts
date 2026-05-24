import { Comment } from "./comment.interface";

export interface CommentNode extends Comment {
  readonly children: CommentNode[];
  readonly depth: number;
}
