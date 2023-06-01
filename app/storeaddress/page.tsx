'use client'

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import AddressForm from "./components/AddressForm"

export interface StoreAddressProps {
    address: string
}

const StoreAddress = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [collection, setCollection] = useState<StoreAddressProps>({address: ""});

    const storeAddress = async (e: any) => {
        e.preventDefault();
        setSubmitting(true);
        //@ts-ignore
        console.log(session?.user?.id)
        try {
            const res = await fetch('/api/collections/new', {
                method: 'POST',
                body: JSON.stringify({
                    address: collection.address,
                    //@ts-ignore
                    userId: session?.user?.id,
                })
            })
            if(res.ok){
                 router.push('/')
            }
        } catch (error) {
            console.error(error)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <AddressForm
            collection={collection}
            setCollection={setCollection}
            submitting={submitting}
            handleSubmit={storeAddress}
        />
    )
}

export default StoreAddress;