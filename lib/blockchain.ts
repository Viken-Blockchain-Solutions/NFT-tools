'use server';
import { Alchemy, Network, AssetTransfersCategory, GetOwnersForContractWithTokenBalancesResponse } from 'alchemy-sdk';


const config = {
    apiKey: process.env.ALCHEMY_API_KEY, // Replace with your Alchemy API key.
    network: Network.ETH_MAINNET, // Replace with your network.
  };
  
const alchemy = new Alchemy(config);

export async function getCollectionSupply(address: string) {
    // Implement your logic for fetching supply
}

export async function getCollectionHolders<GetOwnersForContractWithTokenBalancesResponse>(FormData: string) {
  'use server'

    return await alchemy.nft.getOwnersForContract(FormData);
}

export async function getCollectionRoyaltyData(address: string) {
  // Implement your logic for fetching royalty data
}

export async function getCollectionSalesData(address: string) {
  'use server'
    let options = {
        contractAddress: address,
    }

    return await alchemy.nft.getNftSales(options);
}

export async function getCollectionHistory(address: string) {
  // Implement your logic for fetching collection history
}

export async function getCollectionTransferHistory(address: string) {
        const data = await alchemy.core.getAssetTransfers({
          fromBlock: "0x0",
          fromAddress: address,
          category: [AssetTransfersCategory.EXTERNAL, AssetTransfersCategory.ERC1155],
        });
       
        console.log(data);
        return data;
}
