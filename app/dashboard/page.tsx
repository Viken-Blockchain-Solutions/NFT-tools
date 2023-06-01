'use client'
import { useSession } from 'next-auth/react';
import { useEffect, useState } from "react";
import { getCollectionHolders, getCollectionRoyaltyData, getCollectionSalesData, getCollectionTransferHistory } from '@lib/blockchain';
import Search from "./sections/Search";
import Overview from "./sections/Overview";
import { NFTCollection, OpenSeaMetadata } from '@types';
import { GetNftSalesResponse, GetOwnersForContractResponse } from 'alchemy-sdk';
import Stats from './sections/Stats';
import { useRouter } from 'next/navigation';
import USerCollections from './sections/UserCollections';


const Dashboard = async () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [address, setAddress] = useState<string>(' ');
  const [collectionMetadata, setCollectionMetadata] = useState<NFTCollection>();
  const [openSeaMetadata, setOpenSeaMetadata] = useState<OpenSeaMetadata>();
  const [nftData, setNftData] = useState<GetNftSalesResponse>();
  const [holders, setHolders] = useState<GetOwnersForContractResponse>();
  const [royaltyData, setRoyaltyData] = useState<{}>({});
  const [submitting, setSubmitting] = useState(false);
  
  
  useEffect(() => {
    if (address !== ' ') {
      try {
        const fetchCollectionData = async () => {
          const holdersRes = getCollectionHolders(address);
          setHolders(await holdersRes);
  
          const salesRes = getCollectionSalesData(address);
          setNftData(await salesRes);

          const royaltiesRes = await getCollectionRoyaltyData(address)
          setRoyaltyData(royaltiesRes);
          console.log("This is royaltiesRes: ", royaltiesRes);
        }  
        fetchCollectionData();

      } catch (error) {
        console.log("Error fetching collection data: ", error)
      }
    }  
  }, [address]);  

  useEffect(() => {
    if (collectionMetadata?.openSeaMetadata) {
      setOpenSeaMetadata(collectionMetadata?.openSeaMetadata);
    } else {
      setOpenSeaMetadata(undefined);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
        if (!session?.user) {
          throw new Error('User not logged in');
        }
        const _id = session?.user?.id;
        console.log("This is session userId: ", _id);
        const res = await fetch('/api/collection/new', {
            method: 'POST',
            body: JSON.stringify({
                address: address,
                userId: _id
            })
        })
        if(res.ok){
          console.log("This is res: ", res);
             router.push('/')
        }
    } catch (error) {
        console.error(error)
    } finally {
        setSubmitting(false)
    }
  };

  return (
    <>
      <div>
        {session?.user && (
          <>
          <Search 
            address={address} 
            setAddress={setAddress} 
            setCollectionMetadata={setCollectionMetadata} 
            handleSubmit={handleSubmit}
          />
          
          </>
        )}

        <hr className="my-8 bg-purple-700 w-1/2" />
        {collectionMetadata && (
          <>
            <Overview 
              collectionMetadata={collectionMetadata} 
            />
            <Stats
              nftData={nftData}
              holders={holders}
              royaltyData={royaltyData}
            />
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;

