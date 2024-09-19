import React from 'react';
import { databases } from '../lib/appwrite';

type LikeDislikeProps = {
  postId: string;
  likes: number;
  dislikes: number;
  onUpdate: () => void;
};

const LikeDislike: React.FC<LikeDislikeProps> = ({ postId, likes, dislikes, onUpdate }) => {
  const handleLike = async () => {
    try {
      await databases.updateDocument(
        'YOUR_DATABASE_ID',
        'YOUR_POSTS_COLLECTION_ID',
        postId,
        { likes: likes + 1 }
      );
      onUpdate();
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleDislike = async () => {
    try {
      await databases.updateDocument(
        'YOUR_DATABASE_ID',
        'YOUR_POSTS_COLLECTION_ID',
        postId,
        { dislikes: dislikes + 1 }
      );
      onUpdate();
    } catch (error) {
      console.error('Error disliking post:', error);
    }
  };

  return (
    <div className="flex space-x-4">
      <button onClick={handleLike} className="px-2 py-1 bg-green-500 text-white rounded">
        Like ({likes})
      </button>
      <button onClick={handleDislike} className="px-2 py-1 bg-red-500 text-white rounded">
        Dislike ({dislikes})
      </button>
    </div>
  );
};

export default LikeDislike;
