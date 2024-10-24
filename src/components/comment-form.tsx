import { useState } from "react";

type CommentFormProps = {
  onSubmit: (content: string) => void;
  onCancel?: () => void;
};

export function CommentForm({ onSubmit, onCancel }: CommentFormProps) {
  const [content, setContent] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit(content);
      setContent("");
      setIsTyping(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    setIsTyping(newContent.trim().length > 0);
  };

  return (
    <div className="mt-2 px-4">
      <div className="relative ">
        <textarea
          value={content}
          onChange={handleChange}
          className="w-full p-2 pr-10 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Write a comment..."
        />
        {isTyping && (
          <button
            onClick={handleSubmit}
            className="absolute right-2 bottom-4 p-1 text-xs  text-white  transition-colors bg-blue-500 rounded"
            aria-label="Post comment"
          >
            comment
          </button>
        )}
      </div>
      {onCancel && (
        <div className="mt-1 flex justify-end pb-2">
          <button
            onClick={onCancel}
            className="px-2 py-1 text-xs text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
