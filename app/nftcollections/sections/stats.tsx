import { INftCollection } from "@models/nftCollection";
import Image from "next/image";
import logo from "@public/assets/images/Viken (Black).jpg";
import { abbreviatedAddress } from "@components/cards/UserCollectionsCard";
import { getCollectionSalesData, getPrimarySales } from "@lib/blockchain";
import RoyaltyCard from '@components/cards/RoyaltyCard';
import { useState } from "react";
import { NftSale } from "alchemy-sdk";
import PrimarySales from "@models/primarySales";

type StatProps = {
  collectionData: INftCollection;
};

const Stats = ({ collectionData }: StatProps) => {
  const [showStats, setShowStats] = useState<boolean>(false);
  const [saleStats, setSaleStats] = useState<any>([]);
  const [royalty, setRoyalty] = useState<any>([]);
  const [nonRoyalty, setNonRoyalty] = useState<any>([]);
  const [totalSales, setTotalSales] = useState<any>([]);
  const [totalRoyalty, setTotalRoyalty] = useState<any>([]);
  const [secondarySales, setSecondarySales] = useState<number>(0);


  console.log("COLLECTION DATA IN STATS:", collectionData)
  const { _id, name, description, contractAddress, floorPrice, deployed_blocknumber, deployer, image, symbol, totalSupply } = collectionData;

  const getSaleStats = async () => {
    const response = await getCollectionSalesData(contractAddress);
  
    let sum = 0;
    let nonSum = 0;

    response.nftSales?.forEach((sale: NftSale) => {
      let _royalty = sale.royaltyFee?.amount;
      // Skip if royalty is NaN
      if (!isNaN(Number(_royalty))) {
          sum += Number(_royalty);
      } else {
          nonSum++;
      }
    });

    let res = sum.toFixed(5);
    setSaleStats(response.nftSales);
    setSecondarySales(response.nftSales.length);
    setRoyalty(res);
    setNonRoyalty(nonSum);    
    console.log("FETCHING PRIMARY SALES DATA..")
    const PS = await getPrimarySalesData()
    console.log(PS)
    setShowStats(!showStats);
    return response.nftSales;
  }

  const getPrimarySalesData = async () => {
    console.log(contractAddress)
    const ps = await getPrimarySales(contractAddress, deployed_blocknumber);
    console.log("PRIMARY SALES DATA:", ps)
    return ps;
  }

  return (
    <>
      <div className="card card-side shadow-xl my-10 mx-auto glassmorphism">
        <figure className="w-full h-fit" >
          <Image src={image || logo} alt="Collection" width={200} height={280} priority/>
        </figure>
        <div className="card-body w-fit">
          <h2 className="card-title">{name}</h2>
          <p className="font-lightbold text-stone-400 text-xs">{description? description : "No description available for this collection"}</p>
          
            <div className="stats shadow my-10">
              <div className="stat">
                <div className="stat-title">Total Supply</div>
                <div className="stat-value">{totalSupply}</div>
              </div>
              <div className="stat">
                <div className="stat-title">Collection Address</div>
                <div className="stat-value">{abbreviatedAddress(contractAddress)}</div>
              </div>
            </div>
          
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={() => {getSaleStats()}}>Show Stats</button>
          </div>
        </div>
      </div>
          {showStats && (
            <RoyaltyCard 
              total_sales={secondarySales} 
              primary_sales={500} 
              secondary_sales={secondarySales} 
              total_royalty={(royalty / 1e18).toFixed(5)} 
              royalty_sales={secondarySales-nonRoyalty} 
              non_royalty_sales={nonRoyalty} 
            />
          )}
    </>
  );
};

export default Stats;
