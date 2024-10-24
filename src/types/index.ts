export type Comment = {
  id: string;
  content: string;
  author: string;
  replies: Comment[];
  createdAt: string;
  likes: number;
};

export type PostType = {
  id: string;
  author: string;
  content: string;
  image: string;
  createdAt: string;
  likes: number;
  comments: Comment[];
};
