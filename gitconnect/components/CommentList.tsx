import React, { useEffect, useState } from 'react';
import { databases } from '../src/lib/appwrite';
import { Query } from 'appwrite';

type Comment = {
  $id: string;
  content: string;
  authorId: string;
  postId: string;
};

const CommentList: React.FC<{ postId: string }> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await databases.listDocuments('YOUR_DATABASE_ID', 'YOUR_COMMENTS_COLLECTION_ID', [
          Query.equal('postId', postId)
        ]);
        setComments(response.documents.map(doc => ({
          $id: doc.$id,
          content: doc.content,
          authorId: doc.authorId,
          postId: doc.postId
        })));
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };    fetchComments();
  }, [postId]);

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">Comments</h3>
      {comments.map((comment) => (
        <div key={comment.$id} className="p-2 bg-gray-50 rounded">
          <p>{comment.content}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
