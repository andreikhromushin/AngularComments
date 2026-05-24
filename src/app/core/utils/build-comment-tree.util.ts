import { Comment } from "../models/comment.interface";
import { CommentNode } from "../models/comment-node.interface";

interface MutableNode extends Comment {
  children: MutableNode[];
  depth: number;
}

export function buildCommentTree(flat: readonly Comment[]): CommentNode[] {
  const byId = new Map<string, MutableNode>();
  for (const c of flat) {
    byId.set(c.id, { ...c, children: [], depth: 0 });
  }

  const roots: MutableNode[] = [];
  for (const node of byId.values()) {
    const parent = node.parentId ? byId.get(node.parentId) : undefined;
    if (parent) {
      parent.children.push(node);
    } else {
      roots.push(node);
    }
  }

  const assignDepthAndSort = (nodes: MutableNode[], depth: number): void => {
    nodes.sort((a, b) => b.createdAt - a.createdAt);
    for (const node of nodes) {
      node.depth = depth;
      assignDepthAndSort(node.children, depth + 1);
    }
  };
  assignDepthAndSort(roots, 0);

  return roots;
}
