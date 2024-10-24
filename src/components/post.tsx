import { Heart, MessageCircle, Share2 } from "lucide-react";
import Image from "next/image";
import { PostType } from "@/types";

type PostProps = {
  post: PostType;
  onLike: () => void;
};

export function Post({ post, onLike }: PostProps) {
  return (
    <div className="p-4">
      <div className="flex items-center space-x-2 mb-2">
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold">
          {post.author[0].toUpperCase()}
        </div>
        <div>
          <p className="font-semibold text-sm">{post.author}</p>
          <p className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
        </div>
      </div>
      {/* Post content */}
      <p className="mb-2 text-sm text-gray-700">{post.content}</p> {/* Added content here */}
      <Image
        src={post.image}
        alt="Post image"
        width={500}
        height={200}
        className="w-full h-48 object-cover rounded-md mb-2"
      />
      <div className="flex justify-between items-center text-gray-500 text-sm">
        <button
          onClick={onLike}
          className="flex items-center space-x-1 hover:text-gray-700 transition-colors"
        >
          <Heart size={16} /> <span>{post.likes}</span>
        </button>
        <button className="flex items-center space-x-1 hover:text-gray-700 transition-colors">
          <MessageCircle size={16} /> <span>{post.comments.length}</span>
        </button>
        <button className="flex items-center space-x-1 hover:text-gray-700 transition-colors">
          <Share2 size={16} /> <span>Share</span>
        </button>
      </div>
    </div>
  );
}
