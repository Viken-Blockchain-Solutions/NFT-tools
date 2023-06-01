'use client'
import React, { useState, useEffect } from "react";

import StoredCollectionCard from "@/components/cards/StoredCollectionsCard";


const UserCollections = () => {
    // defaults to empty array
    const [allCollections, setAllCollections] = useState();

    console.log("allcollections", allCollections?.[0]);
    useEffect(() => {
        const fetchFromDB = async () => {
            const response = await fetch("/api/collections");
            // Try to parse the response as JSON
            try {
                const data = await response.json();
                setAllCollections(data);
            } catch (error) {
                console.error('Failed to parse JSON:', error);
            }


        };

        fetchFromDB();
    }, [setAllCollections]);


    return (
        <div className="w-full my-5">
            <h2 className="text-sm font-bold">Stored collections:</h2>
            <ul className="flex flex-row flex-wrap">
                FUCK OFF
            </ul>

        </div>
    )
}

export default UserCollections;