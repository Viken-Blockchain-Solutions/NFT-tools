'use server';
import { Alchemy, Network, AssetTransfersCategory, NftSale } from 'alchemy-sdk';
import { getUSDPrice } from './utils';
import { parseEther } from 'ethers';


const config = {
  apiKey: process.env.ALCHEMY_API_KEY, // Replace with your Alchemy API key.
  network: Network.ETH_MAINNET, // Replace with your network.
};

const alchemy = new Alchemy(config);

export async function getCollectionMetadata(address: string) {
  'use server'
  const data = await fetch(`https://eth-mainnet.g.alchemy.com/nft/v3/${config.apiKey}/getContractMetadata?contractAddress=${address}`,
    { cache: 'no-store' });

  const result = await data.json();

  return result;
}

export async function getCollectionHolders(address: string) {
  'use server'
  const data = await alchemy.nft.getOwnersForContract(address);

  return data;
}

export async function getCollectionRoyaltyData(address: string) {
  'use server'
  const data = await alchemy.nft.getNftSales({ contractAddress: address });
  let sum = 0;
  let nonSum = 0;
  data?.nftSales.forEach((sale: NftSale) => {
    let _royalty = sale.royaltyFee?.amount;
    // Skip if royalty is NaN
    if (!isNaN(Number(_royalty))) {
      sum += Number(_royalty);
    } else {
      nonSum++;
    }
  });

  const royaltydata = {
    royalty: Number(sum.toFixed(5)) / 1e18,
    nonRoyalty: nonSum,
    royaltyUSD: (await getUSDPrice()) * Number(sum.toFixed(5)) / 1e18,
  }

  return royaltydata;
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
