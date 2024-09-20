import React, { useEffect, useState } from 'react';
import { databases } from './src/lib/appwrite';

type Developer = {
  $id: string;
  name: string;
  email: string;
};

const DeveloperList: React.FC = () => {
  const [developers, setDevelopers] = useState<Developer[]>([]);

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const response = await databases.listDocuments('YOUR_DATABASE_ID', 'YOUR_COLLECTION_ID');
        setDevelopers(response.documents.map(doc => ({
          $id: doc.$id,
          name: doc.name,
          email: doc.email
        })));
      } catch (error) {
        console.error('Error fetching developers:', error);
      }
    };
    fetchDevelopers();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Registered Developers</h2>
      <ul className="space-y-2">
        {developers.map((developer) => (
          <li key={developer.$id} className="p-2 bg-gray-100 rounded">
            {developer.name} - {developer.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeveloperList;
