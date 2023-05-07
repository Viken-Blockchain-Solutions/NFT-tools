import { NftSale, NftSaleFeeData } from "alchemy-sdk";
import { useState } from 'react';


export const Card = async ({data}: {data:any}) => {

    return (
        <section className="bg-white w-72 rounded-lg mx-auto">
            <div className="flex flex-row text-red-500 font-semibold">
                <div className="p-5">
                    <h2 className="text-lg mx-auto">Secondary Sales</h2>
                    
                </div>
                <div className="p-5">
                    <p className="text-lg">Description</p>
                </div>
            </div>
        </section>
    );
}