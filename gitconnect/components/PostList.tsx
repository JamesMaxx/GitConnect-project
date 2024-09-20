import React, { useEffect, useState } from 'react';
import { database } from '../lib/appwrite';
import CommentList from './CommentList';
import CreateComment from './CreateComment';
import LikeDislike from './LikeDislike';

type Post = {
  $id: string;
  content: string;
  authorId: string;
  likes: number;
  dislikes: number;
};

const PostList: React.FC<{ userId: string }> = ({ userId }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    try {
      const response = await databases.listDocuments('YOUR_DATABASE_ID', 'YOUR_POSTS_COLLECTION_ID');
      setPosts(response.documents.map(doc => ({
        $id: doc.$id,
        content: doc.content,
        authorId: doc.authorId,
        likes: doc.likes,
        dislikes: doc.dislikes
      })));
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostUpdate = () => {
    fetchPosts();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Posts</h2>
      {posts.map((post) => (
        <div key={post.$id} className="p-4 bg-gray-100 rounded">
          <p>{post.content}</p>
          <div className="mt-2">
            <LikeDislike
              postId={post.$id}
              likes={post.likes}
              dislikes={post.dislikes}
              onUpdate={handlePostUpdate}
            />
          </div>
          <CommentList postId={post.$id} />
          <CreateComment userId={userId} postId={post.$id} onCommentCreated={handlePostUpdate} />
        </div>
      ))}
    </div>
  );
};

export default PostList;
