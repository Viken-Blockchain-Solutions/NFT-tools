import { HoldersCard } from "@components/HoldersCard";
import Link from "next/link";

const Stats = (data: any) => {
    const { nftData, holders, royaltyData } = data;

    const holding = holders?.owners.length;
    const sales = nftData?.nftSales.length;
    const { royalty, nonRoyalty, royaltyUSD } = royaltyData;
    const holdersData = {holders, holding};
          
    return (
        <section id="statistics" className="container mx-auto mt-8">
            <div className="bg-white p-4 rounded-lg glassmorphism">
                <h2 className="text-lg font-bold mb-4">Statistics</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <HoldersCard holdersData={holdersData} />
                    </div>
                    <div className="p-4 rounded-lg glassmorphism">
                        <h3 className="text-lg font-bold">Total Sales</h3>
                        <p className="text-gray-600">{sales}</p>
                    </div>
                    <div className="p-4 rounded-lg glassmorphism">
                        <h3 className="text-lg font-bold">Non Royalty Sales</h3>
                        <p className="text-gray-600">{nonRoyalty}</p>
                    </div>
                    <div className="p-4 rounded-lg glassmorphism">
                        <h3 className="text-lg font-bold">Royalty Sales</h3>
                        <p className="text-gray-600">{sales - nonRoyalty}</p>
                    </div>
                    <div className="p-4 rounded-lg glassmorphism">
                        <h3 className="text-lg font-bold">Total Royalty Earned</h3>
                        <p className="text-gray-600">{royalty.toFixed(5)} ETH</p>
                    </div>
                    <div className="p-4 rounded-lg glassmorphism">
                        <h3 className="text-lg font-bold">Total Royalty Earned</h3>
                        <p className="text-gray-600">$ {royaltyUSD.toFixed(2)}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Stats;
