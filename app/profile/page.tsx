'use client'

import { useSession } from 'next-auth/react';
import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';

import { Profile } from '@/components/Profile';

const ProfilePage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [nftContracts, setNftContracts] = useState([]);
  const [amountStored, setAmountStored] = useState(0);

  const userId = session?.user?.id;

  useEffect(() => {
    console.log('profile page');
    const fetchUserStoredCollections = async () => {
      
      const response = await fetch(`/api/users/${userId}/nftcollections`);
      const data = await response.json();
      setNftContracts(data);
      setAmountStored(data.length);
    }

    if (userId) {
      fetchUserStoredCollections();
    }

  }, []);


  const handleEdit = (nftContracts: any) => {
    router.push(`/update-collection?nftcollections=${nftContracts._id}`)
  }

  const handleDelete = async () => {
    console.log('delete');
  }

  return (

      <Profile 
        name="my"
        desc="Welcome to your personalized profile page."
        amountStored={amountStored}
        data={nftContracts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />

  )
}

export default ProfilePage;