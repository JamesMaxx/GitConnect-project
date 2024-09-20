import React from 'react';
import { useForm } from 'react-hook-form';
import { database as databases } from '../lib/appwrite';
type CreateCommentFormData = {
  content: string;
};

const CreateComment: React.FC<{ userId: string; postId: string; onCommentCreated: () => void }> = ({ userId, postId, onCommentCreated }) => {
  const { register, handleSubmit, reset } = useForm<CreateCommentFormData>();

  const onSubmit = async (data: CreateCommentFormData) => {
    try {
      await databases.createDocument(
        'YOUR_DATABASE_ID',
        'YOUR_COMMENTS_COLLECTION_ID',
        'unique()',
        {
          content: data.content,
          authorId: userId,
          postId: postId,
        }
      );
      reset();
      onCommentCreated();
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <textarea
        {...register('content')}
        placeholder="Add a comment..."
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
        Add Comment
      </button>
    </form>
  );
};

export default CreateComment;
