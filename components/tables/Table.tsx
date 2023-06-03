
import { NftSale } from 'alchemy-sdk';
import Link from 'next/link';

export const Table = ({data}: {data:any}) => {
    let sales = 0;

    return (
        <div className='overflow-auto rounded-lg shadow'>
            <table className='table-auto w-full'>
                <thead className='bg-gray-200 border-b-1 border-gray-200'>
                    <tr>
                        <th className="p-3 text-sm font-semibold tracking-wide text-left border border-slate-900">Sales</th>
                        <th className="p-3 text-sm font-semibold tracking-wide text-left border border-slate-900">Marketplace</th>
                        <th className="p-3 text-sm font-semibold tracking-wide text-left border border-slate-600">TokenId</th>
                        <th className="p-3 text-sm font-semibold tracking-wide text-left border border-slate-600">Buyer</th>
                        <th className="p-3 text-sm font-semibold tracking-wide text-left border border-slate-600">Seller</th>
                        <th className="p-3 text-sm font-semibold tracking-wide text-left border border-slate-600">TxHash</th>
                    </tr>
                </thead>
                <tbody className="text-xs">
                    {data?.nftSales.map((sale: NftSale) => {
                       
                        return (
                            <tr  key={data?.nftSales.id} className="bg-gray-50 text-gray-500">

                                <td className="border border-slate-700 p-1 text-sm text-gray-700 whitespace-nowrap"><span className='font-light text-amber-600'>{sales++}</span></td>
                                <td className="border border-slate-700 p-1 text-sm text-gray-700 whitespace-nowrap"><span className='font-light text-amber-600'>{sale.marketplace}</span></td>
                                <td className="border border-slate-700 p-3 text-sm text-gray-700 whitespace-nowrap"><span className='p-1.5 text-xs font-medium tracking-wider text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-50'>{sale.tokenId}</span></td>
                                <td className="border border-slate-700 p-3 text-sm text-gray-700 whitespace-nowrap"><span>{sale.buyerAddress}</span></td>
                                <td className="border border-slate-700 p-3 text-sm text-gray-700 whitespace-nowrap"><span>{sale.sellerAddress}</span></td>
                                <td className="break-words border border-slate-700 p-3 text-sm text-gray-700 whitespace-nowrap">
                                    <Link href={`https://etherscan.io/tx/${sale.transactionHash}`} className="font-semibold text-blue-500 hover:underline text-wrap">
                                        <span className='text-blue-800 bg-sky-500 border-2 border-blue-400 bg-opacity-50 rounded-md p-1'> TxHash</span>
                                    </Link></td>
                            </tr>
                        );
                    },)}
                </tbody>
            </table>
        </div>
    );
}
