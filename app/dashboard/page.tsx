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


  return (
    <>
      <div>
        {session?.user && (
          <Search address={address} setAddress={setAddress} setCollectionMetadata={setCollectionMetadata} />
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

