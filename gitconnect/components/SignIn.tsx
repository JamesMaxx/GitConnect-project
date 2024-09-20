import React from 'react';
import { useForm } from 'react-hook-form';
import { account } from '../lib/appwrite';

type SignInFormData = {
  email: string;
  password: string;
};

const SignIn: React.FC = () => {
  const { register, handleSubmit } = useForm<SignInFormData>();

  const onSubmit = async (data: SignInFormData) => {
    try {
      await account.createSession(data.email, data.password);
      // Handle successful sign in
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input {...register('email')} type="email" placeholder="Email" className="w-full p-2 border rounded" />
      <input {...register('password')} type="password" placeholder="Password" className="w-full p-2 border rounded" />
      <button type="submit" className="w-full p-2 bg-green-500 text-white rounded">Sign In</button>
    </form>
  );
};

export default SignIn;
