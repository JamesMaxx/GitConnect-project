'use client';

import React, { useState, useEffect } from 'react';
import { account } from '../lib/appwrite';
import SignUp from '../components/SignUp';
import SignIn from '../components/SignIn';
import DeveloperList from '../components/DeveloperList';
import ProfilePage from '../components/ProfilePage';
import EditProfile from '../components/EditProfile';
import PostList from '../components/PostList';
import CreatePost from '../components/CreatePost';

const Home: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const session = await account.get();
        setUser(session);
      } catch (error) {
        console.error('No active session:', error);
      }
    };

    checkUser();
  }, []);

  const handleSignOut = async () => {
    try {
      await account.deleteSession('current');
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleProfileUpdate = () => {
    setIsEditing(false);
  };

  const handlePostCreated = () => {
    // Implement logic to refresh posts or update state
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">GitConnect</h1>
      {user ? (
        <>
          <button onClick={handleSignOut} className="mb-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
            Sign Out
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              {isEditing ? (
                <EditProfile userId={user.$id} onUpdate={handleProfileUpdate} />
              ) : (
                <>
                  <ProfilePage userId={user.$id} />
                  <button
                    onClick={() => setIsEditing(true)}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    Edit Profile
                  </button>
                </>
              )}
            </div>
            <div>
              <CreatePost userId={user.$id} onPostCreated={handlePostCreated} />
              <PostList userId={user.$id} />
            </div>
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SignUp />
          <SignIn />
        </div>
      )}
      <DeveloperList />
    </div>
  );
};

export default Home;
