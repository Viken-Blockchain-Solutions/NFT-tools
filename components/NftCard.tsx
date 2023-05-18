import { NFTCollection } from "@/types";
import Image from "next/image";


export const NftCard = ({ sales, royalty, nonRoyalty, holders, contractdata }: { sales: number, royalty: string, nonRoyalty: number, holders: any, contractdata: NFTCollection }) => {
    



    const collection: NFTCollection = contractdata;
    const holding = holders?.owners?.length;

    // Destructuring the object
    const { address, name, symbol, totalSupply, tokenType, contractDeployer, deployedBlockNumber, openSeaMetadata } = collection;
    const { floorPrice, collectionName, safelistRequestStatus, imageUrl, description, externalUrl, twitterUsername, discordUrl, lastIngestedAt } = openSeaMetadata;
    console.log(sales, royalty, nonRoyalty, holders, contractdata);

    return (

        <div className="m-5 flex flex-row">
            {{collection, sales, royalty, nonRoyalty, holders, contractdata} &&

            <div className="flex-col">
                <h2 className="text-gray-100 text-xl leading-tight font-medium mb-2">NFT Data</h2>
                <div className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border-indigo-500 border-4">
                    <div className="relative overflow-hidden bg-cover bg-no-repeat flex flex-row">
                        <Image
                            src={imageUrl}
                            className="h-auto max-w-full rounded-full m-5 shadow-lg"
                            alt="web3"
                            width={170}
                            height={100} />
                        <div className="p-6 flex flex-cols-4 m-2 gap-3">
                            <div className="flex-col-1 whitespace-normal border py-4 px-5 shadow-lg">
                                <h5 className="mb-2 text-sm font-medium leading-tight text-neutral-800">Token Type</h5>
                                <p className="mb-4 text-xs text-neutral-600 break-words">{tokenType}</p>
                                <h5 className="text-gray-900 text-sm leading-tight font-medium mb-2">Symbol</h5>
                                <p className="text-gray-700 text-xs mb-4">{symbol}</p>
                            </div>
                            <div className="flex-col-1 whitespace-normal border py-4 px-5 shadow-lg">
                                <h5 className="text-gray-900 text-sm leading-tight font-medium mb-2">Total Supply</h5>
                                <p className="text-gray-700 text-xs mb-4 truncate">{totalSupply}</p>
                                <h5 className="text-gray-900 text-sm leading-tight font-medium mb-2">Floorprice</h5>
                                <p className="text-gray-700 text-xs mb-4">{floorPrice}
                                    <span className="text-gray-900 leading-tight font-bold"> ETH</span>
                                </p>
                            </div>
                            <div className="flex-col-1 whitespace-normal border py-4 shadow-lg px-5">
                                <h5 className="text-gray-900 text-sm leading-tight font-medium mb-2">Total Holders</h5>
                                <p className="text-gray-700 text-xs mb-4">{holding}</p>
                            </div>
                        </div>
                    </div>
                    <hr className="mx-auto my-10 w-1/2 border-indigo-500" />
                    <div className="p-6 flex flex-col m-2 gap-3">
                        <h2 className="text-stone-600 text-sm leading-tight font-medium mb-2">Collection Stats</h2>
                        <div className="flex flex-row gap-3">
                            <div className="border py-4 whitespace-normal shadow-xl px-5">
                                <h5 className="mb-2 text-sm font-medium leading-tight text-neutral-800">Collection Name</h5>
                                <p className="mb-4 text-xs text-neutral-600 break-words">{name}</p>
                                <h5 className="text-gray-900 text-sm leading-tight font-medium mb-2">Address</h5>
                                <p className="text-gray-700 text-xs mb-4">{address}</p>
                                <h5 className="text-gray-900 text-sm leading-tight font-medium mb-2">Deployer</h5>
                                <p className="text-gray-700 text-xs mb-4">{contractDeployer}</p>
                            </div>
                            <div className="border py-4 px-5  whitespace-normal shadow-xl">
                                <h5 className="text-gray-900 text-sm leading-tight font-medium mb-2">Secondary Sales</h5>
                                <p className="text-gray-700 text-xs mb-4">{sales}</p>
                                <h5 className="text-gray-900 text-sm leading-tight font-medium mb-2">Non Royalty Sales</h5>
                                <p className="text-gray-700 text-xs mb-4">{nonRoyalty}</p>
                                <h5 className="text-gray-900 text-sm leading-tight font-medium mb-2">Royalty Sales</h5>
                                <p className="text-gray-700 text-xs mb-4 truncate">{sales -= nonRoyalty}</p>
                                <h5 className="text-gray-900 text-sm leading-tight font-medium mb-2">Royalty Fee</h5>
                                <p className="text-gray-700 text-xs mb-4">{(Number(royalty) / 1e18).toFixed(5)}
                                    <span className="text-gray-900 leading-tight font-bold"> ETH</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}

