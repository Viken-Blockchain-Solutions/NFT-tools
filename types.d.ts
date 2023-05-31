export interface OpenSeaMetadata {
    floorPrice: number;
    collectionName: string;
    safelistRequestStatus: string;
    imageUrl: string;
    description: string;
    externalUrl: string;
    twitterUsername: string;
    discordUrl: string;
    lastIngestedAt: string;
  }
  
export interface NFTCollection {
    json(): { address: any; userId: any; } | PromiseLike<{ address: any; userId: any; }>;
    address: string;
    name: string;
    symbol: string;
    totalSupply: string;
    tokenType: string;
    contractDeployer: string;
    deployedBlockNumber: number;
    openSeaMetadata: OpenSeaMetadata;
  }
  
  