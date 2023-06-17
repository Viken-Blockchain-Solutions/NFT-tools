'use server';
import { Alchemy, Network, AssetTransfersCategory, NftSale, Utils } from 'alchemy-sdk';
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

  const royaltyData = {
    royalty: Number(sum.toFixed(5)) / 1e18,
    nonRoyalty: nonSum,
    royaltyUSD: (await getUSDPrice()) * Number(sum.toFixed(5)) / 1e18,
  }

  return royaltyData;
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

export async function getPrimarySales(address: string, deployed_block: number) {
  'use server'
      // Initialize Alchemy SDK with your API key
      const alchemy = new Alchemy({ apiKey: 'x5pi1Ykrq9fnCchoIdswHu9ijWHflqIs' });
      
      // Define the contract address for your ERC721 collection
      const contractAddress = address;
      
      // Define the ZERO address and the event topic
      const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
      const TRANSFER_EVENT_TOPIC = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';
      const SPECIAL_EVENT_TOPIC = '0x30385c845b448a36257a6a1716e6ad2e1bc2cbe333cde1e69fe849ad6511adfe';
      
      
      async function calculatePrimarySalesRevenue() {
        let totalRevenue = 0;
      
        // Fetch all Transfer events for the contract
        const logs = await alchemy.core.getLogs({
          address: contractAddress,
          topics: [SPECIAL_EVENT_TOPIC],
          fromBlock: deployed_block, // replace with the block number where the contract was deployed
          toBlock: 'latest'
        });

        console.log("LOGS:",logs)
        // Iterate over each log
        for (const log of logs) {
          // Check if the log is a primary sale
          if (isPrimarySale(log)) {
            // Get the transaction hash from the log
            const transactionHash = log.transactionHash;
              // Fetch the transaction using the transaction hash
            const transaction = await alchemy.core.getTransaction(transactionHash);
            
              console.log("TRANSACTION:",transaction)
            // Get the value of the transaction
            const value = Utils.formatEther(transaction.value);
            // Fetch the transaction receipt using the transaction hash
            const receipt = await alchemy.core.getTransactionReceipt(transactionHash);
    
            // Get the value and gas costs of the transaction from the receipt
   
            const gasUsed = receipt?.gasUsed;
            const gasPrice = Utils.formatEther(receipt?.gasPrice);
            const totalGasCost = gasUsed * gasPrice;
    
            console.log(`Value: ${value} ETH, Gas Used: ${gasUsed}, Gas Price: ${gasPrice} ETH, Total Gas Cost: ${totalGasCost} ETH`);
    
            // If it is a primary sale, add the value of the transfer to the total revenue
            totalRevenue += parseFloat(value);
          }
        }
    
        return totalRevenue;
      }

      function isPrimarySale(log: any): boolean {
        // Check if the "from" address is the ZERO address
        if (log.topics[1] === ZERO_ADDRESS) {
          return true;
        }

        // Check if the transaction emitted the specified event
        if (log.topics[0] === SPECIAL_EVENT_TOPIC) {
          return true;
        }

        // If neither of the above conditions are met, this is not a primary sale
        return false;
      }

      calculatePrimarySalesRevenue().then(revenue => {
        console.log(`Total revenue from primary sales: ${revenue} ETH`);
      });
}

