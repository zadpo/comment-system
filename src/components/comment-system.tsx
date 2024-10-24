"use client";

import { useState, useEffect } from "react";
import { Post } from "./post";
import { CommentList } from "./comment-list";
import { CommentForm } from "./comment-form";
import { Comment, PostType } from "@/types";

export function MobileCommentSystem() {
  const [post, setPost] = useState<PostType | null>(null);

  useEffect(() => {
    const storedPost = localStorage.getItem("post");
    if (storedPost) {
      setPost(JSON.parse(storedPost));
    } else {
      setPost({
        id: "1",
        author: "John Doe",
        content: "New wallpaper from windows!!!",
        image: "/images/post.png",
        createdAt: new Date().toISOString(),
        likes: 42,
        comments: [],
      });
    }
  }, []);

  useEffect(() => {
    if (post) {
      localStorage.setItem("post", JSON.stringify(post));
    }
  }, [post]);

  const addComment = (content: string, parentId: string | null = null) => {
    if (!post) return;
    const newCommentObj: Comment = {
      id: Date.now().toString(),
      content,
      author: "Anonymous",
      replies: [],
      createdAt: new Date().toISOString(),
      likes: 0,
    };

    if (parentId) {
      setPost((prevPost) => ({
        ...prevPost!,
        comments: addReply(prevPost!.comments, parentId, newCommentObj),
      }));
    } else {
      setPost((prevPost) => ({
        ...prevPost!,
        comments: [...prevPost!.comments, newCommentObj],
      }));
    }
  };

  const addReply = (comments: Comment[], parentId: string, newReply: Comment): Comment[] => {
    return comments.map((comment) => {
      if (comment.id === parentId) {
        return { ...comment, replies: [...comment.replies, newReply] };
      } else if (comment.replies.length > 0) {
        return { ...comment, replies: addReply(comment.replies, parentId, newReply) };
      }
      return comment;
    });
  };

  const likePost = () => {
    setPost((prevPost) => ({ ...prevPost!, likes: prevPost!.likes + 1 }));
  };

  const likeComment = (commentId: string) => {
    setPost((prevPost) => ({
      ...prevPost!,
      comments: likeCommentRecursive(prevPost!.comments, commentId),
    }));
  };

  const likeCommentRecursive = (comments: Comment[], commentId: string): Comment[] => {
    return comments.map((comment) => {
      if (comment.id === commentId) {
        return { ...comment, likes: comment.likes + 1 };
      } else if (comment.replies.length > 0) {
        return { ...comment, replies: likeCommentRecursive(comment.replies, commentId) };
      }
      return comment;
    });
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <Post post={post} onLike={likePost} />
      <CommentForm onSubmit={addComment} />
      <CommentList comments={post.comments} onLike={likeComment} onReply={addComment} />
    </div>
  );
}
