'use client';

import { GetNftSalesResponse, NftSale, GetOwnersForContractResponse } from "alchemy-sdk";
import { parseEther } from "ethers";
import Link from "next/link";
import { useState, useEffect } from "react";
import { TableList } from "./TableList";

export const FormResult = ({ data, holders, usd, metadata }: { data: GetNftSalesResponse, holders: any, usd: number, metadata: any }) => {
    const [sales, setSales] = useState(0);
    const [royalty, setRoyalty] = useState("0");
    const [nonRoyalty, setNonRoyalty] = useState(0);
    const [usdPrice, setUSDPrice] = useState(0);
    const [showList, setShowList] = useState(false);

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
                <div className="m-5 text-base">
                    <div className="block p-6 rounded-lg shadow-lg bg-white">
                        <h5 className="text-gray-900 text-md leading-tight font-medium mb-2">Collection Data</h5>
                        <p className="text-gray-700 text-sm mb-4">
                            {metadata?.contractMetadata?.name}
                        </p>
                        <h5 className="text-gray-900 text-md leading-tight font-medium mb-2">Collection Deployer</h5>
                        <p className="text-gray-700 text-sm mb-4 truncate">
                            {metadata?.contractMetadata?.contractDeployer}
                        </p>
                        <h5 className="text-gray-900 text-md leading-tight font-medium mb-2">Collection Floorprice</h5>
                        <p className="text-gray-700 text-sm mb-4">
                            {metadata?.contractMetadata?.openSea.floorPrice} <span className="text-gray-900 leading-tight font-bold" >ETH</span>
                        </p>
                    </div>
                </div>
            </div>
            <hr className="mx-auto my-10 w-1/2 border-purple-300" />
            {holders && (
                <>
                    <div className="border border-zinc-100 p-10 rounded-xl flex flex-col">
                        <h2 className="text-xl py-5 text-white">Revenue & Royalty Stats</h2>
                        <div className="flex flex-col lg:flex-row">
                            <div className="m-5">
                                <div className="flex justify-center">
                                    <div className="block p-6 rounded-lg shadow-lg bg-white w-1/2 md:w-auto">
                                        <h5 className="text-gray-900 text-lg leading-tight font-medium mb-2">Secondary Sales</h5>
                                        <p className="text-gray-700 text-base mb-4">
                                            {sales !== undefined && sales > 0 ? <span className="text-3xl font-bold text-amber-600">{sales} </span> : <span className="text-3xl font-bold text-teal-600">0</span>}
                                            Sales
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="m-5">
                                <div className="flex justify-center">
                                    <div className="block p-6 rounded-lg shadow-lg bg-white w-1/2 md:w-auto">
                                        <h5 className="text-gray-900 text-lg leading-tight font-medium mb-2">Royalty Fee Amount</h5>
                                        <p className="text-gray-700 text-base mb-4">
                                            {Number(royalty) > 0 ? <span className="text-3xl font-bold text-amber-600">{(Number(royalty) / 10 ** 18).toFixed(5)} </span> : <span className="text-3xl font-bold text-teal-600">0</span>}
                                            ETH
                                        </p>
                                        <p className='text-gray-700 text-extralight'><span className="font-semibold">$</span> {(usdPrice / 1e18).toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="m-5">
                                <div className="flex justify-center">
                                    <div className="block p-6 rounded-lg shadow-lg bg-white w-1/2 md:w-auto">
                                        <h5 className="text-gray-900 text-lg leading-tight font-medium mb-2">Zero Royalty Sales</h5>
                                        <p className="text-gray-700 text-base mb-4">
                                            {nonRoyalty > 0 ? <span className="text-3xl font-bold text-amber-600">{nonRoyalty} </span> : <span className="text-3xl font-bold text-teal-600">0</span>}
                                            Sales
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="m-5">
                                <div className="flex justify-center">
                                    <div className="block p-6 rounded-lg shadow-lg bg-white w-1/2 md:w-auto">
                                        <h5 className="text-gray-900 text-lg leading-tight font-medium mb-2">Royalty Sales</h5>
                                        <p className="text-gray-700 text-base mb-4">
                                            {sales > 0 ? <span className="text-3xl font-bold text-amber-600">{sales - nonRoyalty} </span> : <span className="text-3xl font-bold text-teal-600">0</span>}
                                            Sales
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="m-5">
                                <div className="flex justify-center">
                                    <div className="block p-6 rounded-lg shadow-lg bg-white w-1/2 md:w-auto">
                                        <h5 className="text-gray-900 text-lg leading-tight font-medium mb-2">Holders Information</h5>
                                        <p className="text-gray-700 text-base mb-4">
                                            {holders.owners.length > 0 ? <span className="text-3xl font-bold text-amber-600">{holders.owners.length} </span> : <span className="text-3xl font-bold text-teal-600">0</span>}
                                            Holders
                                        </p>
                                            <button type="button" onClick={() => setShowList(!showList)} className='text-xs mt-2 underline text-blue-500 text-center'>Show list of holders</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                        {showList && (
                        <div className="w-1/2">
                            <TableList holders={holders} />
                        </div>   
                        )}
                </>
            )
            }
        </section>
    )
};


