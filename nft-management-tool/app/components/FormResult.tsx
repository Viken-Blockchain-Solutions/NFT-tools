import { GetNftSalesResponse, NftSale } from 'alchemy-sdk';
export const FormResult = ({ data }: { data: any }) => {

    console.log(data);
    const collectionAAA = "0x210Dddfe9440567DD0C96D97CB72A7123074c0a1";
    return (
        <>
            <section className="container pt-10">
                <div className="mt-20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="col-span-2 w-fit">
                            <div className="bg-white rounded-lg shadow-md">
                                <div className="px-4 py-5 sm:p-6">
                                    <h5 className="text-lg font-medium mb-2">Secondary Sales Information</h5>
                                    <p className="text-gray-500">Secondary sales information will be displayed here.</p>
                                    <ul className='w-fit'>
                                        {data?.nftSales?.map((sale: NftSale) => {

                                            return (
                                                <li key={data.nftSales.id} className="text-gray-500 text-sm p-3">

                                                    {sale.contractAddress != collectionAAA ? <h1>Centaurify Collection AAA</h1> : <h1>Unknown Collection</h1>}
                                                    <p>Marketplace: <span className='font-light text-amber-600'>{sale.marketplace}</span></p>
                                                    <p>TokenId: <span>{sale.tokenId}</span></p>
                                                    <p>Buyer: <span>{sale.buyerAddress}</span></p>
                                                    <p>Seller: <span>{sale.sellerAddress}</span></p>
                                                    <p>BlockNumber: <span>{sale.blockNumber}</span></p>
                                                    <p>TxHash: <span>{sale.transactionHash}</span></p>
                                                </li>
                                            )
                                        },)}
                                    </ul>
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