'use client';

import { useState } from "react";
import { getCollectionSalesData, getCollectionHolders, getCollectionMetadata, getCollectionTransferHistory } from '@/lib/blockchain'
import { AssetTransfersResponse, GetNftSalesResponse } from "alchemy-sdk/dist/src/types/types";


export default function Home() {
  const [address, setAddress] = useState("");
  const [nftData, setNftData] = useState<GetNftSalesResponse>();
  const [holders, setHolders] = useState(0);

  async function handleFormSubmit(address: string) {
    const response = await getCollectionSalesData(address);
    console.log(response)
    setNftData(response);
    const _holders = await getCollectionHolders(address);
    setHolders(_holders.owners.length);

  };

  console.log("nftSales", nftData)
  console.log("Holders", holders)


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
      </main>
    </>

  )
}
