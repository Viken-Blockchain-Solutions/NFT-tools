'use client';
import Stats from "./sections/stats";
import AddressForm from "@components/forms/AddressForm";
import React, { useState, useEffect } from "react";
import TabWindow from "./sections/tabwindow";



const CollectionPage = async () => {
    const [collectionAddress, setCollectionAddress] = useState<any>({});
    const [collectionsList, setCollectionsList] = useState<any>([]);
    const [dbData, setDBData] = useState<[]>([])
    const [submitting, setSubmitting] = useState<boolean>(false);


    useEffect(() => {
        const fetchFromDB = async () => {
            const response = await fetch("/api/collections");
            response.json().then((data) => {
                setDBData(data);
            });

            dbData.map((collection: any) => {
                collection.contractAddress.map((address: string, index: number) => {
                    setCollectionsList((prevState: any) => ({
                        ...prevState,
                        [address]: {
                            address: address,
                            id: index,
                        },
                    }));
                });
            });
        };
        fetchFromDB();

    }, []);



    return (
        <>
            <h1 className="head_text text_left"><span className="orange_gradient">Stored Collections</span></h1>

            <p className="my-5 text-left max-w-md text-gray-700">
                Save the collection address to access the dashboard and start tracking your collection.
            </p>

            <hr className="my-8 bg-purple-700 w-1/2" />
            <TabWindow />
            <Stats />
            <AddressForm
                setCollectionAddress={setCollectionAddress}
                submitting={submitting}
            />

            <div>
                {collectionsList && Object.keys(collectionsList).map((key: any) => (
                    <div key={key}>
                        <div>{collectionsList[key].address}</div>
                        <div>{collectionsList[key].id}</div>
                    </div>
                ))}
            </div>
        </>


    )
}

export default CollectionPage;