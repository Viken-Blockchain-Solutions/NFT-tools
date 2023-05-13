'use client'
import { getCollectionSalesData } from '@/lib/blockchain'
import { FormResult } from './FormResult'


import { useState } from 'react';
import { GetNftSalesResponse } from 'alchemy-sdk';
import { Card } from './Card';

export default function SearchForm({ action }: { action: any }) {
  const [address, setAddress] = useState("");
  const [data, setData] = useState<GetNftSalesResponse>();

  async function handleFormSubmit(formData: string) {
    const response = await getCollectionSalesData(formData);
    setData(response);
  };

  return (
    <>
      <section className="container p-12 rounded-lg bg-gray-900">
        <div className="mx-5">
          <form action={action} onSubmit={e => {
            e.preventDefault();
            handleFormSubmit(address);
          }}>
            <input
              type="text"
              className="form-control mx-5 rounded-sm px-1.5 text-gray-700"
              onChange={(e) => setAddress(e.target.value.toString())}
              name="name"
              id="name"
              placeholder="Enter collection address"
            />
            <button className="bg-blue-500 rounded-sm p-2 hover:bg-blue-400" type="submit">Submit</button>
          </form>
        </div>
        <div className='my-20 '>
          <hr className="max-w-screen text-white m-10" />
          <FormResult data={data} />
        </div>       
      </section>
    </>
  );

}