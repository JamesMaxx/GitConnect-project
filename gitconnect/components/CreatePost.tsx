import React from 'react';
import { useForm } from 'react-hook-form';
import { databases } from '../lib/appwrite';

type CreatePostFormData = {
  content: string;
};

const CreatePost: React.FC<{ userId: string; onPostCreated: () => void }> = ({ userId, onPostCreated }) => {
  const { register, handleSubmit, reset } = useForm<CreatePostFormData>();

  const onSubmit = async (data: CreatePostFormData) => {
    try {
      await databases.createDocument(
        'YOUR_DATABASE_ID',
        'YOUR_POSTS_COLLECTION_ID',
        'unique()',
        {
          content: data.content,
          authorId: userId,
          likes: 0,
          dislikes: 0,
        }
      );
      reset();
      onPostCreated();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <textarea {...register('content')} placeholder="What's on your mind?" className="w-full p-2 border rounded" />
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Create Post</button>
    </form>
  );
};

export default CreatePost;
