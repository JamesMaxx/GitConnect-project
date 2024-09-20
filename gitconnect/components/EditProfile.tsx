import React from 'react';
import { useForm } from 'react-hook-form';
import { database as databases } from '../lib/appwrite';

type EditProfileFormData = {
  name: string;
  education: string;
  workExperience: string;
  githubRepositories: string;
};

const EditProfile: React.FC<{ userId: string; onUpdate: () => void }> = ({ userId, onUpdate }) => {
  const { register, handleSubmit } = useForm<EditProfileFormData>();

  const onSubmit = async (data: EditProfileFormData) => {
    try {
      await databases.updateDocument(
        'YOUR_DATABASE_ID',
        'YOUR_COLLECTION_ID',
        userId,
        {
          ...data,
          githubRepositories: data.githubRepositories.split(',').map(repo => repo.trim()),
        }
      );
      onUpdate();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input {...register('name')} placeholder="Name" className="w-full p-2 border rounded" />
      <input {...register('education')} placeholder="Education" className="w-full p-2 border rounded" />
      <input {...register('workExperience')} placeholder="Work Experience" className="w-full p-2 border rounded" />
      <input {...register('githubRepositories')} placeholder="GitHub Repositories (comma-separated)" className="w-full p-2 border rounded" />
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Update Profile</button>
    </form>
  );
};

export default EditProfile;
