'use client';

import { useEffect, useState } from "react";
import { getCollectionSalesData, getCollectionHolders } from '@/lib/blockchain'
import { GetNftSalesResponse, GetOwnersForContractResponse } from "alchemy-sdk";
import { FormResult } from "@/components/FormResult";


export default function Home() {
  const [address, setAddress] = useState("");
  const [nftData, setNftData] = useState<GetNftSalesResponse>();
  const [holders, setHolders] = useState<GetOwnersForContractResponse>();
  const [collectionMetadata, setCollectionMetadata] = useState();
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

    const data = await fetch(`https://eth-mainnet.g.alchemy.com/nft/v2/${apikey}/getContractMetadata?contractAddress=${address}`);
    const result = await data.json();
    setCollectionMetadata(result)
  };


  return (
    <>
      <main className="flex min-h-screen flex-col ">
        <div className="mx-5 text-center">
            <h2 className="text-xl py-5 text-white">Search for a collection</h2>
            <form
              className="flex flex-col md:flex-row items-center justify-center" 
              onSubmit={e => {
              e.preventDefault();
              console.log(address)
              handleFormSubmit(address);
              }}>
              <input
                type="text"
                className="form-control p-2 rounded-sm px-1.5 text-gray-700"
                onChange={(e) => setAddress(e.target.value.toString())}
                name="address"
                id="address"
                placeholder="Enter collection address"
              />
              <button className="bg-blue-500 rounded-sm p-2 hover:bg-blue-400 mt-3 md:mt-0" type="submit">Submit</button>
            </form>
          </div>
          <div className="flex flex-col items-center justify-center">
            {nftData && <FormResult data={nftData} holders={holders} usd={usdPrice} metadata={collectionMetadata} />}
          </div>
      </main>
    </>

  )
}
