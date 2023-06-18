import { useState } from "react";

import { UserCard } from "./cards/UserCard";
import NFTCollectionCard from "@/components/cards/NFTCollectionCard";


export const Profile = ({
    name,
    desc,
    amountStored,
    data,
    handleEdit,
    handleDelete
}: {
    name: string,
    desc: string,
    amountStored: number,
    data: any,
    handleEdit: any,
    handleDelete: any
}) => {

    const [showCollections, setShowCollections] = useState(false);


    return (
        <section className="w-fit">
            <h1 className="mt-5 text-5xl leading-[1.15] sm:text-6xl text_left">
                <span className="blue_gradient font-extrabold">{name.toLocaleUpperCase()} Profile</span></h1>
            <p className="text-lg text-stone-400 sm:text-xl max-w-2xl text_left my-10">{desc}</p>
            <div className="flex flex-row items-center mt-10 gap-4">
            <UserCard />
                <div className="flex flex-col items-center justify-center w-1/2 h-24 bg-stone-100 rounded-lg glassmorphism">
                    <a onClick={() => setShowCollections(!showCollections)}>
                        <p className="text-3xl font-bold text-stone-400">{amountStored}</p>
                        <p className="text-lg text-stone-400">NFT Collections Stored</p>
                    </a>
                </div>
            </div>
            {showCollections && (
                <div className=" py-4 sm:columns-1 sm:gap-3 xl:columns-1">
                {data.map(async (nftCollection: any) => (
                    <NFTCollectionCard
                    key={nftCollection._id}
                    data={nftCollection}
                    handleEdit={() => handleEdit && handleEdit(nftCollection)}
                    handleDelete={() => handleDelete && handleDelete(nftCollection)}
                    />
                    ))}
            </div>
            )}  

        </section>
    )
}
