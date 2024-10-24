import { Comment as CommentType } from "@/types";
import { Comment } from "./comment";

type CommentListProps = {
  comments: CommentType[];
  onLike: (commentId: string) => void;
  onReply: (content: string, parentId: string) => void;
};

export function CommentList({ comments, onLike, onReply }: CommentListProps) {
  return (
    <div className="border-t border-gray-200 p-4">
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} onLike={onLike} onReply={onReply} />
      ))}
    </div>
  );
}
