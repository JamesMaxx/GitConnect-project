import React, { useEffect, useState } from 'react';
import { databases } from '../src/lib/appwrite';

type ProfileData = {
  $id: string;
  name: string;
  email: string;
  education: string;
  workExperience: string;
  githubRepositories: string[];
};

const ProfilePage: React.FC<{ userId: string }> = ({ userId }) => {
  const [profile, setProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await databases.getDocument('YOUR_DATABASE_ID', 'YOUR_COLLECTION_ID', userId);
        setProfile({
          $id: response.$id,
          name: response.name,
          email: response.email,
          education: response.education,
          workExperience: response.workExperience,
          githubRepositories: response.githubRepositories,
        } as ProfileData);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, [userId]);

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{profile.name}s Profile</h2>
      <section>
        <h3 className="text-xl font-semibold">Personal Details</h3>
        <p>Email: {profile.email}</p>
      </section>
      <section>
        <h3 className="text-xl font-semibold">Education</h3>
        <p>{profile.education}</p>
      </section>
      <section>
        <h3 className="text-xl font-semibold">Work Experience</h3>
        <p>{profile.workExperience}</p>
      </section>
      <section>
        <h3 className="text-xl font-semibold">GitHub Repositories</h3>
        <ul className="list-disc list-inside">
          {profile.githubRepositories.map((repo, index) => (
            <li key={index}>{repo}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default ProfilePage;
