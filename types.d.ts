import { Session } from "next-auth";

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
    json(): { address: string; userId: string; } | PromiseLike<{ address: string; userId: string; }>;
    address: string;
    name: string;
    symbol: string;
    totalSupply: string;
    tokenType: string;
    contractDeployer: string;
    deployedBlockNumber: number;
    openSeaMetadata: OpenSeaMetadata;
  }
  
  export interface CustomUser extends Session {
    id: string;
    name: string;
    email: string;
    image?: string | null;
}