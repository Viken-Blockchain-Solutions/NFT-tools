'use client';
import AddressForm from "@components/forms/AddressForm";
import React, { useState, useEffect } from "react";
import TabWindow from "./sections/tabwindow";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";


export type UserResponse = [{
    email: string;
    image: string;
    nftcollection: [
        {
            collectionAddress: string;
            id: number;
        }
    ];
    __v: number;
    username: string;
    _id: string;
}]


const NFTCollectionPage = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const [collectionAddress, setCollectionAddress] = useState<any>({});
    const [collectionsList, setCollectionsList] = useState<any>([]);
    const [dbData, setDBData] = useState<UserResponse>();
    const [submitting, setSubmitting] = useState<boolean>(false);
    const userId = session?.user;
    
    useEffect(() => {
        if (!userId) {
            router.push("/");
        }
        const fetchFromDB = async () => {

            try {
                const response = await fetch("/api/nftcollections");
                
                if (!response.ok) {
                    throw new Error("Not ok response")
                }

                const data: UserResponse = await response.json()
                setDBData(data)

            } catch (error) {
                console.log("Error fetching from DB: ", error)
            }
        };
        fetchFromDB();
    }, []);



    return (
        <>
            <div>
                <div>
                    <h1 className="head_text text_left"><span className="orange_gradient">Stored Collections</span></h1>
                    <p className="my-5 text-left max-w-md text-gray-700">
                        Save the collection address to access the dashboard and start tracking your collection.
                    </p>
                </div>


                <hr className="my-8 bg-purple-700 w-1/2" />
                <TabWindow dbData={dbData} />
                
               
                <hr className="my-8 bg-purple-700 w-1/2" />
                    <AddressForm
                        setCollectionAddress={setCollectionAddress}
                        submitting={submitting}
                    /> 

                   
             
            </div>
        </>


    )
}

export default NFTCollectionPage;