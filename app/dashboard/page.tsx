'use client'
import { useSession } from 'next-auth/react';
import { useEffect, useState } from "react";
import { getCollectionHolders, getCollectionRoyaltyData, getCollectionSalesData, getCollectionTransferHistory } from '@lib/blockchain';
import Search from "./sections/Search";
import Overview from "./sections/Overview";
import { NFTCollection, OpenSeaMetadata } from '@types';
import { GetNftSalesResponse, GetOwnersForContractResponse } from 'alchemy-sdk';
import Stats from './sections/Stats';


const Dashboard = async () => {
  const { data: session } = useSession();
  const [address, setAddress] = useState<string>(' ');
  const [collectionMetadata, setCollectionMetadata] = useState<NFTCollection>();
  const [openSeaMetadata, setOpenSeaMetadata] = useState<OpenSeaMetadata>();
  const [nftData, setNftData] = useState<GetNftSalesResponse>();
  const [holders, setHolders] = useState<GetOwnersForContractResponse>();
  const [royaltyData, setRoyaltyData] = useState<{}>({});
  const [newCollectionAddress, setNewCollectionAddress] = useState('');
  
  
  useEffect(() => {
    setOpenSeaMetadata(collectionMetadata?.openSeaMetadata);
    /* if (openSeaMetadata) {
      console.log("This is collectionMetadata: ", collectionMetadata);
      console.log("This is openSeaMetadata: ", openSeaMetadata);
      console.log("This is nftData: ", nftData?.nftSales);
      console.log("This is holders: ", holders?.owners);
    } */
  }, [collectionMetadata, openSeaMetadata, nftData, holders]);

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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      console.log(session?.user?.id.toString())
      const response = await fetch('/api/addCollections', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: session?.user, 
          address: newCollectionAddress,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add address');
      }

      // Do something with the response
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        {session?.user && (
          <>
          <Search address={address} setAddress={setAddress} setCollectionMetadata={setCollectionMetadata} />
          <div className="flex flex-row justify-between">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={newCollectionAddress}
                  onChange={e => setNewCollectionAddress(e.target.value)}
                />
                <button type="submit">Add Address</button>
              </form>
          </div>
          </>
        )}

        <hr className="my-8 bg-purple-700 w-1/2" />
        {collectionMetadata && (
          <Overview collectionMetadata={collectionMetadata} />
        )}
        <hr className="my-8" />
        {collectionMetadata && (
          <Stats nftData={nftData} holders={holders} royaltyData={royaltyData} />
        )}
      </div>
    </>
  );
};

export default Dashboard;

