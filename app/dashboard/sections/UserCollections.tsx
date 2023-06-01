'use client'
import React, { useState, useEffect } from "react";

import StoredCollectionCard from "@/components/cards/StoredCollectionsCard";

interface ResponseType {
    _id: string;
    creator: {
        _id: string;
        email: string;
        username: string;
        __v: number;
    };
    contractAddress: string[];
    __v: number;
} 

const UserCollections = () => {
    // defaults to empty array
    const [allCollections, setAllCollections] = useState<ResponseType[]>();

    useEffect(() => {
        const fetchFromDB = async () => {
            const response = await fetch("/api/collections");

            try {
                const data = await response.json();
                setAllCollections(await data);
            } catch (error) {
                console.error('Failed to parse JSON:', error);
            }
        };

        fetchFromDB();
    }, []);


    return (
        <div className="w-full my-5">
            <h2 className="text-sm font-bold py-2">Stored collections:</h2>
            <div className="mx-2">
                <ul className="flex flex-col flex-wrap">
                    {allCollections?.map(collection => {
                        return collection.contractAddress.map((address) => {
                            return (
                                <li key={collection._id} className="text-xs font-satoshi text-clip">
                                    <p>{address}</p>
                                </li>
                            )
                        })
                    })}
                </ul>
            </div>
        </div>
    )
    
}

export default UserCollections;