'use client'

import { useSession } from 'next-auth/react';
import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';

import { Profile } from '@/components/Profile';

const ProfilePage = () => {
  const { data: session } = useSession();
  const [nftContracts, setNftContracts] = useState([]);

  const userId = session?.user?.id;

  useEffect(() => {
    console.log('profile page');
    const fetchUserStoredCollections = async () => {
      
      const response = await fetch(`/api/users/${userId}/nftcollections`);
      const data = await response.json();
      console.log("DATA in Profile page:", data);
      setNftContracts(data);
    }

    if (userId) {
      fetchUserStoredCollections();
    }

  }, []);


  const handleEdit = () => {
    console.log('edit');
  }

  const handleDelete = async () => {
    console.log('delete');
  }

  return (

      <Profile 
        name="my"
        desc="Welcome to your personalized profile page."
        data={nftContracts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />

  )
}

export default ProfilePage;