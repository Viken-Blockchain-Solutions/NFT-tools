'use client';

import { GetNftSalesResponse, NftSale } from "alchemy-sdk";
import { parseEther } from "ethers";
import { useState, useEffect } from "react";
import { NftCard } from "./NftCard";
import { NFTCollection } from "@/types";

export const FormResult = ({ data, holders, usd, contractdata }: { data: GetNftSalesResponse, holders: any, usd: number, contractdata: NFTCollection }) => {
    const [sales, setSales] = useState(0);
    const [royalty, setRoyalty] = useState("0");
    const [nonRoyalty, setNonRoyalty] = useState(0);
    const [usdPrice, setUSDPrice] = useState(0);

    console.log("data:", data); 


    useEffect(() => {
        const getSalesData = async () => {
            const _sales = data?.nftSales.length;
            setSales(_sales);
        }
        getSalesData();
    }, [data]);



    useEffect(() => {
        const getRoyaltyData = async () => {
            let sum = 0;
            let nonSum = 0;
            data?.nftSales.forEach((sale: NftSale) => {
                let _royalty = sale.royaltyFee?.amount;
                // Skip if royalty is NaN
                if (!isNaN(Number(_royalty))) {
                    sum += Number(_royalty);
                } else {
                    nonSum++;
                }
            });
            let res = sum.toFixed(5);
            setRoyalty(res);
            setNonRoyalty(nonSum);
            return res;
        }

        getRoyaltyData();

        const getPriceinUSD = async () => {
            let _royalty = parseEther(royalty);
            setUSDPrice(usd * Number(_royalty) / 1e18);
        };
        getPriceinUSD();

    }, [data, royalty, usd]);

    return (
            <section className="m-20">
                <div className="flex justify-start border border-zinc-100 p-3 rounded-xl">
                    {contractdata && (
                        <NftCard sales={sales} usdPrice={usdPrice} royalty={royalty} nonRoyalty={nonRoyalty} holders={holders} contractdata={contractdata} />
                    )}
                </div>
            </section>
    )
};


