import { GetNftSalesResponse, NftSale } from 'alchemy-sdk';
export const FormResult = ({ data }: { data: any }) => {

    console.log(data);
    const collectionAAA = "0x210Dddfe9440567DD0C96D97CB72A7123074c0a1";
    return (
        <>
            <section className="container pt-10">
                <div className="mt-20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="col-span-3">
                            <div className="bg-white rounded-lg shadow-md">
                                <div className="px-4 py-5 sm:p-6 text-gray-800">
                                    <h5 className="text-lg font-medium mb-2">Secondary Sales Information</h5>
                                    <table className='table-auto border-separate border border-slate-500 text-gray-800'>
                                        <thead>
                                            <tr>
                                                <th className="border border-slate-600">Collection</th>
                                                <th className="border border-slate-600">Marketplace</th>
                                                <th className="border border-slate-600">TokenId</th>
                                                <th className="border border-slate-600">Buyer</th>
                                                <th className="border border-slate-600">Seller</th>
                                                <th className="border border-slate-600">BlockNumber</th>
                                                <th className="border border-slate-600">TxHash</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-sm">
                                            {data?.nftSales?.map((sale: NftSale) => {
                                                return(
                                                <tr key={data.nftSales.id} className="text-gray-500 text-sm p-3">
                                                    {sale.contractAddress != collectionAAA ? <td className="border border-slate-700">Centaurify Collection AAA</td> : <h1>Unknown Collection</h1>}
                                                    <td className="border border-slate-700"><span className='font-light text-amber-600'>{sale.marketplace}</span></td>
                                                    <td className="border border-slate-700"><span>{sale.tokenId}</span></td>
                                                    <td className="border border-slate-700"><span>{sale.buyerAddress}</span></td>
                                                    <td className="border border-slate-700"><span>{sale.sellerAddress}</span></td>
                                                    <td className="border border-slate-700"><span>{sale.blockNumber}</span></td>
                                                    <td className="break-words border border-slate-700"><p >{sale.transactionHash}</p></td>
                                                </tr>
                                                );
                                            },)}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
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

                    </div>
                </div>
            </section>
        </>
    )
};