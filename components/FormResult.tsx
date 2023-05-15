'use client';

import getEthInUsdPrice from "@/lib/utils";
import { GetNftSalesResponse, NftSale } from "alchemy-sdk";
import { parseEther } from "ethers";
import { useState, useEffect } from "react";

export const FormResult = ({ data, holders, metadata }: { data: GetNftSalesResponse, holders: number, metadata: any }) => {
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
            const _price: number = await getEthInUsdPrice();
            setUSDPrice(_price * Number(_royalty) / 1e18);
        };
        getPriceinUSD();

    }, [data, royalty]);

    return (
        <section className="m-20">
            <div className="m-5">
                <div className="flex justify-center">
                    <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
                        <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">Collection Data</h5>
                        <p className="text-gray-700 text-base mb-4">
                            {metadata.contractMetadata?.name}
                        </p>
                        <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">Collection Deployer</h5>
                        <p className="text-gray-700 text-base mb-4">
                            {metadata.contractMetadata?.contractDeployer}
                        </p>
                        <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">Collection Floorprice</h5>
                        <p className="text-gray-700 text-base mb-4">
                            {metadata.contractMetadata?.openSea.floorPrice} ETH
                        </p>
                    </div>
                </div>
            </div>

            {holders && (
                <>
                    <div className="flex flex-row gap-4">
                        <div className="m-5">
                            <div className="flex justify-center">
                                <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
                                    <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">Secondary Sales</h5>
                                    <p className="text-gray-700 text-base mb-4">
                                        {sales !== undefined && sales > 0 ? <span className="text-3xl font-bold text-amber-600">{sales} </span> : <span className="text-3xl font-bold text-teal-600">0</span>}
                                        Sales
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="m-5">
                            <div className="flex justify-center">
                                <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
                                    <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">Royalty Sales</h5>
                                    <p className="text-gray-700 text-base mb-4">
                                        {Number(royalty) > 0 ? <span className="text-3xl font-bold text-amber-600">{(Number(royalty) / 10 ** 18).toFixed(5)} </span> : <span className="text-3xl font-bold text-teal-600">0</span>}
                                        ETH
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-20">
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                <div className="col-span-1">
                                    <div className="bg-white rounded-lg shadow-md">
                                        <div className="px-4 py-5 sm:p-6 text-gray-800">
                                            <h5 className="text-lg font-medium mb-2">Secondary Sales</h5>
                                            <div className="flex flex-col justify-center items-center gap-4">
                                                <h3>
                                                    {sales !== undefined && sales > 0 ? <span className="text-3xl font-bold text-amber-600">{sales} </span> : <span className="text-3xl font-bold text-teal-600">0</span>}

                                                    Sales
                                                </h3>
                                            </div>
                                            {nonRoyalty > 0 && (
                                                <>
                                                    <div className="px-4 py-5 sm:p-6  text-gray-800">
                                                        <h5 className="text-lg font-medium mb-2">Royalty sales </h5>
                                                        <div className="flex flex-col justify-center items-center">
                                                            <h3>
                                                                {nonRoyalty > 0 ? <span className="text-3xl font-bold text-amber-600">{nonRoyalty} </span> : <span className="text-3xl font-bold text-teal-600">0</span>}
                                                                Sales
                                                            </h3>
                                                        </div>
                                                    </div>
                                                    <div className="px-4 sm:p-6  text-gray-800">
                                                        <h5 className="text-lg font-medium mb-2">Zero royalty </h5>
                                                        <div className="flex flex-col justify-center items-center">
                                                            <h3>
                                                                {nonRoyalty > 0 ? <span className="text-3xl font-bold text-amber-600">{nonRoyalty} </span> : <span className="text-3xl font-bold text-teal-600">0</span>}
                                                                Sales
                                                            </h3>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-1">
                                    <div className="bg-white rounded-lg shadow-md">
                                        <div className="px-4 py-5 sm:p-6  text-gray-800">
                                            <h5 className="text-lg font-medium mb-2">Royalty fee amount</h5>
                                            <div className="flex flex-col justify-center items-center">
                                                <h3>
                                                    {Number(royalty) > 0 ? <span className="text-3xl font-bold text-amber-600">{(Number(royalty) / 10 ** 18).toFixed(5)} </span> : <span className="text-3xl font-bold text-teal-600">0</span>}
                                                    ETH
                                                </h3>
                                                <p className='text-extralight'>$ {(usdPrice / 1e18).toFixed(2)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-1 w-fit">
                                    <div className="bg-white rounded-lg shadow-md">
                                        <div className="px-4 py-5 sm:p-6 text-gray-800">
                                            <h5 className="text-lg font-medium mb-2">Holders Information</h5>
                                            <div className="flex flex-col justify-center items-center">
                                                <h3>
                                                    {holders > 0 ? <span className="text-3xl font-bold text-amber-600">{holders} </span> : <span className="text-3xl font-bold text-teal-600">0</span>}
                                                    Holders
                                                </h3>
                                            </div>
                                            <p className='text-xs mt-2 underline text-blue-500 text-center'>Get list of holders</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )
            }
        </section>
    )
};


