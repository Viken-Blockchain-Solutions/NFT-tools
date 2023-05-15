'use client';

import { useState } from "react";
import { getCollectionSalesData, getCollectionHolders, getCollectionMetadata } from '@/lib/blockchain'
import { GetNftSalesResponse } from "alchemy-sdk";
import { FormResult } from "@/components/FormResult";


export default function Home() {
  const [address, setAddress] = useState("");
  const [nftData, setNftData] = useState<GetNftSalesResponse>();
  const [holders, setHolders] = useState(0);
  const [collectionMetadata, setCollectionMetadata] = useState({});

  async function handleFormSubmit(address: string) {
    const response = await getCollectionSalesData(address);
    setNftData(response);

    const _holders = await getCollectionHolders(address);
    setHolders(_holders.owners.length);
    let apikey = 'x5pi1Ykrq9fnCchoIdswHu9ijWHflqIs';

    const data = await fetch(`https://eth-mainnet.g.alchemy.com/nft/v2/${apikey}/getContractMetadata?contractAddress=${address}`);
    const result = await data.json();
    setCollectionMetadata(result)
  };


  return (
    <>
      <main className="flex min-h-screen flex-col">
        <div className="mx-5 text-center">
            <h2 className="text-xl py-5 text-white">Search for a collection</h2>
            <form onSubmit={e => {
              e.preventDefault();
              console.log(address)
              handleFormSubmit(address);
              }}>
              <input
                type="text"
                className="form-control w-2/6 p-2 rounded-sm px-1.5 text-gray-700"
                onChange={(e) => setAddress(e.target.value.toString())}
                name="name"
                id="name"
                placeholder="Enter collection address"
              />
              <button className="active:bg-blue-500 rounded-sm p-2 hover:bg-blue-400" type="submit">Submit</button>
            </form>
          </div>
          <div className="flex flex-col items-center justify-center">
            {nftData && <FormResult data={nftData} holders={holders} metadata={collectionMetadata} />}
          </div>
      </main>
    </>

  )
}
