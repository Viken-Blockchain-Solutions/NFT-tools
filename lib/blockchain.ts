'use server';
import { Alchemy, Network, AssetTransfersCategory, GetOwnersForContractWithTokenBalancesResponse } from 'alchemy-sdk';


const config = {
    apiKey: process.env.ALCHEMY_API_KEY, // Replace with your Alchemy API key.
    network: Network.ETH_MAINNET, // Replace with your network.
  };
  
const alchemy = new Alchemy(config);

export async function getCollectionMetadata(address: string) {
  'use server'
  const data = await fetch(`https://eth-mainnet.g.alchemy.com/nft/v2/${config.apiKey}/getContractMetadata?contractAddress=${address}`,
  {cache: 'no-store'});
  const result = await data.json();

  return result;
}

export async function getCollectionHolders<GetOwnersForContractWithTokenBalancesResponse>(address: string) {
  'use server'
  const data = await alchemy.nft.getOwnersForContract(address);

  return data;
}

export async function getCollectionRoyaltyData(address: string) {
  // Implement your logic for fetching royalty data
}

export async function getCollectionSalesData(address: string) {
  'use server'
    let options = {
        contractAddress: address,
    }
    const data = await alchemy.nft.getNftSales(options);
    return data;
}

export async function getCollectionHistory(address: string) {
  // Implement your logic for fetching collection history
}

export async function getCollectionTransferHistory(address: string) {
  'use server'
      const data = await alchemy.core.getAssetTransfers({
        fromBlock: "0x0",
        fromAddress: address,
        category: [AssetTransfersCategory.EXTERNAL, AssetTransfersCategory.ERC1155, AssetTransfersCategory.ERC1155],
      });
      
      console.log(JSON.stringify(data));
      return data;
}
