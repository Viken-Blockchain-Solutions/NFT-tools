'use client'

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation';

import { Form } from '@components/forms/Form';

const EditCollection = () => {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [collection, setCollection] = useState<any>({
        name: '',
        description: '',
    });
    const searchParams = useSearchParams();
    const collectionId = searchParams.get('id');

    useEffect(() => {
        const getCollectionDetails = async () => {
            const response = await fetch(`/api/nftcollections/${collectionId}`);
            const data = await response.json();
            
            setCollection({
                name: data.name,
                description: data.description,
            });
        }

        if(collectionId) {
            console.log("collectionId: ", collectionId);
            getCollectionDetails();
        }

    }, [collectionId]);

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold">Edit Collection</h1>
        </div>
    )
}
export default EditCollection;