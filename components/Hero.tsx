'use client'
import { getCollectionHolders, getCollectionSalesData } from "@lib/blockchain";
import { GetNftSalesResponse, GetOwnersForContractResponse } from "alchemy-sdk";
import { useEffect, useState } from "react";
import { FormResult } from "./forms/FormResult";
import { PriceCard } from "./cards/PriceCard";
import { NFTCollection } from "@/types";





export const Hero = () => {
  const [address, setAddress] = useState("");
  const [nftData, setNftData] = useState<GetNftSalesResponse>();
  const [holders, setHolders] = useState<GetOwnersForContractResponse>();
  const [collectionMetadata, setCollectionMetadata] = useState<NFTCollection>();
  const [usdPrice, setUsdPrice] = useState(0);
  const [isError, setIsError] = useState(false);


  useEffect(() => {
    const getPrice = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`
        );
        const data = await response.json();
        const usd = data.ethereum.usd.toFixed(2);
        setUsdPrice(usd);
      } catch (error) {
        console.log(error);
      }
    }

    getPrice();

  }, []);

  async function handleFormSubmit(address: string) {
    try {
      const response = await getCollectionSalesData(address);
      setNftData(response);

      const _holders = await getCollectionHolders(address);
      setHolders(_holders);
      const apikey = 'x5pi1Ykrq9fnCchoIdswHu9ijWHflqIs';
      const data = await fetch(`https://eth-mainnet.g.alchemy.com/nft/v3/${apikey}/getContractMetadata?contractAddress=${address}`);
      const result = await data.json();
      /* if(result.tokenType === 'NOT_A_CONTRACT' || result.tokenType === 'UNKNOWN')  { 
        console.log("This is error: ", result.tokenType);
        setIsError(true);
      } */
      setCollectionMetadata(result);

    } catch (error) {
      console.log("This is error: ", error);
      setIsError(true);
    }
  };

  return (
    <section className="min-h-fit background-radial-gradient overflow-hidden mb-10">
      <div className="px-6 py-12 lg:py-24 md:px-12 text-center lg:text-left">
        <div className="container mx-auto xl:px-32 text-gray-800">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="mt-12 lg:mt-0 z-10" >
              <h1 className="head_text my-10 md:text-6xl xl:text-7xl">Unlock the <br /><span className="orange_gradient">full potential <br /> of your NFT Collections</span></h1>
              <p className="text-center text-stone-50 text-md lg:text-xl desc" >
                NFTInsight is the ultimate platform to manage and analyse any NFT collections.
                With our advanced search and analytics tools, you can quickly gain insights into the value of your collection.
              </p>
            </div>
            <div className="mb-12 lg:mb-0 relative">
              <div id="radius-shape-1" className="absolute rounded-full shadow-lg"></div>
              <div id="radius-shape-2" className="absolute shadow-lg"></div>
              <PriceCard usdPrice={usdPrice} />
              <div className="block rounded-lg shadow-lg bg-glass px-6 py-12 md:px-12 mx-5 text-center content-center">
                {/** Form here */}
                <h2 className="text-2xl py-5 text-gray-600">Search for a collection</h2>
                <form
                  className="flex flex-col md:flex-row items-center justify-center w-auto"
                  onSubmit={(e) => {
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
              {isError && (
                <>
                  <div className="relative alert-dismissible mb-3 hidden w-full items-center rounded-lg bg-yellow-100 px-6 py-5 text-base text-yellow-700 data-[te-alert-show]:inline-flex"
                    role="alert"
                    data-te-alert-init
                    data-te-alert-show
                    data-te-autohide="true"
                    id="my-alert">
                    <p>Please enter a valid collection address</p>
                    <button
                      type="button"
                      className="ml-auto text-center box-content h-4 w-4 rounded-none border-none p-1 text-yellow-900 opacity-50 hover:text-yellow-900 hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                      data-te-alert-dismiss
                      data-te-target="#my-alert"
                      aria-label="Close"
                      onClick={() => setIsError(false)}>
                      <span
                        className="w-[1em] focus:opacity-100 disabled:pointer-events-none disabled:select-none disabled:opacity-25 [&.disabled]:pointer-events-none [&.disabled]:select-none [&.disabled]:opacity-25">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 16 16"
                          fill="#000">
                          <path
                            d="M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z" />
                        </svg>
                      </span>
                      CLOSE
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {/** Form result here */}
      {!isError && nftData && (
        <div className="flex flex-col items-center justify-center">
          {collectionMetadata && (<FormResult data={nftData} holders={holders} usd={usdPrice} contractdata={collectionMetadata} />)}
        </div>

      )}
    </section>
  )
}
