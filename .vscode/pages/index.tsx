import React, { useState, useEffect } from 'react';
import { account } from '../../gitconnect/lib/appwrite';
import SignUp from '../../gitconnect/components/SignUp';
import SignIn from '../../gitconnect/components/SignIn';
import DeveloperList from '../../gitconnect/components/DeveloperList';
import ProfilePage from '../../gitconnect/components/ProfilePage';
import EditProfile from '../../gitconnect/components/EditProfile';
import PostList from '../../gitconnect/components/PostList';
import CreatePost from '../../gitconnect/components/CreatePost';

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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">GitConnect</h1>
      {user ? (
        <>
          <button onClick={handleSignOut} className="mb-4 px-4 py-2 bg-red-500 text-white rounded">
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
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Edit Profile
                  </button>
                </>
              )}
            </div>
            <div>
              <CreatePost userId={user.$id} onPostCreated={() => {}} />
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
