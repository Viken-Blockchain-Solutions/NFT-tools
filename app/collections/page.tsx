'use client';
import AddressForm from "@components/forms/AddressForm";
import React from "react";



const CollectionPage = async () => {
    const [collectionAddress, setCollectionAddress] = React.useState<any>({});
    const [submitting, setSubmitting] = React.useState<boolean>(false);

    console.log('newAddress', collectionAddress);
   
    const data = {
        collection={collectionAddress}, 
        setCollection={setCollectionAddress}, 
        submitting={submitting}
    }

    return (
       <AddressForm 
           data={data}
        />
    )
}

export default CollectionPage;