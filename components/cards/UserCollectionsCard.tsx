'use client'
import React, { useState, useEffect } from "react";

interface ResponseType {
  _id: string;
  creator: {
    _id: string;
    email: string;
    username: string;
    __v: number;
  };
  contractAddress: [];
  __v: number;
}

export const abbreviatedAddress = (address: string) => (
  address.substring(0, 10) +
  "..." +
  address.substring(address.length - 8)
);

const UserCollections = () => {
  const [allCollections, setAllCollections] = useState<ResponseType[]>();

  useEffect(() => {
    const fetchFromDB = async () => {
      const response = await fetch("/api/collections");

      try {
        const data = await response.json();
        setAllCollections(data);
    } catch (error) {
        console.error('Failed to parse JSON:', error);
    }
};

    fetchFromDB();
  }, [allCollections]);

  return (
    <div className="w-full my-5">
      <div className="mx-2">
        <ul className="max-w-fit flex flex-col flex-wrap">
         {allCollections?.map((collection) =>
            collection.contractAddress.map((address: string, index: number) => (
              <li key={index} className="text-xs font-satoshi">
                <div className="badge badge-outline p-4">{abbreviatedAddress(address).toLowerCase()}</div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default UserCollections;