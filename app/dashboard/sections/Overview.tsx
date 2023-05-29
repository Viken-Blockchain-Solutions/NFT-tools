import { NFTCollection } from "@types";
import { useSession } from "next-auth/react";
import Image from "next/image";



const Overview = ({collectionMetadata}: {collectionMetadata: NFTCollection}) => {
    const { data: session } = useSession();
    const {address, name, symbol, totalSupply, tokenType, contractDeployer, deployedBlockNumber, openSeaMetadata } = collectionMetadata;
    const { floorPrice, collectionName, safelistRequestStatus, imageUrl, description, externalUrl, twitterUsername, discordUrl, lastIngestedAt } = openSeaMetadata;
    
    return (
        <>
            <section id="overview" className="container mx-auto mt-8">
                <div className="bg-white p-4 rounded-lg glassmorphism">
                    <div>
                        <h2 className="text-lg font-bold mb-4">Overview</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-lg glassmorphism">
                                <p className="text-gray-600">
                                    UserName: <span className="font-bold">{session?.user?.name}</span>
                                </p>
                                <p className="text-gray-600">
                                    Subscription:
                                </p>
                                <p className="text-gray-600">
                                    Total Collections: `add Number here`
                                </p>
                            </div>
                            <div className="p-4 rounded-lg glassmorphism">
                                <p className="text-gray-600">
                                    
                                </p>
                                <p className="text-gray-600">
                                    Total Revenue: $10,000
                                </p>
                                <p className="text-gray-600">
                                    Total Royalty Earned: $1,000
                                </p>
                            </div>
                        </div>
                    </div>
                    {openSeaMetadata && (
                    <div className="mt-8">
                        <h3 className="text-xl font-bold mb-4">Collections</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-lg glassmorphism">
                                <h3 className="text-lg font-bold">Collection {name}</h3>
                                <Image src={imageUrl} className="rounded-full" alt="Collection Image" width={37} height={37} priority/>
                                <p className="text-gray-600">Symbol: {symbol}</p>
                                <p className="text-gray-600">Total supply: {totalSupply}</p>
                                <p className="text-gray-600">Token type: {tokenType}</p>
                                <p className="text-gray-600">Deployed At Block: {deployedBlockNumber}</p>
                                <p className="text-gray-600">Collection Address: {address}</p>
                                <p className="text-gray-600">Collection deployer: {contractDeployer}</p>
                                <p className="text-gray-600">External Url: {externalUrl}</p>
                                <p className="text-gray-600">Twitter: {twitterUsername}</p>
                                <p className="text-gray-600">Discord: {discordUrl}</p>
                                <p className="text-gray-600">Last Ingested At: {lastIngestedAt}</p>
                                <p className="text-gray-600">Floor Price: {floorPrice}</p>
                                <p className="text-gray-600">Collection Name: {collectionName}</p>
                                <p className="text-gray-600">Safelist Request Status: {safelistRequestStatus}</p>
                            </div>
                            <div className="p-4 rounded-lg glassmorphism">
                                <h3 className="text-lg font-bold">OpenSea data</h3>
                                
                                <p className="text-gray-600">Description: {description}</p>
                           
                            </div>
                        </div>
                    </div>
                    )}
                </div>
            </section>
       </>
    )
}

export default Overview;