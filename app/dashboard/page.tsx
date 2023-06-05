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
import { Types } from 'mongoose';


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
  //@ts-ignore
  const userId = session?.user?.id;
  
  
  useEffect(() => {
    if (submitting) {
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
  }, [address, submitting]);  

  useEffect(() => {
    if (collectionMetadata) {
      setOpenSeaMetadata(collectionMetadata?.openSeaMetadata);
    } else {
      return;
    }
  },[collectionMetadata]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
        if (!session?.user) {
          throw new Error('User not logged in');
        }
        
        console.log("This is collectionMetadata: ", collectionMetadata);
        console.log("This is openSeaMetadata: ", openSeaMetadata);

        const res = await fetch('/api/collections/new', {
            method: 'POST',
            body: JSON.stringify({
              _id: new Types.ObjectId(),
              contractAddress: address,
              deployer: collectionMetadata?.contractDeployer,
              deployed_Blocknumber: collectionMetadata?.deployedBlockNumber,
              name: collectionMetadata?.name,
              image: openSeaMetadata?.imageUrl,
              symbol: collectionMetadata?.symbol,
              totalSupply: collectionMetadata?.totalSupply,
              description: openSeaMetadata?.description,
              floorPrice: openSeaMetadata?.floorPrice,
            /*   safelistRequestStatus: openSeaMetadata?.safelistRequestStatus,
              ingestionHistory: openSeaMetadata?.lastIngestedAt, */
              userId: userId,
            })
        })

        console.log("res:", res)

        if(res.ok){
          console.log("Stored to DB, This is res: ", res);
             router.push('/dashboard')
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
          {/* @ts-ignore */}
            <Overview collectionMetadata={collectionMetadata} />
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

