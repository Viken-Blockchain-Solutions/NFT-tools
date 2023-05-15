'use client';

import { useEffect, useState } from 'react';
import { Table } from './Table';
import { getUSDPrice } from '@/lib/utils';
import { NftSale } from 'alchemy-sdk';
import { parseEther } from 'ethers';

export const FormResult = ({ data, holders }: { data: any, holders: any }) => {
    const [sales, setSales] = useState();
    const [royalty, setRoyalty] = useState("0");
    const [nonRoyalty, setNonRoyalty] = useState(0);
    const [usdPrice, setUSDPrice] = useState(0);

    console.log("data:", data);

   
    useEffect(() => {
        const getSalesData = async () => {
            const _sales = data?.nftSales.length;
            console.log("sales:", _sales);
            setSales(_sales);
        }
        getSalesData();
    }, [data]);
    
    
    
    useEffect(() => {
        const getRoyaltyData = async () => {
            let sum = 0;
            let nonSum = 0;
            await data?.nftSales.forEach((sale: NftSale) => {
                let _royalty = sale.royaltyFee?.amount;
                // Skip if royalty is NaN
                if (!isNaN(Number(_royalty))) {
                    sum += Number(_royalty);
                } else {
                    nonSum ++;
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
            const _price: number = await getUSDPrice();
            console.log("price:", Number(_price));
            console.log("royalty:", Number(royalty)/1e18);
            setUSDPrice(_price * Number(_royalty)/1e18);
        };
        getPriceinUSD();

    }, [data, royalty]);

    
    

  

    return (
        <>
        {holders && (
            <section className="container pt-10">
                <div className="mt-20">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <div className="col-span-1">
                            <div className="bg-white rounded-lg shadow-md">
                                <div className="px-4 py-5 sm:p-6 text-gray-800">
                                    <h5 className="text-lg font-medium mb-2">Secondary Sales</h5>
                                    <div className="flex flex-col justify-center items-center">
                                        <h3>
                                            {sales > 0 ? <span className="text-3xl font-bold text-amber-600">{sales} </span> : <span className="text-3xl font-bold text-teal-600">0</span>}
                                             Sales
                                        </h3>

                                    </div>
                                    {nonRoyalty > 0 && ( 
                                    <>
                                        <div className="px-4 py-5 sm:p-6  text-gray-800">
                                            <h5 className="text-lg font-medium mb-2">Royalty sales </h5>
                                            <div className="flex flex-col justify-center items-center">
                                                <h3>
                                                    {nonRoyalty > 0 ? <span className="text-3xl font-bold text-amber-600">{sales-nonRoyalty} </span> : <span className="text-3xl font-bold text-teal-600">0</span>}
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

                                    {/** <Table data={data} /> */}
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className="bg-white rounded-lg shadow-md">
                                <div className="px-4 py-5 sm:p-6  text-gray-800">
                                    <h5 className="text-lg font-medium mb-2">Royalty fee amount</h5>
                                    <div className="flex flex-col justify-center items-center">
                                        <h3>
                                            {Number(royalty) > 0 ? <span className="text-3xl font-bold text-amber-600">{(Number(royalty)/10**18).toFixed(5)} </span> : <span className="text-3xl font-bold text-teal-600">0</span>}
                                             ETH
                                        </h3>
                                        <p className='text-extralight'>$ {(usdPrice/1e18).toFixed(2)}</p>
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
            </section>
            )
        }
        </>
    )
};