import React from 'react';
import { useForm } from 'react-hook-form';
import { account } from '../src/lib/appwrite';

type SignUpFormData = {
  name: string;
  email: string;
  password: string;
};

const SignUp: React.FC = () => {
  const { register, handleSubmit } = useForm<SignUpFormData>();

  const onSubmit = async (data: SignUpFormData) => {
    try {
      await account.create('unique()', data.email, data.password, data.name);
      // Handle successful sign up
    } catch (error) {
      console.error('Sign up error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input {...register('name')} placeholder="Name" className="w-full p-2 border rounded" />
      <input {...register('email')} type="email" placeholder="Email" className="w-full p-2 border rounded" />
      <input {...register('password')} type="password" placeholder="Password" className="w-full p-2 border rounded" />
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Sign Up</button>
    </form>
  );
};

export default SignUp;
