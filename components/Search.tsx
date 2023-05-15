'use client'
import { getCollectionSalesData, getCollectionHolders } from '@/lib/blockchain'
import { FormResult } from './FormResult'


import { useState } from 'react';
import { GetNftSalesResponse, GetOwnersForContractWithTokenBalancesResponse } from 'alchemy-sdk';  

export default function SearchForm({ action }: { action: any }) {
  const [address, setAddress] = useState("");
  const [data, setData] = useState<GetNftSalesResponse>();
  const [holders, setHolders] = useState(0);

  async function handleFormSubmit(formData: string) {
    const response = await getCollectionSalesData(formData);
    setData(response);

    const _holders = await getCollectionHolders(formData);
    console.log("Holders:", _holders);
    setHolders(_holders.owners.length);

  };

  return (  
    <>
      <section className="container p-12 rounded-lg bg-gray-900">
        <div className="mx-5">
          <h2 className="text-xl py-5 text-white text-start">Search for a collection</h2>
          <form action={action} onSubmit={e => {
            e.preventDefault();
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
            <button className="bg-blue-500 rounded-sm p-2 hover:bg-blue-400" type="submit">Submit</button>
          </form>
        </div>
        <div className='mx-5 my-20 '>
          <hr className="max-w-screen text-white m-10" />
          <h3 className="text-3xl text-white text-start">Collection: <span className='bg-purple-50 font-light py-1 px-5 text-purple-600 text-lg rounded-lg'>{address}</span></h3>
          <div className="flex flex-row justify-between my-10">
          <h3 className="text-2xl text-white text-start">Results</h3>
          <FormResult data={data} holders={holders}/>
          </div>
        </div>       
      </section>
    </>
  );

}