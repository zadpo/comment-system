import { useState } from "react";
import { Heart } from "lucide-react";
import { Comment as CommentType } from "@/types";
import { CommentForm } from "./comment-form";

type CommentProps = {
  comment: CommentType;
  onLike: (commentId: string) => void;
  onReply: (content: string, parentId: string) => void;
  level?: number;
};

export function Comment({ comment, onLike, onReply, level = 0 }: CommentProps) {
  const [isReplying, setIsReplying] = useState(false);

  if (level >= 4) return null;

  return (
    <div className={`mt-3 ${level > 0 ? "ml-4 border-l border-gray-200 pl-2" : ""}`}>
      <div className="flex items-start space-x-2">
        <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold">
          {comment.author[0].toUpperCase()}
        </div>
        <div className="flex-grow">
          <p className="text-xs font-semibold">{comment.author}</p>
          <p className="text-xs text-gray-600">{comment.content}</p>
          <div className="mt-1 flex items-center space-x-2 text-xs text-gray-500">
            <span>{new Date(comment.createdAt).toLocaleString()}</span>
            <button
              onClick={() => onLike(comment.id)}
              className="flex items-center space-x-1 hover:text-gray-700 transition-colors"
            >
              <Heart size={12} /> <span>{comment.likes}</span>
            </button>
            <button
              onClick={() => setIsReplying(!isReplying)}
              className="hover:text-gray-700 transition-colors"
            >
              Reply
            </button>
          </div>
          {isReplying && (
            <CommentForm
              onSubmit={(content) => {
                onReply(content, comment.id);
                setIsReplying(false);
              }}
              onCancel={() => setIsReplying(false)}
            />
          )}
        </div>
      </div>
      {comment.replies.map((reply) => (
        <Comment key={reply.id} comment={reply} onLike={onLike} onReply={onReply} level={level + 1} />
      ))}
    </div>
  );
}
