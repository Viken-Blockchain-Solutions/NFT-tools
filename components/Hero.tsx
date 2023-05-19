'use client'
import { getCollectionHolders, getCollectionSalesData } from "@/lib/blockchain";
import { GetNftSalesResponse, GetOwnersForContractResponse } from "alchemy-sdk";
import { useEffect, useState } from "react";
import { FormResult } from "./FormResult";
import { PriceCard } from "./PriceCard";
import { NFTCollection } from "@/types";

export const Hero = () => {
  const [address, setAddress] = useState("");
  const [nftData, setNftData] = useState<GetNftSalesResponse>();
  const [holders, setHolders] = useState<GetOwnersForContractResponse>();
  const [collectionMetadata, setCollectionMetadata] = useState<NFTCollection>();
  const [usdPrice, setUsdPrice] = useState(0);


  useEffect(() => {
    const getPrice = async () => {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`
        );
        const data = await response.json();
        const usd = data.ethereum.usd.toFixed(2);
        setUsdPrice(usd);
      }

    getPrice();

  }, []);

  async function handleFormSubmit(address: string) {
    const response = await getCollectionSalesData(address);
    setNftData(response);

    const _holders = await getCollectionHolders(address);
    setHolders(_holders);
    const apikey = 'x5pi1Ykrq9fnCchoIdswHu9ijWHflqIs';

    const data = await fetch(`https://eth-mainnet.g.alchemy.com/nft/v3/${apikey}/getContractMetadata?contractAddress=${address}`);
    const result = await data.json();
    setCollectionMetadata(result);
  };
  
  return (
      <section className="min-h-fit background-radial-gradient overflow-hidden mb-10">
      <div className="px-6 py-12 lg:py-24 md:px-12 text-center lg:text-left">
        <div className="container mx-auto xl:px-32 text-gray-800">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="mt-12 lg:mt-0" style={{zIndex: 10}}>
              <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12" style={{ color: 'hsl(218, 81%, 95%)' }}>Unlock the <br /><span style={{ color: 'hsl(218, 81%, 75%)' }}>full potential <br /> of your NFT Collections</span></h1>
              <p className="font-semibold opacity-70 text-stone-100 text-md lg:text-xl" >
              NFTInsight is the ultimate platform to manage and analyse any NFT collections. 
              With our advanced search and analytics tools, you can quickly gain insights into the value of your collection.
              </p>
            </div>
            <div className="mb-12 lg:mb-0 relative">
              <div id="radius-shape-1" className="absolute rounded-full shadow-lg"></div>
              <div id="radius-shape-2" className="absolute shadow-lg"></div>
              <PriceCard usdPrice={usdPrice}/>
              <div className="block rounded-lg shadow-lg bg-glass px-6 py-12 md:px-12 mx-5 text-center content-center">
              {/** Form here */}
                <h2 className="text-2xl py-5 text-gray-600">Search for a collection</h2>
                <form
                  className="flex flex-col md:flex-row items-center justify-center w-auto" 
                  onSubmit={e => {
                  e.preventDefault();
                  console.log(address)
                  handleFormSubmit(address);
                  }}>
                  <input
                    type="text"
                    className="form-control p-2 rounded-sm px-1.5 text-gray-700 w-4/6"
                    onChange={(e) => setAddress(e.target.value.toString())}
                    name="address"
                    id="address"
                    placeholder="Enter collection address"
                  />
                    <button className=" text-white bg-blue-600 rounded-sm p-2 hover:bg-blue-400 mt-3 md:mt-0" type="submit">Search</button>
                  </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/** Features here */}




      {/** Form result here */}
      { nftData && (
      <div className="flex flex-col items-center justify-center">
        {collectionMetadata && (<FormResult data={nftData} holders={holders} usd={usdPrice} contractdata={collectionMetadata} />)}
      </div>

      )}
    </section>
    )
}
