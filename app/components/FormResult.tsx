import { useState } from 'react';
import { Table } from './Table';
import { NftSale } from 'alchemy-sdk';

export const FormResult = ({ data }: { data: any }) => {
    const [sales, setSales] = useState(0);

    console.log("data:", data);
    const collectionAAA = "0x210Dddfe9440567DD0C96D97CB72A7123074c0a1";

    const getSales = (data: any) => {
        let _sales = 0;;
        data?.nftSales?.map((sale: NftSale) => {
            _sales++;
        });
        setSales(_sales);
    }
    return (
        <>
            <section className="container pt-10">
                <div className="mt-20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="col-span-1 w-fit">
                            <div className="bg-white rounded-lg shadow-md">
                                <div className="px-4 py-5 sm:p-6">
                                    <h5 className="text-lg font-medium mb-2">Royalty Information</h5>
                                    <p className="text-gray-500">Royalty information will be displayed here.</p>

                                </div>
                            </div>
                        </div>
                        <div className="col-span-1 w-fit">
                            <div className="bg-white rounded-lg shadow-md">
                                <div className="px-4 py-5 sm:p-6">
                                    <h5 className="text-lg font-medium mb-2">Transaction History</h5>
                                    <p className="text-gray-500">Transaction history will be displayed here.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-3">
                            <div className="bg-white rounded-lg shadow-md">
                                <div className="px-4 py-5 sm:p-6 text-gray-800">
                                    <h5 className="text-lg font-medium mb-2">Secondary Sales Information</h5>
                                    <div className="flex flex-col justify-center items-center">
                                       {sales > 0 ? <span className="text-3xl font-bold text-amber-600">{sales}</span> : <span className="text-3xl font-bold text-teal-600">0</span>}
                                    </div>
                                    <Table data={data} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
};