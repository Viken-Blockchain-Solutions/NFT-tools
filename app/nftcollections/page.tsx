'use client';
import AddressForm from "@components/forms/AddressForm";
import React, { useState, useEffect } from "react";
import TabWindow from "./sections/tabwindow";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";



const NFTCollectionPage = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const [collectionAddress, setCollectionAddress] = useState<any>({});
    const [collectionsList, setCollectionsList] = useState<any>([]);
    const [dbData, setDBData] = useState<[]>()
    const [submitting, setSubmitting] = useState<boolean>(false);

    
    useEffect(() => {
        if (!session?.user) {
            router.push("/");
        }
        const fetchFromDB = async () => {
            console.log("Fetching From DB...")
            try {
                const response = await fetch("/api/nftcollections",);
                console.log("This is response:", response)
                const data = await response.json()
                console.log("Data form DB: ", data);
                setDBData(data);
            } catch (error) {
                console.log("Error fetching from DB: ", error)
            }


            /* dbData.map((nftcollection: any) => {
                nftcollection.contractAddress.map((address: string, index: number) => {
                    setCollectionsList((prevState: any) => ({
                        ...prevState,
                        [address]: {
                            address: address,
                            id: index,
                        },
                    }));
                });
            }); */
        };
        fetchFromDB();
        console.log("DBData: ", dbData);
        console.log("collectionsList: ", collectionsList);

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
                <TabWindow />
                <hr className="my-8 bg-purple-700 w-1/2" />
                {/* <AddressForm
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
                */}
            </div>
        </>


    )
}

export default NFTCollectionPage;