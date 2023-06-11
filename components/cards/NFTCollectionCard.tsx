"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import logo from "@/public/assets/images/logo.svg";
import { abbreviatedAddress } from './UserCollectionsCard';

type ContractData = {
    contractAddress: string;
    deployed_blocknumber: number;
    deployer: string;
    description: string;
    floorPrice: number;
    image: null | string; // Assuming the image can be a string or null
    ingestionHistory: any[]; // Replace any with the actual type of the items if known
    name: string;
    symbol: string;
    totalSupply: number;
    __v: number;
    _id: string;
};

interface NFTCollectionCardProps {
  data: ContractData[];
  handleEdit: () => void;
  handleDelete: () => void;
}

const NFTCollectionCard: React.FC<NFTCollectionCardProps> = ({ data, handleEdit, handleDelete }) => {
  const [copied , setCopied] = useState("");
  const [collectionData, setCollectionData] = useState<ContractData | null>(null);
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const user = session?.user;

  useEffect(() => {
    if (data.length > 0) {
      const [firstItem] = data;
      console.log(firstItem);
      console.log(firstItem.contractAddress); // "0xEAdfF826D532dB453B74AF636B04232388e7BF0e"
      setCollectionData(firstItem);
    }
  }, [data]);
  

  const handleCopy = () => {
    if (collectionData) {
      setCopied(collectionData.contractAddress);
      navigator.clipboard.writeText(collectionData.contractAddress);
      setTimeout(() => {setCopied("")}, 3000);
    }
  }

  if (!collectionData) return null;

  return (
    <>
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={collectionData?.image || logo}
            alt="User image"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">{collectionData?.name}</h3>
            <p className="font-inter text-sm text-gray-300">{abbreviatedAddress(collectionData?.contractAddress)}</p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image src={copied === collectionData?.contractAddress
            ? '/assets/icons/tick.svg'
            : '/assets/icons/copy.svg'
            } 
            alt="asset" 
            width={12} 
            height={12}
          />
        </div>
  
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p className="font-inter text-sm green_gradient cursor-pointer" onClick={handleEdit}>Edit</p>
          <p className="font-inter text-sm orange_gradient cursor-pointer" onClick={handleDelete}>Delete</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default NFTCollectionCard;
