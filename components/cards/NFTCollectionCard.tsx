"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import logo from "@/public/assets/images/logo.svg";
import { abbreviatedAddress } from './UserCollectionsCard';

const NFTCollectionCard = ({ data, handleEdit, handleDelete }: {data: any, handleEdit: any, handleDelete: any}) => {
  const [copied , setCopied] = useState("");
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const user = session?.user;

      
  return (
    <>
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={user?.image || logo}
            alt="User image"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">{user?.name}</h3>
            <p className="font-inter text-sm text-gray-300">{}</p>
          </div>
        </div>
        <div className="copy_btn" onClick={() =>{}}>
          <Image src={copied === copied
            ? '/assets/icons/tick.svg'
            : '/assets/icons/copy.svg'
            } 
            alt="asset" 
            width={12} 
            height={12}
          />
        </div>
        <p className="my-4 font-satoshi text-xs text-gray-400"> </p>
        <p className="font-inter text-sm blue-gradient cursor_pointer"
        onClick={() => {}}>{}</p>
      </div>
    </div>
    </>
  );
};

export default NFTCollectionCard;